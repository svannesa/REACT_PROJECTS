import express from "express";
import cors from "cors";
import mongoose from "mongoose"; // to use mongo db 
import {usersRouter} from "./routes/users.js"; // import users
import {patientsRouter} from "./routes/patients.js"; // import users



const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth",usersRouter);  //autorizacion para login 
app.use("/patients",patientsRouter);


mongoose.connect("mongodb+srv://svc96:MERNsdh123@patients.vy0iiyx.mongodb.net/patients?retryWrites=true&w=majority");


app.listen(3001, () => console.log("Server started port 3001"));
