import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const CreateSpread = () => {
  const [treeID, settreeID] = useState("");
  const [pestDate, setpestDate] = useState("");
  const [pestName, setpestName] = useState("");
  const [pestType, setpestType] = useState("");
  const [quantity, setquantity] = useState("");


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



        // If form is not valid, set errors and return
        if (!formValid) {
          setErrors(errorsData);
          return;
      }


    // Add date validation
    const today = new Date();

    const selectedDateObj = new Date(pestDate);

    if (selectedDateObj > today) {
      alert("You cannot select a future date."); // if user selected future date display alert message
      return;
    }

    try {
      let newRecord = {
        treeID: treeID,
        pestDate: pestDate,
        pestName: pestName,
        pestType: pestType,
        quantity: quantity,
      };

      await axios
        .post(`http://localhost:8000/pestrecord/create`, newRecord)
        .then((res) => {
          alert(res.data.message);
          navigate("/viewPestRecords");
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
      setpestDate("");
      setpestName("");
      setpestType("");
      setquantity("");
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
                  <label style={{ marginBottom: "5px" }}>Pest Date</label>
                  <input
                    type="date"
                    className={`form-control ${errors.pestDate ? 'is-invalid' : ''}`}
                    name="pestDate"
                    placeholder="Enter Pest Date"
                    onChange={(e) => setpestDate(e.target.value)}
                    value={pestDate}
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
                    <option value="Gaseous Formulations"> Gaseous Formulations </option>
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

export default CreateSpread;
