// Modules to control application life and create native browser window
const {app, BrowserWindow, Tray, nativeImage, ipcMain, Menu, nativeTheme, globalShortcut} = require('electron')
const path = require('path');
const isDev = require('electron-is-dev');

let tray, window


function createWindow () {
  nativeTheme.themeSource = 'dark'; // darkmode
  // Create the browser window.
  window = new BrowserWindow({
    minWidth: 800,
    minHeight: 600,
    show: false,
    frame: false,
    transparent: false,
    resizable: true,
    icon: path.join(__dirname, 'icon.jpg'),
   // skipTaskbar: true,
    webPreferences: {
       nodeIntegration: true,
       contextIsolation: false,
       enableRemoteModule: true,
    }
  })

  window.on('closed', () => window = null)

  
  window.loadURL(
    isDev 
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
    )

  ipcMain.on('closeApp', () =>{
    console.log('closed');
    window.hide();
  })

  ipcMain.on('maxApp', () =>{
    window.maximize();
  })

  ipcMain.on('restore', () =>{
    window.restore();
  })

  ipcMain.on('minApp', () =>{
    window.minimize();
    console.log('minimize')
  })


  // Open the DevTools.
  window.webContents.openDevTools()
}

const createTray = () => {
  if(tray == null)
  {
    const icon = path.join(__dirname, 'icon.jpg');
    const nImage = nativeImage.createFromPath(icon);
    const template = [
      {
        label: 'Quit',
        role: 'quit',
        accelerator: 'Ctrl+Q'
      }
    ]
    const ctxMenu = Menu.buildFromTemplate(template);

    tray = new Tray(nImage);
    tray.on('click', (event) => {
      toggleWindow();
    })

    tray.setContextMenu(ctxMenu);
    tray.setToolTip('Dashboard');
  }
}

const toggleWindow = () => {
  window.isVisible() ? window.hide() : window.show();
}



// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createTray();
  createWindow();

  globalShortcut.register('CommandOrControl+Q', () => {
    window.close();
  })

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })


})



// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.



