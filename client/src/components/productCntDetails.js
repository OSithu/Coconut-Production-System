import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ProductCntDetails() {
  const [productCnt, setProductCnt] = useState({});
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8000/productCnt/${id}`)
        .then((res) => {
          if (res.data.success) {
            setProductCnt(res.data.productCnt);
          } else {
            console.error("Error: ", res.data.error);
          }
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    } else {
      console.error("No ID provided.");
    }
  }, [id]);

  return (
    <div style={{ marginTop: "20px" }}>
      <h4>{productCnt.productID}</h4>
      <hr />

      <dl className="row">
        <dt className="col-sm-3">Quantity</dt>
        <dd className="col-sm-9">{productCnt.quantity}</dd>

        <dt className="col-sm-3">Recorded Date</dt>
        <dd className="col-sm-9">{productCnt.productDate}</dd>

        <dt className="col-sm-3">Description</dt>
        <dd className="col-sm-9">{productCnt.description}</dd>
      </dl>
    </div>
  );
}



