const { app, BrowserWindow, dialog } = require("electron");
const path = require("path");
const fs = require("fs");

app.disableHardwareAcceleration(); // call early

let mainWindow;

// --- Backend embebido (rakonti-api) -----------------------------------
// En vez de depender de un servidor externo (remoto o corrido a mano en otra
// terminal), el proceso principal de Electron levanta el backend en el mismo
// proceso Node que ya trae Electron. Así, con solo abrir la app, el API queda
// disponible en http://127.0.0.1:<BACKEND_PORT>.
//
// NOTA (siguiente paso, tarea 4 de la propuesta): hoy DB_HOST/DB_PORT/DB_USER/
// DB_PASSWORD apuntan al Postgres que ya está instalado localmente (los mismos
// datos de .env.local). Cuando se empaquete Postgres portable dentro del
// instalador, solo hay que cambiar estos valores para que apunten a la
// instancia embebida (y ajustar su carpeta de datos a app.getPath('userData')).
const BACKEND_PORT = process.env.RAKONTI_BACKEND_PORT || "55303";

function resolveBackendEntry() {
  return app.isPackaged
    ? path.join(process.resourcesPath, "backend", "index.js")
    : path.join(__dirname, "..", "..", "rakonti-api", "index.js");
}

function startBackend() {
  process.env.PORT = BACKEND_PORT;
  process.env.DB_NAME = process.env.DB_NAME || "rakonti";
  process.env.DB_USER = process.env.DB_USER || "admin";
  process.env.DB_PASSWORD = process.env.DB_PASSWORD || "admin";
  process.env.DB_HOST = process.env.DB_HOST || "localhost";
  process.env.DB_PORT = process.env.DB_PORT || "5432";

  const backendEntry = resolveBackendEntry();

  // TEMPORAL, solo para depurar: si el backend empaquetado no tiene sus
  // node_modules (o le falta alguno), require() falla y antes ese error
  // solo quedaba en la consola del proceso principal (invisible para quien
  // instaló la app). Ahora, si falla, se muestra un cuadro de diálogo nativo
  // con el motivo exacto, para poder revisarlo sin depender de las DevTools.
  const backendNodeModules = path.join(path.dirname(backendEntry), "node_modules");
  if (app.isPackaged && !fs.existsSync(backendNodeModules)) {
    const msg = `No se encontró node_modules del backend en:\n${backendNodeModules}\n\nEl backend no puede arrancar sin sus dependencias instaladas.`;
    console.error("❌", msg);
    dialog.showErrorBox("Rakonti - Backend no disponible", msg);
    return;
  }

  try {
    const { startServer } = require(backendEntry);
    startServer();
    console.log(`✅ Backend de Rakonti embebido iniciado desde ${backendEntry}`);
  } catch (error) {
    // No tumbamos la app por esto: el usuario verá errores de conexión en la
    // UI (login/registro, etc.), pero mostramos el motivo exacto en un
    // cuadro de diálogo nativo, además de dejarlo en el log, para no depender
    // de que alguien tenga la consola del proceso principal abierta.
    const msg = `No se pudo iniciar el backend embebido de Rakonti.\n\nEntrada: ${backendEntry}\n\nError: ${error && error.stack ? error.stack : error}`;
    console.error("❌", msg);
    dialog.showErrorBox("Rakonti - Backend no disponible", msg);
  }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1260,
    height: 800,
    backgroundColor: "white",
    show: false,
    resizable: false,
    fullscreenable: false,
    maximizable: false,
    movable: false,
    focusable: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false
    }
  });

  mainWindow.setMenu(null);

  const startURL = !app.isPackaged
    ? "http://localhost:3000"
    : `file://${path.join(__dirname, "../build/index.html")}`;

  mainWindow.loadURL(startURL);

  mainWindow.once("ready-to-show", () => {
    mainWindow.maximize();
    mainWindow.show();
    mainWindow.setBounds(mainWindow.getBounds());
    mainWindow.webContents.focus();
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", () => {
  startBackend();
  createWindow();
});

app.on("activate", () => {
  if (mainWindow === null) createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
