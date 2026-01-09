const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('budgetTracker', {
  version: '1.0.0',
});
