module.exports = function(api, opts, rootOptions) {
  api.render({
    './src/constants/enums.ts': './template/src/constants/enums.ts',
    './src/constants/config.ts': './template/src/constants/config.ts',
  })
}