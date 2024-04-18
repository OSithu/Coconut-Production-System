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
    

    //implement sendData function
    const sendFertilizationData = async (e) => {
        e.preventDefault();

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
                className="form-control"
                name="TreeNo"
                placeholder="Enter Tree No"
                onChange={(e) => setTreeNo(e.target.value)}
                value={TreeNo}  
                required
            />
        </div>

        <div className="form-group">
            <label>Tree Stage</label>
            <input
                type="text"
                className="form-control"
                name="TreeStage"
                placeholder="Enter Tree Stage"
                onChange={(e) => setTreeStage(e.target.value)}
                value={TreeStage}  
                required
            />
        </div>

        <div className="form-group">
            <label>Date</label>
            <input 
                type="date" 
                className="form-control" 
                name="FertilizationDate" 
                placeholder="Enter the Date of fertilization"
                value={FertilizationDate}
                onChange={(e) => setFertilizationDate(e.target.value)}
                required
            />
        </div>

        <div className="form-group">
            <label>Amount of Urea(g)</label>
            <input type="Number" 
                className="form-control" 
                name="UreaAmount" 
                placeholder="Enter the Urea Amount"
                value={UreaAmount}
                onChange={(e) => setUreaAmount(e.target.value)}
                required
            />
        </div>

        <div className="form-group">
            <label>Eppawala Rock Phosphate Amount(g)</label>
            <input type="Number" 
                className="form-control" 
                name="EppawalaRockPhosphateAmount" 
                placeholder="Enter the EppawalaRockPhosphate Amount "
                value={EppawalaRockPhosphateAmount}
                onChange={(e) => setEppawalaRockPhosphateAmount(e.target.value)}
                required
            />
        </div>

        <div className="form-group">
            <label>Muriate Of Potasium Amount(g)</label>
            <input type="Number" 
                className="form-control" 
                name="MuriateOfPotasiumAmount" 
                placeholder="Enter the MuriateOfPotasium Amount"
                value={MuriateOfPotasiumAmount}
                onChange={(e) => setMuriateOfPotasiumAmount(e.target.value)}
                required
            />
        </div>

        <div className="form-group">
            <label>Amount of Dolamite Amount(g)</label>
            <input type="Number" 
                className="form-control" 
                name="DolamiteAmount" 
                placeholder="Enter the Dolamite Amount"
                value={DolamiteAmount}
                onChange={(e) => setDolamiteAmount(e.target.value)}
                required
            />
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

