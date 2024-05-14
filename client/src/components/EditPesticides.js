import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditPesticides = () => {
    const [disease, setdisease] = useState("");
    const [pestName, setpestName] = useState("");
    const [pestType, setpestType] = useState("");
    const [quantity, setquantity] = useState("");
    const [method, setmethod] = useState("");
    const [guidelines, setguidelines] = useState("");
    const [precautions, setprecautions] = useState("");
  
  // State variables for form errors
  const [errors, setErrors] = useState({
    disease: "",
    pestName: "",
    pestType: "",
    quantity: "",
    method: "",
    guidelines: "",
    precautions: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getOnePesticide = async () => {
      await axios
        .get(`http://localhost:8000/pestcide/${id}`)
        .then((res) => {
            setdisease(res.data.pestcide_record.disease);
            setpestName(res.data.pestcide_record.pestName);
            setpestType(res.data.pestcide_record.pestType);
            setquantity(res.data.pestcide_record.quantity);
            setmethod(res.data.pestcide_record.method);
            setguidelines(res.data.pestcide_record.guidelines);
            setprecautions(res.data.pestcide_record.precautions);
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

    getOnePesticide();
  }, [id]);

  const updateData = async (e) => {
    e.preventDefault();

    const confirmed = window.confirm(
      "Are you sure you want to Update this items..?"
    );
    if (confirmed && validateForm()) {
      let updateRecord = {
        disease: disease,
        pestName: pestName,
        pestType: pestType,
        quantity: quantity,
        method: method,
        guidelines: guidelines,
        precautions: precautions,
      };
/*-------------------*/
      await axios
        .put(`http://localhost:8000/pestcides/update/${id}`, updateRecord)
        .then((res) => {
          alert(res.data.message);
          console.log(res.data.message);
          navigate("/displayPesticides");
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

  //   if (!quantity.trim()) {
  //     formValid = false;
  //     errorsData.quantity = "quantity is required";
  // }

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

  

    setErrors(errorsData);
    return formValid;
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title text-center">Edit Pestcides Records</h1>
              <form
                className="needs-validation"
                noValidate
                onSubmit={updateData}
              >
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

export default EditPesticides;
