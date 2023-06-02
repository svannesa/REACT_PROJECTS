import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";

export const Home = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("http://localhost:3001/patients");
        setPatients(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPatients();
  }, []);

  return (
    <div className="container">
      <h1 className="text-center">PATIENTS</h1>
      <table className="table table-bordered table-striped text-center">
        <thead>
          <tr>
            <th>NAME</th>
            <th>LAST NAME</th>
            <th>AGE</th>
            <th>GENDER</th>
            <th>CITY</th>
            <th>EMAIL</th>
            <th>IMAGE</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient._id}>
              <td>{patient.name}</td>
              <td>{patient.lastName}</td>
              <td>{patient.age}</td>
              <td>{patient.gender}</td>
              <td>{patient.city}</td>
              <td>{patient.email}</td>
              <td>
                <img src={patient.imageUrl} style={{ width: "200px", height: "200px" }} alt={patient.name} />
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
