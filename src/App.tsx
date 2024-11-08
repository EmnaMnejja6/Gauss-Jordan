import React, { useState } from "react";
import Cours from "./Components/Course";
import InverseCalculation from "./Components/InverseCalculation";
import MatrixInput from "./Components/MatrixInput";
import Navbar from "./Components/Navbar";
import GaussJordan from "./Components/GaussJordan";

const App: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<string>("");

  // Handle navigation and update the selected section
  const handleSelect = (section: string) => {
    setSelectedSection(section);
  };

  return (
    <div className="container-fluid">
      <Navbar onSelect={handleSelect} selectedSection={selectedSection} />

      {/* Main Content Area */}
      <div
        style={{
          marginTop: "63px",
          backgroundColor: "yellow",
          minHeight: "100vh",
          minWidth: "100vh",
        }}
        className="container-fluid "
      >
        {/* Dynamic content rendering based on selection */}
        {selectedSection === "cours" && <Cours />}
        {selectedSection === "resolution" && <MatrixInput />}
        {selectedSection === "inverse" && <InverseCalculation />}
        {selectedSection === "home" && <GaussJordan></GaussJordan>}
      </div>
    </div>
  );
};

export default App;
