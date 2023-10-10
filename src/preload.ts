// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { ipcRenderer, contextBridge } from 'electron';
import { Metric, DetectionStrategy, BadSmell } from './logic/types';

// Expose protected methods off of window (ie.
// window.api.sendToA) in order to use ipcRenderer
// without exposing the entire object

contextBridge.exposeInMainWorld('api', {
  database: {
    metric: {
      new: (metric: Metric) => {
        // Async message sender
        return ipcRenderer.invoke('new-metric', metric);
      },
      edit: (metricId: number, metric: Metric) => {
        // Async message sender
        return ipcRenderer.invoke('edit-metric', metricId, metric);
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
      new: (detectionStrategy: DetectionStrategy) => {
        // Async message sender
        return ipcRenderer.invoke('new-detection-strategy', detectionStrategy);
      },
      edit: (detectionStrategyId: number, detectionStrategy: DetectionStrategy) => {
        // Async message sender
        return ipcRenderer.invoke('edit-detection-strategy', detectionStrategyId, detectionStrategy);
      },
      delete: (detectionStrategyId: number) => {
        // Async message sender
        return ipcRenderer.invoke('delete-detection-strategy', detectionStrategyId);
      },
    },
    badSmell: {
      new: (badSmell: BadSmell) => {
        // Async message sender
        return ipcRenderer.invoke('new-bad-smell', badSmell);
      },
      edit: (badSmell: BadSmell) => {
        // Async message sender
        return ipcRenderer.invoke('edit-bad-smell', badSmell);
      },
      delete: (badSmell: BadSmell) => {
        // Async message sender
        return ipcRenderer.invoke('delete-bad-smell', badSmell);
      },
    },
  },
});
