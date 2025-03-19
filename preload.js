// const { contextBridge, ipcRenderer } = require('electron');
import { contextBridge, ipcRenderer } from 'electron';

// 暴露 Node.js API 给渲染进程
contextBridge.exposeInMainWorld('electron', {
  fs: {
    readFile: (path) => ipcRenderer.invoke('read-file', path),
    writeFile: (path, data) => ipcRenderer.invoke('write-file', path, data),
  },
});
