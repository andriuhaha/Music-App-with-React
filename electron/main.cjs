const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // Load React app (dev server or production build)
  mainWindow.loadURL('http://localhost:5173'); // or use build file path for production

  // Register the IPC handler for 'get-file-path'
  ipcMain.handle('get-file-path', async () => {
    // Return the file path here
    // You can use a file dialog to let the user select a file if needed
    // For example, using dialog.showOpenDialog()
    return 'your-file-path-here'; // Return a valid file path (absolute path)
  });
});
