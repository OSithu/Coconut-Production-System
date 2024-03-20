import React, { Component } from 'react'
import axios from 'axios'

export default class editEmployee extends Component {

    constructor(props){
        super(props);
        this.state={
            fullName:"",
            dateOfBirth:"",
            gender:"",
            contactNumber:"",
            contactEmail:"",
            address:"",
            jobTitle:"",
            department:"",
            startDate:""
        }
    }

    handleInputChange =(e) =>{
        const{name,value} = e.target;

        this.setState({
            ...this.State,
            [name]:value
        })
    }

   onSubmit =(e) =>{

    

    e.preventDefault();
    const id = this.props.match.params.id;

    const {fullName,dateOfBirth,gender,contactNumber,contactEmail,address,jobTitle,department,startDate} = this.state

    const data ={

        fullName:fullName,
        dateOfBirth:dateOfBirth,
        gender:gender,
        contactNumber:contactNumber,
        contactEmail:contactEmail,
        address:address,
        jobTitle:jobTitle,
        department:department,
        startDate:startDate,
    }
    console.log(data)

    // axios.put(`/employee/update/${id}`,data).then((res) =>{
    //     if(res.data.success){
             alert("Post updated successfully")
    //         this.setState(
    //             {
    //                 fullName:"",
    //                 dateOfBirth:"",
    //                 gender:"",
    //                 contactNumber:"",
    //                 contactEmail:"",
    //                 address:"",
    //                 jobTitle:"",
    //                 department:"",
    //                 startDate:"" 
    //             }
    //         )
    //     }
    //    })
   } 

componentDidMount(){
    const id = this.props.match.params.id;

    axios.put('/post/${id}').then((res) =>{
        if(res.data.success){
            this.setState({
              fullName:res.data.existingRecords.fullName,
              dateOfBirth:res.data.existingRecords.dateOfBirth,
              gender:res.data.existingRecords.gender,
              contactNumber:res.data.existingRecords.contactNumber,
              contactEmail:res.data.existingRecords.contactEmail,
              address:res.data.existingRecords.address,
              jobTitle:res.data.existingRecords.jobTitle,
              department:res.data.existingRecords.department,
              startDate:res.data.existingRecords.startDate,
              

            });

            console.log(this.state.post);


        }
    });
}


  render() {
    return (
      <div>edit Employee</div>
    )
  }
}
