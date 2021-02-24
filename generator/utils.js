const fs = require('fs')

module.exports = api => {
  return {
    updateEslint(callback) {
      let config, configPath
      const rcPath = api.resolve('./.eslintrc.js')
      const pkgPath = api.resolve('./package.json')
      if (fs.existsSync(rcPath)) {
        configPath = rcPath
        config = callback(require(rcPath))
      } else if (fs.existsSync(pkgPath)) {
        configPath = pkgPath
        config = JSON.parse(fs.readFileSync(pkgPath, { encoding: 'utf8' }))
        config.babel = callback(config.eslint || {})
      }
      if (configPath) {
        const moduleExports = configPath !== pkgPath ? 'module.exports = ' : ''
        fs.writeFileSync(
          configPath,
          `${moduleExports}${JSON.stringify(config, null, 2)}`,
          { encoding: 'utf8' }
        )
      }
    }
  }
}