import "reflect-metadata"
import "express-async-errors"
import express from "express"
import { handleErrorMiddleware } from "./middlewares/handleError.middleware"
import userRouter from "./routes/userRoutes"



const app = express()
app.use(express.json())

app.use('', userRouter)
app.use(handleErrorMiddleware)

export default app