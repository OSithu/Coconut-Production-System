import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditPestRecord = () => {
    const [treeID, settreeID] = useState("");
    const [pestDate, setpestDate] = useState("");
    const [pestName, setpestName] = useState("");
    const [pestType, setpestType] = useState("");
    const [quantity, setquantity] = useState("");

  // State variables for form errors
  const [errors, setErrors] = useState({
    treeID: "",
    pestDate: "",
    pestName: "",
    pestType: "",
    quantity: "",
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
        .get(`http://localhost:8000/pestrecord/${id}`)
        .then((res) => {
          settreeID(res.data.pest_record.treeID);
          setpestDate(formatDate(res.data.pest_record.pestDate));
          setpestName(res.data.pest_record.pestName);
          setpestType(res.data.pest_record.pestType);
          setquantity(res.data.pest_record.quantity);
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
        pestDate: pestDate,
        pestName: pestName,
        pestType: pestType,
        quantity: quantity,
      };

      await axios
        .put(`http://localhost:8000/pestrecord/update/${id}`, updateRecord)
        .then((res) => {
          alert(res.data.message);
          console.log(res.data.message);
          navigate("/viewPestRecords");
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
    if (!pestDate.trim()) {
        formValid = false;
        errorsData.pestDate = "Pest Date is required";
    }
    if (!pestName.trim()) {
        formValid = false;
        errorsData.pestName = "Pest Name is required";
    }

    if (!pestType.trim()) {
      formValid = false;
      errorsData.pestType = "Planted Date is required";
  }

if (!quantity.trim()) {
  formValid = false;
  errorsData.
  quantity = "Quantity is required";
}

    setErrors(errorsData);
    return formValid;
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title text-center">Edit Pest Add Records</h1>
              <form
                className="needs-validation"
                noValidate
                onSubmit={updateData}
              >
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
                  <label style={{ marginBottom: "5px" }}>Pest Date</label>
                  <input
                    type="date"
                    className={`form-control ${errors.pestDate ? 'is-invalid' : ''}`}
                    name="pestDate"
                    placeholder="Enter Pest Date"
                    onChange={(e) => setpestDate(e.target.value)}
                    value={pestDate}
                    max={
                      new Date().toISOString().split('T')[0]
     }
                
                  />
                    {errors.pestDate && <div className="invalid-feedback">{errors.pestDate}</div>}
                </div>

                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Pest Name</label>
                  <input
                    type="text"
                    className={`form-control ${errors.pestName ? 'is-invalid' : ''}`}
                    name="pestName"
                    placeholder="Enter Pest Name"
                    onChange={(e) => setpestName(e.target.value)}
                    value={pestName}
                  />
                 {errors.pestName && <div className="invalid-feedback">{errors.pestName}</div>}

                </div>

                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Pest Type</label>
                  <select
                     className={`form-control ${errors.pestType ? 'is-invalid' : ''}`}
                    name="pestType"
                    onChange={(e) => setpestType(e.target.value)}
                    value={pestType}
                  >
                    <option value="">Select a Spread Level</option>
                    <option value="Liquid Formulations">Liquid Formulations</option>            
                    <option value="Solid Formulations"> Solid Formulations </option>


                  </select>
                  {errors.pestType && <div className="invalid-feedback">{errors.pestType}</div>}
                </div>

                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Quantity</label>
                  <input
                    type="number"
                    className={`form-control ${errors.quantity ? 'is-invalid' : ''}`}
                    name="quantity"
                    placeholder="Enter Quantity"
                    onChange={(e) => setquantity(e.target.value)}
                    value={quantity}
                  />
                {errors.quantity && <div className="invalid-feedback">{errors.quantity}</div>}

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

export default EditPestRecord;
