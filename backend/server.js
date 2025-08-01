import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js' 
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'
import chatbotRouter from './routes/chatbotRoute.js'
import reviewRouter from './routes/reviewRoute.js'
//app config
const app=express()
const port=process.env.PORT || 4000
connectDB()
connectCloudinary()


//middlewares
app.use(express.json())
app.use(cors())


//api endpoints
app.use('/api/admin',adminRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)
app.use("/api/chatbot", chatbotRouter);
app.use('/api/review', reviewRouter);
//localhost-4000/api/admin/add-doctor

app.get('/',(req,res)=>{
    res.send('API WORKING great')
})


app.listen(port,()=>console.log("Server started",port))