import React, { useState } from "react";

import { Nav, Navbar, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// Import Components
import Login from "./Components/login.js";
import CreatePatient from "./Components/createPatient.js";
import EditPatient from "./Components/editPatient.js";
import PatientList from "./Components/listPatient.js";

// App Component
const App = () => {

  

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand>
                <Link to={"/patients"} className="nav-link">
                  SDH App - S.Vannesa
                </Link>
              </Navbar.Brand>

              <Nav className="justify-content-end">
                <Nav>
                  <Link to={"/create-patient"} className="nav-link">
                    Create Patient
                  </Link>
                </Nav>

                <Nav>
                  <Link to={"/patients"} className="nav-link">
                    Patient List
                  </Link>
                </Nav>
              </Nav>
            </Container>
          </Navbar>
        </header>

        <Container>
          <Row>
            <Col md={12}>
              <div className="wrapper">
                <Switch>
                  <Route exact path="/" component={Login} />
                  <Route path="/create-patient" component={CreatePatient} />
                  <Route path="/patients/:id" component={EditPatient} />
                  <Route path="/patients" component={PatientList} />
                </Switch>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Router>
  );
};

export default App;
