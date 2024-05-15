import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PlantationNav from './PlantationNav';
import { useReactToPrint } from 'react-to-print';
import '../stylesheets/plantation.css';

const ViewHarvest = () => {
  const [harvestDetails, setHarvestDetails] = useState([]);
  const [searchHarvest, setSearchTrees] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const componentPDF = useRef();

  const formatDate = (date) => {
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  useEffect(() => {

    setCurrentDate(formatDate(new Date()));

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

  //search
  const filterHarvest = harvestDetails.filter(harvest =>
    harvest.date.includes(searchHarvest)
  )

  const generateReport = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "title"
    //onAfterPrint: ()=> alert("report saved")
  })

  return (

    <div >
      <div className='plantHeader'>
        <PlantationNav />
        &nbsp;
        <div className='plantSearch'>
          <form class="d-flex" role="search">
            <input type="date"
              className='form-control me-2'
              placeholder='search'
              value={searchHarvest}
              onChange={(e) => setSearchTrees(e.target.value)} />
            <button class="btn btn-success" type="submit" ><i class="fa-solid fa-magnifying-glass"></i></button>
          </form>
        </div>
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
        <button type="button" className="btn btn-success" onClick={generateReport} id='plantButton'>
          <i class="fa-regular fa-file-pdf"></i>&nbsp; Generate Report
        </button>
        &nbsp;
        <div ref={componentPDF} >
          <div className="print-header" style={{ display: "none" }}>
            <img src="/images/logo.png" className='imageReport2' />
            <h5> Jayakody Koppara Stores </h5>
            <hr />
            <h1 className='plantTopic'> Harvest Details </h1>
          </div>
          <div className='plantReport2'>
            <table className="table" id='plantTable'>
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Total Harvest</th>
                  <th scope="col">Block Name</th>
                  <th scope="col">Harvest</th>
                  <th className='actionCol'></th>
                </tr>
              </thead>
              <tbody>
                {filterHarvest.map((harvest, index) => (
                  <tr key={index}>
                    {index === 0 || harvest.date !== harvestDetails[index - 1].date ? (
                      <td rowSpan={harvestDetails.filter((h) => h.date === harvest.date).length}>{harvest.date}</td>
                    ) : null}
                    {index === 0 || harvest.date !== harvestDetails[index - 1].date ? (
                      <td rowSpan={harvestDetails.filter((h) => h.date === harvest.date).length}>{calculateTotal(harvest.date)}</td>
                    ) : null}
                    <td>{harvest.blockName}</td>
                    <td>{harvest.harvest}</td>
                    <td className='actionCol'>
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
            <div className="plantPrint-footer" style={{ display: "none" }}>
          <hr />
          <p>Report Generated on {currentDate} </p>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewHarvest;


