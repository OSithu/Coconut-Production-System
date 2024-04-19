import React,{ useEffect,useState } from "react";
import axios from 'axios';
import {Link} from 'react-router-dom'
import FinanceNv from './FinanceNv'

const ViewBudgetDetails = () => {

  const [allDetails, setAllDetails] = useState([]);

  useEffect(() => {

    const getDetails = async () =>{

      await axios.get(`http://localhost:8000/budgetRecords`)
      .then((res) => {
        setAllDetails(res.data.existingbudget);
        console.log('Status:' +res.data.success);
      })
      .catch((err) =>{
        if(err.reponese){
          console.log(err.response.data.error)
        }
      })
    }

    getDetails();
},[])

const handleDelete = async (id) =>{

  try{
    const confirm = window.confirm('Are you sure you want to delete?');

    if(confirm){
      await axios.delete(`http://localhost:3000/budgetRecords/delete/${id}`)
      .then((res) =>{
        alert(res.data.message);
        console.log(res.data.message);
        setAllDetails(allDetails.filter(finance => finance._id != id));
      })
      .catch((err) =>{
        if(err.responce){
          console.log(err.responce.data.message);
        }else{
          console.log("Error occur while processing your axios delete");
        }
      })
    }else{
      alert('Deletion Cancel');
    }
    }
    catch(err){
      console.log('HandleDelete function failed! error'+ err.message);
    }
  }


return (
  <div>
    <FinanceNv/>
        <p>Budget Details</p>
        <table className="table">
         <thead>
          <tr>
             {/* <th scope="col">#</th> */}
             <th scope="col">Month</th>
             <th scope="col">Total Income</th>
            <th scope="col">Total Expences</th>
           <th scope="col">Profit/Loss</th>
          </tr>
        </thead>
         <tbody>
           {allDetails.map(budget => (
            <tr key={budget._id}>
              <td>{budget.month}</td>
              <td>{budget.totalIncome}</td>
              <td>{budget.totalExpences}</td>
              <td>{budget.profitLoss}</td>
             
              <td>
               <Link to={`/editbudgetDetails/${budget._id}`}>
                <button type="button" className = "btn btn-warining">
                  <i className = 'fas fa-edit'></i>&nbsp; Edit
                </button>
               </Link>
                &nbsp;
              <button type="button" className='btn btn-danger' onClick={()=> handleDelete(budget._id)}>
              <i className="far fa-trash-alt"></i>&nbsp;Delete
              </button>
              </td>
            </tr>
          ))}
        </tbody>
       </table>
       <button className="btn btn-success"><a href="/AddBudgetDetails" style={{textDecoration:'none', color:'white'}}>Create New Post</a></button>
      </div>

)



}

export default ViewBudgetDetails;
