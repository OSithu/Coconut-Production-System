import React, { useState } from 'react';
import axios from 'axios';

const PestFinder = () => {
  const [disease, setDisease] = useState('');
  const [pesticides, setPesticides] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`http://localhost:8000/pestcides/find/${disease}`);
      setPesticides(response.data.pestcides);
      setError('');
    } catch (err) {
      setPesticides([]);
      setError(err.response.data.message);
    }
  };

    // Add a unit to quantity 
    const getUnit = (pestType) => {
        return pestType === 'Liquid Formulations' ? 'ml' : 'g';
      };

  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    heading: {
      textAlign: 'center',
      color: '#333',
      marginBottom: '20px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '20px',
    },
    input: {
      padding: '10px',
      fontSize: '16px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      marginBottom: '10px',
      width: '300px',
    },
    button: {
      padding: '10px 20px',
      fontSize: '16px',
      backgroundColor: '#4caf50',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    error: {
      color: '#ff0000',
      marginBottom: '20px',
    },
    pesticide: {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      marginBottom: '20px',
    },
  };

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
    <div style={styles.container}>
      <h2 style={styles.heading}>Pest Finder</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div>
          <label htmlFor="disease">Disease Name: &nbsp; </label>
          <input
            type="text"
            id="disease"
            value={disease}
            onChange={(e) => setDisease(e.target.value)}
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>
          Find
        </button>
      </form>
      {error && <p style={styles.error}>{error}</p>}
      {pesticides.length > 0 && (
        <div>
          <h3 style={styles.heading}>Pesticides:</h3>
          <ul>
            {pesticides.map((pesticide) => (
              <li key={pesticide._id} style={styles.pesticide}>
                <p><b>Pesticide Name: </b>{pesticide.pestName}</p>
                <p><b>Disease:</b> {pesticide.disease}</p>
                <p><b>Pesticide Type:</b> {pesticide.pestType}</p>
                <p><b>Quantity:</b> {pesticide.quantity + " " + getUnit(pesticide.pestType)}</p>
                <p><b>Application Method: </b>{pesticide.method}</p>
                <p><b>Guidelines:</b> {pesticide.guidelines}</p>
                <p><b>Precautions:</b> {pesticide.precautions}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </div>
  );
};

export default PestFinder;