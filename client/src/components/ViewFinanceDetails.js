import React, { Component } from 'react';
import axios from 'axios';

export default class ViewFinanceDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      financeRoute: []
    };
  }

  componentDidMount() {
    this.retrieveFinanceRecords();
  }

  retrieveFinanceRecords() {
    axios.get("http://localhost:8000/financeRecords")
      .then((res) => {
        if (res.data.success) {
          this.setState({
            financeRoute: res.data.existingfinance
          });
          console.log(this.state.financeRoute);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  onDelete = (id) =>{
    axios.delete(`http://localhost:8000/financerecords/delete/${id}`).then(res =>{
        alert("Successfully deleted");
        this.retrieveFinanceRecords();
    })
  }

  render() {
    return (
      <div>
       <p>All Financial Transactions</p>
       <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Date</th>
            <th scope="col">Type</th>
            <th scope="col">Description</th>
            <th scope="col">Income</th>
            <th scope="col">Expenses</th>
            <th scope="col">TotalAmount</th>
          </tr>
        </thead>
        <tbody>
          {this.state.financeRoute.map((financeRoute, index) => (
            <tr key={index}>
              <th scope="row">{index+1}</th>
              <td>
                <a href={`/financeRoute/${financeRoute._id}`} style={{textDecoration:'none'}}>
                    {financeRoute.topic}
                </a>
              </td>
              <td>{financeRoute.date}</td>
              <td>{financeRoute.type}</td>
              <td>{financeRoute.Description}</td>
              <td>{financeRoute.Income}</td>
              <td>{financeRoute.Expenses}</td>
              <td>{financeRoute.totalAmount}</td>
              <td>
                <a className="btn btn-warning" href={`/editFinanceDetails/${financeRoute._id}`}>
                  <i className="fas fa-edit"></i>&nbsp;edit
                </a>
                &nbsp;
                <a className="btn btn-danger" href="#" onClick={()=>this.onDelete(financeRoute._id)}>
                  <i className="far fa-trash-alt"></i>&nbsp;Delete
                </a>
              </td>
            </tr>
          ))}
        </tbody>
       </table>
       <button className="btn btn-success"><a href="/createFinanceDetails" style={{textDecoration:'none', color:'white'}}>Create New Post</a></button>
      </div>
    );
  }
}
