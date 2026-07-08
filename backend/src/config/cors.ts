import type { CorsOptions } from 'cors'
import { env } from './env'

export const corsOptions: CorsOptions = {
  credentials: true,
  origin(origin, callback) {
    if (!origin || env.corsOrigins.includes(origin)) {
      callback(null, true)
      return
    }

    callback(new Error(`Origin ${origin} is not allowed by CORS.`))
  },
}
