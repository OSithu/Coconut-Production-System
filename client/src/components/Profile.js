import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditProfile = () => {
  const [cusName, setCusName] = useState('');
  const [cusEmail, setCusEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [cusLocation, setCusLocation] = useState('');
  const [username, setUsername] = useState('');

  const { username: cusUsername } = useParams();

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/cusID/${cusUsername}`);
        const userDetails = response.data.userDetails;
        setCusName(userDetails.cusName);
        setCusEmail(userDetails.cusEmail);
        setContactNumber(userDetails.contactNumber);
        setCusLocation(userDetails.cusLocation);
        setUsername(userDetails.username);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    getUserDetails();
  }, [cusUsername]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:8000/cusDetails/update/${cusUsername}`, {
        cusName,
        cusEmail,
        contactNumber,
        cusLocation
      });
      alert('Profile updated successfully');
      // Optionally, you can redirect the user or perform any other action here
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  return (
    <div className="container">
      <h2>Edit Profile</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="cusName">Customer Name</label>
          <input type="text" className="form-control" id="cusName" value={cusName} onChange={(e) => setCusName(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="cusEmail">Customer Email</label>
          <input type="email" className="form-control" id="cusEmail" value={cusEmail} onChange={(e) => setCusEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="contactNumber">Contact Number</label>
          <input type="text" className="form-control" id="contactNumber" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="cusLocation">Customer Location</label>
          <input type="text" className="form-control" id="cusLocation" value={cusLocation} onChange={(e) => setCusLocation(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfile;