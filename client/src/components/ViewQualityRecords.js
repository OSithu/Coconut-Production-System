import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { BsSearch} from 'react-icons/bs';
//import { useReactToPrint } from "react-to-print";

const ViewQualityRecords = () => {

   const componentPDF = useRef();
  // const [searchQualityRecords, setSearchQualityRecords] = useState([]);
  const [searchQualityRecords, setSearchQualityRecords] = useState("");


  const [allRecords, setAllRecords] = useState([]);

  useEffect(() => {

    const getAllRecords = async () => {

      await axios.get('http://localhost:8000/qualityrecords')
        .then((res) => {
          setAllRecords(res.data.existingQualityRecords);
          console.log('Status: ' + res.data.success);
          console.log(res.data.message);
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data.error);
          } else {
            console.log("Error occurred while processing your axios get request." + err.message);
          }
        });
    };

    getAllRecords();
  }, []);

  // const generatePDF = useReactToPrint({
  //   content: () => componentPDF.current,
  //   documentTitle: "",
  //   onAfterPrint: () => alert("Data saved in PDF")
  // });
  const generatePDF = () => {
    const table = document.querySelector('.reportForm1');
    const content = table.outerHTML;
    const newWindow = window.open();
    newWindow.document.write(`
      <html>
        <head>
          <title> Quality Control Records </title>
          <style>
            img {
              height: 100px; 
              margin: 5px; 
            }
            .imgContainer {
              text-align: center;
            }
            h2 {
              text-align: center;
            }
            
            @media print {
              /* Hide buttons */
              button,a { display: none; }
              /* Apply table styles */
              table {
                width: 100%;
                border-collapse: collapse;
              }
              th, td {
                border: 1px solid #000;
                padding: 8px;
                text-align: left;
              }
              th {
                background-color: #f2f2f2;
              }
            }
          </style>
        </head>
        <body>
        <div className="print-header" style={{ display: "none" }}>
        <img src="/images/logo.png" className='imageReport2' />
        <h1> Jayakody Koppara Stores </h1>
        <hr />
          </div>
          </div>
          ${content}
        </body>
      </html>
    `);
    newWindow.print();
    newWindow.close();
  };


  const handleDelete = async (id) => {

    try {
      const confirmed = window.confirm('Are you sure you want to delete this record?');
      if (confirmed) {
        await axios.delete(`http://localhost:8000/qualityrecords/delete/${id}`)
          .then((res) => {
            alert(res.data.message);
            console.log(res.data.message);
          })
          .catch((err) => {
            if (err.response) {
              console.log(err.response.data.message);
            } else {
              console.log("Error occured while processing your axios delete");
            }
          });
      } else {
        alert('Delete cancelled!');
      }
    } catch (err) {
      console.log('handleDelete function failed! ERROR' + err.message)
    }
  }

  const filterQualityRecords = allRecords.filter(records =>
  records.recordId.toLowerCase().includes(searchQualityRecords.toLowerCase()));

  return (
    <div>
      <div className="header">
        <div>
          <ul className="navbar">
          <div className="navi-left">
          <li>
              <a class="active" href="#qhome">
                Home
              </a>
            </li>
          </div>
            <div className="logo">
              <img src="./images/logo.png" className="image"></img>
            </div>
            <div className="navi-right">
            <li>
              <a href="#qrecord">Quality Records</a>
            </li>
            </div>
          </ul>
        </div>
      </div>
      <br></br> 
    <div className="container">
      <div>
        <h1>Quality Control Records</h1>

        <div className='input-group mb-3'>
          <input 
          type="text"
          className='orm-control'
          placeholder='Search by Record ID'
          value={searchQualityRecords}
          onChange={(e)=> setSearchQualityRecords(e.target.value)}
          />
          <button className='btn btn-outline-secondary' type ="button">
            <BsSearch />
          </button>

        </div>

        <button className="btn btn-success">
          <a href="/addQualityRecord" style={{ textDecoration: 'none', color: 'white' }}>Add New Record</a>
        </button>

        <div style={{ marginTop: "20px" }}>
          <div ref={componentPDF} style={{ width: "100%" }}>

          <div className="print-header" style={{ display: "none" }}>
            <img src="/images/logo.png" className='imageReport2' />
            <h1> Jayakody Koppara Stores </h1>
            <hr />
          </div>

          <div className="reportForm1">
          <table className="table quality-records-table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">RecordID</th>
                  <th scope="col">ProductType</th>
                  <th scope="col">QualityCheckedDate</th>
                  <th scope="col">SpecialNotes</th>
                  <th scope="col">TestResult</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>

              <tbody>
                {filterQualityRecords.map((records, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{records.recordId}</td>
                    <td>{records.productType}</td>
                    <td>{records.qualityCheckedDate}</td>
                    <td>{records.specialNotes}</td>
                    <td>{records.testResult}</td>
                    <td>

                      <div>
                        <a className="btn btn-outline-secondary border border-secondary" href={`/viewQRecord/${records._id}`}>
                          <i className="fas fa-eye"></i>&nbsp;View Record
                        </a>
                      </div>
                      <div>
                        <a className="btn btn-warning" href={`/editQualityRecord/${records._id}`}>
                          <i className="fas fa-edit"></i>&nbsp;Update
                        </a>
                        &nbsp;
                        <a className="btn btn-danger" href="#" onClick={() => handleDelete(records._id)}>
                          <i className="fas fa-trash-alt"></i>&nbsp;Delete
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>

            
          </div>
          <div className="d-grid d-md-flex justify-content-md-end mb-3">
            <button className="btn btn-light border border-secondary" onClick={generatePDF}>Generate Report</button>
          </div>

        </div>
      </div>
</div>

    </div>
  )
};
export default ViewQualityRecords;
