const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); //to hash the passwords


const patients = [
  {
    id: "1",
    name: "Vanne",
    lastname: "Cifuentes",
    email: "vcifuentes@gmail.com",
    password: "123456",
  },
];

const users = [
  { username: "vcifuentes@gmail.com", password: '$2a$12$wW2MRk415WK7S2d9zKdwW.QTu86y5BPx4hfgJoIdte4PpYrya7xv2' },
  // password: contraseña
];

const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(bodyParser.json());

app.use(cors(corsOptions));

app.get("/patients", (req, res) => {
  res.json(patients);
});

app.get("/patients/:id", (req, res) => {
  const id = req.params.id;   
  const patient = patients.find((p) => p.id === id);
  if (patient) {
    res.json(patient);
  } else {
    res.status(404).send("Patient not found");
  }
});

app.post("/patients", (req, res) => {
  const patient = req.body;
  patient.id = Math.floor(Math.random() * 100000).toString();
  patients.push(patient);
  res.json(patient);
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.put("/patients/:id", (req, res) => {
  const id = req.params.id;
  const index = patients.findIndex((p) => p.id === id);
  if (index !== -1) {
    patients[index] = { ...patients[index], ...req.body };
    res.json(patients[index]);
  } else {
    res.status(404).send("Patient not found");
  }
});

app.delete("/patients/:id", (req, res) => {
  const id = req.params.id;
  const index = patients.findIndex((p) => p.id === id);
  if (index !== -1) {
    patients.splice(index, 1);
    res.json({ message: "Patient deleted" });
  } else {
    res.status(404).send("Patient not found");
  }
});

//LOGIN

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((user) => user.username === username);
  console.log(user);

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      const SECRET_KEY = req.body.secret_key;
   

      if (passwordMatch) {
        const token = jwt.sign({ username }, SECRET_KEY);
        console.log("Succesful");
        res.json({ token, message: "Login successful" });
      } else {
              res.status(401).send("Invalid credentials");
      }
    } else {
      res.status(401).send("Invalid credentials");
    }
  });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("Server running on port 4000");
});
