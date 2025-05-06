const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  onResize: (callback) => ipcRenderer.on('resize-info', (event, data) => callback(data))
});
