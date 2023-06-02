import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import {Auth} from "./pages/auth";
import { CreatePatient } from "./pages/createpat";
import { UpdatePat } from "./pages/upadtePat";
import { Navbar } from "./components/navbar";


function App() {
  return (
    <div className="App">
         
      <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createpat" element={<CreatePatient />} />
          <Route path="/updatePat" element={<UpdatePat />} />         
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;