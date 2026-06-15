import express from 'express';
import cors from "cors";
import cookieParser from "cookie-parser"
import UserRouter from "../src/router/User.route.js"
const app = express();

app.use(cors({
    origin:"*",
    creadentials:true,
}));
app.use(cookieParser());
app.use(express.json({limit:"10mb"}));
app.use(express.urlencoded({extended:true,limit:"10mb"}));
app.use(express.static("public"));


app.get("/",(req,res)=>{
    res.send("API is Working");
})

app.use("/api/v1/user",UserRouter)


export default app;