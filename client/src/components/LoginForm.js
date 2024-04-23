import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
          const response = await axios.post("/login", { username, password });
          console.log(response.data); // Logged in user
          const { redirectTo } = response.data;
          window.location.href = redirectTo;

        } catch (error) {
          console.error("Login failed");
        }
    };

    return (
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>
      </form>
    );
};

const styles = {
  form: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '400px',
    margin: 'auto',
    padding: '28px',
    border: '1.5px solid #fff',
    borderRadius: '5px',
    boxShadow: '0 10px 5px rgba(0,0,0,0.2)',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '6px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#006400',
    color: '#fff',
    cursor: 'pointer',
  },
};

export default LoginForm;
