import React, { useState } from "react";
import Cours from "./Components/Course";
import InverseCalculation from "./Components/InverseCalculation";
import MatrixInput from "./Components/MatrixInput";
import GaussJordan from "./Components/GaussJordan";
import Navbar from "./Components/navbar";

const App: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<string>("");

  // Handle navigation and update the selected section
  const handleSelect = (section: string) => {
    setSelectedSection(section);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Navbar onSelect={handleSelect} selectedSection={selectedSection} />

      {/* Main Content Area */}
      <div
        style={{
          backgroundColor: "#f8f9fa",
          flex: 1,
          display: "flex", // Make the main area a flex container
          justifyContent: "center", // Center the content horizontally
          alignItems: "center", // Center the content vertically
          overflow: "auto",
          marginRight: "0",
          paddingLeft: "650px", // Ensure content doesn't overflow
        }}
      >
        {/* Dynamic content rendering based on selection */}
        {selectedSection === "cours" && <Cours />}
        {selectedSection === "resolution" && <MatrixInput />}
        {selectedSection === "inverse" && <InverseCalculation />}
        {selectedSection === "home" && <GaussJordan />}
      </div>
    </div>
  );
};

export default App;
