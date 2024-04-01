import React, { Component } from 'react';
import axios from 'axios';

export default class EditQualityRecords extends Component {
    constructor(props) {
        super(props);
        this.state = {
          BatchId: "",
          Product: "",
          TestDate: "",
          TestResult: "",
        };
      }

      handleInputChange = (e) => {
        const { name, value } = e.target;
    
        this.setState({
          ...this.state,
          [name]: value,
        });
      }

      onSubmit = (e) => {
        e.preventDefault();
        const id = this.props.match.params.id;
        const {BatchId,Product,TestDate,TestResult} = this.state;
    
        const data = {
            BatchId:BatchId,
            Product:Product,
            TestDate:TestDate,
            TestResult:TestResult,
        };

        console.log(data);

        axios.put(`/editQualityRecord/${id}`, data).then((res) => {
          if (res.data.success) {
            alert("Record Updated Successfully")
            this.setState({
                BatchId: "",
                Product: "",
                TestDate: "",
                TestResult: "",
            });
          }
        });
      }
    
    componentDidMount() {

        const id = this.props.match.params.id;
       
        axios.get(`/viewQualityRecord/${id}`).then(res => {
            if (res.data.success) {
              this.setState({
                BatchId: res.data.records.BatchId,
                Product: res.data.records.Product,
                TestDate: res.data.records.TestDate,
                TestResult: res.data.records.TestResult
              });
              console.log(this.state.records);
            }
          });
        }
    
    render(){
        return (
            <div className="col-md-8 mt-4 mx-auto">
                <h1 className="h3 mb-3 font-weight-normal">Update Record</h1>
                <form className="needs-validation" noValidate>

                <div className="form-group" style={{marginBottom:'15px'}}>
                        <label style={{marginBottom:'5px'}}>BatchId</label>
                        <input type="text"
                        className="form-control"
                        name="BatchId"
                        placeholder="Enter BatchId "
                        value={this.state.BatchId}
                        onChange={this.handleInputChange}/>
                    </div>

                    <div className="form-group" style={{marginBottom:'15px'}}>
                        <label style={{marginBottom:'5px'}}>Product</label>
                        <input type="text"
                        className="form-control"
                        name="Product"
                        placeholder="Enter Product Name"
                        value={this.state.Product}
                        onChange={this.handleInputChange}/>
                    </div>

                    <div className="form-group" style={{marginBottom:'15px'}}>
                        <label style={{marginBottom:'5px'}}>TestDate</label>
                        <input type="date"
                        className="form-control"
                        name="TestDate"
                        placeholder="Enter Test Date"
                        value={this.state.TestDate}
                        onChange={this.handleInputChange}/>
                    </div>

                    <div className="form-group" style={{marginBottom:'15px'}}>
                        <label style={{marginBottom:'5px'}}>TestResult</label>
                        <input type="text"
                        className="form-control"
                        name="TestResult"
                        placeholder="Enter Test Result"
                        value={this.state.TestResult}
                        onChange={this.handleInputChange}/>
                    </div>

                    <button className="btn btn-success" type="submit" style={{marginTop:'15px'}} cnClick={this.onSubmit}>
                        <i className="far fa check-square"></i>
                        &nbsp: Update
                    </button>

                    

                </form>
            </div>
        )
    }

}


