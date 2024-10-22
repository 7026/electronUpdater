/*
 * @Author       : MrYu
 * @Date         : 2024-10-22 13:30:52
 * @LastEditors  : MrYu
 * @LastEditTime : 2024-10-22 13:30:53
 * @FilePath     : /updater/forge.config copy.js
 */
/*
 * @Author       : MrYu
 * @Date         : 2024-10-22 09:59:03
 * @LastEditors  : MrYu
 * @LastEditTime : 2024-10-22 13:25:17
 * @FilePath     : /updater/forge.config.cjs
 */
module.exports = {
  packagerConfig: {
    ignore: [
      /^\/src/,
      /(.eslintrc.json)|(.gitignore)|(electron.vite.config.ts)|(forge.config.cjs)|(tsconfig.*)/
    ]
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {}
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin']
    },
    {
      name: '@electron-forge/maker-deb',
      config: {}
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {}
    }
  ]
}
