import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditOrderDetails = () => {
  const [orderName, setOrderName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [orderDate, setOrderDate] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  // Function to format date to yyyy-mm-dd format
  const formatDate = (date) => {
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  useEffect(() => {
    const getOneOrder = async () => {
      await axios
        .get(`http://localhost:8000/orderDetails/${id}`)
        .then((res) => {
          setOrderName(res.data.orderDetails.orderName);
          setQuantity(res.data.orderDetails.quantity);
          setOrderDate(formatDate(res.data.orderDetails.orderDate));
          console.log(res.data.message);
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data.error);
          } else {
            console.log("Error occurred while processing your get request");
          }
        });
    };

    getOneOrder();
  }, [id]);

  const updateData = async (e) => {
    e.preventDefault();

    try {
      const confirmed = window.confirm(
        "Are you sure you want to update this product?"
      );
      if (confirmed) {
        let updatedOrderData = {
          orderName: orderName,
          quantity: quantity,
          orderDate: orderDate,
        };

        await axios
          .put(
            `http://localhost:8000/orderDetails/update/${id}`,
            updatedOrderData
          )
          .then((res) => {
            alert(res.data.success);
            console.log(res.data.success);
            navigate("/viewOrder");
          })
          .catch((err) => {
            if (err.response) {
              console.log(err.response.data.success);
            } else {
              console.log("Error occurred while processing your put request");
            }
          });
      } else {
        alert("Update cancelled!");
      }
    } catch (err) {
      console.log("Update failed!");
    }
  };

  return (
    <div className="col-md-8 mt-4 mx-auto">
      <h1 className="h3 mb-3 font-weight-normal">Add new order</h1>
      <form className="needs-validation" noValidate onSubmit={updateData}>
        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px" }}>Order Name</label>
          <input
            type="text"
            className={`form-control `}
            name="orderName"
            placeholder="Enter order name"
            onChange={(e) => setOrderName(e.target.value)}
            value={orderName}
            required
          />
          {/*errors.orderName.length > 0 &&
                            <div className='invalid-feedback'>{errors.orderName}</div>*/}
        </div>

        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px" }}>Quantity</label>
          <input
            type="text"
            className={`form-control `}
            name="quantity"
            placeholder="Enter quantity"
            onChange={(e) => setQuantity(e.target.value)}
            value={quantity}
            required
          />
          {/* {errors.quantity.length > 0 &&
                            <div className='invalid-feedback'>{errors.quantity}</div>} */}
        </div>

        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px" }}>Order Date</label>
          <input
            type="date"
            className={`form-control `}
            name="orderDate"
            placeholder="Enter the order date"
            value={orderDate}
            onChange={(e) => setOrderDate(e.target.value)}
            required
          />
          {/* {errors.orderDate.length > 0 &&
                            <div className='invalid-feedback'>{errors.orderDate}</div>} */}
        </div>

        <button
          className="btn btn-success"
          type="submit"
          style={{ marginTop: "15px" }}
        >
          &nbsp;Update
        </button>
      </form>
    </div>
  );
};

export default EditOrderDetails;
