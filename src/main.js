
const { app, BrowserWindow } = require('electron');
const path = require('path');

function createMainWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  win.loadFile('public/index.html');

  global.chatgptWin = new BrowserWindow({
    width: 400,
    height: 800,
    x: 0,
    y: 0,
    frame: false,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: false
    }
  });
  chatgptWin.loadURL('https://chat.openai.com');
  chatgptWin.hide();

  global.geminiWin = new BrowserWindow({
    width: 400,
    height: 800,
    x: 880,
    y: 0,
    frame: false,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: false
    }
  });
  geminiWin.loadURL('https://gemini.google.com');
  geminiWin.hide();

  const { ipcMain } = require('electron');
  ipcMain.on('toggle-chatgpt', () => {
    if (chatgptWin.isVisible()) chatgptWin.hide();
    else chatgptWin.show();
  });
  ipcMain.on('toggle-gemini', () => {
    if (geminiWin.isVisible()) geminiWin.hide();
    else geminiWin.show();
  });
}

app.whenReady().then(createMainWindow);
