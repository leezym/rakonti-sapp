const { app, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1260,
    height: 800,
    backgroundColor: "white",
    show: false,          // oculto hasta estar listo
    resizable: false,     // bloquea bordes/flechas
    fullscreenable: false,// bloquea F11
    maximizable: false,   // quita botón maximizar/restaurar
    movable: false,       // deshabilitar movimiento para evitar conflictos
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // Quitar menú
  mainWindow.setMenu(null);

  // Cargar URL según entorno
  const startURL = isDev
    ? "http://localhost:3000"
    : `file://${path.join(__dirname, "../build/index.html")}`;

  mainWindow.loadURL(startURL);

  // Mostrar siempre maximizado y asegurar focus
  mainWindow.once("ready-to-show", () => {
    mainWindow.maximize();
    mainWindow.show();

    // Asegurar focus de la ventana después de un breve delay
    setTimeout(() => {
      mainWindow.webContents.focus();
    }, 100);
  });

  // Window movement is now disabled via movable: false

  // Si alguien intenta restaurar, volver a maximizar
  mainWindow.on("unmaximize", () => {
    mainWindow.maximize();
  });

  mainWindow.on("closed", () => (mainWindow = null));

  // Ensure webContents gets focus when window gains focus
  mainWindow.on("focus", () => {
    mainWindow.webContents.focus();
  });
}

// App lifecycle
app.on("ready", createWindow);

app.on("activate", () => {
  if (mainWindow === null) createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});