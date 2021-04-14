module.exports = {
  'apps' : [{
    script: 'app.js',
    name: 'api',
    watch: '.',
    ignore_watch: ["files"],
    env: {
      "NODE_ENV": "production"
    },
    env_production: {
      "NODE_ENV": 'production'
    }
  }],
  'deploy' : {
    'production' : {
      user : 'pm2',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
