import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const OrderProfile = () => {
  const [orderDetails, setOrderDetails] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchOrderProfile = async () => {
      try {
        if (id) {
          const response = await axios.get(
            `http://localhost:8000/orderDetails/${id}`
          );
          if (response.data.success) {
            setOrderDetails(response.data.orderDetails);
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

    fetchOrderProfile();
  }, [id]);

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div class="card text-center" style={{ width: "40rem", marginTop: "100px" }}>
        <div style={{ marginTop: "20px" }}>
          <dl className="row">
            <dd>
              <h4 style={{ textAlign: "center" }}>{orderDetails.orderName}</h4>{" "}
            </dd>

            <dd>
              <strong>Item Name: </strong>
              {orderDetails.orderName || "Loading..."}
            </dd>

            <dd>
              <strong>Quantity: </strong>
              {orderDetails.quantity || "Loading..."}
            </dd>

            <dd>
              <strong>Order Date: </strong>
              {orderDetails.orderDate || "Loading..."}
            </dd>

          </dl>
        </div>
      </div>
    </div>
  );
};

export default OrderProfile;
