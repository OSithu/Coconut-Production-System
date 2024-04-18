// import React, { Component } from 'react';
// import axios from 'axios';

// export default class viewFertilization extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       fertilization: []
//     };
//   }

//   componentDidMount() {
//     this.retrieveFertilizationRecords();
//   }

//   retrieveFertilizationRecords() {
//     axios.get("/fertilizationrec").then(res => {
//       if (res.data.success) {
//         this.setState({
//           fertilization: res.data.existingRecords
//         });
//       }
//     });
//   }

//   onDelete = (id) => {
//     axios.delete(`/fertilizationrec/delete/${id}`).then((res) => {
//       alert("Record Deleted Successfully");
//       this.retrieveFertilizationRecords();
//     })
//   }

import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewFertilizationDetails = () => {
  const [allFertilization, setAllFertilization] = useState([]);

  useEffect(() => {
    const getAllFertilization = async () => {
      await axios
        .get("http://localhost:8000/fertilizationrec")
        .then((res) => {
          setAllFertilization(res.data.existingRecords);
          console.log("Status: " + res.data.success);
          console.log(res.data.message);
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data.error);
          } else {
            console.log("Error occurred while processing your get request" + err.error);
          }
        });
    };

    getAllFertilization(); //call the function
  }, []);

  //implement the handleDelete function
  const handleDelete = async (id) => {

    try {
      const confirm = window.confirm('Are you sure you want to delete?');

      if (confirm) {
        await axios.delete(`http://localhost:8000/fertilizationrec/delete/${id}`)
          .then((res) => {
            alert(res.data.message);
            console.log(res.data.message);
         //   setAllFertilization(allFertilization.filter(order => fertilization._id !== id));
          })
          .catch((err) => {
            if (err.response) {
              console.log(err.response.data.message);
            } else {
              console.log("Error occured while processing your axios delete"+err.message);
            }
          })
      } else {
        alert('Deletion Cancelled');
      }
    }
    catch (err) {
      console.log('HandleDelete function failed ! Error' + err.message);
    }
  }

  return (
    <div className="container">
      <p>All Fertilization Details</p>
      <button className="btn btn-success">
        <a
          href="/fertilizationsave"
          style={{ textDecoration: "none", color: "white" }}
        >
          Add Fertilization Record
        </a>
      </button>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
              <th scope="col" className="text-center">Tree No</th>
              <th scope="col" className="text-center">Tree Stage</th>
              <th scope="col" className="text-center">Date</th>
              <th scope="col" className="text-center">Urea(g)</th>
              <th scope="col" className="text-center">EppawalaRock<br></br>Phosphate(g)</th>
              <th scope="col" className="text-center">MuriateOf<br></br>Potasium(g)</th>
              <th scope="col" className="text-center">Dolamite(g)</th>
              <th scope="col" className="text-center">Description</th>
              <th scope="col" className="text-center"></th>
          </tr>
        </thead>
        <tbody>
          {allFertilization.map((fertilization, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
               <td className="text-center">{fertilization.TreeNo}</td>
                <td className="text-center">{fertilization.TreeStage}</td>
                <td className="text-center">{new Date(fertilization.Date).toLocaleDateString()}</td>
                <td className="text-center">{fertilization.UreaAmount}</td>
                <td className="text-center">{fertilization.EppawalaRockPhosphateAmount}</td>
                <td className="text-center">{fertilization.MuriateOfPotasiumAmount}</td>
                <td className="text-center">{fertilization.DolamiteAmount}</td>
              <td>
                {/* <a
                  className="btn btn-warning"
                  href={`/fertilizationupdate/${fertilization._id}`}
                >
                  <i className="fas fa-edit"></i>&nbsp;Update
                </a>
                &nbsp;
                <a className="btn btn-danger" href="#" onClick={() =>handleDelete(fertilization._id)}>
                <i className="fas fa-trash-alt"></i>&nbsp;Delete
                </a> */}
                <a className="btn btn-warning" href={`/fertilizationupdate/${fertilization._id}`}>
              <i className="fas fa-edit"></i>&nbsp;Update
            </a>
            &nbsp;
           <a className="btn btn-danger" href="#" onClick={() =>handleDelete(fertilization._id)}>
            <i className="fas fa-trash-alt"></i>&nbsp;Delete
           </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewFertilizationDetails;




