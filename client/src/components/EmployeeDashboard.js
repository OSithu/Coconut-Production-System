import React, { useEffect, useState } from "react";
import axios from "axios";

const EmployeeeDashboard = () => {
 

  return (
    <div>
      
      <div className="header">
        <div>
         
          <ul className="navbar">
          <div className="nav-left">
          <li>
              <a class="active" href="/employeeDashboard">
                Home
              </a>
            </li>
            <li>
              <a href="/viewEmployee">Employee Details</a>
            </li>
            <li>
              <a href="/ViewTaskShedule">Work Schedule</a>
            </li>
           
          </div>
            <div className="logo">
              <img src="./images/logo.png" className="image"></img>
            </div>
            <div className="nav-right">
            <li>
              <a href="/filter">Departments</a>
            </li>
            <li>
              <a href="/salcal">Salary Calculator</a>
            </li>
            <li>
              <a href="/whcal">Work Hour</a>
            </li>
            </div>

          </ul>
        </div>
      </div>
      <br></br>
      <div className="container text-center">
        <h1 className="plantTopic"> Employee Management Dashboard </h1>
        &nbsp;&nbsp;
        <div className="row align-items-start">
          <div className="col">
            <div className="plantCard">
              <div className="plantCard-body">
                <h2 className="card-title">
                  8
                </h2>
                <h3 className="card-subtitle mb-2 text-body-secondary">
                  Departments
                </h3>
          
                <i class="fa fa-city" style={{ fontSize: "45px" }}></i>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="plantCard">
              <div className="plantCard-body">
                <h2 className="card-title">
                  20
                </h2>
                <h3 className="card-subtitle mb-2 text-body-secondary">
                  Employees
                </h3>
                <i class="fa fa-users" style={{ fontSize: "45px" }}></i>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="plantCard">
              <div className="plantCard-body">
                <h2 className="card-title">
                  10
                </h2>
                <h3 className="card-subtitle mb-2 text-body-secondary">
                  Task Shedules
                </h3>
                <i class="fa fa-clock" style={{ fontSize: "45px" }}></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      &nbsp; &nbsp;
      <div className="container text-center">
        <div className="row align-items-start">
          <div className="col" id="plantDiv">
            &nbsp;
            <h1 className="plantTopic"> Salary Calculator </h1>
            <br></br>
            <h5 className="card-subtitle mb-2 text-body-secondary">
              If You Want to Calculate Employee Salary
            </h5>
            <h5 className="card-subtitle mb-2 text-body-secondary">
              Use this Salary Calculator
            </h5>
            <br></br>
            <button className="btn btn-success">
              <a
                href="/salcal" 
                style={{ textDecoration: "none", color: "white" }}
              >
                <i class="fa fa-calculator"></i>&nbsp; Salary Calculator 
              </a>
            </button>
            <br></br>
            <img src="./images/pestfinder.png" alt="estateLayout" className='layoutImg' />
          </div>
          <div className="col" id="plantDiv">
            &nbsp;
            <h1 className="plantTopic"> Hours Calculator </h1>
            <br></br>
            <h5 className="card-subtitle mb-2 text-body-secondary">
              If You Want to Calculate Work Hours Calculator
            </h5>
            <h5 className="card-subtitle mb-2 text-body-secondary">
              Use this Work Hours Calculator
            </h5>
            <br></br>
            <button className="btn btn-success">
              <a
                href="/whcal" 
                style={{ textDecoration: "none", color: "white" }}
              >
                <i class="fa fa-calculator"></i>&nbsp; Work Hours Calculator 
              </a>
            </button>
            <br></br>
            <img src="./images/pestfinder.png" alt="estateLayout" className='layoutImg' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeeDashboard;
