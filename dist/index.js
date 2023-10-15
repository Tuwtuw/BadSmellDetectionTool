"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const fs_1 = __importDefault(require("fs"));
const database_1 = require("./logic/database/database");
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    electron_1.app.quit();
}
const createWindow = () => {
    // Create the browser window.
    const mainWindow = new electron_1.BrowserWindow({
        height: 640,
        width: 1024,
        show: false,
        webPreferences: {
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
            sandbox: true,
        },
    });
    // mainWindow.menuBarVisible = false;
    // and load the index.html of the app.
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
    // Wait for content to finish loading before showing
    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.show();
        mainWindow.focus();
    });
};
// Event handler for asynchronous incoming messages
electron_1.ipcMain.handle('fetch-all-metric', () => {
    return (0, database_1.fetchAllMetrics)();
});
electron_1.ipcMain.handle('delete-metric', (_, metricId) => {
    return (0, database_1.deleteMetric)(metricId);
});
electron_1.ipcMain.handle('fetch-all-detection-strategy', () => {
    return (0, database_1.fetchAllDetectionStrategies)();
});
electron_1.ipcMain.handle('new-detection-strategy', (_, name, formula, description) => {
    return (0, database_1.insertDetectionStrategy)(name, formula, description);
});
electron_1.ipcMain.handle('delete-detection-strategy', (event, detectionStrategyId) => {
    return (0, database_1.deleteDetectionStrategy)(detectionStrategyId);
});
electron_1.ipcMain.handle('fetch-all-bad-smell', () => {
    return (0, database_1.fetchAllBadSmells)();
});
// If database doesn't exists, creates it with default values.
if (!fs_1.default.existsSync(electron_1.app.getPath('userData').concat('/data.db'))) {
    (0, database_1.firstTimeDatabaseInitialization)();
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_1.app.on('ready', createWindow);
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
electron_1.ipcMain.on('A', (event, args) => {
    // Send result back to renderer process
    // win.webContents.send('D', { success: true });
});
//# sourceMappingURL=index.js.map