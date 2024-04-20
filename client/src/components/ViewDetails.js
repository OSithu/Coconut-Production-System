import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ViewDetails = () => {
  const [product, setProductDetails] = useState({});
  const [productImage, setProductImage] = useState("");
  const { id } = useParams();

  const getProductImage = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/products/images/${id}`,
        {
          responseType: "arraybuffer",
        }
      );

      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const reader = new FileReader();

      reader.onload = () => {
        const imageData = reader.result;
        setProductImage(imageData);
      };

      reader.readAsDataURL(blob);
    } catch (error) {
      console.error("Error fetching product image:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await axios.get(
            `http://localhost:8000/products/${id}`
          );
          if (response.data.success) {
            setProductDetails(response.data.product);
            getProductImage(id);
          } else {
            console.error("Error: ", response.data.error);
          }
        } else {
          console.error("No ID provided.");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div class="card text-center" style={{ width: "40rem", marginTop: "80px", marginBottom: "20px" }}>
        <div style={{ marginTop: "20px" }}>
          {productImage ? (
            <img
              src={productImage}
              class="card-img-top"
              alt="Product"
              style={{ maxWidth: "300px" }}
            />
          ) : (
            "Loading..."
          )}

          <hr />

          <dl className="row">
            <dd>
              <h4 style={{ textAlign: "center" }}>{product.productName}</h4>{" "}
            </dd>

            <dd>
              <strong>Product Name: </strong>
              {product.productName || "Loading..."}
            </dd>

            <dd>
              <strong>Price: </strong>
              {product.price && product.price.value && product.price.unit ? (
                <>
                  {product.price.unit} {product.price.value}
                </>
              ) : (
                "Loading..."
              )}
            </dd>


            <dd>
              <strong>Available Quantity: </strong>
              {product.quantity || "Loading..."}
            </dd>

            <dd>
              <strong>Manufactured Date: </strong>
              {product.manufacturedDate || "Loading..."}
            </dd>

            <dd>
              <strong>Expiration Date: </strong>
              {product.expirationDate || "Loading..."}
            </dd>
          </dl>
          <button className="btn btn-success" style={{marginBottom: "10px"}}>
            <a
              href="/addOrder"
              style={{ textDecoration: "none", color: "white" }}
            >
              Place Order
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
