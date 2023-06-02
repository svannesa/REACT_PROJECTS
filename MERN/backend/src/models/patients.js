import mongoose from "mongoose";

const  patientSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
  
    lastName:{
        type: String,
        required:true,
    },
    age:{
        type: Number,
        required:true,
    },
    gender:{
        type: String,
        required:true,
    },

    city:{
        type: String,
        required:true,
    },

    email:{
        type: String,
        required:true,
    },
    imageUrl:{
        type: String,
        required:true,
    },
    Createdby:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },

});
export const PatientsModel = mongoose.model("patients", patientSchema);