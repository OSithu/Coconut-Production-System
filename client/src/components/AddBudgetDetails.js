import React, { useState } from "react";
import axios from 'axios';

const AddTransaction = () => {

    const [month, setMonth] = useState('');
    const [TotalIncome, setTotalIncome] = useState('');
    const [TotalExpences, setTotalExpences] = useState('');
    const [ProfitLoss, setProfitLoss] = useState('');
    
    // Implementing send data function
    const sendData = async (e) => {
        e.preventDefault();

        try {
            let newTransaction = {
                month: month,
                TotalIncome: TotalIncome,
                TotalExpences: TotalExpences,
                ProfitLoss: ProfitLoss,
            };

            await axios.post(`http://localhost:8000/financeRecords/save`, newTransaction)
                .then((res) => {
                    alert(res.data.success);
                    console.log('status: ' + res.data.status);
                    console.log(res.data.success);
                })
                .catch((err) => {
                    if (err.response) {
                        console.log(err.response.data.error);
                    } else {
                        console.log("Error occurred while processing your axios get request" + err.error);
                    }
                });
        } catch (err) {
            console.log('sendData function failed! ERROR:' + err.error);
        }

        // Set state back to initial state
        setMonth('');
        setTotalIncome('');
        setTotalExpences('');
        setProfitLoss('');
    };

    return (
        <div className="col-md-8 mt-4 mx-auto">
            <h1 className="h3 mb-3 font-weight-normal">Add Budget Details</h1>
            <form className="needs-validation" noValidate>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Month</label>
                    <input
                        type='date'
                        className="form-control"
                        name="month"
                        placeholder="month"
                        value={month}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>

                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Total Income</label>
                    <input
                        type='number'
                        className="form-control"
                        name="Income"
                        placeholder="Income"
                        value={TotalIncome}
                        onChange={(e) => setType(e.target.value)}
                    />
                </div>

                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Total Expences</label>
                    <input
                        type='number'
                        className="form-control"
                        name="Expences"
                        placeholder="Expences"
                        value={TotalExpences}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Profit / Loss</label>
                    <input
                        type='text'
                        className="form-control"
                        name="Profit/Loss"
                        placeholder="Profit/Loss"
                        value={ProfitLoss}
                        onChange={(e) => setIncome(e.target.value)}
                    />
                </div>

                <button className="btn btn-success" type="submit" style={{ marginTop: '15px' }} onClick={sendData}>
                    <i className="far fa-check-square"></i>
                    &nbsp; Save
                </button>
            </form>
        </div>
    );
};

export default AddTransaction;