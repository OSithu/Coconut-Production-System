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

        console.log(this.state.fertilization);
      }
    });
  }

  onDelete=(id)=>{
    axios.delete(`/fertilizationrec/delete/${id}`).then((res)=>{
        alert("Record Deleted Successfully");
        this.retrieveFertilizationRecords();
    })
  }

  render() {
    return (
      <div className='container'>
        <div>
          <p>All Posts</p>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col"className="text-center">TreeNo</th>
                <th scope="col"className="text-center">TreeStage</th>
                <th scope="col"className="text-center">Date</th>
                <th scope="col"className="text-center">Urea Amount(g)</th>
                <th scope="col"className="text-center">EppawalaRock<br/>Phosphate Amount(g)</th>
                <th scope="col"className="text-center">Muriate Of<br/>Potasium Amount(g)</th>
                <th scope="col"className="text-center">Dolamite<br/> Amount(g)</th>
                <th scope="col"className="text-center">Description</th>
                <th scope="col"className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.fertilization.map((fertilization, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td className="text-center">{fertilization.TreeNo}</td>
                  <td className="text-center">{fertilization.TreeStage}</td>
                  <td className="text-center">{fertilization.Date}</td>
                  <td className="text-center">{fertilization.UreaAmount}</td>
                  <td className="text-center">{fertilization.EppawalaRockPhosphateAmount}</td>
                  <td className="text-center">{fertilization.MuriateOfPotasiumAmount}</td>
                  <td className="text-center">{fertilization.DolamiteAmount}</td>
                  <td className="text-center">{fertilization.Description}</td>
                  <td>
                    <a className="btn btn-warning" href={`/fertilizationupdate/${fertilization._id}`}>
                      <i className="fans fa-edit"></i>&nbsp;Edit
                    </a>
                    &nbsp;
                    <a className="btn btn-danger" href="#"onClick={() =>this.onDelete(fertilization._id)}>
                      <i className="far fa-trash-alt"></i>&nbsp;Delete
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-success"><a href="/fertilizationsave" style={{textDecoration:'none' ,color:'white'}}>Add New Record</a></button>
        </div>
      </div>
    );
  }
}