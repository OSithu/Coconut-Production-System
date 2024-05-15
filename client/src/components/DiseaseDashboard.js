import React, { useEffect, useState } from "react";
import axios from "axios";

const DiseaseDashboard = () => {
  const [diseaseCount, setdiseaseCount] = useState([]);
  const [pesticidesCount, setpesticidesCount] = useState([]);
  const [infectionCount, setinfectionCount] = useState([]);

  useEffect(() => {
    const getDisease = async () => {
      await axios(`http://localhost:8000/diseaseCount`)
        .then((res) => {
          setdiseaseCount(res.data.count);
          console.log("Status : " + res.data.success);
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data.error);
          }
        });
    };
    const getPesticides = async () => {
      await axios(`http://localhost:8000/pesticidesCount`)
        .then((res) => {
          setpesticidesCount(res.data.count);
          console.log("Status : " + res.data.success);
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data.error);
          }
        });
    };

    const getInfection = async () => {
      await axios(`http://localhost:8000/infectionCount`)
        .then((res) => {
          setinfectionCount(res.data.count);
          console.log("Status : " + res.data.success);
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data.error);
          }
        });
    };

    getDisease();
    getPesticides();
    getInfection();
  }, []);

  return (
    <div>
      <div className="header">
        <div>
          <ul className="navbar">
            <div className="nav-left">
              <li>
                <a href="/diseaseDashboard">Home</a>
              </li>
              <li>
                <a href="/viewDisease">Spread Records</a>
              </li>
              <li>
                <a href="/viewPestRecords">Pest Records</a>
              </li>
            </div>
            <div className="logo">
              <img src="./images/logo.png" className="image"></img>
            </div>
            <div className="nav-right">
              <li>
                <a href="/displayDiseases">Diseases</a>
              </li>
              <li>
                <a href="/displayPesticides">Pesticides</a>
              </li>
              <li>
                <a class="active" href="/pestfinder">
                  Pest Finder
                </a>
              </li>
            </div>
          </ul>
        </div>
      </div>
      <br></br>
      <div className="container text-center">
        <h1 className="plantTopic"> Disease Management Dashboard </h1>
        &nbsp;&nbsp;
        <div className="row align-items-start">
          <div className="col">
            <div className="plantCard">
              <div className="plantCard-body">
                <h2 className="card-title">
                  {infectionCount !== null ? infectionCount : "Loading..."}
                </h2>
                <h3 className="card-subtitle mb-2 text-body-secondary">
                  Infected Trees
                </h3>
          
                <i class="fa fa-tree" style={{ fontSize: "45px" }}></i>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="plantCard">
              <div className="plantCard-body">
                <h2 className="card-title">
                  {diseaseCount !== null ? diseaseCount : "Loading..."}
                </h2>
                <h3 className="card-subtitle mb-2 text-body-secondary">
                  Founded Disease
                </h3>
                <i class="fa fa-bug" style={{ fontSize: "45px" }}></i>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="plantCard">
              <div className="plantCard-body">
                <h2 className="card-title">
                  {pesticidesCount !== null ? pesticidesCount : "Loading..."}
                </h2>
                <h3 className="card-subtitle mb-2 text-body-secondary">
                  Pesticides Plans
                </h3>
                <i class="fa fa-medkit" style={{ fontSize: "45px" }}></i>
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
            <h1 className="plantTopic"> Pest Finder </h1>
            <br></br>
            <h5 className="card-subtitle mb-2 text-body-secondary">
              If You Don't Know About Pesticide Plans
            </h5>
            <h5 className="card-subtitle mb-2 text-body-secondary">
              Use this Pest Finder
            </h5>
            <br></br>
            <button className="btn btn-success">
              <a
                href="/pestfinder" 
                style={{ textDecoration: "none", color: "white" }}
              >
                <i class="fa fa-search"></i>&nbsp; Pest Finder
              </a>
            </button>
            <br></br>
            <img src="./images/pestfinder.png" alt="estateLayout" className='layoutImg' />
          </div>
          <div className="col" id="plantDiv">
            &nbsp;
            <h1 className="plantTopic"> Records Management </h1>
            <br></br>
            <h5 className="card-subtitle mb-2 text-body-secondary">
              If You Observe a Disease Spread
            </h5>
            <br></br>
            <button className="btn btn-success">
              <a
                href="/createDisease" 
                style={{ textDecoration: "none", color: "white" }}
              >
                <i class="fa fa-plus"></i>&nbsp; Add Spread
              </a>
            </button>
            <br></br>
            <br></br>
            <h5 className="card-subtitle mb-2 text-body-secondary">
              If You Add a Pesticides to Infected Tree
            </h5>
            <br></br>
            <button className="btn btn-success">
              <a
                href="/createPestRecords" 
                style={{ textDecoration: "none", color: "white" }}
              >
                <i class="fa fa-plus"></i>&nbsp; Add Record
              </a>
            </button>
            <br></br>
            <br></br>
            <h5 className="card-subtitle mb-2 text-body-secondary">
              If You Find a New Disease In Plantation
            </h5>
            <br></br>
            <button className="btn btn-success">
              <a
                href="/addDisease" 
                style={{ textDecoration: "none", color: "white" }}
              >
                <i class="fa fa-plus"></i>&nbsp; Add Disease
              </a>
            </button>
            <br></br>
            <br></br>
            <h5 className="card-subtitle mb-2 text-body-secondary">
              If You Make a New Pesticide Plan
            </h5>
            <br></br>
            <button className="btn btn-success">
              <a
                href="/addPesticides" 
                style={{ textDecoration: "none", color: "white" }}
              >
                <i class="fa fa-plus"></i>&nbsp; Add Pesticide
              </a>
            </button>
            <br></br>
 
            
            
            &nbsp; &nbsp;
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseaseDashboard;
