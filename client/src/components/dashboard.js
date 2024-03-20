import React, { Component } from 'react'

export default class dashboard extends Component {
  render() {
    return (
      <div>
       <h1 class="text-primary">Admin Dashboard</h1> 
       <br></br>
       <div class="container">
       <div class="row">
  <div class="col-sm-6">
    <div class="card w-75 p-3">
      <div class="card-body">
        <h2 class="card-title">Plantation Management</h2>
        <a href="#" class="btn btn-primary">Enter</a>
      </div>
    </div>
  </div>
  <div class="col-sm-6">
    <div class="card w-75 p-3">
      <div class="card-body">
        <h2 class="card-title">Fertilizer Management</h2>
        <a href="#" class="btn btn-primary">Enter</a>
      </div>
    </div>
  </div>
</div>

<br></br>

<div class="row">
  <div class="col-sm-6">
    <div class="card w-75 p-3">
      <div class="card-body">
        <h2 class="card-title">Product Management</h2>
        <a href="#" class="btn btn-primary">Enter</a>
      </div>
    </div>
  </div>
  <div class="col-sm-6">
    <div class="card w-75 p-3">
      <div class="card-body">
        <h2 class="card-title">Customer Management</h2>
        <a href="#" class="btn btn-primary">Enter</a>
      </div>
    </div>
  </div>
</div>

<br></br>

<div class="row">
  <div class="col-sm-6">
    <div class="card w-75 p-3">
      <div class="card-body">
        <h2 class="card-title">Employee Management</h2>
        <a href="#" class="btn btn-primary">Enter</a>
      </div>
    </div>
  </div>
  <div class="col-sm-6">
    <div class="card w-75 p-3">
      <div class="card-body">
        <h2 class="card-title">Quality Management</h2>
        <a href="#" class="btn btn-primary">Enter</a>
      </div>
    </div>
  </div>
</div>

<br></br>

<div class="row">
  <div class="col-sm-6">
    <div class="card w-75 p-3">
      <div class="card-body">
        <h2 class="card-title">Finance Management</h2>
        <a href="#" class="btn btn-primary">Enter</a>
      </div>
    </div>
  </div>
  <div class="col-sm-6">
    <div class="card w-75 p-3">
      <div class="card-body">
        <h2 class="card-title">Disease Management</h2>
        <a href="/viewDisease" class="btn btn-primary">Enter</a>
      </div>
    </div>
  </div>
</div>

</div>
      
  </div>
    
    )
  }
}