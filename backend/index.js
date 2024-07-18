import express from "express";
import cors from 'cors';
import 'dotenv/config'



import { dbConnect } from "./config/dbConfig.js";

import userRoutes from "./routes/users.routes.js";
import { notFound, errorMiddleware } from "./middlewares/errors.middlewares.js";
import reservoirRoutes from './routes/reservoir.routes.js'




dbConnect()

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.json({ "message": "hello world!" }));

app.use("/api/users", userRoutes)
app.use("/api/reservoir", reservoirRoutes)



// errors
app.use(notFound);
app.use(errorMiddleware)

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("server running on port", PORT);
})



