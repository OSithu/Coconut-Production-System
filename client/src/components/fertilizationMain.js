import React from 'react';
import "./fertilizationMain.css";
import Calculator from './Calculator';

function fertilizationMain() {
  return (
    <div>
      <div className="dashboard">
          <div className="summary-container">
              <div className="summary">
                  <h2>Sum Amount of Urea</h2>
                  <p className="summary-value" id="ureaAmount">0</p>
              </div>
          </div>
          <div className="summary-container">
              <div className="summary">
                  <h2>Sum Amount of Eppawalarockposphate</h2>
                  <p className="summary-value" id="eppawalaAmount">0</p>
              </div>
          </div>
          <div className="summary-container">
              <div className="summary">
                  <h2>Sum Amount of Dolamite</h2>
                  <p className="summary-value" id="dolamiteAmount">0</p>
              </div>
          </div>
          <div className="summary-container">
              <div className="summary">
                  <h2>Sum Amount of Muriate Of Potasium</h2>
                  <p className="summary-value" id="muriateAmount">0</p>
              </div>
          </div>
      </div>

      <div className="graph-container">
          <div className="graph">
              <h2>Graph</h2>
              {/* Graph content goes here */}
          </div>
      </div>
      <div className="dashboard">
      <div className="calcu">
                {/* Calculator component */}
                <Calculator />
            </div>
          <div className="todo-container">
              <div className="todo">
                  <h2>Sum Amount of Urea</h2>
              </div>
          </div>
          </div>
    </div>
  );
}

export default fertilizationMain;
