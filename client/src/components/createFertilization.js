import React, { useState } from "react";
import axios from 'axios';

const CreateFertilizationDetails = () => {
    const [TreeNo, setTreeNo] = useState('');
    const [TreeStage, setTreeStage] = useState('');
    const [FertilizationDate, setFertilizationDate] = useState('');
    const [UreaAmount, setUreaAmount] = useState('');
    const [EppawalaRockPhosphateAmount, setEppawalaRockPhosphateAmount] = useState('');
    const [MuriateOfPotasiumAmount, setMuriateOfPotasiumAmount] = useState('');
    const [DolamiteAmount, setDolamiteAmount] = useState('');
    const [errors, setErrors] = useState({});

    // Validate Form
    const validateForm = () => {
        const errors = {};
        let isValid = true;

        if (!TreeNo.trim()) {
            errors.TreeNo = "Tree No is required";
            isValid = false;
        }

        if (!TreeStage.trim()) {
            errors.TreeStage = "Tree Stage is required";
            isValid = false;
        }

        if (!FertilizationDate.trim()) {
            errors.FertilizationDate = "Fertilization Date is required";
        }

        if (!UreaAmount.trim()) {
            errors.UreaAmount = "Urea Amount is required";
            isValid = false;
        }else if (UreaAmount < 100 || UreaAmount > 1000) {
            errors.UreaAmount = "Urea Amount must be between 100 and 1000";
            isValid = false;
        }

        if (!EppawalaRockPhosphateAmount.trim()) {
            errors.EppawalaRockPhosphateAmount = "Eppawala Rock Phosphate Amount is required";
            isValid = false;
        }else if (EppawalaRockPhosphateAmount < 100 || EppawalaRockPhosphateAmount > 1000) {
            errors.EppawalaRockPhosphateAmount = "EppawalaRock Phosphate Amount must be between 100 and 1000";
            isValid = false;
        }

        if (!MuriateOfPotasiumAmount.trim()) {
            errors.MuriateOfPotasiumAmount = "Muriate Of Potasium Amount is required";
            isValid = false;
        }else if (MuriateOfPotasiumAmount < 100 || MuriateOfPotasiumAmount > 1000) {
            errors.MuriateOfPotasiumAmount = "MuriateOf Potasium Amount must be between 100 and 1000";
            isValid = false;
        }

        if (!DolamiteAmount.trim()) {
            errors.DolamiteAmount = "Dolamite Amount is required";
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };


    //implement sendData function
    const sendFertilizationData = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            let newFertilizationData = {
                TreeNo: TreeNo,
                TreeStage: TreeStage,
                FertilizationDate: FertilizationDate,
                UreaAmount: UreaAmount,
                EppawalaRockPhosphateAmount: EppawalaRockPhosphateAmount,
                MuriateOfPotasiumAmount: MuriateOfPotasiumAmount,
                DolamiteAmount: DolamiteAmount,
            };

            await axios.post('http://localhost:8000/fertilizationrec/save', newFertilizationData)
                .then((res) => {
                    alert(res.data.success);
                    console.log(res.data.success);
                })
                .catch((err) => {
                    if (err.response) {
                        console.log(err.response.data.error);
                    } else {
                        console.log("Error occurred while processing your axios post request. " + err.error);
                    }
                });

                 //set state back to first state
                   setTreeNo('');
                   setTreeStage('');
                   setFertilizationDate('');
                   setUreaAmount('');
                   setEppawalaRockPhosphateAmount('');
                   setMuriateOfPotasiumAmount('');
                   setDolamiteAmount('');
                   setErrors({});

        } catch (err) {
            console.log('sendData function failed! ERROR: ' + err.message);
        }
    };

    return (
        <div className="col-md-8 mt-4 mx-auto">
    <h1 className="h3 mb-3 font-weight-normal">Add new Fertilization detail</h1>
    <form className="needs-validation" noValidate onSubmit={sendFertilizationData}>
        <div className="form-group">
            <label>Tree No</label>
            <input
                type="text"
                className={`form-control ${errors.TreeNo && 'is-invalid'}`}
                name="TreeNo"
                placeholder="Enter Tree No"
                onChange={(e) => setTreeNo(e.target.value)}
                value={TreeNo}  
                required
            />
         {errors.TreeNo && <div className="invalid-feedback">{errors.TreeNo}</div>}
                </div>

                <div className="form-group">
                <label>Tree Stage</label>
                <select
                       className={`form-control ${errors.TreeStage && 'is-invalid'}`}
                       name="TreeStage"
                       value={TreeStage}
                       onChange={(e) => setTreeStage(e.target.value)}
                    required
                >
                <option value="">Select Tree Stage</option>
                <option value="Basel Dressing">Just Plant</option>
                <option value="Young Palm">Young Palm-6months-4 years</option>
                <option value="Adult Palm">Adult Palm-above 4 years</option>
              </select>
              {errors.TreeStage && <div className="invalid-feedback">{errors.TreeStage}</div>}
                </div>

        <div className="form-group">
            <label>Date</label>
            <input 
                type="date" 
                className={`form-control ${errors.FertilizationDate && 'is-invalid'}`} 
                name="FertilizationDate" 
                placeholder="Enter the Date of fertilization"
                value={FertilizationDate}
                onChange={(e) => setFertilizationDate(e.target.value)}
                max={new Date().toISOString().split('T')[0]} // Disable future dates
                        required
                    />
                    {errors.FertilizationDate && <div className="invalid-feedback">{errors.FertilizationDate}</div>}
                </div>

        <div className="form-group">
            <label>Amount of Urea(g)</label>
            <input type="Number" 
                className={`form-control ${errors.UreaAmount && 'is-invalid'}`} 
                name="UreaAmount" 
                placeholder="Enter the Urea Amount"
                value={UreaAmount}
                onChange={(e) => setUreaAmount(e.target.value)}
                required
            />
        {errors.UreaAmount && <div className="invalid-feedback">{errors.UreaAmount}</div>}
                </div>

        <div className="form-group">
            <label>Eppawala Rock Phosphate Amount(g)</label>
            <input type="Number" 
                className={`form-control ${errors.EppawalaRockPhosphateAmount && 'is-invalid'}`} 
                name="EppawalaRockPhosphateAmount" 
                placeholder="Enter the EppawalaRockPhosphate Amount "
                value={EppawalaRockPhosphateAmount}
                onChange={(e) => setEppawalaRockPhosphateAmount(e.target.value)}
                required
            />
        {errors.EppawalaRockPhosphateAmount && <div className="invalid-feedback">{errors.EppawalaRockPhosphateAmount}</div>}
                </div>

        <div className="form-group">
            <label>Muriate Of Potasium Amount(g)</label>
            <input type="Number" 
                className={`form-control ${errors.MuriateOfPotasiumAmount && 'is-invalid'}`} 
                name="MuriateOfPotasiumAmount" 
                placeholder="Enter the MuriateOfPotasium Amount"
                value={MuriateOfPotasiumAmount}
                onChange={(e) => setMuriateOfPotasiumAmount(e.target.value)}
                required
            />
        {errors.MuriateOfPotasiumAmount && <div className="invalid-feedback">{errors.MuriateOfPotasiumAmount}</div>}
                </div>

        <div className="form-group">
            <label>Amount of Dolamite Amount(g)</label>
            <input type="Number" 
                className={`form-control ${errors.DolamiteAmount && 'is-invalid'}`} 
                name="DolamiteAmount" 
                placeholder="Enter the Dolamite Amount"
                value={DolamiteAmount}
                onChange={(e) => setDolamiteAmount(e.target.value)}
                required
            />
        {errors.DolamiteAmount && <div className="invalid-feedback">{errors.DolamiteAmount}</div>}
                </div>

        {/* <div className="form-group">
            <label>Description</label>
            <textarea 
                className="form-control" 
                name="Description" 
                placeholder="Description"
                value={Description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
        </div> */}

        <button
            className="btn btn-success"
            type="submit"
            style={{ marginTop: "15px" }}
        >
            <i className="far fa-check-square"></i>
            &nbsp;Save
        </button>
    </form>
</div>

    );
};

export default CreateFertilizationDetails;

