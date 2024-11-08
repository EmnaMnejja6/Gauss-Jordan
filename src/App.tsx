import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Navbar from "./Components/navbar";
import GaussJordan from "./Components/Home";
import Cours from "./Components/Course";
import InverseCalculation from "./Components/InverseCalculation";
import MatrixInput from "./Components/SystemResolution";

const App: React.FC = () => {
  const location = useLocation();
  const showNavbar = location.pathname !== "/";

  return (
    <div>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<GaussJordan />} />
        <Route path="/courses" element={<Cours />} />
        <Route path="/resolution" element={<MatrixInput />} />
        <Route path="/inverse" element={<InverseCalculation />} />
      </Routes>
    </div>
  );
};

export default App;
