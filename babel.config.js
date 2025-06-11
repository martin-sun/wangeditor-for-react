module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-react', { runtime: 'automatic' }],
    ['@babel/preset-typescript', { 
      allowDeclareFields: true,
      onlyRemoveTypeImports: true 
    }],
  ],
  plugins: [
    // 确保 @babel/plugin-transform-typescript 先执行
    ['@babel/plugin-transform-typescript', {
      allowDeclareFields: true,
      onlyRemoveTypeImports: true
    }],
    // 其他插件
    '@babel/plugin-transform-class-properties',
    '@babel/plugin-transform-object-rest-spread',
    ['@babel/plugin-transform-runtime', {
      regenerator: true
    }],
  ],
};
