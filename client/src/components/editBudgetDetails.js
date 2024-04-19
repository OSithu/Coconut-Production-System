// editFinanceDetails.js
import React, { useEffect, useState} from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditFinanceDetails = () => {

    const [month, setMonth] = useState('');
    const [TotalIncome, setTotalIncome] = useState('');
    const [TotalExpences, setTotalExpences] = useState('');
    const [ProfitLoss, setProfitLoss] = useState('');
    const { id } = useParams();



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

    useEffect(() =>{

        const getOneDetail = async() =>{

            await axios.get(`http://localhost:8000/financeRecords/${id}`)
            .then((res) => {
                setMonth(formatDate(res.data.budgetrecord.date));
                setTotalIncome(res.data.budgetrecord.setTotalIncome);
                setTotalExpences(res.data.budgetrecord.setTotalExpences);
                setProfitLoss(res.data.budgetrecord.setProfitLoss);
                console.log(res.data.message);
            })
            .catch((err) => {
                if(err.responcce){
                    console.log(err.response.data.message);
                }else{
                    console.log("Error occured while processing your axios get request." +err.message)
                }
            })
        }

        getOneDetail();
  }, [id])

  const updateBudgetDetails = async (e) => {
    e.preventDefault();

    try {
        const confirm = window.confirm('Are you sure you want to update?');

        if (confirm) {

            let updatedFinance = {
                month: month,
                TotalIncome: TotalIncome,
                TotalExpences: TotalExpences,
                ProfitLoss: ProfitLoss,
            }
            await axios.put(`http://localhost:8000/financerecords/update/${id}`, updatedFinance)
                .then((res) => {
                    alert(res.data.success);
                    console.log(res.data.success);
                })
                .catch((err) => {
                    if (err.response) {
                        console.log(err.response.data.error)
                    } else {
                        console.log("Error occured while getting axios patch request")
                    }
                })
        } else {
            alert('Update Cancel');
        }
    }
    catch (err) {
        console.log('update function failed')
    }

}

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
                    value={TotalIncome}
                    onChange={(e) => setTotalIncome(e.target.value)}
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
                    onChange={(e) => setTotalExpences(e.target.value)}
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
                    onChange={(e) => setProfitLoss(e.target.value)}
                />
            </div>

            <button className="btn btn-success" type="submit" style={{ marginTop: '15px' }} onClick={updateBudgetDetails}>
                <i className="far fa-check-square"></i>
                &nbsp; Save
            </button>
        </form>
    </div>
    );
};

export default EditFinanceDetails;
