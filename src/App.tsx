import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Components/navbar";
import Home from "./Components/Home";
import Cours from "./Components/Course";
import InverseCalculation from "./Components/InverseCalculation";
import Resolution from "./Components/Resolution";
import About from "./Components/about";
import MatrixInputFile from "./Components/MatrixInputFile";
("./Components/About");
const App: React.FC = () => {
  const location = useLocation();
  const showNavbar = location.pathname !== "/";

  return (
    <div
      style={{
        backgroundImage:
          "https://as1.ftcdn.net/v2/jpg/03/20/12/82/1000_F_320128207_3kmbM3S8YpVVMZTztpmmuPmKcqycZnIS.jpg",
      }}
    >
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Cours />} />
        <Route path="/resolution" element={<Resolution />} />
        <Route path="/inverse" element={<InverseCalculation />} />
        <Route path="/matrix-input-file" element={<MatrixInputFile />} />
      </Routes>
    </div>
  );
};

export default App;
