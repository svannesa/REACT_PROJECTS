import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";


export const CreatePatient = () => {

  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);
  


  const [patient, setPatient] = useState({
    name: "",
    lastName: "",
    age: 0,
    gender: "",
    city: "",
    email: "",
    imageUrl: "",
    Createdby: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPatient({ ...patient, [name]: value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(
        "http://localhost:3001/patients",
        patient ,
        {
          headers: { authorization: cookies.access_token },
        }
      );
      alert("Patient Created Successfully!");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-patient">
      <h1>CREATE PATIENTS</h1>
      <h2 className="text-center" color="red">
        Please insert the following data
      </h2>

      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={patient.name}
            onChange={handleChange}
            
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="form-control"
            onChange={handleChange}
            value={patient.lastName}
          />
        </div>

        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            className="form-control"
            onChange={handleChange}
            value={patient.age}
          />
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <input
            type="text"
            id="gender"
            name="gender"
            className="form-control"
            onChange={handleChange}
            value={patient.gender}
          />
        </div>

        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            className="form-control"
            onChange={handleChange}
            value={patient.city}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            className="form-control"
            onChange={handleChange}
            value={patient.email}
          />
        </div>

        <div className="form-group">
          <label htmlFor="imageUrl">ImageUrl:</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            className="form-control"
            onChange={handleChange}
            value={patient.imageUrl}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          CREATE
        </button>
      </form>
    </div>
  );
};