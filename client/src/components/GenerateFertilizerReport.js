import axios from "axios";
import React, { useEffect, useState , useRef } from "react";
import "./../stylesheets/disease.css"

//npm install react-to-print
import { useReactToPrint } from "react-to-print";

const GenerateFertilizerReport = () => {

  const conponentPDF= useRef();
  
  const [allFertilization, setAllFertilization] = useState([]);


  useEffect(() => {
    const getAllFertilization = async () => {
      await axios
        .get("http://localhost:8000/fertilizationrec")
        .then((res) => {
          setAllFertilization(res.data.existingRecords);
          console.log("Status: " + res.data.success);
          console.log(res.data.message);
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data.error);
          } else {
            console.log("Error occurred while processing your get request" + err.error);
          }
        });
    };

    getAllFertilization();
  }, []);

//Implement PDF Download Function
const generatePDF = useReactToPrint({

    content: ()=>conponentPDF.current,
    documentTitle:"Pest Records",
    onAfterPrint:()=>alert("Data Saved In PDF")

});


  return (
    <div>
      <div className="card" ref={conponentPDF} style={{ width: "100%" }}>
      <div className="reportlogo">
              <img src="./images/logo.png" className="imageReport"></img>
              <br></br>
              <h1 className="plantTopic">Jayakody Koppara Stores</h1>
              <br></br>
              <h2 className="plantTopic">Fertilizer Records</h2>
            </div>
  <div className="card-body">
    <div className="container" >
    <div style={{ marginTop: "20px" }}>
        
    <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
              {/* <th scope="col" className="text-center">Tree No</th>
              <th scope="col" className="text-center">Tree Stage</th> */}
              <th scope="col" className="text-center">Date</th>
              <th scope="col" className="text-center">Urea(g)</th>
              <th scope="col" className="text-center">EppawalaRock<br></br>Phosphate(g)</th>
              <th scope="col" className="text-center">MuriateOf<br></br>Potasium(g)</th>
              <th scope="col" className="text-center">Dolamite(g)</th>
          </tr>
        </thead>
        <tbody>
          {allFertilization.map((fertilization, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
               {/* <td className="text-center">{fertilization.TreeNo}</td>
                <td className="text-center">{fertilization.TreeStage}</td> */}
                <td className="text-center">{new Date(fertilization.FertilizationDate).toLocaleDateString()}</td>
                <td className="text-center">{fertilization.UreaAmount}</td>
                <td className="text-center">{fertilization.EppawalaRockPhosphateAmount}</td>
                <td className="text-center">{fertilization.MuriateOfPotasiumAmount}</td>
                <td className="text-center">{fertilization.DolamiteAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
          </div>
    </div>
  </div>
</div>

<br></br>
      <div className="d-flex justify-content-center mb-3">
        <button className="btn btn-success" onClick={generatePDF}>
        <i class="fa fa-download"> </i> &nbsp; Download                       
        </button>
      </div>
    </div>
  );
};

export default GenerateFertilizerReport;
