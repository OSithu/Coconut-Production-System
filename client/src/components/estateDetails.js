import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import PlantationNav from './PlantationNav';

const EstateDetails = () => {

  const [allBlocks, setAllBlocks] = useState([]);
  const [treeCount, setTreeCount] = useState([]);

  useEffect(() => {
    const getAllBlocks = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/blocks`);
        const formattedBlocks = res.data.existingBlocks.map(block => ({
          ...block,
          area: `${block.area.value} ${block.area.unit}` // Combine area value and unit
        }));
        setAllBlocks(formattedBlocks);
        console.log('Status : ' + res.data.success);
      } catch (err) {
        if (err.response) {
          console.log(err.response.data.error);
        }
      }
    };

    const getTreeCount = async () => {
      await axios(`http://localhost:8000/treeCount`)
        .then((res) => {
          setTreeCount(res.data.count);
          console.log('Status : ' + res.data.success);
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data.error)
          }
        })



    };
    
    getTreeCount();
    getAllBlocks();
  }, []);


  return (
    <div>
      <PlantationNav />
      &nbsp;
      <div className="container text-center">
        <h2> Estate Details </h2>
        <div className="row align-items-start">
          <div className="col">
            <ul className="list-group list-group-flush">
              <li className="list-group-item"> Area : 5 acres </li>
              <li className="list-group-item"> Tree Count : {treeCount !== null ? treeCount : 'Loading...'} </li>              
              <li className="list-group-item"> Block Count : 5 </li>
            </ul>
          </div>
          <div className="col">
            Google Map
          </div>
        </div>

      </div>
      <div className="container text-center">
        <div className="row align-items-start">
          <div className="col">
            &nbsp;
            <h2> Estate Layout </h2>
            {/* <img src = "C:\Users\user\OneDrive\Documents\images\estateLayout.png"/> */}
          </div>
          <div className="col">
            &nbsp;
            <h2> Block Details </h2>
            &nbsp;
            <table className="table">
              <thead>
                <tr>
                  <th scope="col"> Block Name </th>
                  <th scope="col"> Area </th>
                </tr>
              </thead>
              <tbody>
                {allBlocks.map(blocks => (
                  <tr>
                    <td> {blocks.blockName} </td>
                    <td> {blocks.area}</td>
                    <td>
                      <Link to={`/viewBlock/${blocks._id}`}>
                        <button type="button" className="btn btn-success">
                          <i className="fa-regular fa-eye"></i>&nbsp;View
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button type="button" class="btn btn-success">
              <a href="/addBlock" style={{ textDecoration: "none", color: 'white' }}>
                <i className="fa-solid fa-plus"></i>&nbsp;
                Add New Record
              </a>
            </button>
          </div>

        </div>

      </div>
    </div>
  )

}

export default EstateDetails;