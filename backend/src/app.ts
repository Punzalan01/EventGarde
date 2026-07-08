import './shared/types/request.types'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import { corsOptions } from './config/cors'
import { authRoutes } from './features/auth/auth.routes'
import { eventRoutes } from './features/events/event.routes'
import { errorMiddleware } from './shared/middleware/error.middleware'
import { issueCsrfToken } from './shared/middleware/csrf.middleware'

export const app = express()

app.use(helmet())
app.use(cors(corsOptions))
app.use(express.json({ limit: '1mb' }))
app.use(cookieParser())

app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok' })
})

app.get('/api/csrf-token', issueCsrfToken)

app.use('/api/auth', authRoutes)
app.use('/api/events', eventRoutes)

app.use(errorMiddleware)
