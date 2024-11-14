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
import GaussJordan from "./Components/Home";
import Cours from "./Components/Course";
import InverseCalculation from "./Components/InverseCalculation";
import Resolution from "./Components/Resolution";
import About from "./Components/about";
("./Components/About");
const App: React.FC = () => {
  const location = useLocation();
  const showNavbar = location.pathname !== "/";

  return (
    <div
      style={
        {
          /*backgroundImage:
      "url('https://img.freepik.com/vecteurs-libre/lignes-grille-horizontales-abstraites-dans-conception-graphique-style-graphique_1017-39918.jpg?t=st=1731108955~exp=1731112555~hmac=3688d5a73151a9e03927f0dc6312bc0b514edc490da6f9b83d93674794e74599&w=1060')"*/
        }
      }
    >
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<GaussJordan />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Cours />} />
        <Route path="/resolution" element={<Resolution />} />
        <Route path="/inverse" element={<InverseCalculation />} />
      </Routes>
    </div>
  );
};

export default App;
