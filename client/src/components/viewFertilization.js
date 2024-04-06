import React, { Component } from 'react';
import axios from 'axios';

export default class viewFertilization extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fertilization: []
    };
  }

  componentDidMount() {
    this.retrieveFertilizationRecords();
  }

  retrieveFertilizationRecords() {
    axios.get("/fertilizationrec").then(res => {
      if (res.data.success) {
        this.setState({
          fertilization: res.data.existingRecords
        });
      }
    });
  }

  onDelete = (id) => {
    axios.delete(`/fertilizationrec/delete/${id}`).then((res) => {
      alert("Record Deleted Successfully");
      this.retrieveFertilizationRecords();
    })
  }

  render() {
    return (
      <div className='container' style={{ backgroundColor: '#f0fff0', padding: '20px', fontFamily: 'Arial, sans-serif', fontSize: '16px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#228b22', fontSize: '24px' }}>Fertilization Records</h2>
        <table className="table table-bordered" style={{ borderCollapse: 'collapse', width: '100%', fontSize: '18px' }}>
          <thead style={{ backgroundColor: '#228b22', color: 'white' }}>
            <tr>
              <th scope="col">#</th>
              <th scope="col" className="text-center">Tree No</th>
              <th scope="col" className="text-center">Tree Stage</th>
              <th scope="col" className="text-center">Date</th>
              <th scope="col" className="text-center">Urea Amount (g)</th>
              <th scope="col" className="text-center">ERP Amount (g)</th>
              <th scope="col" className="text-center">MOP Amount (g)</th>
              <th scope="col" className="text-center">Dolomite Amount (g)</th>
              <th scope="col" className="text-center">Description</th>
              <th scope="col" className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.fertilization.map((fertilization, index) => (
              <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f8f9fa' : '#ffffff' }}>
                <td className="text-center">{index + 1}</td>
                <td className="text-center">{fertilization.TreeNo}</td>
                <td className="text-center">{fertilization.TreeStage}</td>
                <td className="text-center">{new Date(fertilization.Date).toLocaleDateString()}</td>
                <td className="text-center">{fertilization.UreaAmount}</td>
                <td className="text-center">{fertilization.EppawalaRockPhosphateAmount}</td>
                <td className="text-center">{fertilization.MuriateOfPotasiumAmount}</td>
                <td className="text-center">{fertilization.DolamiteAmount}</td>
                <td className="text-center">{fertilization.Description}</td>
                <td className="text-center">
                  <button className="btn btn-warning btn-sm" style={{ marginRight: '5px', fontSize: '16px' }}>
                    <i className="far fa-edit"></i>&nbsp;Edit
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => this.onDelete(fertilization._id)} style={{ fontSize: '16px' }}>
                    <i className="far fa-trash-alt"></i>&nbsp;Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button className="btn btn-success" style={{ fontSize: '18px' }}><a href="/fertilizationsave" style={{ textDecoration: 'none', color: 'white' }}>Add New Record</a></button>
        </div>
      </div>
    );
  }
}



