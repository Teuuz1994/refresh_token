import 'express-async-errors'
import express, { Request, Response, NextFunction } from 'express'
import colors from 'colors'

import routes from './routes'

const app = express()

app.use(express.json())
app.use(routes)
app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  return response.json({
    status: 'Error',
    message: error.message
  })
})

app.listen(
  3000,
  () => console.info(`[${colors.cyan('INFO')}] Server is running on port 3000`)
)