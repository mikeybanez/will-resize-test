const { app, BrowserWindow } = require('electron');
const path = require('path');

app.whenReady().then(() => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    }
  });

  win.on('will-resize', (event, newBounds) => {
    const oldBounds = win.getBounds();
    win.webContents.send('resize-info', oldBounds, newBounds);
    console.log('-------- old vs new bounds:')
    console.log(oldBounds);
    console.log(newBounds);
  });

  win.loadFile('index.html');
});

app.on('window-all-closed', () => {
  app.quit();
});
