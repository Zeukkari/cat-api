import { createServer } from 'http';
import { initDB } from './db'
import { app } from './app'


export const server = (async () => {
  initDB()
  const port = process.env.PORT || 8000;

  createServer(app)
    .listen(
      port,
      () => console.info(`Server running on port ${port}`)
    );
})()

export default server