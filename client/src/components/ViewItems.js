import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const ViewItems = () => {
  const [allProducts, setAllItem] = useState([]);
  const { username } = useParams();

  useEffect(() => {
    const getAllItems = async () => {
      await axios
        .get("http://localhost:8000/productCat")
        .then((res) => {
          setAllItem(res.data.existingProductCat);
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
    <div>
      <div className="cusViewHeader">

        <Link to={`/Profile/${username}`}>
          <button type="button" className="btn btn-success" id="cusProfileBtn">
            <i class="fa-solid fa-user"></i> &nbsp; Profile
          </button>
        </Link>
        <br />
        <h6 className="profileName"> Hi {username} ! </h6>
      </div>

      {/* <p
          style={{
            textAlign: "center",
            fontFamily: "sans-serif",
            fontSize: "24px",
          }}
        >
          View Items
        </p> */}



      {/* <a href={`/Profile/${username}`} className="btn btn-primary">
          Profile
        </a> */}
      <div className="cusViewContent">

        <h1 className="cusTopic"> View Items </h1>

        <div className="cusCards">
          <div class="row">
            {allProducts.map((productCat, index) => (
              <div key={index} class="col-sm-4 mb-3 mb-sm-0">
                <div
                  className="card"
                  id="cusViewCard"
                // style={{
                //   width: "18rem",
                //   alignItems: "center",
                //   borderRadius: "20px",
                //   backgroundColor: "rgba(217, 255, 242, 0.6)",
                // }}
                >
                  <div key={productCat._id}>
                    {productCat.productImage && productCat.productImage.data ? (
                      <img
                        src={`data:${productCat.productImage.contentType};base64,${productCat.productImage.data}`}
                        alt="Products"
                        className="card-img-top"
                        id="cusViewImg"
                      // style={{ height: "200px", width: "auto" }}
                      />
                    ) : (
                      <span>No image</span>
                    )}
                    <h5 class="card-title">{productCat.productName}</h5>

                    <a
                      href={`/viewDetails/${productCat._id}`}
                      className="btn btn-success"
                    >
                      View Details
                    </a>
                  </div>
                </div>
                <br />
                <br />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewItems;
