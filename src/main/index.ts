/**               Static Typing
 * @Author       : MrYu
 * @Date         : 2024-10-21 09:15:40
 * @LastEditors  : MrYu
 * @LastEditTime : 2024-10-22 11:17:41
 * @FilePath     : /updater/src/main/index.ts
 */
import {
  app,
  shell,
  BrowserWindow,
  ipcMain,
  autoUpdater,
  FeedURLOptions,
  Notification
} from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
// require('update-electron-app')()
// import update from 'update-electron-app'
// update.updateElectronApp()
function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()
  new Notification({ title: 'option.title', body: 'option.body' }).show()
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  const server = 'https://update.electronjs.org'
  const feed =
    `${server}/OWNER/REPO/${process.platform}-${process.arch}/${app.getVersion()}` as unknown
  const option = {
    title: '温馨提示',
    body: '不要天天坐在电脑前，要注意休息！查询更新状态中'
  }

  autoUpdater.setFeedURL(feed as FeedURLOptions)
  setInterval(
    () => {
      try {
        console.log(123)
        new Notification({ title: option.title, body: option.body }).show()
        autoUpdater.checkForUpdates()
      } catch (e) {
        console.log(e)
      }
    },
    10 * 1000
    // 10 * 60 * 1000
  )
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
