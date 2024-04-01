// import React, { Component } from "react";
// import axios from "axios";

// export default class createQualityRecord extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//         records:{}
//     };
//   }

//    componentDidMount(){
//     const id = this.props.match.params.id;

//     axios.get('http://localhost:8000/records/$id').then((res) => {
//         if(res.data.success){
//              this.setState({
//                 records:res.data.post
//             });
//             console.log(this.state.records);
//         }
//     });
//    }

//    render(){

//     const{Product,TestDate,TestResult} = this.state.records;

//     return (
//         <div style={{marginTop:'20px'}}>
//             <h4>{Product}</h4>
//             <hr/>

//             <dl className ="row">
//                 <dt className="col-sm-3">TestDate</dt>
//                 <dd className="col-sm-9">{TestDate}</dd>
//             </dl>
//             <dl className ="row">
//                 <dt className="col-sm-3">TestResult</dt>
//                 <dd className="col-sm-9">{TestResult}</dd>
//             </dl>
//         </div>
//     )
//    }
// }

import React, { Component } from "react";
import axios from "axios";

export default class CreateQualityRecords extends Component {
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
    
        const {BatchId,Product,TestDate,TestResult} = this.state;
    
        const data = {
            BatchId:BatchId,
            Product:Product,
            TestDate:TestDate,
            TestResult:TestResult,
        };

        console.log(data);

        axios.post("http://localhost:8000/qualityrecords/save", data).then((res) => {
          if (res.data.success) {
            this.setState({
                BatchId: "",
                Product: "",
                TestDate: "",
                TestResult: "",
            });
          }
        });
      }

    render(){
        return (
            <div className="col-md-8 mt-4 mx-auto">
                <h1 className="h3 mb-3 font-weight-normal">Add New Record</h1>
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

                    <button className="btn btn-success" type="submit" style={{marginTop:'15px'}} onClick={this.onSubmit}>
                        <i className="far fa check-square"></i>
                        &nbsp: Save
                    </button>

                    

                </form>
            </div>
        )
    }
}

