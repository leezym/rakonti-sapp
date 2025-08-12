/**
 * @author Martín Vladimir Alonso Sierra Galvis
 * @version 1.0.0
 */

const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');

function createWindow() {
  const window = new BrowserWindow({
    width: 1260, 
    height: 800, 
    backgroundColor: 'white', 
    webPreferences: {}
  });

  window.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
}

app.whenReady().then(createWindow);