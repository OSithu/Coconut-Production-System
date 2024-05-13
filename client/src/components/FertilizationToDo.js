import React, { useState } from 'react';

function FertilizationToDo() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, { text: inputValue, completed: false }]);
      setInputValue('');
    }
  };

  const handleDeleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const handleToggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const handleClearCompleted = () => {
    const newTodos = todos.filter(todo => !todo.completed);
    setTodos(newTodos);
  };

  const handleClearAll = () => {
    setTodos([]);
  };

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f5f9', 
      padding: '20px', 
      borderRadius: '10px', 
      maxWidth: '700px', 
      margin: 'auto',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' // Add box shadow for depth
    }}>
      <h1 style={{ 
        color: '#4CAF50', 
        textDecoration: 'underline',
        marginBottom: '20px',
        fontSize: '2rem' // Increase font size for header
      }}>To-Do List</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter your to-do"
        style={{ 
          padding: '15px', // Increase padding for input
          marginBottom: '20px', 
          borderRadius: '8px', 
          border: 'none', 
          width: '100%',
          fontSize: '1.2rem' // Increase font size for input
        }}
      />
      <button onClick={handleAddTodo} style={{ 
        padding: '15px 30px', // Increase padding for button
        borderRadius: '8px', 
        backgroundColor: '#4CAF50', 
        color: 'white', 
        border: 'none', 
        cursor: 'pointer', 
        fontSize: '1.2rem', // Increase font size for button
        marginRight: '10px' 
      }}>Add</button>
      <button onClick={handleClearCompleted} style={{ 
        padding: '15px 30px', 
        borderRadius: '8px', 
        backgroundColor: '#f44336', 
        color: 'white', 
        border: 'none', 
        cursor: 'pointer', 
        fontSize: '1.2rem', 
        marginRight: '10px' 
      }}>Clear Completed</button>
      <button onClick={handleClearAll} style={{ 
        padding: '15px 30px', 
        borderRadius: '8px', 
        backgroundColor: '#607D8B', // Blue-gray color for clear all button
        color: 'white', 
        border: 'none', 
        cursor: 'pointer', 
        fontSize: '1.2rem', 
        marginRight: '10px' 
      }}>Clear All</button>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map((todo, index) => (
          <li key={index} style={{ 
            marginBottom: '20px', 
            padding: '20px', 
            borderRadius: '8px', 
            backgroundColor: todo.completed ? '#d4edd9' : '#fff', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center' 
          }}>
            <span style={{ 
              textDecoration: todo.completed ? 'line-through' : 'none',
              fontSize: '1.2rem' // Increase font size for todo item text
            }}>{todo.text}</span>
            <div>
              <button onClick={() => handleToggleTodo(index)} style={{ 
                padding: '10px 20px', 
                borderRadius: '8px', 
                backgroundColor: '#4CAF50', 
                color: 'white', 
                border: 'none', 
                cursor: 'pointer',
                fontSize: '1.2rem',
                marginRight: '5px'
              }}>{todo.completed ? 'Undo' : 'Complete'}</button>
              <button onClick={() => handleDeleteTodo(index)} style={{ 
                padding: '10px 20px', 
                borderRadius: '8px', 
                backgroundColor: '#f44336', 
                color: 'white', 
                border: 'none', 
                cursor: 'pointer',
                fontSize: '1.2rem'
              }}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FertilizationToDo;
