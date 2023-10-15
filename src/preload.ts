// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { ipcRenderer, contextBridge } from 'electron';

// Expose protected methods off of window (ie.
// window.api.sendToA) in order to use ipcRenderer
// without exposing the entire object

contextBridge.exposeInMainWorld('api', {
  database: {
    metric: {
      fetchAll: () => {
        return ipcRenderer.invoke('fetch-all-metric');
      },
      new: (name: string, type: string, min?: number, max?: number, description?: string) => {
        // Async message sender
        return ipcRenderer.invoke('new-metric', name, type, min, max, description);
      },
      edit: (metricId: number, name: string, type: string, min?: number, max?: number, description?: string) => {
        // Async message sender
        return ipcRenderer.invoke('edit-metric', metricId, name, type, min, max, description);
      },
      delete: (metricId: number) => {
        // Async message sender
        return ipcRenderer.invoke('delete-metric', metricId);
      },
    },
    detectionStrategy: {
      fetchAll: () => {
        return ipcRenderer.invoke('fetch-all-detection-strategy');
      },
      new: (name: string, formula: string, description?: string) => {
        // Async message sender
        return ipcRenderer.invoke('new-detection-strategy', name, formula, description);
      },
      edit: (detectionStrategyId: number, name: string, formula: string, description?: string) => {
        // Async message sender
        return ipcRenderer.invoke('edit-detection-strategy', detectionStrategyId, name, formula, description);
      },
      delete: (detectionStrategyId: number) => {
        // Async message sender
        return ipcRenderer.invoke('delete-detection-strategy', detectionStrategyId);
      },
    },
    badSmell: {
      fetchAll: () => {
        return ipcRenderer.invoke('fetch-all-bad-smell');
      },
      new: (name: string, scope: string, detectionStrategyId?: number, description?: string) => {
        // Async message sender
        return ipcRenderer.invoke('new-bad-smell', name, scope, detectionStrategyId, description);
      },
      edit: (badSmellId: number, name: string, scope: string, detectionStrategyId?: number, description?: string) => {
        // Async message sender
        return ipcRenderer.invoke('edit-bad-smell', badSmellId, name, scope, detectionStrategyId, description);
      },
      delete: (badSmellId: number) => {
        // Async message sender
        return ipcRenderer.invoke('delete-bad-smell', badSmellId);
      },
    },
  },
});
