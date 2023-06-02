import express, { Router } from "express";
import { PatientsModel } from "../models/patients.js";


const router = express.Router();

//list all patients
router.get("/", async (req, res) => {
  try {
    const response = await PatientsModel.find({}); //bring all the data
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

//create new patients
router.post("/", async (req, res) => {
  const patient = new PatientsModel(req.body); // the const will have the structure of the body

  try {
    const response = await patient.save();
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

// update a patient by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const update = req.body;

  try {
    const response = await PatientsModel.findByIdAndUpdate(id, update, {
      new: true,
    });
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

// delete a patient by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const response = await PatientsModel.findByIdAndRemove(id);
    // console.log("Si lo borre");
    res.json(response);
  } catch (error) {
    //console.log("Algo esta mal");
    res.json(error);
  }
});

export { router as patientsRouter };
