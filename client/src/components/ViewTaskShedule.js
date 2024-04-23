import axios from "axios";
import React, {useEffect , useState , useRef} from "react";
import "./../stylesheets/plantation.css"; // import css file
import { BsSearch } from "react-icons/bs";

//import {useReactPrint}
import { useReactToPrint } from "react-to-print";

const ViewTaskShedule = () => {
    const ComponentPDF = useRef();

    
  const [allTaskShedule, setAllTaskShedule] = useState([]);
  // const [searchTaskShedule, setSearchTaskShedule] = useState('');

  useEffect(() => {
    const getAllTask = async () => {
      await axios
        .get("http://localhost:8000/viewShedule")
        .then((res) => {
          setAllTaskShedule(res.data.existingShedule);
          console.log("Status: " + res.data.success);
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data.error);
          } else {
            console.log(
              "Error Occured While Processing Your Axios Get Request. " +
                err.error
            );
          }
        });
    };

    getAllTask();
  }, []);

    //implement PDF Download function

    
  const generatePDF = useReactToPrint({
    content: () => ComponentPDF.current,
    documentTitle: "userData",
    onAfterPrint: () => alert("download successful"),
  });




  
  //Implementing handleDelete Function

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this items..?"
    );
    if (confirmed) {
      await axios
        .delete(`http://localhost:8000/taskShedule/delete/${id}`)
        .then((res) => {
          alert(res.data.message);
          console.log(res.data.message);
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data.error);
          } else {
            console.log(
              "Error Occured While Processing Your Axios Delete Request. " +
                err.error
            );
          }
        });
    } else {
      alert("Delete cancelled!");
    }
  };

  {/*//Employee based on searchemployee
   const filteredTask = allTaskShedule.filter((records) =>
    records.Department.toLowerCase().includes(searchTaskShedule.toLowerCase())
  );*/}

 return(
 <div>
    <p>All Task Shedules</p>

{/*
    <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Department Name"
          value={searchTaskShedule}
          onChange={(e) => setSearchTaskShedule(e.target.value)}
        />
        <button className="btn btn-outline-secondary" type="button">
          <BsSearch />
        </button>
 </div>  */}


      {allTaskShedule.map((records, index) => (
      <div ref={ComponentPDF} style={{ width: "100%" }}>
        <table className="table" id="plantTable">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Department</th>
              <th scope="col">Tasks</th>
              <th scope="col">startDate</th>
              <th scope="col">EndDate</th>
              <th scope="col">PriorityLevel</th>
            </tr>
          </thead>
          <tbody>
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{records.Department}</td>
                <td>{records.Tasks}</td>
                <td>{records.startDate}</td>
                <td>{records.EndDate}</td>
                <td>{records.PriorityLevel}</td>
                
                <td>
                  <a
                    className="btn btn-warning"
                    href={`/editEmp/${records._id}`}
                  >
                    <i className="fas fa-edit"></i>&nbsp;Edit
                  </a>
                  &nbsp;
                  <a
                    className="btn btn-danger"
                    href="#"
                    onClick={() => handleDelete(records._id)}
                  >
                    <i className="fas fa-trash-alt"></i>&nbsp;Delete
                  </a>
                </td>
              </tr>
          </tbody>
        </table>
      </div>
      
    ))}

      <button className="btn btn-success">
        <a href="/addTask" style={{ textDecoration: "none", color: "white" }}>
          Add NewTask Shedule
        </a>
      </button>

      <div className="d-grid d-md-flex justify-content-md-end mb-3">
        <button className="btn btn-success" onClick={generatePDF}>
          PDF
        </button>{" "}
      </div>
    </div>
  );
};

export default ViewTaskShedule;



  
