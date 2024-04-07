import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateFertilizationDetails = () => {
  const [TreeNo, setTreeNo] = useState("");
  const [TreeStage, setTreeStage] = useState("");
  const [Date, setDate] = useState("");
  const [UreaAmount, setUreaAmount] = useState("");
  const [EppawalaRockPhosphateAmount, setEppawalaRockPhosphateAmount] = useState("");
  const [MuriateOfPotasiumAmount, setMuriateOfPotasiumAmount] = useState("");
  const [DolamiteAmount, setDolamiteAmount] = useState("");
  const [Description, setDescription] = useState("");

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
    const getOneFRecord = async () => {
      await axios
        .get(`http://localhost:8000/fertilizationrec/${id}`)
        .then((res) => {
          setTreeNo(res.data.record.TreeNo);
          setTreeStage(res.data.record.TreeStage);
          setDate(res.data.record.Date);
          setUreaAmount(res.data.record.UreaAmount);
          setEppawalaRockPhosphateAmount(res.data.record.EppawalaRockPhosphateAmount);
          setMuriateOfPotasiumAmount(res.data.record.MuriateOfPotasiumAmount);
          setDolamiteAmount(res.data.record.DolamiteAmount);
          setDescription(res.data.record.Description);
          console.log(res.data.message);
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data.error);
          } else {
            console.log("Error occurred while processing your get request");
          }
        });
    };

    getOneFRecord();
  }, [id]);

  const updateFData = async (e) => {
    e.preventDefault();

    try {
      const confirmed = window.confirm(
        "Are you sure you want to update this Record?"
      );
      if (confirmed) {
        let updatedFertilizationData = {
            TreeNo: TreeNo,
            TreeStage: TreeStage,
            Date: Date,
            UreaAmount: UreaAmount,
            EppawalaRockPhosphateAmount: EppawalaRockPhosphateAmount,
            MuriateOfPotasiumAmount: MuriateOfPotasiumAmount,
            DolamiteAmount: DolamiteAmount,
            Description: Description,
        };

        await axios
          .put(
            `http://localhost:8000/fertilizationrec/update/${id}`,
            updatedFertilizationData
          )
          .then((res) => {
            alert(res.data.success);
            console.log(res.data.success);
            navigate("/viewFertilization");
          })
          .catch((err) => {
            if (err.response) {
              console.log(err.response.data.success);
            } else {
              console.log("Error occurred while processing your put request");
            }
          });
      } else {
        alert("Update cancelled!");
      }
    } catch (err) {
      console.log("Update failed!");
    }
  };

  return (
    <div className="col-md-8 mt-4 mx-auto">
      <h1 className="h3 mb-3 font-weight-normal">Update Record</h1>
      <form className="needs-validation" noValidate onSubmit={updateFData}>
        <div className="form-group" style={{ marginBottom: "15px" }}>
        <label style={{marginBottom:'5px'}}>Tree No</label>
          <input
            type="text"
            className={`form-control `}
            name="TreeNo"
            placeholder="Enter the Tree Number"
            onChange={(e) => setTreeNo(e.target.value)}
            value={TreeNo}
            required
          />
          
        </div>

        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px" }}>TreeStage</label>
          <input
            type="text"
            className={`form-control `}
            name="TreeStage"
            placeholder="Enter TreeStage"
            onChange={(e) => setTreeStage(e.target.value)}
            value={TreeStage}
            required
          />
          
        </div>

        <div className="form-group" style={{marginBottom:'15px'}}>
            <label style={{marginBottom:'5px'}}>Date</label>
            <input 
                type="date" 
                className="form-control" 
                name="Date" 
                placeholder="Enter the Date of fertilization"
                value={Date}
                onChange={(e) => setDate(e.target.value)}
                required/>
        </div>

        <div className="form-group" style={{marginBottom:'15px'}}>
                       <label style={{marginBottom:'5px'}}>Amount of Urea(g)</label>
                      <input type="Number" 
                      className="form-control" 
                      name="UreaAmount" 
                       placeholder="Enter the Urea Amount"
                       value={UreaAmount}
                       onChange={(e) => setUreaAmount(e.target.value)}
                       required/>
        </div>

        <div className="form-group" style={{marginBottom:'15px'}}>
                      <label style={{marginBottom:'5px'}}>Amount of EppawalaRock Phosphate Amount(g)</label>
                      <input type="Number" 
                      className="form-control" 
                      name="EppawalaRockPhosphateAmount" 
                       placeholder="Enter the EppawalaRockPhosphate Amount "
                       value={EppawalaRockPhosphateAmount}
                       onChange={(e) => setEppawalaRockPhosphateAmount(e.target.value)}
                       required/>
                   </div>

                   <div className="form-group" style={{marginBottom:'15px'}}>
                       <label style={{marginBottom:'5px'}}>Amount of Muriate Of Potasium Amount(g)</label>
                       <input type="Number" 
                       className="form-control" 
                       name="MuriateOfPotasiumAmount" 
                       placeholder="Enter the MuriateOfPotasium Amount"
                     value={MuriateOfPotasiumAmount}
                     onChange={(e) => setMuriateOfPotasiumAmount(e.target.value)}
                       required/>
                   </div>

                   <div className="form-group" style={{marginBottom:'15px'}}>
                     <label style={{marginBottom:'5px'}}>Amount of Dolamite Amount(g)</label>
                      <input type="Number" 
                      className="form-control" 
                       name="DolamiteAmount" 
                       placeholder="Enter the Dolamite Amount"
                       value={DolamiteAmount}
                       onChange={(e) => setDolamiteAmount(e.target.value)}
                       required/>
                   </div>

                   <div className="form-group" style={{marginBottom:'15px'}}>
                       <label style={{marginBottom:'5px'}}>Description</label>
                      <textarea 
                       className="form-control" 
                       name="Description" 
                       placeholder="Description"
                      value={Description}
                      onChange={(e) => setDescription(e.target.value)}
                      required/>
                   </div>

        <button
          className="btn btn-success"
          type="submit"
          style={{ marginTop: "15px" }}
        >
          &nbsp;Update
        </button>
      </form>
    </div>
  );
};

export default UpdateFertilizationDetails;

