const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

app.whenReady().then(() => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.on('will-resize', (event, newBounds) => {
    win.webContents.send('resize-info', newBounds);
  });

  win.loadFile('index.html');
});

app.on('window-all-closed', () => {
  app.quit();
});
