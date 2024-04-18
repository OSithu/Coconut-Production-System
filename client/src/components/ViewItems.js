import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewItems = () => {
  const [allProducts, setAllItem] = useState([]);

  useEffect(() => {
    const getAllItems = async () => {
      await axios
        .get("http://localhost:8000/products")
        .then((res) => {
          setAllItem(res.data.existingProducts);
          console.log("Status: " + res.data.success);
          console.log("Message:" + res.data.message);
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data.error);
          } else {
            console.log("Error occured while processing your get request");
          }
        });
    };

    getAllItems();
  }, []);

  return (
    <div className="container">
      <div>
        <p
          style={{
            textAlign: "center",
            fontFamily: "sans-serif",
            fontSize: "24px",
          }}
        >
          View Items
        </p>
        <div class="row">
          {allProducts.map((products, index) => (
            <div key={index} class="col-sm-4 mb-3 mb-sm-0">
              <div class="card" style={{ width: "18rem" }}>
                <div key={products._id}>
                  {products.productImage && products.productImage.data ? (
                    <img
                      src={`data:${products.productImage.contentType};base64,${products.productImage.data}`}
                      alt="Products"
                      class="card-img-top"
                      style={{ height: "200px", objectFit: "cover" }}

                    />
                  ) : (
                    <span>No image</span>
                  )}
                  <h5 class="card-title">{products.productName}</h5>
                  <a href="#" class="btn btn-primary" >
                    View Details
                  </a>
                </div>
              </div>
              <br/><br/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewItems;
