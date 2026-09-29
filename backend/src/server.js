import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { env } from './config/env.js'
import { success } from './utils/response.js'
import { notFound, errorHandler } from './middleware/errorHandler.js'
import { db } from './config/db.js'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import addressRoutes from './routes/addressRoutes.js'
import userRoutes from './routes/userRoutes.js'

const app = express()

app.use(helmet())
app.use(cors({ origin: env.frontendUrl, credentials: true }))
app.use(express.json())
app.use(cookieParser()) 
app.use(morgan('dev'))

app.get('/api/health', (req, res) => success(res, null, 'API is running'))
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes) 
app.use('/api/categories', categoryRoutes)
app.use('/api/addresses', addressRoutes)
app.use('/api/users', userRoutes)


app.use(notFound)      // must come after all routes
app.use(errorHandler)  // must be last

db.raw('SELECT 1')
  .then(() => {
    console.log('MySQL connected')
    app.listen(env.port, () => console.log(`API running on http://localhost:${env.port}`))
  })
  .catch((err) => {
    console.error('MySQL connection failed:', err.message)
    process.exit(1)
  })