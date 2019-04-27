import { createServer } from 'http';
import { app } from './app'
import { initDB } from './db'

const server = (async () => {
  await initDB()
  const port = process.env.PORT || 8000;

  createServer(app)
    .listen(
      port,
      // tslint:disable-next-line: no-console
      () => console.info(`Server running on port ${port}`)
    );
})

export default server()