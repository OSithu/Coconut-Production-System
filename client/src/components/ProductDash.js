import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductNav from "./ProductNav";
import { Button } from "bootstrap";
import { Link } from "react-router-dom";

const ProductDash = () => {
  const [productCount, setProductCount] = useState([]);
  const [byproductCount, setbyProductCount] = useState([]);
  const [agrochemicalsCount, setagrochemicalsCount] = useState([]);

  useEffect(() => {
    //get product count
    const getProductCount = async () => {
      await axios(`http://localhost:8000/productscount`)
        .then((res) => {
          setProductCount(res.data.totalCount);
          console.log("Status : " + res.data.success);
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data.error);
          }
        });
    };

    //get by-products count
    const getbyProductCount = async () => {
      await axios(`http://localhost:8000/byproductscount`)
        .then((res) => {
          setbyProductCount(res.data.totalbyproductCount);
          console.log("Status : " + res.data.success);
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data.error);
          }
        });
    };

    //getAgrochemicals count
    const getAgrochemicalsCount = async () => {
      await axios(`http://localhost:8000/agrochemicalscount`)
        .then((res) => {
          setagrochemicalsCount(res.data.totalagrochemicalsCount);
          console.log("Status : " + res.data.success);
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data.error);
          }
        });
    };

    // Simulate the click event of the "Generate Report" button when the component mounts
    const generateReportButton = document.getElementById(
      "generateReportButton"
    );
    if (generateReportButton) {
      generateReportButton.click();
    }

    getProductCount();
    getbyProductCount();
    getAgrochemicalsCount();
  }, []);

  return (
    <div>
      <ProductNav />
      <div className="container">
        <div class="row">
          <div class="col-sm-4 mb-3 mb-sm-0">
            <div
              className="card"
              style={{
                width: "18rem",
                height: "10rem",
                textAlign: "center",
                borderRadius: "20px",
                backgroundColor: "rgb(217, 255, 242)",
                marginTop: "20px",
                paddingTop: "60px",
              }}
            >
              {" "}
              <h4>
                Total Products:{" "}
                {productCount !== null ? productCount : "Loading..."}
              </h4>
            </div>
          </div>
          <div class="col-sm-4 mb-3 mb-sm-0">
            <div
              className="card"
              style={{
                width: "18rem",
                height: "10rem",
                textAlign: "center",
                borderRadius: "20px",
                backgroundColor: "rgb(217, 255, 242)",
                marginTop: "20px",
                paddingTop: "60px",
              }}
            >
              {" "}
              <h4>
                Total By-Products:{" "}
                {byproductCount !== null ? byproductCount : "Loading..."}
              </h4>
            </div>
          </div>
          <div class="col-sm-4 mb-3 mb-sm-0">
            <div
              className="card"
              style={{
                width: "20rem",
                height: "10rem",
                textAlign: "center",
                borderRadius: "20px",
                backgroundColor: "rgb(217, 255, 242)",
                marginTop: "20px",
                paddingTop: "60px",
              }}
            >
              {" "}
              <h4>
                Total Agrochemicals:{" "}
                {agrochemicalsCount !== null
                  ? agrochemicalsCount
                  : "Loading..."}
              </h4>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-sm-4 mb-3 mb-sm-0">
            <div
              className="card"
              style={{
                width: "25rem",
                height: "20rem",
                textAlign: "center",
                borderRadius: "20px",
                backgroundColor: "rgba(217, 255, 242, 0.6)",
                marginTop: "20px",
                paddingTop: "60px",
              }}
            >
              {" "}
              <h4>View Quality Control Report</h4>
              <Link to="/pestReport" className="btn btn-success">
                View
              </Link>
            </div>
          </div>
          <div class="col-sm-4 mb-3 mb-sm-0">
            <div
              className="card"
              style={{
                width: "25rem",
                height: "20rem",
                textAlign: "center",
                borderRadius: "20px",
                backgroundColor: "rgba(217, 255, 242, 0.6)",
                marginTop: "20px",
                paddingTop: "60px",
              }}
            >
              {" "}
              <h4>View Fertilizers Report</h4>
            </div>
          </div>
          <div class="col-sm-4 mb-3 mb-sm-0">
            <div
              className="card"
              style={{
                width: "25rem",
                height: "20rem",
                textAlign: "center",
                borderRadius: "20px",
                backgroundColor: "rgba(217, 255, 242, 0.6)",
                marginTop: "20px",
                paddingTop: "60px",
                display: "flex", // Use Flexbox
                flexDirection: "column", // Stack items vertically
              }}
            >
              {" "}
              <h4 style={{ marginBottom: "120px" }}>View Pesticides Report</h4>
              <Link
                to="/pestReport"
                className="btn btn-success"
                style={{ width: "150px", margin: "0 auto", height: "50px" }}
              >
                <h5>View</h5>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDash;
