import React,{useState , useEffect} from "react";
import axios from "axios";
import { useNavigate ,useParams } from "react-router-dom";

const EditTaskShedule =() => {
    
    const [Department,setDepartment] = useState('');
    const [Tasks,setTasks] = useState('');
    const [StartDate,setStartDate] = useState('');
    const [EndDate,setEndDate] = useState('');
    const [PriorityLevel,setPriorityLevel] = useState('');
   

    const { id } = useParams();
    const navigate = useNavigate();


    useEffect(()=>{
     
        const getOneRecord = async() => {
    
        await axios.get(`http://localhost:8000/viewTaskShedule/${id}`)
        .then((res)=>{
            setDepartment(res.data.TaskShedulerecord.Department);
            setTasks(res.data.TaskShedulerecord.NIC);
            setStartDate(res.data.TaskShedulerecord.StartDate);
            setEndDate(res.data.TaskShedulerecord.EndDate);
            setPriorityLevel(res.data.TaskShedulerecord.PriorityLevel);  
           

          console.log('Status: ' + res.data.success);
        })
        .catch((err)=>{
          if(err.response){
              console.log(err.response.data.error);
          }else{
            console.log("Error Occured While Processing Your Axios Get Request. "+err.error);
          }
    
        })
    
        }
    
        getOneRecord();
    
      },[id])

      const updateData = async(e) =>{//////////////////////////////////////////////////////////////////////////////////////////////////////
        e.preventDefault();

        const confirmed = window.confirm("If you want to continue the updation..?");
        if(confirmed){

        let updateRecord = {
          Department:Department,
            NIC:NIC,
            Tasks:Tasks,
            startDate:startDate,
            EndDate:EndDate,
            PriorityLevel:PriorityLevel,
           
        }
        
        await axios.put(`http://localhost:8000/taskShedule/update/${id}`,updateRecord)
        .then((res)=>{
            alert(res.data.message);
            console.log(res.data.message);
            navigate('/viewtaskShedule');
          })
          .catch((err)=>{
            if(err.response){
                console.log(err.response.data.error);
            }else{
              console.log("Error Occured While Processing Your Axios Get Request. "+err.error);
            }
      
          })
        }else{
            alert('Update cancelled!')
          }
        }

        return(

          <div>
      <h1>Create task Shedule</h1>
      <form className="needs-validation" noValidate onSubmit={sendData}>
        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px" }}>Department</label>
          <select
            className="form-control"
            name="department"
            onChange={(e) => setdepartment(e.target.value)}
            value={department}
          >
            <option value="">Select Department</option>
            <option value="sales">Sales and Marketing </option>
            <option value="Finance">Finance and Accounting</option>
            <option value="HR">Human Resources</option>
            <option value="plantation">Plantation </option>
            <option value="Production ">Production </option>
          </select>
        </div>

        <div className="form-group" style={{ marginBottom: "15px" }}>
      <label style={{ marginBottom: "5px" }}>Task</label>
      <textarea
        className="form-control"
        rows="4"
        cols="50"
        name="task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter Task..."
      ></textarea>
    </div>

    
    <div className="form-group" style={{marginBottom:'15px'}}>
                  <label style={{marginBottom:'5px'}}>startDate	</label>
                  <input type="date"
                  className="form-control"
                  name="startDate"
                  placeholder="Enter startDate"
                  onChange={(e) => setstartDate(e.target.value)}
                  value={startDate}/>

  
              </div>

              
              <div className="form-group" style={{marginBottom:'15px'}}>
                  <label style={{marginBottom:'5px'}}>startDate	</label>
                  <input type="date"
                  className="form-control"
                  name="EndDate"
                  placeholder="Enter EndDate"
                  onChange={(e) => setEndDate(e.target.value)}
                  value={EndDate}/>

              </div>\

              
              <div className="form-group" style={{marginBottom:'15px'}}>
    <label style={{marginBottom:'5px'}}>PriorityLevel</label>
    <select
        className="form-control"
        name="PriorityLevel"
        onChange={(e) => setPriorityLevel(e.target.value)}
        value={PriorityLevel}
    >
        <option value="">Select Priority Level</option>
        <option value="High">High </option>
        <option value="Low">Low</option>
       

    </select>
             </div>



        <button className="btn btn-success" type="submit" style={{marginTop:'15px'}}>
                <i className="far fa-check-square"></i>
                &nbsp; Save
        </button>

      </form>

    </div>

        )
}

      export default EditTaskShedule;


