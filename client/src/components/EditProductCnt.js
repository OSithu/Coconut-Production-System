import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditProductCnt = () => {
  const [productId, setProductId] = useState("");
  const [quantity, setProductQty] = useState("");
  const [productDate, setProductDate] = useState("");
  const [description, setProductDesc] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  // Function to format ISO 8601 date to yyyy-mm-dd format
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const getOneProductRecord = async () => {
      await axios
        .get(`http://localhost:8000/productCnt/${id}`)
        .then((res) => {
          console.log("API Response Date:", res.data.productCnt.productDate);
          setProductId(res.data.productCnt.productId);
          setProductQty(res.data.productCnt.quantity);
          setProductDate(formatDate(res.data.productCnt.productDate));
          setProductDesc(res.data.productCnt.description);
          console.log(res.data.message);
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data.error);
          } else {
            console.log("Error occured while processing your get request");
          }
        });
    };

    getOneProductRecord();
  }, [id]);

  // const updateData = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const confirmed = window.confirm(
  //       "Are you sure you want to update this product?"
  //     );
  //     if (confirmed) {
  //       let updatedProductData = {
  //         productId: productId,
  //         quantity: quantity,
  //         productDate: productDate,
  //         description: description,
  //       };

  //       await axios
  //         .put(
  //           `http://localhost:8000/productCnt/update/${id}`,
  //           updatedProductData
  //         )
  //         .then((res) => {
  //           alert(res.data.success);
  //           console.log(res.data.success);
  //           navigate("/viewProductCnt");
  //         })
  //         .catch((err) => {
  //           if (err.response) {
  //             console.log(err.response.data.success);
  //           } else {
  //             console.log("Error occured while processing your put request");
  //           }
  //         });
  //     } else {
  //       alert("Update cancelled!");
  //     }
  //   } catch (err) {
  //     console.log("Update failed!");
  //   }
  // };

  const updateData = async (e) => {
    e.preventDefault();
  
    try {
      const confirmed = window.confirm(
        "Are you sure you want to update this product?"
      );
      if (confirmed) {
        let updatedProductData = {
          productId: productId,
          quantity: quantity,
          productDate: productDate,
          description: description,
        };
  
        const res = await axios.put(
          `http://localhost:8000/productCnt/update/${id}`,
          updatedProductData
        );
  
        if (description === 'Incremented') {
          // Call updateProductQuantity to add quantity
          await axios.put(`http://localhost:8000/products/updateQuantity/${productId}`, {
            quantity: +quantity,
            existedQuantity: updatedProductData.quantity
          });
        } else if (description === 'Decremented') {
          // Call updateProductQuantity to subtract quantity
          await axios.put(`http://localhost:8000/products/updateQuantity/${productId}`, {
            quantity: -quantity, 
            existedQuantity: updatedProductData.quantity
          }); 
        } else {
          console.error('Invalid description:', description);
          return; // Exit the function if description is invalid
        }
  
        // Display success message
        alert('Product quantity updated successfully.');
  
        alert(res.data.success);
        console.log(res.data.success);
        navigate("/viewProductCnt");
      } else {
        alert("Update cancelled!");
      }
    } catch (err) {
      console.log("Update failed!");
      alert("Failed to update product. Please try again.");
    }
  };
  

  return (
    <div className="col-md-5 mt-5 mx-auto">
      <h1 className="h3 mb-4 font-weight-normal">
        Update Product Count Record
      </h1>
      <form className="needs-validation" noValidate onSubmit={updateData}>
        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px" }}>Product ID</label>
          <input
            type="text"
            className={`form-control`}
            name="productId"
            placeholder="Enter Product Id"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
          />
        </div>

        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px" }}>Quantity</label>
          <input
            type="text"
            className={`form-control`}
            name="quantity"
            placeholder="Enter added quantity"
            value={quantity}
            onChange={(e) => setProductQty(e.target.value)}
            required
          />
        </div>

        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px" }}>Date</label>
          <input
            type="date"
            className={`form-control`}
            name="productDate"
            placeholder="Enter the date"
            value={productDate}
            onChange={(e) => setProductDate(e.target.value)}
            required
          />
        </div>

        <div
          className="form-group"
          style={{
            marginBottom: "15px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div>
            <label style={{ marginRight: "10px" }}>
              <input
                type="radio"
                name="description"
                value="Incremented"
                checked={description === "Incremented"}
                onChange={(e) => setProductDesc(e.target.value)}
              />
              &nbsp;Increment
            </label>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <label>
              <input
                type="radio"
                name="description"
                value="Decremented"
                checked={description === "Decremented"}
                onChange={(e) => setProductDesc(e.target.value)}
              />
              &nbsp;Decrement
            </label>
          </div>
        </div>

        <button
          className="btn btn-success"
          type="submit"
          style={{ marginTop: "15px" }}
        >
          <i className="far fa-check-square"></i>
          &nbsp;Update
        </button>
      </form>
    </div>
  );
};

export default EditProductCnt;
