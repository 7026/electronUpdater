/*
 * @Author       : MrYu
 * @Date         : 2024-10-22 09:59:03
 * @LastEditors  : MrYu
 * @LastEditTime : 2024-10-22 14:39:15
 * @FilePath     : /updater/forge.config.js
 */
module.exports = {
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'MrYu',
          name: 'electronUpdater'
        },
        prerelease: false,
        draft: true
      }
    }
  ],
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
