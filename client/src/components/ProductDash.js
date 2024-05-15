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

    getProductCount();
    getbyProductCount();
    getAgrochemicalsCount();
  }, []);

  return (
    <div>
      <div className="header">
        <div>
          <ul className="navbar">
            <div
              className="pDetails"
              style={{ marginRight: "150px", marginLeft: "50px" }}
            >
              <li>
                <a class="active" href="/productDash">
                  Home
                </a>
              </li>
            </div>
            <div
              className="pDetails"
              style={{ marginRight: "50px", marginLeft: "0px" }}
            >
              <li>
                <a class="active" href="/viewProduct">
                  Product Details
                </a>
              </li>
            </div>
            <div className="logo" style={{ margin: "0 auto" }}>
            <a href="/dashboard">
              <img src="./images/logo.png" className="image"></img>
              </a>
            </div>
            <div
              className="pDetails"
              style={{ marginRight: "150px", marginLeft: "200px" }}
            >
              <li>
                <a href="/viewProductCnt">Product Records</a>
              </li>
            </div>
          </ul>
        </div>
      </div>
      <br></br>

      <div className="container">
        <h2 className="plantTopic">Inventory Dashboad</h2>
        <div class="row" style={{ marginBottom: "50px" }}>
          <div class="col-sm-4 mb-3 mb-sm-0">
            <div
              className="card"
              style={{
                width: "18rem",
                height: "10rem",
                textAlign: "center",
                borderRadius: "20px",
                backgroundColor: "rgba(217, 255, 242, 0.6)",
                marginTop: "20px",
                paddingTop: "60px",
              }}
            >
              {" "}
              <h4 style={{color:"#3b4222"}}>Total Products</h4>
              <h4 style={{ color: "brown" }}>
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
                backgroundColor: "rgba(217, 255, 242, 0.6)",
                marginTop: "20px",
                paddingTop: "60px",
              }}
            >
              {" "}
              <h4 style={{color:"#3b4222"}}>Total By-Products</h4>
              <h4 style={{ color: "brown" }}>
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
                backgroundColor: "rgba(217, 255, 242, 0.6)",
                marginTop: "20px",
                paddingTop: "60px",
              }}
            >
              {" "}
              <h4 style={{color:"#3b4222"}}>Total Agrochemicals</h4>
              <h4 style={{ color: "brown" }}>
                {agrochemicalsCount !== null
                  ? agrochemicalsCount
                  : "Loading..."}
              </h4>
            </div>
          </div>
        </div>

        <h3 style={{color:"black"}}>Reports</h3>
        <div class="row">
          <div class="col-sm-4 mb-3 mb-sm-0">
            <div
              className="card"
              style={{
                width: "25rem",
                height: "16rem",
                textAlign: "center",
                borderRadius: "20px",
                backgroundColor: "rgba(217, 255, 242, 0.6)",
                marginTop: "20px",
                marginBottom:"30px",
                paddingTop: "60px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {" "}
              <h4 style={{ marginBottom: "70px", color:"#3b4222" }}>
                View Quality Control Report
              </h4>
              <Link
                to="/generateQualityReport"
                className="btn btn-success"
                style={{ width: "150px", margin: "0 auto", height: "50px" }}
              >
                <h5>View</h5>
              </Link>
            </div>
          </div>
          <div class="col-sm-4 mb-3 mb-sm-0">
            <div
              className="card"
              style={{
                width: "25rem",
                height: "16rem",
                textAlign: "center",
                borderRadius: "20px",
                backgroundColor: "rgba(217, 255, 242, 0.6)",
                marginTop: "20px",
                paddingTop: "60px",
              }}
            >
              {" "}
              <h4 style={{ marginBottom: "70px", color:"#3b4222" }}>View Fertilizers Report</h4>
              <Link
                to="/fertilizerReport"
                className="btn btn-success"
                style={{ width: "150px", margin: "0 auto", height: "50px" }}
              >
                <h5>View</h5>
              </Link>
            </div>
          </div>
          <div class="col-sm-4 mb-3 mb-sm-0">
            <div
              className="card"
              style={{
                width: "25rem",
                height: "16rem",
                textAlign: "center",
                borderRadius: "20px",
                backgroundColor: "rgba(217, 255, 242, 0.6)",
                marginTop: "20px",
                paddingTop: "60px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {" "}
              <h4 style={{ marginBottom: "70px", color:"#3b4222" }}>View Pesticides Report</h4>
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
