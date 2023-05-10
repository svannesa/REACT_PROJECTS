import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import PatientTableRow from "./PatientTableRow";

const PatientList = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    axios
      .get("https://helloimstitch.chickenkiller.com/api/patients/"
    )
      .then(({ data }) => {
        setPatients(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const DataTable = () => {
    return patients.map((res, i) => {
      return <PatientTableRow obj={res} key={i} />;
    });
  };

  return (
    <div className="table-wrapper">
      <h1>INFORMATION & MODIFICATION </h1>
      <h2>List of patients registered on the system</h2>
      <h3>If you need any changes please click on the buttons:</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{DataTable()}</tbody>
      </Table>
    </div>
  );
};

export default PatientList;
