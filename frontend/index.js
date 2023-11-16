const { app, BrowserWindow, ipcMain } = require('electron');

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    mainWindow.loadURL(`http://localhost:3000/about`);

});

app.whenReady(() => {
    mainWindow.reload();
})





