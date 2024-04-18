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

        {allProducts.map((products) => (
          <tr
            key={products._id}
            className={
              products.quantity < products.reOrderLevel ? "table-danger" : ""
            }
          >
            {products.productName}
            {products.productImage && products.productImage.data ? (
              <img
                src={`data:${products.productImage.contentType};base64,${products.productImage.data}`}
                alt="Products"
                style={{ width: "100px" }}
              />
            ) : (
              <span>No image</span>
            )}
          </tr>
        ))}
      </div>
    </div>
    // </div>
  );
};

export default ViewItems;
