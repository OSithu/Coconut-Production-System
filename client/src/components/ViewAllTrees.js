// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import PlantationNav from './PlantationNav';
// import { useReactToPrint } from 'react-to-print';
// import '../stylesheets/plantation.css';
// //import { BsSearch } from 'react-icons/bs';

// const ViewAllTrees = () => {
//   const [allTrees, setAllTrees] = useState([]);
//   const [searchTrees, setSearchTrees] = useState('');
//   const [currentDate, setCurrentDate] = useState('');

//   const componentPDF = useRef();

//   const formatDate = (date) => {
//     const d = new Date(date);
//     let month = "" + (d.getMonth() + 1);
//     let day = "" + d.getDate();
//     const year = d.getFullYear();

//     if (month.length < 2) month = "0" + month;
//     if (day.length < 2) day = "0" + day;

//     return [year, month, day].join("-");
//   };

//   useEffect(() => {
//     const getAllTrees = async () => {

//       await axios.get(`http://localhost:8000/allTrees`)
//         .then((res) => {
//           setAllTrees(res.data.viewtrees);
//           setCurrentDate(formatDate(new Date()));
//           console.log('Status : ' + res.data.success);
//         })
//         .catch((err) => {
//           if (err.response) {
//             console.log(err.response.data.error)
//           }
//         })
//     }

//     getAllTrees();
//   }, [])

//   //search
//   const searchTree = allTrees.filter(trees =>
//     trees.treeID.toLowerCase().includes(searchTrees.toLowerCase())
//   )

//   const generateReport = useReactToPrint({
//     content: () => componentPDF.current,
//     documentTitle: "title"
//     //onAfterPrint: ()=> alert("report saved")
//   })

//   // const generateReport = () => {
//   //   const table = document.querySelector('.table');
//   //   const content = table.outerHTML;
//   //   const newWindow = window.open();
//   //   newWindow.document.write(`
//   //     <html>
//   //       <head>
//   //         <title> Harvest Details </title>
//   //         <style>
//   //           img {
//   //             height: 100px; 
//   //             margin: 5px; 
//   //           }
//   //           .imgContainer {
//   //             text-align: center;
//   //           }
//   //           h2 {
//   //             text-align: center;
//   //           }

//   //           @media print {
//   //             /* Hide buttons */
//   //             button { display: none; }
//   //             .actionCol { display: none; }
//   //             /* Apply table styles */
//   //             table {
//   //               width: 100%;
//   //               border-collapse: collapse;
//   //             }
//   //             th, td {
//   //               border: 1px solid #000;
//   //               padding: 8px;
//   //               text-align: left;
//   //             }
//   //             th {
//   //               background-color: #f2f2f2;
//   //             }
//   //           }
//   //         </style>
//   //       </head>
//   //       <body>
//   //         <div class="reportHeader" >
//   //           <div class="imgContainer">
//   //             <img src="/images/logo.png">
//   //             <h1> Jayakody Koppara Stores </h1>
//   //         <hr />
//   //           </div>
//   //           <br/>
//   //           <h2>Harvest Details</h2>
//   //           <hr />
//   //         </div>
//   //         ${content}
//   //       </body>
//   //     </html>
//   //   `);
//   //   newWindow.print();
//   //   newWindow.close();
//   // };

//   return (
//     <div >
//       <div className='plantHeader'>
//         <PlantationNav />
//         &nbsp;

//         <div className='plantSearch'>
//           <form class="d-flex" role="search">
//             <input type="text"
//               className='form-control me-2'
//               placeholder='search'
//               value={searchTrees}
//               onChange={(e) => setSearchTrees(e.target.value)} />
//             <button class="btn btn-success" type="submit" ><i class="fa-solid fa-magnifying-glass"></i></button>
//           </form>

//         </div>
//       </div>
//       <div ref={componentPDF} >
//         <div className='plantBody' style={{ marginTop: "120px" }}>
//           <div className="print-header" style={{ display: "none" }}>
//             <img src="/images/logo.png" className='imageReport2' />
//             <h1> Jayakody Koppara Stores </h1>
//             <p styles={{ float: "right" }}>Report Generated on {currentDate} </p>
//             <hr />
//           </div>

//           <h1 className='plantTopic'> Tree Details </h1>
//           &nbsp;


//           <button type="button" className="btn btn-success" onClick={generateReport} id='plantButton'>
//             <i class="fa-regular fa-file-pdf"></i>&nbsp; Generate Report
//           </button>

//           <div className='plantReport2'>
//             <table className="table" id='plantTable'>
//               <thead>
//                 <tr>
//                   <th scope="col"> Tree ID </th>
//                   <th scope="col"> Tree type </th>
//                   <th scope="col"> Planted Date</th>
//                   <th scope="col"> Block Name </th>
//                   <th scope="col"> Special Notes</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {searchTree.map(trees => (
//                   <tr key={trees._id}>
//                     <td> {trees.treeID} </td>
//                     <td> {trees.typeOfTree} </td>
//                     <td> {trees.plantedDate} </td>
//                     <td> {trees.blockName} </td>
//                     <td> {trees.specialNotes} </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//         {/* <div className="plantPrint-header" style={{ display: "none" }}>
//           <hr />
//           <p>Report Generated on {currentDate} </p>
//         </div> */}

//       </div>
//     </div>
//   )
// }

// export default ViewAllTrees;


import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import PlantationNav from './PlantationNav';
import { useReactToPrint } from 'react-to-print';
import html2pdf from 'html2pdf.js';
import '../stylesheets/plantation.css';

const ViewAllTrees = () => {
  const [allTrees, setAllTrees] = useState([]);
  const [searchTrees, setSearchTrees] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  const componentRef = useRef();

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

  const generatePDF = () => {
    const opt = {
      margin: 1,
      filename: 'tree_report.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    const element = document.getElementById('pdf-content');
    html2pdf().from(element).set(opt).save();
  };

  //search
  const searchTree = allTrees.filter(trees =>
    trees.treeID.toLowerCase().includes(searchTrees.toLowerCase())
  )

  return (
    <div >
      <div className='plantHeader'>
        <PlantationNav />
        &nbsp;

        <div className='plantSearch'>
          <form className="d-flex" role="search">
            <input type="text"
              className='form-control me-2'
              placeholder='search'
              value={searchTrees}
              onChange={(e) => setSearchTrees(e.target.value)} />
            <button className="btn btn-success" type="submit" ><i className="fa-solid fa-magnifying-glass"></i></button>
          </form>
        </div>
      </div>
      
      <div className='plantBody' style={{ marginTop: "120px" }}>
      <div id="pdf-content">
        <h1 className='plantTopic'> Tree Details </h1>
        &nbsp;
        <button type="button" className="btn btn-success" onClick={generatePDF} id='plantButton'>
          <i className="fa-regular fa-file-pdf"></i>&nbsp; Generate Report
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
      </div>
    </div>
  )
}

export default ViewAllTrees;

