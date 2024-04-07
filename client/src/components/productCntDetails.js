// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// export default function ProductCntDetails() {
//   const [productCnt, setProductCnt] = useState({});
//   const { id } = useParams();

//   useEffect(() => {
//     axios.get(`http://localhost:8000/productCntpost/${id}`)
//       .then((res) => {
//         if (res.data.success) {
//           setProductCnt(res.data.productCnt);
//           console.log(productCnt);
//         } else {
//           // Handle error if the response indicates failure
//           console.error("Request failed:", res.data.message);
//         }
//       })
//       .catch((error) => {
//         // Handle network errors or other errors
//         console.error("Error:", error);
//       });
//   }, [id]);
  

//   return (
//     <div style={{marginTop:'20px'}}>
//       <h4>{productCnt.productID}</h4>
//       <hr/>
//       <dl className="row">
//         <dt className="col-sm-3">Quantity</dt>
//         <dd className="col-sm-9">{productCnt.quantity}</dd>
//         <dt className="col-sm-3">Recorded Date</dt>
//         <dd className="col-sm-9">{productCnt.Date}</dd>
//         <dt className="col-sm-3">Description</dt>
//         <dd className="col-sm-9">{productCnt.Description}</dd>
//       </dl>
//     </div>
//   )
// }


// import React, { Component } from "react";
// import axios from "axios";

// export default class ProductCntDetails extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       productCnt: {},
//     };
//   }

//   componentDidMount() {
//     const id = this.props.match ? this.props.match.params.id : null;

//     console.log("Component did mount with id:", id);

//     if (id) {
//       axios
//         .get(`http://localhost:8000/productCnt/${id}`)
//         .then((res) => {
//           console.log("API response:", res.data); // Log the entire response
//           if (res.data.success) {
//             this.setState({
//               productCnt: res.data.productCnt,
//             });
//             console.log("Received productCnt data:", res.data.productCnt);
//           } else {
//             console.error("Error: ", res.data.error);
//           }
//         })
//         .catch((error) => {
//           console.error("Error fetching data: ", error);
//         });
//     } else {
//       console.error("No ID provided.");
//     }
//   }

//   render() {
//     const { productCnt } = this.state;

//     return (
//       <div style={{ marginTop: "20px" }}>
//         <h4>{productCnt.productID}</h4>
//         <hr />

//         <dl className="row">
//           <dt className="col-sm-3">Quantity</dt>
//           <dd className="col-sm-9">{productCnt.quantity}</dd>

//           <dt className="col-sm-3">Recorded Date</dt>
//           <dd className="col-sm-9">{productCnt.Date}</dd>

//           <dt className="col-sm-3">Description</dt>
//           <dd className="col-sm-9">{productCnt.Description}</dd>
//         </dl>
//       </div>
//     );
//   }
// }

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
        <dd className="col-sm-9">{productCnt.Date}</dd>

        <dt className="col-sm-3">Description</dt>
        <dd className="col-sm-9">{productCnt.Description}</dd>
      </dl>
    </div>
  );
}



