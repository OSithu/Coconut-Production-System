// editFinanceDetails.js
import React, { useEffect, useState} from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditFinanceDetails = () => {

    const [date,setDate] = useState('');
    const [type,setType] = useState('');
    const [Description,setDescription] = useState('');
    const [Income,setIncome] = useState('');
    const [Expences,setExpences] = useState('');
    const [totalAmount,setTotalAmount] = useState('');
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
                setDate(formatDate(res.data.financerecord.date));
                setType(res.data.financerecord.type);
                setDescription(res.data.financerecord.Description);
                setIncome(res.data.financerecord.Income);
                setExpences(res.data.financerecord.Expences);
                setTotalAmount(res.data.financerecord.totalAmount);
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

  const updateDetails = async (e) => {
    e.preventDefault();

    try {
        const confirm = window.confirm('Are you sure you want to update?');

        if (confirm) {

            let updatedFinance = {
                date: date,
                type: type,
                Description: Description,
                Income: Income,
                Expences: Expences,
                totalAmount: totalAmount,
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
            <h1 className="h3 mb-3 font-weight-normal">Add New Transaction</h1>
            <form className="needs-validation" noValidate>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Date</label>
                    <input
                        type='date'
                        className="form-control"
                        name="date"
                        placeholder="Date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>

                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Type</label>
                    <input
                        type='text'
                        className="form-control"
                        name="type"
                        placeholder="Enter type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    />
                </div>

                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Description</label>
                    <input
                        type='text'
                        className="form-control"
                        name="Description"
                        placeholder="Description"
                        value={Description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Income</label>
                    <input
                        type='number'
                        className="form-control"
                        name="Income"
                        placeholder="Enter income"
                        value={Income}
                        onChange={(e) => setIncome(e.target.value)}
                    />
                </div>

                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Expenses</label>
                    <input
                        type='number'
                        className="form-control"
                        name="Expenses"
                        placeholder="Enter Expenses"
                        value={Expences}
                        onChange={(e) => setExpences(e.target.value)}
                    />
                </div>

                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ marginBottom: '5px' }}>Total Amount</label>
                    <input
                        type='number'
                        className="form-control"
                        name="totalAmount"
                        placeholder="Enter TotalAmount"
                        value={totalAmount}
                        onChange={(e) => setTotalAmount(e.target.value)}
                    />
                </div>

                <button className="btn btn-success" type="submit" style={{ marginTop: '15px' }} onClick={updateDetails}>
                    <i className="far fa-check-square"></i>
                    &nbsp; Save
                </button>
            </form>
        </div>
    );
};

export default EditFinanceDetails;
