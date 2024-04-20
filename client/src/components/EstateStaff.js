import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import PlantationNav from './PlantationNav';

const EstateStaff = () => {
    const [estStaff, setEstStaff] = useState([]);

    useEffect(() => {
        const getestStaff = async () => {
            await axios(`http://localhost:8000/estStaff`)
                .then((res) => {
                    setEstStaff(res.data.existingStaff);
                    console.log('Status : ' + res.data.success);
                })
                .catch((err) => {
                    if (err.response) {
                        console.log(err.response.data.error)
                    }
                })



        };
        getestStaff();
    }, []);

    

    return (
        <div className='plantBody'>
      <PlantationNav />
      &nbsp;
      <h1 className='plantTopic'> Estate Staff Details </h1>
            &nbsp;

            <table className="table" id='plantTable'>
                <thead>
                    <tr>
                        <th scope = "col">Name</th>
                        <th scope = "col">Job Title</th>
                        <th scope = "col">Contact Number</th>
                        <th scope = "col">Email</th>                    
                    </tr>
                </thead>
                <tbody>
          {estStaff.map((staff, index) => (
            <tr key={index}>
              <td>{staff.fullName}</td> 
              <td>{staff.jobTitle}</td>
              <td>{staff.contactNumber}</td>
              <td>{staff.contactEmail}</td>
              
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    );
};

export default EstateStaff;


