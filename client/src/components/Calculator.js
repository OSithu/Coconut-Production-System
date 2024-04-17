import React, { useState } from "react";

function Calculator() {
  const [zone, setZone] = useState("dry");
  const [age, setAge] = useState(0);
  const [urea, setUrea] = useState(0);
  const [phosphate, setPhosphate] = useState(0);
  const [muriate, setMuriate] = useState(0);
  const [dolomite, setDolomite] = useState(0);

  const calculateFertilizers = () => {
    // Calculation logic
  };

  return (
    <div className="calculator">
      <div className="inputs">
        <label htmlFor="zone">Select Zone:</label>
        <select
          id="zone"
          value={zone}
          onChange={(e) => handleZoneChange(e.target.value)}
        >
          <option value="dry">Dry Zone</option>
          <option value="wet">Wet Zone</option>
        </select>
        <label htmlFor="age">Tree's Age (months/years):</label>
        <select
          id="age"
          value={age}
          onChange={handleAgeChange}
        >
          <option value="6">6 months</option>
          <option value="12">12 months(1year)</option>
          <option value="18">18 months(1year-6months)</option>
          <option value="24">24 months(2year)</option>
          <option value="30">30 months(2year-6months)</option>
          <option value="36">36 months(3year)</option>
          <option value="42">42 months(3year-6months)</option>
          <option value="48">48 months(4year)</option>
          <option value="50">more than 4years</option>
        </select>
        <button onClick={handleCalculateClick}>Calculate</button>
      </div>
      <div className="results">
        <h2>Fertilizer Amounts:</h2>
        <div className="amounts">
        <div>
      <p>Urea: <span>{urea}g</span></p>
      <p>EppawalaRock Phosphate: <span>{phosphate}g</span></p>
      <p>MuriateOf Potasium: <span>{muriate}g</span></p>
      <p>Dolomite: <span>{dolomite}g</span></p>
    </div>
      </div>
    </div>
    </div>
  );
}

export default Calculator;
