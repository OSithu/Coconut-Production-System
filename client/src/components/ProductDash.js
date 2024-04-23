import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductNav from "./ProductNav";

const ProductDash = () => {
  // Declare productCount state variable
  const [productCount, setProductCount] = useState(null); // Initialize with null instead of []

  useEffect(() => {
    const getProductCount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/products/count"
        );
        setProductCount(response.data.totalCount); // Access the correct property name
        console.log("Success");
      } catch (err) {
        console.log("Error occurred while fetching product count:", err);
      }
    };

    getProductCount();
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
                backgroundColor: "rgba(217, 255, 242, 0.6)",
                marginTop: "20px",
                paddingTop: "60px",
              }}
            >
              {" "}
              <h4>
                {/* Total Products: {productCount !== null ? productCount : "Loading..."} */}
                Total Products:
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
              <h4>
                {/* Total Products: {productCount !== null ? productCount : "Loading..."} */}
                Total By-products:
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
              <h4>
                {/* Total Products: {productCount !== null ? productCount : "Loading..."} */}
                Total Agrochemicals:
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDash;
