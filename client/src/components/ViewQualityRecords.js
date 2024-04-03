import React, { Component } from 'react';
import axios from 'axios';

export default class ViewQualityRecords extends Component {
  constructor(props) {
    super(props);

    this.state = {
      records: []
    };
  }

  componentDidMount() {
    this.retrieveRecords();
  }

  retrieveRecords() {
    axios.get("http://localhost:8000/qrecords")
      .then(res => {
        if (res.data.success) {
          this.setState({
            records: res.data.existingPosts
          });
          console.log(this.state.records);
        }
      });
    }

  onDelete = (id) => {
    axios.delete(`http://localhost:8000/qualityrecords/delete/${id}`).then((res) => {
      alert("Record Deleted Successfully");
      this.retrieveRecords();
    })
  }


    render() {
      return (
        <div className="container">
          <p>Quality Control Records</p>

          <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Product</th>
              <th scope="col">Test Date</th>
              <th scope="col">Test Results</th>
              <th scope="col">Action</th>
            </tr>
          </thead>

          <tbody>
            {this.state.records.map((records, index) => (
              <tr key={index}>
                <th scope="row">{index+1}</th>
                <td>{records.Product}</td>
                <td>{records.TestDate}</td>
                <td>{records.TestResult}</td>
                <td>
                  <a className="btn btn-warning" href={'/editQualityRecord/${records.id}'}>
                    <i className="fas fa-edit"></i>&nbsp;Update
                  </a>
                  &nbsp;
                  <a className="btn btn-danger" href="#" onClick={() =>this.onDelete(records._id)}>
                    <i className="fas fa-trash-alt"></i>&nbsp;Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        

        <button className="btn btn-success">
          <a href="/addQualityRecord" style={{ textDecoration: 'none', color: 'white' }}>Add New Record</a>
        </button>
      </div>
    );
  }
}


