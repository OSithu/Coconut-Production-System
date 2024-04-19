import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PlantationNav from './PlantationNav';

const ViewAllTrees = () => {
  const [allTrees, setAllTrees] = useState([]);

  useEffect(() => {
    const getAllTrees = async () => {
      
      await axios.get(`http://localhost:8000/allTrees`)
        .then((res) => {
          setAllTrees(res.data.viewtrees);
          console.log('Status : ' + res.data.success);
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data.error)
          }
        })
    }

    getAllTrees();
  }, [])

  // const handleDelete = async (id) => {
  //   try {
  //     const confirm = window.confirm('Are you sure you want to delete?');

  //     if (confirm) {
  //       await axios.delete(`http://localhost:8000/trees/delete/${id}`)
  //         .then((res) => {
  //           alert(res.data.message);
  //           console.log(res.data.message);
  //           setAllTrees(allTrees.filter(tree => tree._id !== id));
  //         })
  //         .catch((err) => {
  //           if (err.response) {
  //             console.log(err.response.data.message);
  //           } else {
  //             console.log("Error occurred while processing your axios delete");
  //           }
  //         })
  //     } else {
  //       alert('Deletion Cancel');
  //     }
  //   } catch (err) {
  //     console.log('HandleDelete function failed ! Error' + err.message);
  //   }
  // }

  return (
    <div>
      <PlantationNav />
      &nbsp;
      <h2> Tree Details </h2>
      &nbsp;
      {/* <Link to={`/addTrees`}>
        <button type="button" className="btn btn-success" style={{ float: "right" }}>
          <i className="fa-solid fa-plus"></i>&nbsp;
          Add New Record
        </button>
      </Link> */}

      <table className="table">
        <thead>
          <tr>
            <th scope="col"> Tree ID </th>
            <th scope="col"> Tree type </th>
            <th scope="col"> Planted Date</th>
            <th scope="col"> Block Name </th>
            <th scope="col"> Special Notes</th>
            {/* <th scope="col"> Action </th> */}
          </tr>
        </thead>
        <tbody>
          {allTrees.map(trees => (
            <tr key={trees._id}>
              <td> {trees.treeID} </td>
              <td> {trees.typeOfTree} </td>
              <td> {trees.plantedDate} </td>
              <td> {trees.blockName} </td>
              <td> {trees.specialNotes} </td>
              {/* <td>
                <Link to={`/updateTrees/${trees._id}`}>
                  <button type="button" className="btn btn-warning">
                    <i className='fas fa-edit'></i>&nbsp; Edit
                  </button>
                </Link>
                &nbsp;
                <button type="button" className='btn btn-danger' onClick={() => handleDelete(trees._id)}>
                  <i className='far fa-trash-alt'></i>&nbsp;Delete
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ViewAllTrees;
