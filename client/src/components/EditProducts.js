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
  const [priceValue, setProductPriceValue] = useState("");
  const [priceUnit, setProductPriceUnit] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();

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
          setProductPriceValue(res.data.product.price.value);
          setProductPriceUnit(res.data.product.price.unit);
          getProductImage(id);
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

  const validateForm = () => {
    const errors = {};
    let formIsValid = true;

    if (!productId.trim()) {
      errors.productId = "Product ID is required";
      formIsValid = false;
    }

    if (!productName.trim()) {
      errors.productName = "Product Name is required";
      formIsValid = false;
    }

    // if (!productImage) {
    //   errors.productImage = "Product Image is required";
    //   formIsValid = false;
    // }

    if (!quantity) {
      errors.quantity = "Quantity is required";
      formIsValid = false;
    } else if (isNaN(quantity)) {
      errors.quantity = "Quantity must be a number";
      formIsValid = false;
    }

    if (!category.trim()) {
      errors.category = "Category is required";
      formIsValid = false;
    }

    if (!manufacturedDate) {
      errors.manufacturedDate = "Manufactured Date is required";
      formIsValid = false;
    }

    if (!expirationDate) {
      errors.expirationDate = "Expiration Date is required";
      formIsValid = false;
    }

    if (!reOrderLevel) {
      errors.reOrderLevel = "Re-order Level is required";
      formIsValid = false;
    } else if (isNaN(reOrderLevel)) {
      errors.reOrderLevel = "Re-order Level must be a number";
      formIsValid = false;
    }

    // if (!price.trim()) {
    //   errors.price = "Price is required";
    //   formIsValid = false;
    // } else if (isNaN(price)) {
    //   errors.reOrderLevel = "Price must be a number";
    //   formIsValid = false;
    // }

    setFormErrors(errors);
    return formIsValid;
  };

  const updateData = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const confirmed = window.confirm(
        "Are you sure you want to update this product?"
      );
      if (confirmed) {
        let updatedProductData = new FormData();
        updatedProductData.append("productId", productId);
        updatedProductData.append("productName", productName);
        updatedProductData.append("quantity", quantity);
        updatedProductData.append("category", category);
        updatedProductData.append("manufacturedDate", manufacturedDate);
        updatedProductData.append("expirationDate", expirationDate);
        updatedProductData.append("reOrderLevel", reOrderLevel);
        updatedProductData.append("productImage", productImage);
        updatedProductData.append("price", JSON.stringify({ value: priceValue, unit: priceUnit }));

        await axios
          .put(
            `http://localhost:8000/products/update/${id}`,
            updatedProductData,
            {
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
            className={`form-control ${formErrors.productId && "is-invalid"}`}
            name="productId"
            placeholder="Enter Product Id"
            onChange={(e) => setProductId(e.target.value)}
            value={productId}
            required
          />
          {formErrors.productId && (
            <div className="invalid-feedback">{formErrors.productId}</div>
          )}
        </div>

        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px" }}>Product Name</label>
          <input
            type="text"
            className={`form-control ${formErrors.productName && "is-invalid"}`}
            name="productName"
            placeholder="Enter Product Name"
            onChange={(e) => setProductName(e.target.value)}
            value={productName}
            required
          />
          {formErrors.productName && (
            <div className="invalid-feedback">{formErrors.productName}</div>
          )}
        </div>

        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px" }}>Product Image: </label>
          <input
            type="file"
            className={`form-control`}
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
          <label style={{ marginBottom: "5px" }}>Available Quantity</label>
          <input
            type="text"
            className={`form-control ${formErrors.quantity && "is-invalid"}`}
            name="quantity"
            placeholder="Enter added quantity"
            value={quantity}
            onChange={(e) => setProductQty(e.target.value)}
            required
          />
          {formErrors.quantity && (
            <div className="invalid-feedback">{formErrors.quantity}</div>
          )}
        </div>

        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label className="col-sm-2 col-form-label"> Unit Price </label>
          <div className="col-sm-8">
          <select
              className="form-select"
              name="unit"
              value={priceUnit}
              onChange={(e) => setProductPriceUnit(e.target.value)}
            >
              <option value=""> Select Unit </option>
              <option value="Rs."> Rs. </option>
              <option value="-"> - </option>
            </select>
            
            <input
              type="text"
              className={`form-control `}
              name="price"
              placeholder="Enter Unit Price"
              value={priceValue}
              onChange={(e) => setProductPriceValue(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px" }}>Category</label>
          <select
            className={`form-control ${formErrors.category && "is-invalid"} `}
            name="category"
            value={category}
            onChange={(e) => setProductCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            <option value="Products">Products</option>
            <option value="By-products">By-products</option>
            <option value="Agrochemicals">Agrochemicals</option>
          </select>
          {formErrors.category && (
            <div className="invalid-feedback">{formErrors.category}</div>
          )}
        </div>

        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px" }}>Manufactured Date</label>
          <input
            type="date"
            className={`form-control ${
              formErrors.manufacturedDate && "is-invalid"
            } `}
            name="manufacturedDate"
            placeholder="Enter the manufactured date"
            value={manufacturedDate}
            onChange={(e) => setProductMD(e.target.value)}
            required
          />
          {formErrors.manufacturedDate && (
            <div className="invalid-feedback">
              {formErrors.manufacturedDate}
            </div>
          )}
        </div>

        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px" }}>Expiration Date</label>
          <input
            type="date"
            className={`form-control ${
              formErrors.expirationDate && "is-invalid"
            } `}
            name="expirationDate"
            placeholder="Enter the expiration date"
            value={expirationDate}
            onChange={(e) => setProductED(e.target.value)}
            required
          />
          {formErrors.expirationDate && (
            <div className="invalid-feedback">{formErrors.expirationDate}</div>
          )}
        </div>

        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px" }}>Re-order Level</label>
          <input
            type="text"
            className={`form-control ${
              formErrors.reOrderLevel && "is-invalid"
            } `}
            name="reOrderLevel"
            placeholder="Enter re-order level"
            value={reOrderLevel}
            onChange={(e) => setProductROL(String(e.target.value))}
            required
          />
          {formErrors.reOrderLevel && (
            <div className="invalid-feedback">{formErrors.reOrderLevel}</div>
          )}
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
