import express from "express";
import { usersRouter } from "./routes/users.routes.js";
import mongoose, { mongo } from "mongoose";

const port = 8080;
const app = express();

//middleware
app.use(express.json());

app.listen(port,()=>console.log(`Server ok`));

//conexion a la base de datos
try{
    //conexion
    await mongoose.connect("mongodb+srv://ianwade:coder@coderback.ka8uign.mongodb.net/?retryWrites=true&w=majority");
    console.log("base de datos conectada");
}catch(error){
    console.log(`Hubo un error al conectar la base de datos ${error.message}`);
}

//routes
app.use("/api/users",usersRouter);