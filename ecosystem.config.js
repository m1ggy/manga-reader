module.exports = {
  apps: [
    {
      name: 'reader-ui',
      script: 'npx',
      args: 'serve -s dist -p 3000',
      watch: false,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
}
