import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import PlantationNav from './PlantationNav';

const EstateDetails = () => {

  const [allBlocks, setAllBlocks] = useState([]);
  const [treeCount, setTreeCount] = useState([]);
  const [blockCount, setBlockCount] = useState([]);

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

    const getBlockCount = async () => {
      await axios(`http://localhost:8000/blockCount`)
        .then((res) => {
          setBlockCount(res.data.count);
          console.log('Status : ' + res.data.success);
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data.error)
          }
        })
    };

    getBlockCount();
    getTreeCount();
    getAllBlocks();
  }, []);


  return (
    <div>
      <PlantationNav />
      &nbsp;
      <div className="container text-center">
        <h2> Estate Details </h2>
        &nbsp;&nbsp;
        <div className="row align-items-start">
          <div className="col">
            <div class="card" >
              <div class="card-body">
                <h5 class="card-title">5 acres</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">Area</h6>
              </div>
            </div>
          </div>
          <div className="col">
            <div class="card" >
              <div class="card-body">
                <h5 class="card-title">{treeCount !== null ? treeCount : 'Loading...'}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">Trees</h6>
              </div>
            </div>
          </div>
          <div className="col">
            <div class="card" >
              <div class="card-body">
                <h5 class="card-title">{blockCount !== null ? blockCount : 'Loading...'}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">Blocks</h6>
              </div>
            </div>
          </div>
        </div>

      </div>

      &nbsp;
      &nbsp;

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
                  <th scope="col">  </th>
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