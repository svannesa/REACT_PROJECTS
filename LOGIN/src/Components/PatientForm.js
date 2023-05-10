import React,{ useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, FormControl, Button } from "react-bootstrap";




const PatientForm = (props) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    lastname: Yup.string().required("Required"),
    email: Yup.string()
      .email("You have enter an invalid email address")
      .required("Required"),

      //Check the password strenght 
      password: Yup.string()
      .required("Required")
      .test(
        "password-strength",
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character",
        (value) => {
          const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])(?=.{8,})/;
          return regex.test(value);
        }
      ),
  });
  console.log(props);

  return (
    <div className="form-wrapper">
      <h1>INFORMATION & MODIFICATION </h1>
      <h2> Welcome to the Patients information website </h2>
      <h3>Please fill the following form:</h3>

      <Formik {...props} validationSchema={validationSchema}>
        <Form>
          <FormGroup>
            <label htmlFor="name">First Name</label>
            <Field name="name" type="text" className="form-control" placeholder=" Enter First Name" />
            <ErrorMessage
              name="name"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="name">Last Name</label>
            <Field name="lastname" type="text" className="form-control" placeholder=" Enter Last Name" />
            <ErrorMessage
              name="lastname"
              classLastName="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="email">Email</label>
            <Field name="email" type="text" className="form-control" placeholder="Enter email" />
            <ErrorMessage
              name="email"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="password">Password   </label >
            <Field name="password" type="password" className="form-control" placeholder="Enter a password" />
            <ErrorMessage
              name="password"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          <br></br>

          <Button variant="danger" size="lg" block="block" type="submit">
            {props.children}
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default PatientForm;
