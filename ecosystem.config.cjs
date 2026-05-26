module.exports = {
  apps: [
    {
      name: "onenet-staging",
      script: ".next/standalone/server.js",
      // cwd is resolved to an absolute path by deploy-staging.sh at deploy time
      cwd: process.env.DEPLOY_CWD || __dirname,
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "300M",
      env_production: {
        NODE_ENV: "production",
        PORT: "3001",
        HOSTNAME: "127.0.0.1",
        NEXT_TELEMETRY_DISABLED: "1",
      },
      error_file: "logs/pm2/onenet-staging-error.log",
      out_file: "logs/pm2/onenet-staging-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      merge_logs: true,
    },
  ],
};
