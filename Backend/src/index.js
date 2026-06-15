import dotenv from "dotenv"
dotenv.config();
import app from "./app.js"
import {connectToDatabase} from "./db/Database_Connection.js"

connectToDatabase().then(()=>{
    app.listen(process.env.PORT_NO,()=>{
        console.log(`🚀 Server is running on port ${process.env.PORT_NO}`);
    })
}).catch(error=>{
    console.error("Failed to connect to database. Server not started.", error); 
})