import { env } from './src/config/env.js'

export default {
  client: 'mysql2',
  connection: {
    host: env.db.host,
    port: env.db.port,
    user: env.db.user,
    password: env.db.password,
    database: env.db.name,
  },
  migrations: { directory: './src/db/migrations' },
  seeds: { directory: './src/db/seeds' },
}