import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PlantationNav from './PlantationNav';
import '../stylesheets/plantation.css';

const ViewHarvest = () => {
  const [harvestDetails, setHarvestDetails] = useState([]);
  //const [searchHarvest, setSearchHarvest] = useState('');

  useEffect(() => {
    const getAllHarvest = async () => {
      await axios(`http://localhost:8000/harvest`)
        .then((res) => {
          setHarvestDetails(res.data.existingHarvest);
          console.log('Status : ' + res.data.success);
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data.error)
          }
        })
    };
    getAllHarvest();
  }, []);

  //search
  // const filteredHarvest = harvestDetails.filter(harvest =>
  //   harvest.blockName.toLowerCase().includes(searchHarvest.toLowerCase())
  // )

  // Function to calculate total harvest for each date
  const calculateTotal = (date) => {
    let total = 0;
    harvestDetails.forEach((harvest) => {
      if (harvest.date === date) {
        total += harvest.harvest;
      }
    });
    return total;
  };

  const handleDelete = async (id) => {

    try {
      const confirm = window.confirm('Are you sure you want to delete?');

      if (confirm) {
        await axios.delete(`http://localhost:8000/harvest/delete/${id}`)
          .then((res) => {
            alert(res.data.message);
            console.log(res.data.message);
            setHarvestDetails(harvestDetails.filter(harvest => harvest._id !== id));
          })
          .catch((err) => {
            if (err.response) {
              console.log(err.response.data.message);
            } else {
              console.log("Error occured while processing your axios delete");
            }
          })
      } else {
        alert('Deletion Cancel');
      }
    }
    catch (err) {
      console.log('HandleDelete function failed ! Error' + err.message);
    }
  }

  return (

    <div >
      <div className='plantHeader'>
        <PlantationNav />
        &nbsp;

        {/* <div className='plantSearch'>
          <div className='input-group'>
            <input type="text"
              className='form-control'
              placeholder='search by block name'
              value={searchHarvest}
              onChange={(e) => setSearchHarvest(e.target.value)} />
            <button class="btn btn-success" type="submit" >Search</button>
          </div>
        </div> */}
      </div>
      <div className='plantBody'>
        &nbsp;

        <h1 className='plantTopic'> Harvest Details </h1>
        &nbsp;
        <Link to={`/addHarvest`}>
          <button type="button" className="btn btn-success" id='plantButton'>
            <i className="fa-solid fa-plus"></i>&nbsp;
            Add New Record
          </button>
        </Link>
        &nbsp;
        <table className="table" id='plantTable'>
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Total Harvest</th>
              <th scope="col">Block Name</th>
              <th scope="col">Harvest</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {harvestDetails.map((harvest, index) => (
              <tr key={index}>
                {index === 0 || harvest.date !== harvestDetails[index - 1].date ? (
                  <td rowSpan={harvestDetails.filter((h) => h.date === harvest.date).length}>{harvest.date}</td>
                ) : null}
                {index === 0 || harvest.date !== harvestDetails[index - 1].date ? (
                  <td rowSpan={harvestDetails.filter((h) => h.date === harvest.date).length}>{calculateTotal(harvest.date)}</td>
                ) : null}
                <td>{harvest.blockName}</td>
                <td>{harvest.harvest}</td>
                <td>
                  <Link to={`/editHarvest/${harvest._id}`}>
                    <button type="button" className="btn btn-warning">
                      <i className='fas fa-edit'></i>&nbsp; Edit
                    </button>
                  </Link>
                  &nbsp;
                  <button type="button" className='btn btn-danger' onClick={() => handleDelete(harvest._id)}>
                    <i className='far fa-trash-alt'></i>&nbsp;Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewHarvest;


