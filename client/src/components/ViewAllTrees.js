import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import PlantationNav from './PlantationNav';
import { useReactToPrint } from 'react-to-print';
import '../stylesheets/plantation.css';
//import { BsSearch } from 'react-icons/bs';

const ViewAllTrees = () => {
  const [allTrees, setAllTrees] = useState([]);
  const [searchTrees, setSearchTrees] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  const componentPDF = useRef();

  const formatDate = (date) => {
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  useEffect(() => {
    const getAllTrees = async () => {

      await axios.get(`http://localhost:8000/allTrees`)
        .then((res) => {
          setAllTrees(res.data.viewtrees);
          setCurrentDate(formatDate(new Date()));
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

  //search
  const searchTree = allTrees.filter(trees =>
    trees.treeID.toLowerCase().includes(searchTrees.toLowerCase())
  )

  const generateReport = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "title"
    //onAfterPrint: ()=> alert("report saved")
  })

  return (
    <div >
      <div className='plantHeader'>
        <PlantationNav />
        &nbsp;

        <div className='plantSearch'>
          <div>
            <input type="text"
              className='form-control'
              placeholder='search'
              value={searchTrees}
              onChange={(e) => setSearchTrees(e.target.value)} />
            <button class="btn btn-success" type="submit" >Search</button>
          </div>
        </div>
      </div>
      <div ref={componentPDF} >

        <div className="print-header" style={{ display: "none" }}>
          <h1> Jayakody Koppara Stores </h1>
          <hr />
        </div>
        <div className='plantReport1'>
          <h1 className='plantTopic'> Tree Details </h1>
          &nbsp;


          <button type="button" className="btn btn-success" onClick={generateReport} id='plantButton'>
            <i class="fa-regular fa-file-pdf"></i>&nbsp; Generate Report
          </button>


          <table className="table" id='plantTable'>
            <thead>
              <tr>
                <th scope="col"> Tree ID </th>
                <th scope="col"> Tree type </th>
                <th scope="col"> Planted Date</th>
                <th scope="col"> Block Name </th>
                <th scope="col"> Special Notes</th>
              </tr>
            </thead>
            <tbody>
              {searchTree.map(trees => (
                <tr key={trees._id}>
                  <td> {trees.treeID} </td>
                  <td> {trees.typeOfTree} </td>
                  <td> {trees.plantedDate} </td>
                  <td> {trees.blockName} </td>
                  <td> {trees.specialNotes} </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="print-footer" style={{ display: "none" }}>
          <hr />
          <p>Report Generated on {currentDate} </p>
        </div>


      </div>
    </div>
  )
}

export default ViewAllTrees;
