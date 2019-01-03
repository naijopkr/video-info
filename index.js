const { app, BrowserWindow, ipcMain } = require('electron')
const ffmpeg = require('fluent-ffmpeg')

let mainWindow

app.on('ready', () => {
  mainWindow = new BrowserWindow({ 
    width: 800, 
    height: 600,
    webPreferences: {
      nodeIntegration: true
    } 
  })
  mainWindow.loadFile(`index.html`)

  app.on('closed', () => {
    mainWindow = null
  })
})

ipcMain.on('video:submit', (event, path) => {
  ffmpeg.ffprobe(path, (err, metadata) => {
    mainWindow.webContents.send(
      'video:metadata', 
      metadata.format.duration
    )
  })
})