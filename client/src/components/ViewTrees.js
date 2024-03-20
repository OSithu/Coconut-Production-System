import React, { Component } from 'react'
import axios from 'axios';
import PlantationNav from './PlantationNav';

export default class ViewTrees extends Component {

  constructor(props){
    super(props);
 
    this.state={
      trees:[]
    };
  }

  componentDidMount(){
    this.retrieveDetails();
  }

  retrieveDetails() {
    axios.get("http://localhost:8000/trees")
      .then(res => {
        if (res.data.success) {
          // Map through each tree object and format the createdAt field
          const formattedTrees = res.data.existingTrees.map(tree => ({
            ...tree,
            plantedDate9: new Date(tree.plantedDate).toLocaleDateString() // Format the date
          }));
  
          // Update the state with the formatted trees data
          this.setState({
            trees: formattedTrees
          });
  
          console.log(formattedTrees);
        }
      })
      .catch(error => {
        console.error('Error retrieving trees:', error);
      });
  }
  

  onDelete = (id) =>{
    axios.delete(`http://localhost:8000/trees/delete/${id}`).then(res =>{
        alert("Deleted Successfully");
        this.retrieveDetails();
    })
  }

  render() {
    return (
      <div>
        <PlantationNav/>
        &nbsp;
        <h2> Tree Details </h2> 
        &nbsp;
        <table className="table">
          <thead>
            <tr>
              <th scope="col"> Tree ID </th>
              <th scope="col"> Tree type </th>
              <th scope="col"> Planted Date</th>
              <th scope="col"> Block Name </th>
              <th scope="col"> Special Notes</th>
              <th scope="col"> Action </th>
            </tr>
          </thead>
          <tbody>
        {this.state.trees.map(trees =>(
          <tr>
          <th scope="row"> {trees.treeID} </th>
          <td>
            <a href={`/trees/${trees._id}`} style={{textDecoration:'none'}}>
            {trees.typeOfTree} </a> </td>
          <td> {trees.plantedDate} </td>
          <td> {trees.blockName} </td>
          <td> {trees.specialNotes} </td>
          <td>
                  <a className='btn btn-warning' href={`/updateTrees/${trees._id}`}>
                    <i className='fas fa-edit'></i>&nbsp;Edit
                  </a>
                  &nbsp;
                  <a className='btn btn-danger' href="#" onClick={() =>this.onDelete(trees._id)}>
                    <i className='far fa-trash-alt'></i>&nbsp;Delete
                  </a>
                </td>
              </tr>
        ))}
     </tbody>
        </table>

        <button type="button" class="btn btn-success"> 
          <a href="/addTrees" style={{textDecoration:"none", color:'white'}}>
          <i class="fa-solid fa-plus"></i>&nbsp;
            Add New Record
          </a>
        </button>
      </div>
    )
  }
}