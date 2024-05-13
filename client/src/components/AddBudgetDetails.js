import React, { useState } from "react";
import axios from 'axios';

const AddBudgetDetails = () => {

    const [month, setMonth] = useState('');
    const [totalIncome, setTotalIncome] = useState('');
    const [totalExpences, setTotalExpences] = useState('');
    const [totalAAmount,setTotalAAmount] = useState('');
    const [profitLoss, setProfitLoss] = useState('');
    
    // Implementing send data function
    const sendData = async (e) => {
        e.preventDefault();

        try {
            let AddB = {
                month: month,
                totalIncome: totalIncome,
                totalExpences: totalExpences,
                totalAAmount:totalAAmount,
                profitLoss: profitLoss,
            };

            await axios.post(`http://localhost:8000/budgetRecords/save`, AddB)
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
        setTotalAAmount('');
        setProfitLoss('');
    };

    return (
        <div className="col-md-8 mt-4 mx-auto">
            <h1 className="h3 mb-3 font-weight-normal">Add Budget Details</h1>
            <div id ="plantForm">
            <form className="needs-validation" noValidate>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Month</label>
                    <input
                        type='date'
                        className="form-control"
                        name="month"
                        placeholder="month"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                    />
                </div>

                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Total Income</label>
                    <input
                        type='number'
                        className="form-control"
                        name="Income"
                        placeholder="Income"
                        value={totalIncome}
                        onChange={(e) => setTotalIncome(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Total Expences</label>
                    <input
                        type='number'
                        className="form-control"
                        name="Expences"
                        placeholder="Expences"
                        value={totalExpences}
                        onChange={(e) => setTotalExpences(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Total Amount</label>
                    <input
                        type='number'
                        className="form-control"
                        name="amount"
                        placeholder="Differance"
                        value={totalAAmount}
                        onChange={(e) => setTotalAAmount(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Profit / Loss</label>
                    <input
                        type='text'
                        className="form-control"
                        name="Profit/Loss"
                        placeholder="Profit/Loss"
                        value={profitLoss}
                        onChange={(e) => setProfitLoss(e.target.value)}
                        required
                    />
                </div>

                <button className="btn btn-success" type="submit" style={{ marginTop: '15px' }} onClick={sendData}>
                    <i className="far fa-check-square"></i>
                    &nbsp; Save
                </button>
            </form>
            </div>
        </div>
    );
};

export default AddBudgetDetails;