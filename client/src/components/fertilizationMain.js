import React from 'react';
import "./fertilizationMain.css";
import Calculator from './Calculator';
import FertilizationToDo from './fertilizationtodo';

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
              <a href="/FertilizersDetails">Fertilizers</a>
            </li>
            </div>

          </ul>
        </div>
      </div>
      <br></br>
      <h1 className='plantTopic'>Fertilization Dashboard</h1>
      <div className="f-dashboard">
      </div>

      <div className="f-graph-container">
          <div className="f-graph">
              <h2>Graph</h2>
              <fertilizationweather/>
          </div>
      </div>
      <div className="f-dashboard">
      <div className="fertilization-records-container">
                {/* Calculator component */}
                <Calculator />
            </div>
                  <FertilizationToDo/>
              
         
          </div>
    </div>
  );
}

export default fertilizationMain;
