import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const PatientTableRow = ({ obj }) => {
  const { id, name, lastname, email, password } = obj;

  const deletePatient = async () => {
    try {
      const res = await axios.delete(`https://helloimstitch.chickenkiller.com/api/patients/${id}`);
      if (res.status === 200) {
        alert("Patient successfully deleted");
        window.location.reload();
      } else {
        Promise.reject();
      }
    } catch (err) {
      alert("Something went wrong");
    }
  };

  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{lastname}</td>
      <td>{email}</td>
      <td>{password}</td>
      <td>
        <Link className="edit-link" to={`/patients/${id}`}>
          Edit
        </Link>
        <Button onClick={deletePatient} size="sm" variant="danger">
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default PatientTableRow;
