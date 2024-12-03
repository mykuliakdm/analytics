import path from 'path'
import dotenv from 'dotenv'
import { beforeRun } from './mongodb'

dotenv.config({
  path: path.resolve(process.cwd(), `.env.testing`),
})

export default (on) => {
  on('before:run', async () => {
    await beforeRun()
  })
}
