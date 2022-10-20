import "reflect-metadata"
import "express-async-errors"
import express from "express"
import { handleErrorMiddleware } from "./middlewares/handleError.middleware"

import userRouter from "./routes/userRoutes"
import sessionRouter from "./routes/sessionRoutes"
import categoryRouter from "./routes/categoriesRoutes"
import propertiesRouter from "./routes/propertiesRouter"
import schedulesRouter from "./routes/schedulesRouter"



const app = express()
app.use(express.json())

app.use('/users', userRouter)
app.use('/login', sessionRouter)
app.use('/categories', categoryRouter)
app.use('/properties', propertiesRouter)
app.use('/schedules', schedulesRouter)

app.use(handleErrorMiddleware)

export default app