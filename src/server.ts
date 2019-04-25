import * as http from 'http'
import { app } from './app'

const port = process.env.PORT || 8000

const server = http.createServer(app)
server.listen(port)
