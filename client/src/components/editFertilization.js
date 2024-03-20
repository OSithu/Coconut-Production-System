import React, {Component } from 'react'
import axios from 'axios';

export default class editFertilization extends Component{

    constructor(props){
        super(props);
        this.state={
            TreeNo:"",
            TreeStage:"",
            Date:"",
            UreaAmount:"",
            EppawalaRockPhosphateAmount:"",
            MuriateOfPotasiumAmount:"",
            DolamiteAmount:"",
            Description:""

        }
    }

    handleInputChange = (e) =>{
        const {name,value} = e.target;

        this.setState({
            ...this.state,
            [name]:value
        })
    }

    onSubmit = (e) =>{
        e.preventDefault();
        const id = this.props.match.params.id;

        const {TreeNo,TreeStage,Date,UreaAmount,EppawalaRockPhosphateAmount,MuriateOfPotasiumAmount,DolamiteAmount,Description}=this.state;

        const data={
            TreeNo:TreeNo,
            TreeStage:TreeStage,
            Date:Date,
            UreaAmount:UreaAmount,
            EppawalaRockPhosphateAmount:EppawalaRockPhosphateAmount,
            MuriateOfPotasiumAmount:MuriateOfPotasiumAmount,
            DolamiteAmount:DolamiteAmount,
            Description:Description
        }
        console.log(data)

        axios.put(`/fertilizationrec/update/${id}`,data).then((res) =>{
            if(res.data.success){
                alert("Record Updated Successfully")
                this.setState(
                    {
                        TreeNo:"",
                        TreeStage:"",
                        Date:"",
                        UreaAmount:"",
                        EppawalaRockPhosphateAmount:"",
                        MuriateOfPotasiumAmount:"",
                        DolamiteAmount:"",
                        Description:""
                    }
                );
            }
        });
    };

    componentDidMount(){
        const id =this.props.match.params.id;

        axios.get(`/fertilizationrec/${id}`).then((res) =>{
            if(res.data.success){
                this.setState({
                    TreeNo:res.data.record.TreeNo,
                    TreeStage:res.data.record.TreeStage,
                    Date:res.data.record.Date,
                    UreaAmount:res.data.record.UreaAmount,
                    EppawalaRockPhosphateAmount:res.data.record.EppawalaRockPhosphateAmount,
                    MuriateOfPotasiumAmount:res.data.record.MuriateOfPotasiumAmount,
                    DolamiteAmount:res.data.record.DolamiteAmount,
                    Description:res.data.record.Description,

                });

                console.log(this.state.record);
            }
        
    });

    }
render(){
    return(
        <div className="col-md-8 mt-4 mx-auto">
        <h1 className='h3 mb-3 font-weight-normal'>Update Record</h1>    
           <form className='needs-validation' noValidate>
               <div className="form-group" style={{marginBottom:'15px'}}>
                  <label style={{marginBottom:'5px'}}>Tree No</label>
                  <input type="text" 
                  className="form-control" 
                  name="TreeNo"          
                  placeholder="Enter the Tree Number"
                  value={this.state.TreeNo}
                  onChange={this.handleInputChange}/>
              </div>

              <div className="form-group" style={{marginBottom:'15px'}}>
                  <label style={{marginBottom:'5px'}}>Tree Stage</label>
                  <input type="text" 
                  className="form-control" 
                  name="TreeStage" 
                  placeholder="Enter the stage"
                  value={this.state.TreeStage}
                  onChange={this.handleInputChange}/>
              </div>

              <div className="form-group" style={{marginBottom:'15px'}}>
                  <label style={{marginBottom:'5px'}}>Date</label>
                  <input type="text" 
                  className="form-control" 
                  name="Date" 
                  placeholder="Enter the Date of fertilization"
                  value={this.state.Date}
                  onChange={this.handleInputChange}/>
              </div>

              <div className="form-group" style={{marginBottom:'15px'}}>
                  <label style={{marginBottom:'5px'}}>Amount of Urea</label>
                  <input type="text" 
                  className="form-control" 
                  name="UreaAmount" 
                  placeholder="Enter your first name"
                  value={this.state.UreaAmount}
                  onChange={this.handleInputChange}/>
              </div>

              <div className="form-group" style={{marginBottom:'15px'}}>
                  <label style={{marginBottom:'5px'}}>Amount of EppawalaRock Phosphate Amount</label>
                  <input type="Number" 
                  className="form-control" 
                  name="EppawalaRockPhosphateAmount" 
                  placeholder="Enter the EppawalaRockPhosphate Amount "
                  value={this.state.EppawalaRockPhosphateAmount}
                  onChange={this.handleInputChange}/>
              </div>

              <div className="form-group" style={{marginBottom:'15px'}}>
                  <label style={{marginBottom:'5px'}}>Amount of Muriate Of Potasium Amount</label>
                  <input type="Number" 
                  className="form-control" 
                  name="MuriateOfPotasiumAmount" 
                  placeholder="Enter the MuriateOfPotasium Amount"
                  value={this.state.MuriateOfPotasiumAmount}
                  onChange={this.handleInputChange}/>
              </div>

              <div className="form-group" style={{marginBottom:'15px'}}>
                  <label style={{marginBottom:'5px'}}>Amount of Dolamite Amount</label>
                  <input type="Number" 
                  className="form-control" 
                  name="DolamiteAmount" 
                  placeholder="Enter the Dolamite Amount"
                  value={this.state.DolamiteAmount}
                  onChange={this.handleInputChange}/>
              </div>

              <div className="form-group" style={{marginBottom:'15px'}}>
                  <label style={{marginBottom:'5px'}}>Description</label>
                  <input type="text" 
                  className="form-control" 
                  name="Description" 
                  placeholder="Description"
                  value={this.state.Description}
                  onChange={this.handleInputChange}/>
              </div>

<button className="btn btn-success" type="submit" style={{marginTop:'15px'}} onClick={this.onSubmit}>
    <i className='far fa-check-square'></i>
    &nbsp;Update
</button>
</form>
</div>

    );
}
}