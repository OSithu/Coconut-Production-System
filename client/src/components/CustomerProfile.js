import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CustomerProfile = () => {
  const [cusDetails, setCustomerDetails] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchCustomerProfile = async () => {
      try {
        if (id) {
          const response = await axios.get(
            `http://localhost:8000/cusDetails/${id}`
          );
          if (response.data.success) {
            setCustomerDetails(response.data.cusDetails);
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

    fetchCustomerProfile();
  }, [id]);

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div class="card text-center" style={{ width: "40rem", marginTop: "100px" }}>
        <div style={{ marginTop: "20px" }}>
          <dl className="row">
            <dd>
              <h4 style={{ textAlign: "center" }}>{cusDetails.cusName}</h4>{" "}
            </dd>

            <dd>
              <strong>Customer Name: </strong>
              {cusDetails.cusName || "Loading..."}
            </dd>

            <dd>
              <strong>Customer Email: </strong>
              {cusDetails.cusEmail || "Loading..."}
            </dd>

            <dd>
              <strong>Contact Number: </strong>
              {cusDetails.contactNumber || "Loading..."}
            </dd>

            <dd>
              <strong>Customer Location: </strong>
              {cusDetails.cusLocation || "Loading..."}
            </dd>

          </dl>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
