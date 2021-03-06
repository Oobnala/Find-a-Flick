const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('antd', {
    libraryDirectory: 'es',
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '#1DA57A',
      '@layout-header-padding': '0 20px',
      '@modal-header-bg': '#001529',
      '@card-background': '#001529'
    }
  })
);
