import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditSpread = () => {
    const [diseaseName, setdiseaseName] = useState("");
    const [diseaseType, setdiseaseType] = useState("");
    const [symptoms, setsymptoms] = useState("");
    const [preventiveMeasures, setpreventiveMeasures] = useState("");
    const [stages, setstages] = useState("");
    const [specialnotes, setspecialnotes] = useState("");

  // State variables for form errors
  const [errors, setErrors] = useState({
    diseaseName: "",
    diseaseType: "",
    symptoms: "",
    preventiveMeasures: "",
    stages: "",
    specialnotes: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getOneDisease = async () => {
      await axios
        .get(`http://localhost:8000/disease/${id}`)
        .then((res) => {
            setdiseaseName(res.data.disease_record.diseaseName);
            setdiseaseType(res.data.disease_record.diseaseType);
            setsymptoms(res.data.disease_record.symptoms);
            setpreventiveMeasures(res.data.disease_record.preventiveMeasures);
            setstages(res.data.disease_record.stages);
            setspecialnotes(res.data.disease_record.specialnotes);
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

    getOneDisease();
  }, [id]);

  const updateData = async (e) => {
    e.preventDefault();

    const confirmed = window.confirm(
      "Are you sure you want to Update this items..?"
    );
    if (confirmed && validateForm()) {
      let updateRecord = {
        diseaseName: diseaseName,
        diseaseType: diseaseType,
        symptoms: symptoms,
        preventiveMeasures: preventiveMeasures,
        stages: stages,
        specialnotes: specialnotes,
      };
/*-------------------*/
      await axios
        .put(`http://localhost:8000/disease/update/${id}`, updateRecord)
        .then((res) => {
          alert(res.data.message);
          console.log(res.data.message);
          navigate("/displayDiseases");
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

    if (!diseaseName.trim()) {
      formValid = false;
      errorsData.diseaseName = "Disease Name is required";
    }
    if (!diseaseType.trim()) {
      formValid = false;
      errorsData.diseaseType = "Disease Type is required";
    } 
    if (!symptoms.trim()) {
      formValid = false;
      errorsData.symptoms = "Symptoms is required";
    }

    if (!preventiveMeasures.trim()) {
      formValid = false;
      errorsData.preventiveMeasures = "Preventive Measures is required";
    }

    if (!stages.trim()) {
      formValid = false;
      errorsData.stages = "Stages is required";
    }

    if (!specialnotes.trim()) {
        formValid = false;
        errorsData.specialnotes = "Special Note is required";
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
              <h1 className="card-title text-center">Edit Disease Records</h1>
              <form
                className="needs-validation"
                noValidate
                onSubmit={updateData}
              >
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Disease Name</label>
                  <input
                    type="text"
                    className={`form-control ${errors.diseaseName ? 'is-invalid' : ''}`}
                    name="diseaseName"
                    placeholder="Enter Disease Name"
                    onChange={(e) => setdiseaseName(e.target.value)}
                    value={diseaseName}
                  />
                  {errors.diseaseName && <div className="invalid-feedback">{errors.diseaseName}</div>}
                </div>

                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Disease Type</label>
                  <select
                     className={`form-control ${errors.pestType ? 'is-invalid' : ''}`}
                    name="diseaseType"
                    onChange={(e) => setdiseaseType(e.target.value)}
                    value={diseaseType}
                  >
                    <option value="">Select a Disease Type</option>
                    <option value="Fungal">Fungal</option>            
                    <option value="Bacterial"> Bacterial </option>
                    <option value="Nematode"> Nematode </option>
                    <option value="Insect-Borne"> Insect-Borne </option>
                    <option value="Physiological"> Physiological </option>


                  </select>
                  {errors.diseaseType && <div className="invalid-feedback">{errors.diseaseType}</div>}
                </div>

                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Symptoms</label>
                  <input
                    type="textarea"
                    className={`form-control ${errors.symptoms ? 'is-invalid' : ''}`}
                    name="symptoms"
                    placeholder="Enter Symptoms"
                    onChange={(e) => setsymptoms(e.target.value)}
                    value={symptoms}
                  />
                 {errors.symptoms && <div className="invalid-feedback">{errors.symptoms}</div>}

                </div>



                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Preventive Measures</label>
                  <input
                    type="textarea"
                    className={`form-control ${errors.symptoms ? 'is-invalid' : ''}`}
                    name="preventiveMeasures"
                    placeholder="Enter Preventive Measures"
                    onChange={(e) => setpreventiveMeasures(e.target.value)}
                    value={preventiveMeasures}
                  />
                 {errors.preventiveMeasures && <div className="invalid-feedback">{errors.preventiveMeasures}</div>}

                </div>

                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Stages</label>
                  <select
                     className={`form-control ${errors.stages ? 'is-invalid' : ''}`}
                    name="stages"
                    onChange={(e) => setstages(e.target.value)}
                    value={stages}
                  >
                    <option value="">Select Stage of Disease</option>
                    <option
                      value="Severe"
                      style={{ fontWeight: "bold", backgroundColor: "red" }}
                    >
                      Severe
                    </option>
                    <option
                      value="Moderate"
                      style={{ fontWeight: "bold", backgroundColor: "yellow" }}
                    >
                      Moderate
                    </option>
                    <option
                      value="Mild"
                      style={{ fontWeight: "bold", backgroundColor: "green" }}
                    >
                      Mild
                    </option>
                  </select>
                  {errors.stages && <div className="invalid-feedback">{errors.stages}</div>}
                </div>

                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ marginBottom: "5px" }}>Special Note</label>
                  <input
                    type="text"
                    className={`form-control ${errors.specialnotes ? 'is-invalid' : ''}`}
                    name="specialnotes"
                    placeholder="Enter Special Note"
                    onChange={(e) => setspecialnotes(e.target.value)}
                    value={specialnotes}
                  />
                {errors.specialnotes && <div className="invalid-feedback">{errors.specialnotes}</div>}

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

export default EditSpread;
