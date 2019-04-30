import { createServer } from 'http'
import { app } from './app'
import { initDB } from './db'

const port = process.env.PORT || 8000

const callback = () => {
  // tslint:disable-next-line: no-console
  console.info(`Server running on port ${port}`)
}

async function startServer() {
  await initDB()
  return createServer(app).listen(port, callback)
}

export default startServer()
