import 'dotenv/config'
import express from 'express'
import nodeCleanup from 'node-cleanup'
import serverless from 'serverless-http'
import routes from '../src/routes.js'
import { init, cleanup } from '../src/whatsapp.js'
import cors from 'cors'
import { injectSpeedInsights } from '@vercel/speed-insights';

injectSpeedInsights();

const app = express()

const port = parseInt(process.env.PORT ?? 8000)

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/', routes)

// Initialize WhatsApp on startup
init()

// Cleanup on exit
nodeCleanup(cleanup)

const handler = serverless(app);
export { handler };
