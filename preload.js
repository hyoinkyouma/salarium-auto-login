const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  runPy: (values) => ipcRenderer.send("run-py", values),
});
contextBridge.exposeInMainWorld("restart", {
  seppuku: () => ipcRenderer.send("seppukuMain"),
});
