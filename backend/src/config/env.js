import 'dotenv/config'

if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is missing in .env')

export const env = {
  port: process.env.PORT || 5000,
  frontendUrl: process.env.FRONTEND_URL,
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  isProd: process.env.NODE_ENV === 'production',
}