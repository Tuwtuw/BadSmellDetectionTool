// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { ipcRenderer, contextBridge } from 'electron';

// Expose protected methods off of window (ie.
// window.api.sendToA) in order to use ipcRenderer
// without exposing the entire object
contextBridge.exposeInMainWorld('api', {
  database: {
    writeMetric: () => {},
  },
  sendToA: function () {
    ipcRenderer.send('A');
  },
  receiveFromD: function (func) {
    ipcRenderer.on('D', (event, ...args) => func(event, ...args));
  },
});
