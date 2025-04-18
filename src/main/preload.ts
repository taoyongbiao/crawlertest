import { contextBridge, ipcRenderer } from 'electron';

// 暴露 Node.js API 给渲染进程
contextBridge.exposeInMainWorld('electron', {
  fs: {
    readFile: (path: string) => ipcRenderer.invoke('read-file', path),
    writeFile: (path: string, data: string) => ipcRenderer.invoke('write-file', path, data),
  },
});
