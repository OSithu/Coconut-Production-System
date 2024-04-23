//WelcomeScreen with image slide showw

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const WelcomeScreen = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [

  "./images/1.png",
  "./images/2.png",
  "./images/3.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App" style={styles.container}>
      
      <div style={styles.buttonContainer}>
        <Link to={`/login`} style={styles.link}>
          <button style={styles.button}>Sign In</button>
        </Link>

        <Link to={`/addCus`} style={styles.link}>
          <button style={styles.button}>Sign Up</button>
        </Link>
      </div>
      <h1>Welcome to coconut production!</h1>
      <img src={slides[currentSlide]} alt="Slideshow" style={styles.slide} />
      
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
  },
  slide: {
    width: "100%",
    maxHeight: "400px",
    objectFit: "cover",
    borderRadius: "5px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "right",
    marginTop: "20px",
  },
  button: {
    padding: "10px 20px",
    margin: "0 10px",
    fontSize: "16px",
    backgroundColor: "#006400",
    color: "#fff",
    borderRadius: "5px",
    cursor: "pointer",
    outline: "none",
    textDecoration: "none",
  },
  link: {
    textDecoration: "none",
  },
};

export default WelcomeScreen;