// electron.js (versión debug para empaquetar temporalmente)
const { app, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");

app.disableHardwareAcceleration(); // call early

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1260,
    height: 800,
    backgroundColor: "#ffffff",
    show: false,
    resizable: false,
    fullscreenable: false,
    maximizable: true,
    movable: false,
    focusable: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false
    }
  });

  mainWindow.setMenu(null);

  const startURL = isDev
    ? "http://localhost:3000"
    : `file://${path.join(__dirname, "../build/index.html")}`;

  mainWindow.loadURL(startURL);

  mainWindow.on('blur', () => {
    mainWindow.focus();
  });

  // Logs de foco / blur
  mainWindow.on("focus", () => {
    try { mainWindow.focus(); } catch(e) { console.warn(e); } // window.focus (preferible a webContents.focus)
  });

  mainWindow.once("ready-to-show", () => {
    // mostrar y asegurar que la ventana tenga el foco de SO
    mainWindow.maximize();
    mainWindow.show();
    mainWindow.focus(); // intentar con window.focus() en vez de webContents.focus()
    // Abrir DevTools si pasaste --debug al exe
    if (process.argv.includes("--debug")) {
      mainWindow.webContents.openDevTools({ mode: "right" });
    }
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", () => {
  createWindow();
});

app.on("activate", () => {
  if (mainWindow === null) createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});