import React from 'react';
import "./fertilizationMain.css";
import Calculator from './Calculator';

function fertilizationMain() {
  return (
    <div>
        <div className="header">
        <div>
         
          <ul className="navbar">
          <div className="nav-left">
          <li>
              <a class="active" href="#">
                Home
              </a>
            </li>
            <li>
              <a href="/viewFertilization">Fertilization Records</a>
            </li>
            
          </div>
            <div className="logo">
              <img src="./images/logo.png" className="image"></img>
            </div>
            <div className="nav-right">
            <li>
              <a href="#news">Fertilizers</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            </div>

          </ul>
        </div>
      </div>
      <br></br>
      <h1 className='plantTopic'>Fertilization Dashboard</h1>
      <div className="f-dashboard">
          <div className="f-summary-container">
              <div className="f-summary">
                  <h2>Sum Amount of Urea</h2>
                  <p className="f-summary-value" id="ureaAmount">0</p>
              </div>
          </div>
          <div className="f-summary-container">
              <div className="f-summary">
                  <h2>Sum Amount of Eppawalarockposphate</h2>
                  <p className="f-summary-value" id="eppawalaAmount">0</p>
              </div>
          </div>
          <div className="f-summary-container">
              <div className="f-summary">
                  <h2>Sum Amount of Dolamite</h2>
                  <p className="f-summary-value" id="dolamiteAmount">0</p>
              </div>
          </div>
          <div className="f-summary-container">
              <div className="f-summary">
                  <h2>Sum Amount of Muriate Of Potasium</h2>
                  <p className="f-summary-value" id="muriateAmount">0</p>
              </div>
          </div>
      </div>

      <div className="f-graph-container">
          <div className="f-graph">
              <h2>Graph</h2>
              {/* Graph content goes here */}
          </div>
      </div>
      <div className="f-dashboard">
      <div className="f-calcu">
                {/* Calculator component */}
                <Calculator />
            </div>
          <div className="f-todo-container">
              <div className="f-todo">
                  <h2></h2>
              </div>
          </div>
          </div>
    </div>
  );
}

export default fertilizationMain;
