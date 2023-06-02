import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { useCookies } from "react-cookie";

export const UpdatePat = () => {
  const [patients, setPatients] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/patients`);
        setPatients(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPatients();
  }, []);

  const handleUpdate = (patientId) => {
    setIsUpdating(true);
    const selected = patients.find((patient) => patient._id === patientId);
    setSelectedPatient(selected);
  };

//Delete
  const handleDelete = async (patientId) => {
    try {
      await axios.delete(`http://localhost:3001/patients/${patientId}`);
      alert("Patient Deleted Successfully!");
      // Refresh the patient list
      const response = await axios.get(`http://localhost:3001/patients`);
      setPatients(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  //UPTADE
  const handleFormSubmit = async (updatedPatient) => {
    try {
      const response = await axios.put(`http://localhost:3001/patients/${updatedPatient._id}`, updatedPatient);
      alert("Patient Updated Successfully!");
      // Refresh 
      const updatedPatients = patients.map((patient) => {
        if (patient._id === response.data._id) {
          return response.data;
        }
        return patient;
      });
      setPatients(updatedPatients);
      setIsUpdating(false);
      setSelectedPatient(null);
    } catch (error) {
      console.error(error);
    }
  };

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
            <th>MODIFICATIONS</th>
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
              <td>
                {isUpdating && selectedPatient && selectedPatient._id === patient._id ? (
                  <UpdateForm patient={selectedPatient} onSubmit={handleFormSubmit} />
                ) : (
                  <>
                    <button className="btn btn-primary" onClick={() => handleUpdate(patient._id)}>
                      Update
                    </button>
                    <button className="btn btn-danger" onClick={() => handleDelete(patient._id)}>
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const UpdateForm = ({ patient, onSubmit }) => {
  const [updatedPatient, setUpdatedPatient] = useState(patient);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdatedPatient({ ...updatedPatient, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(updatedPatient);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" className="form-control" onChange={handleChange} value={updatedPatient.name} />
      </div>

      <div className="form-group">
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          className="form-control"
          onChange={handleChange}
          value={updatedPatient.lastName}
        />
      </div>

      <div className="form-group">
        <label htmlFor="age">Age:</label>
        <input type="number" id="age" name="age" className="form-control" onChange={handleChange} value={updatedPatient.age} />
      </div>

      <div className="form-group">
        <label htmlFor="gender">Gender:</label>
        <input
          type="text"
          id="gender"
          name="gender"
          className="form-control"
          onChange={handleChange}
          value={updatedPatient.gender}
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
          value={updatedPatient.city}
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
          value={updatedPatient.email}
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
          value={updatedPatient.imageUrl}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Update
      </button>
    </form>
  );
};
