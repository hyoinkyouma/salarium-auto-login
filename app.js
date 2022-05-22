const electron = require("electron");
const url = require("url");
const path = require("path");
const { handleTimeInOut, killPy } = require("./python/runpy");

const { app, BrowserWindow, Menu, ipcMain } = electron;

//SET ENV
process.env.NODE_ENV = "production";

let mainWindow;

//handler for python call
const pyReady = async (e, values) => {
  const timein = values[0];
  const timeout = values[1];
  const result = await handleTimeInOut(timein, timeout);
  console.log(result);
};
//handler for cancel/restart button
const seppuku = (e) => {
  killPy();
};

// listen for app to be ready
app.on("ready", function () {
  //create new window
  //ipc
  ipcMain.on("run-py", pyReady);
  ipcMain.on("seppukuMain", seppuku);

  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "./preload.js"),
    },
    title: "Salarium Scheduler",
    resizable: false,
  });
  //load html file into window
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "/assets/main.html"),
      protocol: "file:",
      slashes: true,
    })
  );

  //quit when window closed
  mainWindow.on("closed", () => app.quit());
  //build menu
  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  //insert
  Menu.setApplicationMenu(mainMenu);
});

//remove menu when out of focus

//mainMenu
const menuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "Reload",
        role: "reload",
      },
      { label: "Exit", role: "quit" },
    ],
  },
];
