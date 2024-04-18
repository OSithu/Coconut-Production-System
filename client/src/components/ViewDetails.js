import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';

const ViewDetails = () => {
    const [product, setProductDetails] = useState({});
    const [productImage, setProductImage] = useState('');
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
                    const response = await axios.get(`http://localhost:8000/products/${id}`);
                    if (response.data.success) {
                        setProductDetails(response.data.product);
                        getProductImage(id); // Call getProductImage to fetch image
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
        <div style={{ marginTop: "20px" }}>
            <h4>{product.productName}</h4>
            <hr />

            <dl className="row">
                <dt className="col-sm-3"> </dt>
                <dd className="col-sm-9">
                    {productImage ? <img src={productImage} alt="Product" style={{ maxWidth: "200px" }} /> : 'Loading...'}
                </dd>

                <dt className="col-sm-3">Name: </dt>
                <dd className="col-sm-9">{product.productName || 'Loading...'}</dd>

                <dt className="col-sm-3">Available Quantity</dt>
                <dd className="col-sm-9">{product.quantity || 'Loading...'}</dd>

                <dt className="col-sm-3">Manufactured Date</dt>
                <dd className="col-sm-9">{product.manufacturedDate || 'Loading...'}</dd>

                <dt className="col-sm-3">Expiration Date</dt>
                <dd className="col-sm-9">{product.expirationDate || 'Loading...'}</dd>
            </dl>
        </div>
    );
}

export default ViewDetails;
