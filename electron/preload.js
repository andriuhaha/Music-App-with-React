const { contextBridge, ipcRenderer } = require('electron');

// Expose safe methods to the renderer process
contextBridge.exposeInMainWorld('electron', {
  getFilePath: () => ipcRenderer.invoke('get-file-path'),
});
