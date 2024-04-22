import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const CreateSpread = () => {
  const [treeID, settreeID] = useState("");
  const [identifyDate, setidentifyDate] = useState("");
  const [disease, setdisease] = useState("");
  const [spreadLevel, setspreadLevel] = useState("");
  const [specialNote, setspecialNote] = useState("");

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  //Implement sendDate function
  const sendData = async (e) => {
    e.preventDefault();

      // Clear previous errors
      setErrors({});

      // Validation
      let formValid = true;
      let errorsData = {};

      if (!treeID.trim()) {
          formValid = false;
          errorsData.treeID = "Tree ID is required";
      }
      if (!identifyDate.trim()) {
          formValid = false;
          errorsData.identifyDate = "Type of Tree is required";
      }
      if (!disease.trim()) {
          formValid = false;
          errorsData.disease = "Planted Date is required";
      }

      if (!spreadLevel.trim()) {
        formValid = false;
        errorsData.spreadLevel = "Planted Date is required";
    }

    if (!specialNote.trim()) {
      formValid = false;
      errorsData.
      specialNote = "Planted Date is required";
  }

        // If form is not valid, set errors and return
        if (!formValid) {
          setErrors(errorsData);
          return;
      }


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
            alert(err.response.data.error)
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
                    className={`form-control ${errors.treeID ? 'is-invalid' : ''}`}
                    name="treeID"
                    placeholder="Enter Tree ID"
                    onChange={(e) => settreeID(e.target.value)}
                    value={treeID}
                  />
                  {errors.treeID && <div className="invalid-feedback">{errors.treeID}</div>}
                </div>

                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Identify Date</label>
                  <input
                    type="date"
                    className={`form-control ${errors.identifyDate ? 'is-invalid' : ''}`}
                    name="identifyDate"
                    placeholder="Enter Identify Date"
                    onChange={(e) => setidentifyDate(e.target.value)}
                    value={identifyDate}
                  />
                    {errors.identifyDate && <div className="invalid-feedback">{errors.identifyDate}</div>}
                </div>

                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Disease</label>
                  <input
                    type="text"
                    className={`form-control ${errors.disease ? 'is-invalid' : ''}`}
                    name="disease"
                    placeholder="Enter Disease"
                    onChange={(e) => setdisease(e.target.value)}
                    value={disease}
                  />
                 {errors.disease && <div className="invalid-feedback">{errors.disease}</div>}

                </div>

                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Spread Level</label>
                  <select
                     className={`form-control ${errors.spreadLevel ? 'is-invalid' : ''}`}
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
                  {errors.spreadLevel && <div className="invalid-feedback">{errors.spreadLevel}</div>}
                </div>

                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Special Note</label>
                  <input
                    type="text"
                    className={`form-control ${errors.specialNote ? 'is-invalid' : ''}`}
                    name="specialNote"
                    placeholder="Enter Special Note"
                    onChange={(e) => setspecialNote(e.target.value)}
                    value={specialNote}
                  />
                {errors.specialNote && <div className="invalid-feedback">{errors.specialNote}</div>}

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
