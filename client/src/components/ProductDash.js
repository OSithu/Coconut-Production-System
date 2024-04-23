// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const ProductDash = () => {
//   // Declare productCount state variable
//   const [productCount, setProductCount] = useState(0);

//   useEffect(() => {
//     const fetchProductCount = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/products/count');
//         const productCount = response.data.count;
//         console.log('Number of products:', productCount);
//         // Set the product count to the state
//         setProductCount(productCount);
//       } catch (error) {
//         console.error('Error fetching product count:', error);
//       }
//     };

//     fetchProductCount();
//   }, []);

//   return (
//     <div className="container">
//       <h1>Product Count: {productCount}</h1>
//     </div>
//   );
// };

// export default ProductDash;
