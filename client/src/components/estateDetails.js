import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import PlantationNav from './PlantationNav';
import '../stylesheets/plantation.css';

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
    <div className='plantBody'>
      <PlantationNav />
      &nbsp;
      <div className="container text-center">
        <h1> Estate Details </h1>
        &nbsp;&nbsp;
        <div className="row align-items-start">
          <div className="col">
            <div className='plantCard'>
              <div className="plantCard-body">
                <h2 className="card-title">5 acres</h2>
                <h3 className="card-subtitle mb-2 text-body-secondary">Area</h3>
              </div>
            </div>
          </div>
          <div className="col">
          <div className='plantCard'>
          <div className="plantCard-body">
                <h2 className="card-title">{treeCount !== null ? treeCount : 'Loading...'}</h2>
                <h3 className="card-subtitle mb-2 text-body-secondary">Trees</h3>
              </div>
            </div>
          </div>
          <div className="col">
          <div className='plantCard'>
          <div className="plantCard-body">                <h2 className="card-title">{blockCount !== null ? blockCount : 'Loading...'}</h2>
                <h3 className="card-subtitle mb-2 text-body-secondary">Blocks</h3>
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
            <h1> Estate Layout </h1>
            <img src = "/images/layout.jpg" className='layoutImg'/> 
          </div>
          <div className="col">
            &nbsp;
            <h1> Block Details </h1>
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
            &nbsp;
          </div>

        </div>

      </div>
    </div>
  )

}

export default EstateDetails;