import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DiseaseDashboard = () => {


    const [diseaseCount, setdiseaseCount] = useState([]);
    const [pesticidesCount, setpesticidesCount] = useState([]);
    const [infectionCount, setinfectionCount] = useState([]);
   
  
    useEffect(() => {
   
      const getDisease = async () => {
        await axios(`http://localhost:8000/diseaseCount`)
          .then((res) => {
            setdiseaseCount(res.data.count);
            console.log('Status : ' + res.data.success);
          })
          .catch((err) => {
            if (err.response) {
              console.log(err.response.data.error)
            }
          })
      };
      const getPesticides = async () => {
        await axios(`http://localhost:8000/pesticidesCount`)
          .then((res) => {
            setpesticidesCount(res.data.count);
            console.log('Status : ' + res.data.success);
          })
          .catch((err) => {
            if (err.response) {
              console.log(err.response.data.error)
            }
          })
      };

      const getInfection = async () => {
        await axios(`http://localhost:8000/infectionCount`)
          .then((res) => {
            setinfectionCount(res.data.count);
            console.log('Status : ' + res.data.success);
          })
          .catch((err) => {
            if (err.response) {
              console.log(err.response.data.error)
            }
          })
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
              <a href="#home">
                Home
              </a>
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
            <a class="active" href="/pestfinder">Pest Finder</a>
            </li>
            </div>

          </ul>
        </div>
      </div>
      <br></br>

      <div className="container text-center">
          <h1 className='plantTopic'> Disease Management Dashboard </h1>
          &nbsp;&nbsp;
          <div className="row align-items-start">
            <div className="col">
              <div className='plantCard'>
                <div className="plantCard-body">
                  <h2 className="card-title">{infectionCount !== null ? infectionCount : 'Loading...'}</h2>
                  <h3 className="card-subtitle mb-2 text-body-secondary">Infected Trees</h3>
                </div>
              </div>
            </div>
            <div className="col">
             
                <div className='plantCard'>
                  <div className="plantCard-body">
                    <h2 className="card-title">{diseaseCount !== null ? diseaseCount : 'Loading...'}</h2>
                    <h3 className="card-subtitle mb-2 text-body-secondary">Founded Disease</h3>
                  </div>
                </div>
            
            </div>
            <div className="col">
              <div className='plantCard'>
                <div className="plantCard-body">
                  <h2 className="card-title">{pesticidesCount !== null ? pesticidesCount : 'Loading...'}</h2>
                  <h3 className="card-subtitle mb-2 text-body-secondary">Pesticides Plans</h3>
                </div>
              </div>
            </div>
          </div>

        </div>

        &nbsp;
        &nbsp;

        <div className="container text-center">
          <div className="row align-items-start">
            <div className="col" id="plantDiv">
              &nbsp;
              <h1 className='plantTopic'> Pest Finder </h1>
            </div>
            <div className="col" id="plantDiv">
              &nbsp;
              <h1 className='plantTopic'> Calender </h1>
              &nbsp;
    
              &nbsp;
            </div>
          </div>
        </div>
     

    </div>
  );
};

export default DiseaseDashboard;