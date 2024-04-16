import axios from "axios";
import React, { useEffect, useState } from "react";

const ViewSpread = () => {

  const[ allRecords, setAllRecord ] = useState([]);

  useEffect(()=>{

    const getAllRecords = async() => {

    await axios.get(`http://localhost:8000/records`)
    .then((res)=>{
      setAllRecord(res.data.existingRecords);
      console.log('Status: ' + res.data.success);
    })
    .catch((err)=>{
      if(err.response){
          console.log(err.response.data.error);
      }else{
        console.log("Error Occured While Processing Your Axios Get Request. "+err.error);
      }

    })

    }

    getAllRecords();

  },[])

  //Implementing handleDelete Function

  const handleDelete =async(id) => {

    const confirmed = window.confirm("Are you sure you want to delete this items..?");
    if(confirmed){

      await axios.delete(`http://localhost:8000/diseasespread/delete/${id}`)
      .then((res)=>{
        alert(res.data.message);
        console.log(res.data.message);
      })
      .catch((err)=>{
  
        if(err.response){
          console.log(err.response.data.error);
      }else{
        console.log("Error Occured While Processing Your Axios Delete Request. "+err.error);
      }
  
      })
  

    }else{
      alert('Delete cancelled!')
    }


  }

  return(
    <div>
    <p>All Records</p>
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
  {allRecords.map((records,index)=>(
          <tr>
            <th scope="row">{index+1}</th>
            <td>{records.treeID}</td>
            <td>{records.identifyDate}</td>
            <td>{records.disease}</td>
            <td>{records.spreadLevel}</td>
            <td>{records.specialNote}</td>
            <td>
              <a className="btn btn-warning" href={`/editDisease/${records._id}`}>
                  <i className="fas fa-edit"></i>&nbsp;Edit
              </a>
                &nbsp;
              <a className="btn btn-danger" href="#" onClick={()=>handleDelete(records._id)} >
                  <i className="fas fa-trash-alt"></i>&nbsp;Delete
              </a>  
            </td>
          </tr>


  ))}
</tbody>

    </table>
    <button className="btn btn-success"><a href="/createDisease" style={{textDecoration:'none',color:'white'}}>Add New Records</a></button>
  </div>
  )

}

export default ViewSpread;




 
   