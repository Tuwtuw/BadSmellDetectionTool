"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const electron_1 = require("electron");
// Expose protected methods off of window (ie.
// window.api.sendToA) in order to use ipcRenderer
// without exposing the entire object
electron_1.contextBridge.exposeInMainWorld('api', {
    database: {
        metric: {
            fetchAll: () => {
                return electron_1.ipcRenderer.invoke('fetch-all-metric');
            },
            new: (name, type, min, max, description) => {
                // Async message sender
                return electron_1.ipcRenderer.invoke('new-metric', name, type, min, max, description);
            },
            edit: (metricId, metric) => {
                // Async message sender
                return electron_1.ipcRenderer.invoke('edit-metric', metricId, metric);
            },
            delete: (metricId) => {
                // Async message sender
                return electron_1.ipcRenderer.invoke('delete-metric', metricId);
            },
        },
        detectionStrategy: {
            fetchAll: () => {
                return electron_1.ipcRenderer.invoke('fetch-all-detection-strategy');
            },
            new: (name, formula, description) => {
                // Async message sender
                return electron_1.ipcRenderer.invoke('new-detection-strategy', name, formula, description);
            },
            edit: (detectionStrategyId, detectionStrategy) => {
                // Async message sender
                return electron_1.ipcRenderer.invoke('edit-detection-strategy', detectionStrategyId, detectionStrategy);
            },
            delete: (detectionStrategyId) => {
                // Async message sender
                return electron_1.ipcRenderer.invoke('delete-detection-strategy', detectionStrategyId);
            },
        },
        badSmell: {
            fetchAll: () => {
                return electron_1.ipcRenderer.invoke('fetch-all-bad-smell');
            },
            new: (badSmell) => {
                // Async message sender
                return electron_1.ipcRenderer.invoke('new-bad-smell', badSmell);
            },
            edit: (badSmell) => {
                // Async message sender
                return electron_1.ipcRenderer.invoke('edit-bad-smell', badSmell);
            },
            delete: (badSmell) => {
                // Async message sender
                return electron_1.ipcRenderer.invoke('delete-bad-smell', badSmell);
            },
        },
    },
});
//# sourceMappingURL=preload.js.map