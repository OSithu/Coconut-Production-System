import React, { useState } from "react";
import axios from 'axios';

const CreateOrderDetails = () => {
    const [orderName, setOrderName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [orderDate, setOrderDate] = useState('');

    //implementing sendData function
    const sendData = async (e) => {
        e.preventDefault();

        try {
            let newItemData = {
                orderName: orderName,
                quantity: quantity,
                orderDate: orderDate,
            };

            await axios.post('http://localhost:8000/orderDetails/save', newItemData)
                .then((res) => {
                    alert(res.data.success);
                    console.log(res.data.success);
                })
                .catch((err) => {
                    if (err.response) {
                        console.log(err.response.data.error);
                    } else {
                        console.log("Error occurred while processing your axios post request. " + err.error);
                    }
                });

        } catch (err) {
            console.log('sendData function failed! ERROR: ' + err.message);
        }

        //set state back to first state
        setOrderName('');
        setQuantity('');
        setOrderDate('');
    };

    return (
        <div className="col-md-8 mt-4 mx-auto">
            <h1 className="h3 mb-3 font-weight-normal">Add new order detail</h1>
            <form className="needs-validation" noValidate onSubmit={sendData}>
                <div className="form-group" style={{ marginBottom: "15px" }}>
                        <label style={{ marginBottom: "5px" }}>Order name</label>
                        <input
                            type="text"
                            className={`form-control`}
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
                            className={`form-control`}
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
                        <label style={{ marginBottom: "5px" }}>Order date</label>
                        <input
                            type="text"
                            className={`form-control`}
                            name="orderDate"
                            placeholder="Enter order date"
                            onChange={(e) => setOrderDate(e.target.value)}
                            value={orderDate} 
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
                    <i className="far fa-check-square"></i>
                    &nbsp;Save
                </button>
            </form>
        </div>
    );
};

export default CreateOrderDetails;
