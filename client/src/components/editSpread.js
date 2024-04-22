import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditSpread = () => {
  const [treeID, settreeID] = useState("");
  const [identifyDate, setidentifyDate] = useState("");
  const [disease, setdisease] = useState("");
  const [spreadLevel, setspreadLevel] = useState("");
  const [specialNote, setspecialNote] = useState("");

    // State variables for form errors
    const [errors, setErrors] = useState({
      treeID: '',
      identifyDate: '',
      disease: '',
      spreadLevel: '',
      specialNote: '',
 
  });


  const { id } = useParams();
  const navigate = useNavigate();

  // Function to format date to yyyy-mm-dd format
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
    const getOneRecord = async () => {
      await axios
        .get(`http://localhost:8000/record/${id}`)
        .then((res) => {
          settreeID(res.data.record.treeID);
          setidentifyDate(formatDate(res.data.record.identifyDate));
          setdisease(res.data.record.disease);
          setspreadLevel(res.data.record.spreadLevel);
          setspecialNote(res.data.record.specialNote);
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

    getOneRecord();
  }, [id]);

  const updateData = async (e) => {
    e.preventDefault();

    const confirmed = window.confirm(
      "Are you sure you want to Update this items..?"
    );
    if (confirmed && validateForm()) {
      let updateRecord = {
        treeID: treeID,
        identifyDate: identifyDate,
        disease: disease,
        spreadLevel: spreadLevel,
        specialNote: specialNote,
      };

      await axios
        .put(`http://localhost:8000/diseasespread/update/${id}`, updateRecord)
        .then((res) => {
          alert(res.data.message);
          console.log(res.data.message);
          navigate("/viewDisease");
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
    } else {
      alert("Update cancelled!");
    }
  };

  // Function to validate the form
  const validateForm = () => {
    let formValid = true;
    let errorsData = { ...errors };

    if (!treeID.trim()) {
      formValid = false;
      errorsData.treeID = "Tree ID is required";
    }
    if (!identifyDate.trim()) {
      formValid = false;
      errorsData.identifyDate = "Identify Date is required";
    } else if (new Date(identifyDate) > new Date()) {
      formValid = false;
      errorsData.identifyDate = "Date cannot be a future date";
    }
    if (!disease.trim()) {
      formValid = false;
      errorsData.disease = "Disease is required";
    }

    if (!spreadLevel.trim()) {
      formValid = false;
      errorsData.spreadLevel = "Spread Level is required";
    }

    if (!specialNote.trim()) {
      formValid = false;
      errorsData.specialNote = "Special Note is required";
    }

    setErrors(errorsData);
    return formValid;
  };

  return (
    <div>
      <h1>Edit Record</h1>
      <form className="needs-validation" noValidate onSubmit={updateData}>
        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px" }}>Tree ID</label>
          <input
            type="text"
            className={`form-control ${errors.treeID ? "is-invalid" : ""}`}
            name="treeID"
            placeholder="Enter Tree ID"
            onChange={(e) => settreeID(e.target.value)}
            value={treeID}
          />
          {errors.treeID && (
            <div className="invalid-feedback">{errors.treeID}</div>
          )}
        </div>

        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px" }}>Identify Date</label>
          <input
            type="date"
            className={`form-control ${
              errors.identifyDate ? "is-invalid" : ""
            }`}
            name="identifyDate"
            placeholder="Enter Identify Date"
            onChange={(e) => setidentifyDate(e.target.value)}
            value={identifyDate}
          />
          {errors.identifyDate && (
            <div className="invalid-feedback">{errors.identifyDate}</div>
          )}
        </div>

        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px" }}>Disease</label>
          <input
            type="text"
            className={`form-control ${errors.disease ? "is-invalid" : ""}`}
            name="disease"
            placeholder="Enter Disease"
            onChange={(e) => setdisease(e.target.value)}
            value={disease}
          />
          {errors.disease && (
            <div className="invalid-feedback">{errors.disease}</div>
          )}
        </div>

        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px" }}>Spread Level</label>
          <select
            className={`form-control ${errors.spreadLevel ? "is-invalid" : ""}`}
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
          {errors.spreadLevel && (
            <div className="invalid-feedback">{errors.spreadLevel}</div>
          )}
        </div>

        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px" }}>Special Note</label>
          <input
            type="text"
            className={`form-control ${errors.specialNote ? "is-invalid" : ""}`}
            name="specialNote"
            placeholder="Enter Special Note"
            onChange={(e) => setspecialNote(e.target.value)}
            value={specialNote}
          />
          {errors.specialNote && (
            <div className="invalid-feedback">{errors.specialNote}</div>
          )}
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
  );
};

export default EditSpread;
