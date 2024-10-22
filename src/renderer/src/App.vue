<!--
 * @Author       : MrYu
 * @Date         : 2024-10-21 09:15:40
 * @LastEditors  : MrYu
 * @LastEditTime : 2024-10-22 10:38:25
 * @FilePath     : /updater/src/renderer/src/App.vue
-->
<script setup lang="ts">
import Versions from './components/Versions.vue'

import config from '../../../package.json'

const ipcHandle = () => window.electron.ipcRenderer.send('ping')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const versions = config.version

</script>

<template>
  <img alt="logo" class="logo" src="./assets/electron.svg" />
  <div class="creator">Powered by electron-vite</div>
  <div class="text">
    Build an Electron app with
    <span class="vue">Vue</span>
    and
    <span class="ts">TypeScript</span>
  </div>
  <p class="tip">Please try pressing <code>F12</code> to open the devTool</p>
  <div class="actions">
    <div class="action">
      <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">Documentation</a>
    </div>
    <div class="action">
      <a target="_blank" rel="noreferrer" @click="ipcHandle">Send IPC</a>
    </div>
  </div>
  <h1 style="color: cyan">V{{ versions }}</h1>
  <Versions />
</template>
