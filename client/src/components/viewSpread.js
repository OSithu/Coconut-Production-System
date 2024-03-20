import React, { Component } from 'react'
import axios from 'axios';

export default class viewSpread extends Component {
  constructor(props){
    super(props);

    this.state={
      records:[]
    };
  }

//Call method
componentDidMount(){
  this.retriveRecords();
}




//retrive posts

  retriveRecords(){
    axios.get("http://localhost:8000/records").then(res=>{
      if(res.data.success){
        this.setState({
          records:res.data.existingRecords
        });

        console.log(this.state.records)

      }
    });
  }

  onDelete =(id) =>{
    axios.delete(`http://localhost:8000/diseasespread/delete/${id}`).then((res)=>{
      this.retriveRecords();
    })
  }
  render() {
    return (
      <div>
        <p>All Posts</p>
        <table class="table">
          <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Tree ID</th>
                <th scope="col">Identify Date</th>
                <th scope="col">Disease</th>
                <th scope="col">Spread Level</th>
                <th scope="col">Special Notes</th>
                <th scope="col">Action</th>
            </tr>
          </thead>

<tbody>
      {this.state.records.map((records,index)=>(
              <tr>
                <th scope="row">{index+1}</th>
                <td>
                  <a href={`/spreadrecord/${records._id}`} style={{textDecoration:'none'}}>
                  {records.treeID}
                  </a>
                  
                  </td>
                <td>{records.identifyDate}</td>
                <td>{records.disease}</td>
                <td>{records.spreadLevel}</td>
                <td>{records.specialNote}</td>
                <td>
                  <a className="btn btn-warning" href={`/editDisease/${records._id}`}>
                      <i className="fas fa-edit"></i>&nbsp;Edit
                  </a>
                    &nbsp;
                  <a className="btn btn-danger" href="#" onClick={()=>this.onDelete(records._id)} >
                      <i className="fas fa-trash-alt"></i>&nbsp;Delete
                  </a>  
                </td>
              </tr>


      ))}
</tbody>

        </table>
        {/* <a href="/createDisease" class="btn btn-sucess">Add New Records</a> */}
        <button className="btn btn-success"><a href="/createDisease" style={{textDecoration:'none',color:'white'}}>Add New Records</a></button>
      </div>
    )
  }
}
