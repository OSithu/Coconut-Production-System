import axios from "axios";
import React, { useState } from "react";

const CreateShedule = () => {
  const [Department, setDepartment] = useState("");
  const [Tasks, setTasks] = useState("");
  const [startDate, setstartDate] = useState("");
  const [EndDate, setEndDate] = useState("");
  const [PriorityLevel, setPriorityLevel] = useState("");

  //Implementing send Data function
  const sendData = async (e) => {
    e.preventDefault();

    try {
      let newShedule = {
        Department: Department,
        Tasks: Tasks,
        startDate: startDate,
        EndDate: EndDate,
        PriorityLevel: PriorityLevel,
      };
      await axios
        .post("http://localhost:8000/Shedule/save", newShedule)
        .then((res) => {
          alert(res.data.message);
          console.log("Status " + res.data.success);
          console.log(res.data.message);
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data.error);
          } else {
            console.log(
              "Error Occured While Processing Your Axios Post Request. " +
                err.error
            );
          }
        });
      //set state back to first state
      setDepartment("");
      setTasks("");
      setstartDate("");
      setEndDate("");
      setPriorityLevel("");
    } catch (err) {
      console.log("Sent Data Function Failed ERROR: " + err.error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title text-center">Edit Task Shedule</h1>
              <div>
                <form
                  className="needs-validation"
                  noValidate
                  onSubmit={sendData}
                >
                  <div className="form-group" style={{ marginBottom: "15px" }}>
                    <label style={{ marginBottom: "5px" }}>Department</label>
                    <select
                      className="form-control"
                      name="department"
                      onChange={(e) => setDepartment(e.target.value)}
                      value={Department}
                    >
                      <option value="">Select Department</option>
                      <option value="sales">Sales and Marketing </option>
                      <option value="Finance">Finance and Accounting</option>
                      <option value="HR">Human Resources</option>
                      <option value="plantation">Plantation </option>
                      <option value="Production ">Production </option>
                    </select>
                  </div>
                  <div className="form-group" style={{ marginBottom: "15px" }}>
                    <label style={{ marginBottom: "5px" }}>Task</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      cols="50"
                      name="task"
                      value={Tasks}
                      onChange={(e) => setTasks(e.target.value)}
                      placeholder="Enter Task..."
                    ></textarea>
                  </div>
                  <div className="form-group" style={{ marginBottom: "15px" }}>
                    <label style={{ marginBottom: "5px" }}>startDate </label>
                    <input
                      type="date"
                      className="form-control"
                      name="startDate"
                      placeholder="Enter startDate"
                      onChange={(e) => setstartDate(e.target.value)}
                      value={startDate}
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: "15px" }}>
                    <label style={{ marginBottom: "5px" }}>startDate </label>
                    <input
                      type="date"
                      className="form-control"
                      name="EndDate"
                      placeholder="Enter EndDate"
                      onChange={(e) => setEndDate(e.target.value)}
                      value={EndDate}
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: "15px" }}>
                    <label style={{ marginBottom: "5px" }}>PriorityLevel</label>
                    <select
                      className="form-control"
                      name="PriorityLevel"
                      onChange={(e) => setPriorityLevel(e.target.value)}
                      value={PriorityLevel}
                    >
                      <option value="">Select Priority Level</option>
                      <option value="High">High </option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                  <button
                    className="btn btn-success"
                    type="submit"
                    style={{ marginTop: "15px" }}
                  >
                    <i className="far fa-check-square"></i>
                    &nbsp; Save
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateShedule;
