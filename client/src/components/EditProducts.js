import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditProducts = () => {
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [quantity, setProductQty] = useState("");
  const [category, setProductCategory] = useState("");
  const [manufacturedDate, setProductMD] = useState("");
  const [expirationDate, setProductED] = useState("");
  const [reOrderLevel, setProductROL] = useState("");

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
    const getOneProduct = async () => {
      await axios
        .get(`http://localhost:8000/products/${id}`)
        .then((res) => {
          setProductId(res.data.product.productId);
          setProductName(res.data.product.productName);
          setProductQty(res.data.product.quantity);
          setProductCategory(res.data.product.category);
          setProductMD(formatDate(res.data.product.manufacturedDate));
          setProductED(formatDate(res.data.product.expirationDate));
          setProductROL(res.data.product.reOrderLevel);
          setProductImage(res.data.product.productImage);
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

    getOneProduct();
  }, [id]);

  const updateData = async (e) => {
    e.preventDefault();

    try {
      const confirmed = window.confirm(
        "Are you sure you want to update this product?"
      );
      if (confirmed) {
        // let updatedProductData = {
        //   productId: productId,
        //   productName: productName,
        //   productImage: productImage,
        //   quantity: quantity,
        //   category: category,
        //   manufacturedDate: manufacturedDate,
        //   expirationDate: expirationDate,
        //   reOrderLevel: reOrderLevel,
        // };
        let updatedProductData = new FormData();
        updatedProductData.append("productId", productId);
        updatedProductData.append("productName", productName);
        updatedProductData.append("quantity", quantity);
        updatedProductData.append("category", category);
        updatedProductData.append("manufacturedDate", manufacturedDate);
        updatedProductData.append("expirationDate", expirationDate);
        updatedProductData.append("reOrderLevel", reOrderLevel);
        updatedProductData.append("productImage", productImage);

        await axios
          .put(
            `http://localhost:8000/products/update/${id}`,
            updatedProductData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((res) => {
            alert(res.data.success);
            console.log(res.data.success);
            navigate("/viewProduct");
          })
          .catch((err) => {
            if (err.response) {
              console.log(err.response.data.success);
            } else {
              console.log("Error occured while processing your put request");
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
      <h1 className="h3 mb-3 font-weight-normal">Add new Product</h1>
      <form className="needs-validation" noValidate onSubmit={updateData}>
        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px" }}>Product ID</label>
          <input
            type="text"
            className={`form-control `}
            name="productId"
            placeholder="Enter Product Id"
            onChange={(e) => setProductId(e.target.value)}
            value={productId}
            required
          />
          {/* {errors.productId && (
              <div className="invalid-feedback">{errors.productId}</div>
            )} */}
        </div>

        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px" }}>Product Name</label>
          <input
            type="text"
            className={`form-control `}
            name="productName"
            placeholder="Enter Product Name"
            onChange={(e) => setProductName(e.target.value)}
            value={productName}
            required
          />
          {/* {errors.productName && (
              <div className="invalid-feedback">{errors.productName}</div>
            )} */}
        </div>

        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px" }}>Product Image: </label>
          <input
            type="file"
            className={`form-control-file`}
            name="productImage"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setProductImage(e.target.files[0]);
              }
            }}
            required
          />
        </div>

        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px" }}>Quantity</label>
          <input
            type="text"
            className={`form-control `}
            name="quantity"
            placeholder="Enter added quantity"
            value={quantity}
            onChange={(e) => setProductQty(e.target.value)}
            required
          />
          {/* {errors.quantity && (
              <div className="invalid-feedback">{errors.quantity}</div>
            )} */}
        </div>

        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px" }}>Category</label>
          <select
            className={`form-control `}
            name="category"
            value={category}
            onChange={(e) => setProductCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            <option value="products">Products</option>
            <option value="by-products">By-products</option>
            <option value="agrochemicals">Agrochemicals</option>
          </select>
          {/* {errors.category && (
              <div className="invalid-feedback">{errors.category}</div>
            )} */}
        </div>

        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px" }}>Manufactured Date</label>
          <input
            type="date"
            className={`form-control `}
            name="manufacturedDate"
            placeholder="Enter the manufactured date"
            value={manufacturedDate}
            onChange={(e) => setProductMD(e.target.value)}
            required
          />
          {/* {errors.manufacturedDate && (
              <div className="invalid-feedback">{errors.manufacturedDate}</div>
            )} */}
        </div>

        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px" }}>Expiration Date</label>
          <input
            type="date"
            className={`form-control `}
            name="expirationDate"
            placeholder="Enter the expiration date"
            value={expirationDate}
            onChange={(e) => setProductED(e.target.value)}
            required
          />
          {/* {errors.expirationDate && (
              <div className="invalid-feedback">{errors.expirationDate}</div>
            )} */}
        </div>

        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px" }}>Re-order Level</label>
          <input
            type="text"
            className={`form-control`}
            name="reOrderLevel"
            placeholder="Enter re-order level"
            value={reOrderLevel}
            onChange={(e) => setProductROL(e.target.value)}
            required
          />
          {/* {errors.quantity && (
              <div className="invalid-feedback">{errors.reOrderLevel}</div>
            )} */}
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

export default EditProducts;
