import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
dotenv.config();
import userRoutes from "./routes/user.route.js"
import blogRoutes from "./routes/blog.route.js"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express();
// Increase payload size to allow base64 image uploads from the frontend
app.use(express.json({ limit: '500mb' }))
app.use(express.urlencoded({ extended: true, limit: '500mb' }))
app.use(cookieParser())
const allowedOrigins = [process.env.CLIENT_URL || "http://localhost:5173", "http://localhost:5174"]

app.use(cors({
   origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true)
      if (allowedOrigins.indexOf(origin) !== -1) {
         callback(null, true)
      } else {
         callback(new Error('Not allowed by CORS'))
      }
   },
   credentials: true,
}))

// Databse connection 

connectDB();

const PORT = process.env.PORT || 8000;

// Routes

app.use("/api/v1/user", userRoutes)
app.use("/api/v1/blog", blogRoutes)
 app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`)
 })