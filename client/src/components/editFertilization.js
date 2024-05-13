import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import Calculator from './Calculator';
import '../stylesheets/fertilizationcreate.css';
import * as Yup from "yup";
import { useParams, useNavigate } from "react-router-dom";

const UpdateFertilizationDetails = () => {
  const [TreeNo, setTreeNo] = useState("");
  const [TreeStage, setTreeStage] = useState("");
  const [FertilizationDate, setFertilizationDate] = useState("");
  const [UreaAmount, setUreaAmount] = useState("");
  const [EppawalaRockPhosphateAmount, setEppawalaRockPhosphateAmount] = useState("");
  const [MuriateOfPotasiumAmount, setMuriateOfPotasiumAmount] = useState("");
  const [DolamiteAmount, setDolamiteAmount] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      TreeNo: '',
      TreeStage: '',
      FertilizationDate: '',
      UreaAmount: '',
      EppawalaRockPhosphateAmount: '',
      MuriateOfPotasiumAmount: '',
      DolamiteAmount: '',
    },
    validationSchema: Yup.object({
      TreeNo: Yup.string()
        .required("Tree No is required"),
      TreeStage: Yup.string()
        .required("Tree Stage is required"),
      FertilizationDate: Yup.date()
        .required("Fertilization Date is required"),
      UreaAmount: Yup.number()
        .required("Urea Amount is required")
        .min(0, "Urea Amount must be a positive value"),
      EppawalaRockPhosphateAmount: Yup.number()
        .required("Eppawala Rock Phosphate Amount is required")
        .min(0, "Eppawala Rock Phosphate Amount must be a positive value"),
      MuriateOfPotasiumAmount: Yup.number()
        .required("Muriate Of Potasium Amount is required")
        .min(100, "Muriate Of Potasium Amount must be a positive value"),
      DolamiteAmount: Yup.number()
        .required("Dolamite Amount is required")
        .min(0, "Dolamite Amount must be a positive value")
    }),
    onSubmit: async (values) => {
      await updateFData(values);
    }
  });

  useEffect(() => {
    const getOneFRecord = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/fertilizationrec/${id}`);
        const record = response.data.record;
        formik.setValues(record);
        setTreeNo(record.TreeNo);
        setTreeStage(record.TreeStage);
        setFertilizationDate(record.FertilizationDate);
        setUreaAmount(record.UreaAmount);
        setEppawalaRockPhosphateAmount(record.EppawalaRockPhosphateAmount);
        setMuriateOfPotasiumAmount(record.MuriateOfPotasiumAmount);
        setDolamiteAmount(record.DolamiteAmount);
        //formik.resetForm();
        console.log(response.data.message);
      } catch (error) {
        console.log("Error occurred while fetching record:", error.message);
      }
    };

    getOneFRecord();
  }, [id]);

  const updateFData = async (updatedFertilizationData) => {
    //e.preventDefault();

    try {
      const confirmed = window.confirm("Are you sure you want to update this Record?");
      if (confirmed) {
        // let updatedFertilizationData = {
        //   TreeNo: TreeNo,
        //   TreeStage: TreeStage,
        //   FertilizationDate: FertilizationDate,
        //   UreaAmount: UreaAmount,
        //   EppawalaRockPhosphateAmount: EppawalaRockPhosphateAmount,
        //   MuriateOfPotasiumAmount: MuriateOfPotasiumAmount,
        //   DolamiteAmount: DolamiteAmount,
        // };

        await axios.put(`http://localhost:8000/fertilizationrec/update/${id}`, updatedFertilizationData);
        alert("Record updated successfully");
        navigate("/viewFertilization");
      } else {
        alert("Update cancelled!");
      }
    } catch (err) {
      console.log("Update failed!");
    }
  };

  return (
    <div className="row">
    <div className="col-md-8 mt-4 mx-auto">
    <div className="f-form-container">
<h1 className="h3 mb-3 font-weight-normal">Update Fertilization detail</h1>
<form className="needs-validation" noValidate onSubmit={formik.handleSubmit}>
    <div className="f-form-group">
        <label>Tree No</label>
        <input
            type="text"
            className={`f-form-control ${formik.errors.TreeNo && formik.touched.TreeNo && 'is-invalid'}`}
            name="TreeNo"
            placeholder="Enter Tree No"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.TreeNo}
        />
     {formik.errors.TreeNo && formik.touched.TreeNo && <div className="invalid-feedback">{formik.errors.TreeNo}</div>}
            </div>

            <div className="f-form-group">
            <label>Tree Stage</label>
            <select
                   className={`f-form-control ${formik.errors.TreeStage && formik.touched.TreeStage && 'is-invalid'}`}
                   name="TreeStage"
                   onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.TreeStage}
            >
            <option value="">Select Tree Stage</option>
            <option value="Just Planted">Just Plant</option>
            <option value="Young Palm">Young Palm-6months-4 years</option>
            <option value="Adult Palm">Adult Palm-above 4 years</option>
          </select>
          {formik.errors.TreeStage && formik.touched.TreeStage && <div className="invalid-feedback">{formik.errors.TreeStage}</div>}
            </div>

    <div className="f-form-group">
        <label>Date</label>
        <input 
            type="date" 
            className={`f-form-control ${formik.errors.FertilizationDate && formik.touched.FertilizationDate && 'is-invalid'}`}
            name="FertilizationDate" 
            placeholder="Enter the Date of fertilization"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.FertilizationDate}
            max={new Date().toISOString().split('T')[0]}
                />
                {formik.errors.FertilizationDate && formik.touched.FertilizationDate && <div className="invalid-feedback">{formik.errors.FertilizationDate}</div>}
            </div>

    <div className="f-form-group">
        <label>Amount of Urea(g)</label>
        <input type="Number" 
            className={`f-form-control ${formik.errors.UreaAmount && formik.touched.UreaAmount && 'is-invalid'}`} 
            name="UreaAmount" 
            placeholder="Enter the Urea Amount"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.UreaAmount}
        />
    {formik.errors.UreaAmount && formik.touched.UreaAmount && <div className="invalid-feedback">{formik.errors.UreaAmount}</div>}
            </div>

    <div className="f-form-group">
        <label>Eppawala Rock Phosphate Amount(g)</label>
        <input type="Number" 
            className={`f-form-control ${formik.errors.EppawalaRockPhosphateAmount && formik.touched.EppawalaRockPhosphateAmount && 'is-invalid'}`}
            name="EppawalaRockPhosphateAmount" 
            placeholder="Enter the EppawalaRockPhosphate Amount "
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.EppawalaRockPhosphateAmount}
        />
    {formik.errors.EppawalaRockPhosphateAmount && formik.touched.EppawalaRockPhosphateAmount && <div className="invalid-feedback">{formik.errors.EppawalaRockPhosphateAmount}</div>}
            </div>

    <div className="f-form-group">
        <label>Muriate Of Potasium Amount(g)</label>
        <input type="Number" 
            className={`f-form-control ${formik.errors.MuriateOfPotasiumAmount && formik.touched.MuriateOfPotasiumAmount && 'is-invalid'}`}
            name="MuriateOfPotasiumAmount" 
            placeholder="Enter the MuriateOfPotasium Amount"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.MuriateOfPotasiumAmount}
        />
    {formik.errors.MuriateOfPotasiumAmount && formik.touched.MuriateOfPotasiumAmount && <div className="invalid-feedback">{formik.errors.MuriateOfPotasiumAmount}</div>}
            </div>

    <div className="f-form-group">
        <label>Amount of Dolamite Amount(g)</label>
        <input type="Number" 
            className={`f-form-control ${formik.errors.DolamiteAmount && formik.touched.DolamiteAmount && 'is-invalid'}`}
            name="DolamiteAmount" 
            placeholder="Enter the Dolamite Amount"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.DolamiteAmount}
        />
    {formik.errors.DolamiteAmount && formik.touched.DolamiteAmount && <div className="invalid-feedback">{formik.errors.DolamiteAmount}</div>}
            </div>
                   {/* <div className="form-group" style={{marginBottom:'15px'}}>
                       <label style={{marginBottom:'5px'}}>Description</label>
                      <textarea 
                       className="form-control" 
                       name="Description" 
                       placeholder="Description"
                      value={Description}
                      onChange={(e) => setDescription(e.target.value)}
                      required/>
                   </div> */}

        <button
          className="btn btn-success"
          type="submit"
          style={{ marginTop: "15px" }}
        >
          <i className="far fa-check-square"></i>
          &nbsp;Update
        </button>
      </form>
      </div>
      </div>
      <div className="col-md-4 mt-3 mx-auto" style={{ margin: "0 20px", maxWidth: "fit-content" }}>
      
                      {/* Calculator component */}
                      <Calculator />
                  </div>
              </div>
      
          );
      };

export default UpdateFertilizationDetails;

