import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const CreatePesticides= () => {
  const [disease, setdisease] = useState("");
  const [pestName, setpestName] = useState("");
  const [pestType, setpestType] = useState("");
  const [quantity, setquantity] = useState("");
  const [method, setmethod] = useState("");
  const [guidelines, setguidelines] = useState("");
  const [precautions, setprecautions] = useState("");

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

      if (!disease.trim()) {
          formValid = false;
          errorsData.disease = "disease is required";
      }
      if (!pestName.trim()) {
          formValid = false;
          errorsData.pestName = "pestName is required";
      }
      if (!pestType.trim()) {
          formValid = false;
          errorsData.pestType = "pestType is required";
      }

      if (!quantity.trim()) {
        formValid = false;
        errorsData.quantity = "quantity is required";
    }

    if (!method.trim()) {
      formValid = false;
      errorsData.method = "Method is required";
  }

  if (!guidelines.trim()) {
    formValid = false;
    errorsData.guidelines = "guidelines is required";
}

if (!precautions.trim()) {
    formValid = false;
    errorsData.precautions = "precautions is required";
}


        // If form is not valid, set errors and return
        if (!formValid) {
          setErrors(errorsData);
          return;
      }



    try {
      let newPesticide = {
        disease: disease,
        pestName: pestName,
        pestType: pestType,
        quantity: quantity,
        method: method,
        guidelines: guidelines,
        precautions: precautions,
      };

      await axios
        .post(`http://localhost:8000/pestcides/create`, newPesticide)
        .then((res) => {
          alert(res.data.message);
          navigate("/displayPesticides");
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
      setdisease("");
      setpestName("");
      setpestType("");
      setquantity("");
      setmethod("");
      setguidelines("");
      setprecautions("");
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
              <h1 className="card-title text-center">Add New Pesticides</h1>
              <form className="needs-validation" noValidate onSubmit={sendData}>
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Disease Name</label>
                  <input
                    type="text"
                    className={`form-control ${errors.disease ? 'is-invalid' : ''}`}
                    name="disease"
                    placeholder="Enter Disease Name"
                    onChange={(e) => setdisease(e.target.value)}
                    value={disease}
                  />
                  {errors.disease && <div className="invalid-feedback">{errors.disease}</div>}
                </div>

                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Pesticide Name</label>
                  <input
                    type="text"
                    className={`form-control ${errors.pestName ? 'is-invalid' : ''}`}
                    name="pestName"
                    placeholder="Enter pestName Name"
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

                
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Pest Method</label>
                  <select
                    className={`form-control ${errors.method ? 'is-invalid' : ''}`}
                    name="method"
                    onChange={(e) => setmethod(e.target.value)}
                    value={method}
                  >
                    <option value="">Select a Method</option>
                    <option value="Spraying">Spraying</option>            
                    <option value="Injection"> Injection </option>
                    <option value="Broadcasting">Broadcasting</option>            
                    <option value="Basal Application"> Basal Application </option>
                    <option value="Drip Irrigation"> Drip Irrigation </option>


                  </select>
                  {errors.method && <div className="invalid-feedback">{errors.method}</div>}
                </div>


                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Guidelines</label>
                  <input
                    type="textarea"
                    className={`form-control ${errors.symptoms ? 'is-invalid' : ''}`}
                    name="guidelines"
                    placeholder="Enter Guidelines"
                    onChange={(e) => setguidelines(e.target.value)}
                    value={guidelines}
                  />
                 {errors.guidelines && <div className="invalid-feedback">{errors.guidelines}</div>}

                </div>



                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Precautions </label>
                  <input
                    type="textarea"
                    className={`form-control ${errors.symptoms ? 'is-invalid' : ''}`}
                    name="precautions"
                    placeholder="Enter Precautions"
                    onChange={(e) => setprecautions(e.target.value)}
                    value={precautions}
                  />
                 {errors.precautions && <div className="invalid-feedback">{errors.precautions}</div>}

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

export default CreatePesticides;
