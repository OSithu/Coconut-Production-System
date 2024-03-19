import React, { Component } from 'react'

export default class dashboard extends Component {
  render() {
    return (
      <div>
       <h1>Dashboard</h1> 
       <button className="btn btn-success"><a href="#" >Plantation Management</a></button>
       <button className="btn btn-success"><a href="#" >Fertilizer Management</a></button>
       <button className="btn btn-success"><a href="#" >Product Management</a></button>
       <button className="btn btn-success"><a href="#" >Customer and Sales Management</a></button>
       <button className="btn btn-success"><a href="#" >Employee Management</a></button>
       <button className="btn btn-success"><a href="#" >Quality Management</a></button>
       <button className="btn btn-success"><a href="#" >Finance Management</a></button>
       <button className="btn btn-success"><a href="#" >Disease Management</a></button>
    
    </div>
    )
  }
}