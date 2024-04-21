import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const CreateSpread = () => {
  const [treeID, settreeID] = useState("");
  const [identifyDate, setidentifyDate] = useState("");
  const [disease, setdisease] = useState("");
  const [spreadLevel, setspreadLevel] = useState("");
  const [specialNote, setspecialNote] = useState("");

  const navigate = useNavigate();

  //Implement sendDate function
  const sendData = async (e) => {
    e.preventDefault();

    // Add date validation
    const today = new Date();

    const selectedDateObj = new Date(identifyDate);

    if (selectedDateObj > today) {
      alert("You cannot select a future date."); // if user selected future date display alert message
      return;
    }

    try {
      let newRecord = {
        treeID: treeID,
        identifyDate: identifyDate,
        disease: disease,
        spreadLevel: spreadLevel,
        specialNote: specialNote,
      };

      await axios
        .post(`http://localhost:8000/diseasespread/create`, newRecord)
        .then((res) => {
          alert(res.data.message);
          navigate("/viewDisease");
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
      settreeID("");
      setidentifyDate("");
      setdisease("");
      setspreadLevel("");
      setspecialNote("");
    } catch (err) {
      console.log("SentData Dunction Failed ERROR: " + err.error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title text-center">Add Spread Records</h1>
              <form className="needs-validation" noValidate onSubmit={sendData}>
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Tree ID</label>
                  <input
                    type="text"
                    className="form-control"
                    name="treeID"
                    placeholder="Enter Tree ID"
                    onChange={(e) => settreeID(e.target.value)}
                    value={treeID}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Identify Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="identifyDate"
                    placeholder="Enter Identify Date"
                    onChange={(e) => setidentifyDate(e.target.value)}
                    value={identifyDate}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Disease</label>
                  <input
                    type="text"
                    className="form-control"
                    name="disease"
                    placeholder="Enter Disease"
                    onChange={(e) => setdisease(e.target.value)}
                    value={disease}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Spread Level</label>
                  <select
                    className="form-control"
                    name="spreadLevel"
                    onChange={(e) => setspreadLevel(e.target.value)}
                    value={spreadLevel}
                  >
                    <option value="">Select a Spread Level</option>
                    <option
                      value="High"
                      style={{ fontWeight: "bold", backgroundColor: "red" }}
                    >
                      High
                    </option>
                    <option
                      value="Medium"
                      style={{ fontWeight: "bold", backgroundColor: "yellow" }}
                    >
                      Medium
                    </option>
                    <option
                      value="Low"
                      style={{ fontWeight: "bold", backgroundColor: "green" }}
                    >
                      Low
                    </option>
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Special Note</label>
                  <input
                    type="text"
                    className="form-control"
                    name="specialNote"
                    placeholder="Enter Special Note"
                    onChange={(e) => setspecialNote(e.target.value)}
                    value={specialNote}
                  />
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
  );
};

export default CreateSpread;
