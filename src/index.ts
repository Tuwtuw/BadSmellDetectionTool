import { app, BrowserWindow, ipcMain } from 'electron';
import fs from 'fs';
import {
  fetchAllMetrics,
  fetchAllDetectionStrategies,
  firstTimeDatabaseInitialization,
  insertMetric,
  deleteDetectionStrategy,
  deleteMetric,
  fetchAllBadSmells,
  insertDetectionStrategy,
  editMetric,
  editDetectionStrategy,
  insertBadSmell,
  deleteBadSmell,
  editBadSmell,
} from './logic/database/database';

// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
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

// Setting up Event Handlers

// Metric Event Handlers
ipcMain.handle('fetch-all-metric', () => {
  return fetchAllMetrics();
});

ipcMain.handle('new-metric', (_, name, type, min, max, description) => {
  return insertMetric(name, type, min, max, description);
});

ipcMain.handle('edit-metric', (_, metricId, name, type, min, max, description) => {
  return editMetric(metricId, name, type, min, max, description);
});

ipcMain.handle('delete-metric', (_, metricId) => {
  return deleteMetric(metricId);
});

// Detection Strategy event handlers
ipcMain.handle('fetch-all-detection-strategy', () => {
  return fetchAllDetectionStrategies();
});

ipcMain.handle('new-detection-strategy', (_, name, formula, description) => {
  return insertDetectionStrategy(name, formula, description);
});

ipcMain.handle('edit-detection-strategy', (_, detectionStrategyId, name, formula, description) => {
  return editDetectionStrategy(detectionStrategyId, name, formula, description);
});

ipcMain.handle('delete-detection-strategy', (_, detectionStrategyId) => {
  return deleteDetectionStrategy(detectionStrategyId);
});

// Bad Smell Event Handlers

ipcMain.handle('fetch-all-bad-smell', () => {
  return fetchAllBadSmells();
});

ipcMain.handle('new-bad-smell', (_, name, scope, detectionStrategyId, description) => {
  return insertBadSmell(name, scope, detectionStrategyId, description);
});

ipcMain.handle('edit-bad-smell', (_, badSmellId, name, scope, detectionStrategyId, description) => {
  return editBadSmell(badSmellId, name, scope, detectionStrategyId, description);
});

ipcMain.handle('delete-bad-smell', (_, badSmellId) => {
  return deleteBadSmell(badSmellId);
});

// If database doesn't exists, creates it with default values.
if (!fs.existsSync(app.getPath('userData').concat('/data.db'))) {
  firstTimeDatabaseInitialization();
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
