import React,{ useEffect,useState } from "react";
import axios from 'axios';
import {Link} from 'react-router-dom'

const ViewFianceDetails = () => {

  const [allDetails, setAllDetails] = useState([]);

  useEffect(() => {

    const getDetails = async () =>{

      await axios.get(`http://localhost:8000/financeRecords`)
      .then((res) => {
        setAllDetails(res.data.existingfinance);
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
      await axios.delete(`http://localhost:3000/financeRecords/delete/${id}`)
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
        <p>All Financial Transactions</p>
        <table className="table">
         <thead>
          <tr>
             {/* <th scope="col">#</th> */}
             <th scope="col">Date</th>
             <th scope="col">Type</th>
            <th scope="col">Description</th>
           <th scope="col">Income</th>
            <th scope="col">Expenses</th>
                         <th scope="col">TotalAmount</th>
          </tr>
        </thead>
         <tbody>
           {allDetails.map(finance => (
            <tr>
              <td>{finance.date}</td>
              <td>{finance.type}</td>
              <td>{finance.Description}</td>
              <td>{finance.Income}</td>
              <td>{finance.Expenses}</td>
              <td>{finance.totalAmount}</td>
              <td>
               <Link to={`/editFinanceDetails/${finance._id}`}>
                <button type="button" className = "btn btn-warining">
                  <i className = 'fas fa-edit'></i>&nbsp; Edit
                </button>
               </Link>
                &nbsp;
              <button type="button" className='btn btn-danger' onClick={()=> handleDelete(finance._id)}>
              <i className="far fa-trash-alt"></i>&nbsp;Delete
              </button>
              </td>
            </tr>
          ))}
        </tbody>
       </table>
       <button className="btn btn-success"><a href="/createFinanceDetails" style={{textDecoration:'none', color:'white'}}>Create New Post</a></button>
      </div>

)



}

export default ViewFianceDetails;
