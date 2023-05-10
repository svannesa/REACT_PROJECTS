// EditStudent Component for update student data

// Import Modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import PatientForm from "./PatientForm";

// EditStudent Component
const EditPatient = (props) => {
  const [formValues, setFormValues] = useState({
    id: "",
    name: "",
    lastname: "",
    email: "",
    password: "",
  });

  //onSubmit handler
  const onSubmit = (patientObject) => {
    axios
      .put(
        "https://helloimstitch.chickenkiller.com/api/patients/" +
          props.match.params.id,
        patientObject
      )
      .then((res) => {
        if (res.status === 200) {
          alert("Patient successfully updated");
          props.history.push("/patients");
        } else Promise.reject();
      })
      .catch((err) => alert("Something went wrong"));
  };

  // Load data from server and reinitialize student form

  useEffect(() => {
    axios
      .get(
        "https://helloimstitch.chickenkiller.com/api/update-patient/" +
          props.match.params.id
      )
      .then((res) => {
        const { id, name, lastname, email, password } = res.data;
        setFormValues({ id, name, lastname, email, password });
      })
      .catch((err) => console.log(err));
  }, []);

  // Return student form
  return (
    <PatientForm
      initialValues={formValues}
      onSubmit={onSubmit}
      enableReinitialize
    >
      Update Patient
    </PatientForm>
  );
};

// Export EditStudent Component
export default EditPatient;
