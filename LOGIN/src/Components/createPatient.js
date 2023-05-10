// Import Modules
import React, { useState } from "react";
import axios from "axios";
import PatientForm from "./PatientForm"; //form to reuse


// Create Patient Component

const CreatePatient = () => {
  const [formValues, setFormValues] = useState({
    id: "",
    name: "",
    lastname: "",
    email: "",
    password: "",
  });

  //When the button is clicked the data in formValues is sent to the server

  const onSubmit = (formValues) => {
    axios
      .post('https://helloimstitch.chickenkiller.com/api/patients/', formValues)
      .then((res) => {
        if (res.status === 200) alert("Patient successfully created");
        else Promise.reject();
      })
      .catch((err) => alert("Something went wrong"));
  };

  // Return student form
  return (
    <PatientForm
      initialValues={formValues}
      onSubmit={onSubmit}
      enableReinitialize
    >
      Create Patient
    </PatientForm>
  );
};

// Export CreateStudent Component
export default CreatePatient;
