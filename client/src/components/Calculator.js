import React, { useState } from "react";
import "./Calculator.css";

function Calculator() {
  const [zone, setZone] = useState("dry");
  const [age, setAge] = useState(0);
  const [urea, setUrea] = useState(0);
  const [phosphate, setPhosphate] = useState(0);
  const [muriate, setMuriate] = useState(0);
  const [dolomite, setDolomite] = useState(0);

  const calculateFertilizers = () => {
    let ureaAmount = 0;
    let phosphateAmount = 0;
    let muriateAmount = 0;
    let dolomiteAmount = 0;

    if (age > 48) {
      if (zone === "wet") {
        ureaAmount = 3300.0 * (8 / 33);
        phosphateAmount = 3300.0 * (9 / 33);
        muriateAmount = 3300.0 * (16 / 33);
      } else {
        ureaAmount = 2800.0 * (8 / 28);
        phosphateAmount = 2800.0 * (4 / 28);
        muriateAmount = 2800.0 * (16 / 28);
      }
    } else if (age=== 6) {
      if (zone === "wet") {
        ureaAmount = 800.0 * (2 / 8.5);
        phosphateAmount = 800.0 * (4.5 / 8.5);
        muriateAmount = 800.0 * (2 / 8.5);
      } else {
        ureaAmount = 540.0 * (1 / 3);
        phosphateAmount = 540.0 * (1 / 3);
        muriateAmount = 540.0 * (1 / 3);
      }
    } else if (age=== 12||age===18) {
        if (zone === "wet") {
          ureaAmount = 1000.0 * (2 / 8.5);
          phosphateAmount = 1000.0 * (4.5 / 8.5);
          muriateAmount = 1000.0 * (2 / 8.5);
        } else {
          ureaAmount = 670.0 * (1 / 3);
          phosphateAmount = 670.0 * (1 / 3);
          muriateAmount = 670.0 * (1 / 3);
        }
    } else if (age=== 24||age===30) {
        if (zone === "wet") {
          ureaAmount = 1300.0 * (2 / 8.5);
          phosphateAmount = 1300.0 * (4.5 / 8.5);
          muriateAmount = 1300.0 * (2 / 8.5);
        } else {
          ureaAmount = 905.0 * (1 / 3);
          phosphateAmount = 905.0 * (1 / 3);
          muriateAmount = 905.0 * (1 / 3);
        }
    } else if (age===36||age===42) {
        if (zone === "wet") {
          ureaAmount = 1600.0 * (2 / 8.5);
          phosphateAmount = 1600.0 * (4.5 / 8.5);
          muriateAmount = 1600.0 * (2 / 8.5);
        } else {
          ureaAmount = 1110.0 * (1 / 3);
          phosphateAmount = 1110.0 * (1 / 3);
          muriateAmount = 1110.0 * (1 / 3);
        }
    } else if (age=== 48) {
        if (zone === "wet") {
          ureaAmount = 2000.0 * (2 / 8.5);
          phosphateAmount = 2000.0 * (4.5 / 8.5);
          muriateAmount = 2000.0 * (2 / 8.5);
        } else {
          ureaAmount = 1340.0 * (1 / 3);
          phosphateAmount = 1340.0 * (1 / 3);
          muriateAmount = 1340.0 * (1 / 3);
        }
    } else if(age===0) {
      if (zone === "wet") {
        ureaAmount = 1250.0 * (1 / 5);
        phosphateAmount = 1250.0 * (3 / 5);
        muriateAmount = 1250.0 * (1 / 5);
      } else {
        ureaAmount = 850.0 * (5 / 17);
        phosphateAmount = 850.0 * (7 / 17);
        muriateAmount = 850.0 * (5 / 17);
      }
    }


    if (age === 0) {
      dolomiteAmount = 1000;
    } else if (6<=age<=48) {
      dolomiteAmount = 500;
    } else {
      dolomiteAmount = 1000;
    }

     // Rounding to two decimal places
     ureaAmount = parseFloat(ureaAmount.toFixed(2));
     phosphateAmount = parseFloat(phosphateAmount.toFixed(2));
     muriateAmount = parseFloat(muriateAmount.toFixed(2));

    setUrea(ureaAmount);
    setPhosphate(phosphateAmount);
    setMuriate(muriateAmount);
    setDolomite(dolomiteAmount);
  };

  const handleZoneChange = (selectedZone) => {
    setZone(selectedZone);
    calculateFertilizers();
  };

  const handleAgeChange = (event) => {
    const newAge = parseInt(event.target.value);
    setAge(newAge);
    calculateFertilizers();
  };

  const handleEnterKey = (event) => {
    if (event.key === "Enter") {
      calculateFertilizers();
    }
  };

  const handleCalculateClick = () => {
    calculateFertilizers();
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
        <label htmlFor="age">Tree's Age (months/years):<br></br><label className="age-message">**if newly planted,select 0 months</label></label>
        <select
          id="age"
          value={age}
          onChange={handleAgeChange}
        >
          <option value="0">0 months</option>
          <option value="6">6 months</option>
          <option value="12">12 months(1year)</option>
          <option value="18">18 months(1year&6months)</option>
          <option value="24">24 months(2year)</option>
          <option value="30">30 months(2year&6months)</option>
          <option value="36">36 months(3year)</option>
          <option value="42">42 months(3year&6months)</option>
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
      <p>Muriate Of Potasium: <span>{muriate}g</span></p>
      <p>Dolomite: <span>{dolomite}g</span></p>
    </div>
      </div>
    </div>
    </div>
  );
}

export default Calculator;