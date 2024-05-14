// // editBudgetDetails.js
// import React, { useEffect, useState } from 'react'
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const EditBudgetDetails = () => {

//     const [month, setMonth] = useState('');
//     const [totalIncome, setTotalIncome] = useState('');
//     const [totalExpences, setTotalExpences] = useState('');
//     const [totalAAmount, setTotalAAmount] = useState('');
//     const [profitLoss, setProfitLoss] = useState('');
//     const { id } = useParams();



//     // Function to format date to yyyy-mm-dd format
//     const formatDate = (date) => {
//         const d = new Date(date);
//         let month = "" + (d.getMonth() + 1);
//         let day = "" + d.getDate();
//         const year = d.getFullYear();

//         if (month.length < 2) month = "0" + month;
//         if (day.length < 2) day = "0" + day;

//         return [year, month, day].join("-");
//     };

//     //     useEffect(() =>{

//     //         const getbudDetail = async() =>{

//     //             await axios.get(`http://localhost:8000/budgetRecords/${id}`)
//     //             .then((res) => {
//     //                 setMonth(formatDate(res.data.budgetrecord.date));
//     //                 setTotalIncome(res.data.budgetrecord.setTotalIncome);
//     //                 setTotalExpences(res.data.budgetrecord.setTotalExpences);
//     //                 setTotalAAmount(res.data.budgetrecord.setTotalAAmount);
//     //                 setProfitLoss(res.data.budgetrecord.setProfitLoss);
//     //                 console.log(res.data.message);
//     //             })
//     //             .catch((err) => {
//     //                 if(err.responcce){
//     //                     console.log(err.response.data.message);
//     //                 }else{
//     //                     console.log("Error occured while processing your axios get request." +err.message)
//     //                 }
//     //             })
//     //         }

//     //         getbudDetail();
//     //   }, [id])

//     useEffect(() => {
//         const getOneDetail = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:8000/budgetRecords/${id}`);
//                 console.log("Response from API:", response.data);

//                 const budgetRecord = response.data.budgetRecord;
//                 setMonth(formatDate(budgetRecord.month));
//                 setTotalIncome(budgetRecord.totalIncome);
//                 setTotalExpences(budgetRecord.totalExpences);
//                 setTotalAAmount(budgetRecord.totalAAmount);
//                 setProfitLoss(budgetRecord.profitLoss);
//             } catch (error) {
//                 if (error.response) {
//                     console.log("Error response:", error.response.data.message);
//                 } else {
//                     console.log("Error occurred while processing your axios get request:", error.message);
//                 }
//             }
//         };

//         getOneDetail();
//     }, [id]);

//     const updateBudgetDetails = async (e) => {
//         e.preventDefault();

//         try {
//             const confirm = window.confirm('Are you sure you want to update?');

//             if (confirm) {

//                 let updatedBudget = {
//                     month: month,
//                     totalIncome: totalIncome,
//                     totalExpences: totalExpences,
//                     totalAAmount: totalAAmount,
//                     profitLoss: profitLoss,
//                 }
//                 await axios.put(`http://localhost:8000/budgetRecords/update/${id}`, updatedBudget)
//                     .then((res) => {
//                         alert(res.data.success);
//                         console.log(res.data.success);
//                     })
//                     .catch((err) => {
//                         if (err.response) {
//                             console.log(err.response.data.error)
//                         } else {
//                             console.log("Error occured while getting axios patch request")
//                         }
//                     })
//             } else {
//                 alert('Update Cancel');
//             }
//         }
//         catch (err) {
//             console.log('update function failed')
//         }

//     }

//     return (
//         <div className="col-md-8 mt-4 mx-auto">
//             <h1 className="h3 mb-3 font-weight-normal">Add Budget Details</h1>
//             <form className="needs-validation" noValidate>
//                 <div className="form-group" style={{ marginBottom: '15px' }}>
//                     <label style={{ marginBottom: '5px' }}>Month</label>
//                     <input
//                         type='date'
//                         className="form-control"
//                         name="month"
//                         placeholder="month"
//                         value={month}
//                         onChange={(e) => setMonth(e.target.value)}
//                     />
//                 </div>

//                 <div className="form-group" style={{ marginBottom: '15px' }}>
//                     <label style={{ marginBottom: '5px' }}>Total Income</label>
//                     <input
//                         type='number'
//                         className="form-control"
//                         name="Income"
//                         placeholder="Income"
//                         value={totalIncome}
//                         onChange={(e) => setTotalIncome(e.target.value)}
//                     />
//                 </div>

//                 <div className="form-group" style={{ marginBottom: '15px' }}>
//                     <label style={{ marginBottom: '5px' }}>Total Expences</label>
//                     <input
//                         type='number'
//                         className="form-control"
//                         name="Expences"
//                         placeholder="Expences"
//                         value={totalExpences}
//                         onChange={(e) => setTotalExpences(e.target.value)}
//                     />
//                 </div>

//                 <div className="form-group" style={{ marginBottom: '15px' }}>
//                     <label style={{ marginBottom: '5px' }}>Total Amount</label>
//                     <input
//                         type='number'
//                         className="form-control"
//                         name="amount"
//                         placeholder="Differance"
//                         value={totalAAmount}
//                         onChange={(e) => setTotalAAmount(e.target.value)}
//                     />
//                 </div>

//                 <div className="form-group" style={{ marginBottom: '15px' }}>
//                     <label style={{ marginBottom: '5px' }}>Profit / Loss</label>
//                     <input
//                         type='text'
//                         className="form-control"
//                         name="Profit/Loss"
//                         placeholder="Profit/Loss"
//                         value={profitLoss}
//                         onChange={(e) => setProfitLoss(e.target.value)}
//                     />
//                 </div>

//                 <button className="btn btn-success" type="submit" style={{ marginTop: '15px' }} onClick={updateBudgetDetails}>
//                     <i className="far fa-check-square"></i>
//                     &nbsp; Save
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default EditBudgetDetails;


// editFinanceDetails.js
import React, { useEffect, useState} from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditFinanceDetails = () => {

    const [month, setMonth] = useState('');
    const [totalIncome, setTotalIncome] = useState('');
    const [totalExpences, setTotalExpences] = useState('');
    const [profitLoss, setProfitLoss] = useState('');
    const [totalAAmount,setTotalAAmount]=useState('');
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

            await axios.get(`http://localhost:8000/budgetRecords/${id}`)
            .then((res) => {
                setMonth(formatDate(res.data.budgetrecord.month));
                setTotalIncome(res.data.budgetrecord.totalIncome);
                setTotalExpences(res.data.budgetrecord.totalExpences);
                setTotalAAmount(res.data.totalAAmount);
                setProfitLoss(res.data.budgetrecord.profitLoss);
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
                totalIncome: totalIncome,
                totalExpences: totalExpences,
                totalAAmount:totalAAmount,
                profitLoss: profitLoss,
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
                />
            </div>

            <div className="form-group" style={{ marginBottom: '15px' }}>
                <label style={{ marginBottom: '5px' }}>Amount</label>
                <input
                    type='number'
                    className="form-control"
                    name="amount"
                    placeholder="Expences"
                    value={totalAAmount}
                    onChange={(e) => setTotalAAmount(e.target.value)}
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
                />
            </div>

            <button className="btn btn-success" type="submit" style={{ marginTop: '15px' }} onClick={updateBudgetDetails}>
                <i className="far fa-check-square"></i>
                &nbsp; Save
            </button>
        </form>
        </div>
    </div>
    );
};

export default EditFinanceDetails;