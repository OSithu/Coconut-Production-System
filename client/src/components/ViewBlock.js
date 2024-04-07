import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewBlock = (props) => {
  const [record, setRecord] = useState(null);
  const { id } = props; // Get id directly from props

  useEffect(() => {
    axios.get(`https://localhost:8000/blocks/${id}`)
      .then(response => {
        setRecord(response.data);
      })
      .catch(error => {
        console.error('Error fetching record:', error);
      });
  }, [id]);

  if (!record) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Record Details</h2>
      <p>Name: {record.blockName}</p>
      <p>Area: {record.area}</p>
      <p>Count: {record.treeCount}</p>
      <p>Date: {record.lastHarvested}</p>
      {/* Add more fields as needed */}
    </div>
  );
};

export default ViewBlock;
