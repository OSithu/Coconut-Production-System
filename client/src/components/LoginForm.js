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
          window.location.href = redirectTo;

        } catch (error) {
          console.error("Login failed");
        }
    };

    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    );
};

export default LoginForm;