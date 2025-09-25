const { app, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");

app.disableHardwareAcceleration(); // call early

let mainWindow;

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

  const startURL = isDev.default
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
  createWindow();
});

app.on("activate", () => {
  if (mainWindow === null) createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});