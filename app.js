import 'dotenv/config'
import express from 'express'
import nodeCleanup from 'node-cleanup'
import routes from './routes.js'
import { init, cleanup } from './whatsapp.js'
import cors from 'cors'

const app = express()

const port = parseInt(process.env.PORT ?? 8000)

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/', routes)

// Initialize WhatsApp on startup
init()

// Export the Express app as a serverless function
export default (req, res) => {
    app(req, res)
}

// Cleanup on exit
nodeCleanup(cleanup)
