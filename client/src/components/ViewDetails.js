import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';

const ViewDetails = () => {
    const [product, setProductDetails] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id) {
                    const response = await axios.get(`http://localhost:8000/products/${id}`);
                    if (response.data.success) {
                        setProductDetails(response.data.product);
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
