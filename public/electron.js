const { app, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1260,
    height: 800,
    backgroundColor: "white",
    show: false, // primero oculto, luego muestro maximizado
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  // Cargar URL dependiendo del entorno
  const startURL = isDev
    ? "http://localhost:3000"
    : `file://${path.join(__dirname, "../build/index.html")}`;

  mainWindow.loadURL(startURL);

  // Mostrar maximizado
  mainWindow.once("ready-to-show", () => {
    mainWindow.maximize();
    mainWindow.show();
  });

  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);

// En macOS vuelve a abrir la ventana al hacer click en el ícono
app.on("activate", () => {
  if (mainWindow === null) createWindow();
});

// Cerrar cuando todas las ventanas estén cerradas (excepto en macOS)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});