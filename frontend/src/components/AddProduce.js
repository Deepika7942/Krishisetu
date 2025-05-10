// // import React, { useState, useEffect, useCallback, useContext } from 'react';
// // import axios from 'axios';
// // import './addproduce.css';
// // import KSlogo from "../assets/logo.jpg";
// // import BSimg from "../assets/bargain.jpeg";
// // import { AuthContext } from '../context/AuthContext';

// // // Move the helper function outside the component
// // const getFarmerName = (farmerData) => {
// //   if (!farmerData) return 'Farmer';
// //   if (farmerData.full_name) return farmerData.full_name;
// //   if (farmerData.first_name && farmerData.last_name) {
// //     return `${farmerData.first_name} ${farmerData.last_name}`;
// //   }
// //   return farmerData.first_name || farmerData.last_name || 'Farmer';
// // };

// // const AddProduce = () => {
// //   // State declarations
// //   const [selectedMarket, setSelectedMarket] = useState(null);
// //   const [produces, setProduces] = useState([]);
// //   const [newProduce, setNewProduce] = useState({
// //     produce_name: '',
// //     availability: '',
// //     price_per_kg: '',
// //     produce_type: 'Standard',
// //     market_type: '',
// //     min_quantity:''
// //   });
// //   const [isFormVisible, setIsFormVisible] = useState(false);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [error, setError] = useState('');
  
// //   // Get farmer from AuthContext with proper initialization
// //   const authContext = useContext(AuthContext);
// //   const farmer = authContext?.farmer || {};
  
// //   // State for farmer details with proper initialization
// //   const [farmerDetails, setFarmerDetails] = useState({
// //     id: '',
// //     name: 'Loading...',
// //     isLoaded: false
// //   });

// //   // Effect to update farmer details when context changes
// //   useEffect(() => {
// //     if (authContext?.farmer) {
// //       setFarmerDetails({
// //         id: authContext.farmer.farmer_id || '',
// //         name: getFarmerName(authContext.farmer),
// //         isLoaded: true
// //       });
// //     } else {
// //       setFarmerDetails({
// //         id: '',
// //         name: 'Loading...',
// //         isLoaded: false
// //       });
// //     }
// //   }, [authContext?.farmer]);
  

// //   const loadProduces = useCallback(async () => {
// //     if (!selectedMarket || !farmerDetails.id || !farmerDetails.isLoaded) return;
    
// //     try {
// //       setIsLoading(true);
// //       const response = await axios.get(`http://localhost:5000/api/produces`, {
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'Authorization': `Bearer ${localStorage.getItem('token')}`
// //         },
// //         params: {
// //           farmer_id: farmerDetails.id,
// //           market_type: selectedMarket
// //         }
// //       });
// //       setProduces(response.data);
// //       setError('');
// //     } catch (err) {
// //       console.error('Failed to fetch produces:', err);
// //       setError('Failed to load produces. Please try again.');
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   }, [selectedMarket, farmerDetails.id, farmerDetails.isLoaded]);

// //   useEffect(() => {
// //     loadProduces();
// //   }, [loadProduces]);

// //   const handleMarketClick = (market) => {
// //     const marketType = market === 'krishisetu' ? 'KrishiSetu Market' : 'Bargaining Market';
// //     setSelectedMarket(marketType);
// //     setIsFormVisible(false);
// //     setError('');
// //   };

// //   const handleFormChange = (e) => {
// //     const { name, value } = e.target;
// //     setNewProduce({
// //       ...newProduce,
// //       [name]: value,
// //       market_type: selectedMarket
// //     });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError('');
    
// //     if (!newProduce.produce_name || !newProduce.availability || !newProduce.price_per_kg) {
// //       setError('Please fill all the fields');
// //       return;
// //     }
  
// //     if (isNaN(newProduce.availability)) {
// //       setError('Availability must be a number');
// //       return;
// //     }
  
// //     if (isNaN(newProduce.price_per_kg)) {
// //       setError('Price must be a valid number');
// //       return;
// //     }

// //     if (!farmer?.farmer_id) {
// //       setError('Farmer information not available. Please log in again.');
// //       return;
// //     }
  
// //     try {
// //       setIsLoading(true);
// //       const produceData = {
// //         ...newProduce,
// //         farmer_id: farmer.farmer_id,
// //         farmer_name: farmer.full_name || `${farmer.first_name} ${farmer.last_name}`,
// //         email: farmer.email,
// //         availability: parseFloat(newProduce.availability),
// //         price_per_kg: parseFloat(newProduce.price_per_kg),
// //         market_type: selectedMarket
// //       };

// //       const config = {
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'Authorization': `Bearer ${localStorage.getItem('token')}`
// //         }
// //       };

// //       if (newProduce.id) {
// //         await axios.put(
// //           `http://localhost:5000/api/produces/${newProduce.id}`,
// //           produceData,
// //           {
// //             headers: {
// //               'Content-Type': 'application/json',
// //               'Authorization': `Bearer ${localStorage.getItem('token')}`
// //             }
// //           }
// //         );
// //       } else {
// //         await axios.post(
// //           'http://localhost:5000/api/produces',
// //           produceData,
// //           {
// //             headers: {
// //               'Content-Type': 'application/json',
// //               'Authorization': `Bearer ${localStorage.getItem('token')}`
// //             }
// //           }
// //       )};

// //       await loadProduces();
// //       setNewProduce({
// //         produce_name: '',
// //         availability: '',
// //         price_per_kg: '',
// //         produce_type: 'Standard',
// //         market_type: selectedMarket
// //       });
// //       setIsFormVisible(false);
// //     } catch (err) {
// //       console.error('Failed to save produce:', err);
// //       setError(err.response?.data?.error || 'Failed to save produce. Please try again.');
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const editProduce = (produce) => {
// //     setNewProduce({
// //       ...produce,
// //       id: produce.product_id
// //     });
// //     setIsFormVisible(true);
// //   };

// //   const deleteProduce = async (productId) => {
// //     if (!window.confirm('Are you sure you want to delete this produce?')) return;
    
// //     try {
// //       setIsLoading(true);
// //       await axios.delete(`http://localhost:5000/api/produces/${productId}`,
// //         {
// //           headers: {
// //             'Content-Type': 'application/json',
// //             'Authorization': `Bearer ${localStorage.getItem('token')}`
// //           }
// //         }
// //       );
// //       await loadProduces();
// //     } catch (err) {
// //       console.error('Failed to delete produce:', err);
// //       setError('Failed to delete produce. Please try again.');
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="addproduce-container">
// //       <h1>Produces Added to the List</h1>
      
// //       {/* Farmer info section */}
// //       <div className="farmer-info">
// //         {farmerDetails.isLoaded ? (
// //           <>
// //             {farmerDetails.id && <p>Farmer ID: {farmerDetails.id}</p>}
// //             <p>Farmer Name: {farmerDetails.name}</p>
// //           </>
// //         ) : (
// //           <p>Loading farmer information...</p>
// //         )}
// //       </div>
// //       {error && <div className="error-message">{error}</div>}
// //       {isLoading && <div className="loading-indicator">Loading...</div>}

// //       <div className="addproduce-market-buttons">
// //         <button 
// //           onClick={() => handleMarketClick('krishisetu')} 
// //           className={selectedMarket === 'KrishiSetu Market' ? 'active' : ''}
// //           disabled={isLoading}
// //         >
// //           <img src={KSlogo} alt="KrishiSetu Logo" />
// //           KrishiSetu Market
// //         </button>
// //         <button 
// //           onClick={() => handleMarketClick('bargaining')} 
// //           className={selectedMarket === 'Bargaining Market' ? 'active' : ''}
// //           disabled={isLoading}
// //         >
// //           <img src={BSimg} alt="Bargaining Logo" />
// //           Bargaining System
// //         </button>
// //       </div>

// //       {selectedMarket && (
// //         <>
// //           <button 
// //             className="addproduce-button" 
// //             onClick={() => {
// //               setIsFormVisible(!isFormVisible);
// //               if (isFormVisible) {
// //                 setNewProduce({
// //                   produce_name: '',
// //                   availability: '',
// //                   price_per_kg: '',
// //                   produce_type: 'Standard',
// //                   market_type: selectedMarket
// //                 });
// //               }
// //             }}
// //             disabled={isLoading}
// //           >
// //             {isFormVisible ? 'Cancel' : 'Add Produce'}
// //           </button>

// //           {isFormVisible && (
// //             <div className="addproduce-form">
// //               <h3>{newProduce.id ? 'Edit Produce' : 'Add Produce'} to {selectedMarket}</h3>
// //               <form onSubmit={handleSubmit}>
// //                 <div>
// //                   <label>Produce Name:</label>
// //                   <input
// //                     type="text"
// //                     name="produce_name"
// //                     value={newProduce.produce_name}
// //                     onChange={handleFormChange}
// //                     placeholder="Enter produce name"
// //                     required
// //                     disabled={isLoading}
// //                   />
// //                 </div>
// //                 <div>
// //                   <label>Availability (kg):</label>
// //                   <input
// //                     type="number"
// //                     name="availability"
// //                     value={newProduce.availability}
// //                     onChange={handleFormChange}
// //                     placeholder="Enter availability in kg"
// //                     min="0.1"
// //                     step="0.1"
// //                     required
// //                     disabled={isLoading}
// //                   />
// //                 </div>
// //                 <div>
// //                   <label>Price per KG:</label>
// //                   <input
// //                     type="number"
// //                     name="price_per_kg"
// //                     value={newProduce.price_per_kg}
// //                     onChange={handleFormChange}
// //                     placeholder="Enter price per kg"
// //                     min="0.01"
// //                     step="0.01"
// //                     required
// //                     disabled={isLoading}
// //                   />
// //                 </div>
// //                 <div>
// //                   <label>Produce Type:</label>
// //                   <select
// //                     name="produce_type"
// //                     value={newProduce.produce_type}
// //                     onChange={handleFormChange}
// //                     required
// //                     disabled={isLoading}
// //                   >
// //                     <option value="Standard">Standard</option>
// //                     <option value="Organic">Organic</option>
// //                   </select>
// //                 </div>
// //                 <button 
// //                   type="submit" 
// //                   className="addproduce-submit-button"
// //                   disabled={isLoading}
// //                 >
// //                   {isLoading ? 'Saving...' : newProduce.id ? 'Update Produce' : 'Add Produce'}
// //                 </button>
// //               </form>
// //             </div>
// //           )}

// //           <h3>List of Produces in {selectedMarket}</h3>
// //           {produces.length > 0 ? (
// //             <table className="addproduce-table">
// //               <thead>
// //                 <tr>
// //                   <th>Produce Name</th>
// //                   <th>Type</th>
// //                   <th>Availability (kg)</th>
// //                   <th>Price per KG</th>
// //                   <th>Actions</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {produces.map((produce) => (
// //                   <tr key={produce.product_id}>
// //                     <td>{produce.produce_name}</td>
// //                     <td>{produce.produce_type}</td>
// //                     <td>{produce.availability} kg</td>
// //                     <td>₹{produce.price_per_kg}</td>
// //                     <td>
// //                       <button
// //                         className="addproduce-edit-button"
// //                         onClick={() => editProduce(produce)}
// //                         disabled={isLoading}
// //                       >
// //                         Edit
// //                       </button>
// //                       <button
// //                         className="addproduce-remove-button"
// //                         onClick={() => deleteProduce(produce.product_id)}
// //                         disabled={isLoading}
// //                       >
// //                         Remove
// //                       </button>
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           ) : (
// //             <p>No produces added yet for this market.</p>
// //           )}
// //         </>
// //       )}
// //     </div>
// //   );
// // };

// // export default AddProduce;

// import React, { useState, useEffect, useCallback, useContext } from 'react';
// import axios from 'axios';
// import './addproduce.css';
// import KSlogo from "../assets/logo.jpg";
// import BSimg from "../assets/bargain.jpeg";
// import { AuthContext } from '../context/AuthContext';

// // Move the helper function outside the component
// const getFarmerName = (farmerData) => {
//   if (!farmerData) return 'Farmer';
//   if (farmerData.full_name) return farmerData.full_name;
//   if (farmerData.first_name && farmerData.last_name) {
//     return `${farmerData.first_name} ${farmerData.last_name}`;
//   }
//   return farmerData.first_name || farmerData.last_name || 'Farmer';
// };

// const AddProduce = () => {
//   // State declarations
//   const [selectedMarket, setSelectedMarket] = useState(null);
//   const [produces, setProduces] = useState([]);
//   const [newProduce, setNewProduce] = useState({
//     produce_name: '',
//     availability: '',
//     price_per_kg: '',
//     produce_type: 'Standard',
//     market_type: '',
//     minimum_quantity: '',
//     minimum_price: '' 
//   });
//   const [isFormVisible, setIsFormVisible] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [showInstructions, setShowInstructions] = useState(true); // New state for instructions
  
//   // Get farmer from AuthContext with proper initialization
//   const authContext = useContext(AuthContext);
//   const farmer = authContext?.farmer || {};
  
//   // State for farmer details with proper initialization
//   const [farmerDetails, setFarmerDetails] = useState({
//     id: '',
//     name: 'Loading...',
//     isLoaded: false
//   });

//   // Effect to update farmer details when context changes
//   useEffect(() => {
//     if (authContext?.farmer) {
//       setFarmerDetails({
//         id: authContext.farmer.farmer_id || '',
//         name: getFarmerName(authContext.farmer),
//         isLoaded: true
//       });
//     } else {
//       setFarmerDetails({
//         id: '',
//         name: 'Loading...',
//         isLoaded: false
//       });
//     }
//   }, [authContext?.farmer]);

//   const loadProduces = useCallback(async () => {
//     if (!selectedMarket || !farmerDetails.id || !farmerDetails.isLoaded) return;
    
//     try {
//       setIsLoading(true);
//       const response = await axios.get(`http://localhost:5000/api/produces`, {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         },
//         params: {
//           farmer_id: farmerDetails.id,
//           market_type: selectedMarket
//         }
//       });
//       setProduces(response.data);
//       setError('');
//     } catch (err) {
//       console.error('Failed to fetch produces:', err);
//       setError('Failed to load produces. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   }, [selectedMarket, farmerDetails.id, farmerDetails.isLoaded]);

//   useEffect(() => {
//     loadProduces();
//   }, [loadProduces]);

//   const handleMarketClick = (market) => {
//     const marketType = market === 'krishisetu' ? 'KrishiSetu Market' : 'Bargaining Market';
//     setSelectedMarket(marketType);
//     setIsFormVisible(false);
//     setError('');
//   };

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setNewProduce({
//       ...newProduce,
//       [name]: value,
//       market_type: selectedMarket
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
    
//     // Basic validation
//     if (!newProduce.produce_name || !newProduce.availability || !newProduce.price_per_kg) {
//       setError('Please fill all the fields');
//       return;
//     }
  
//     if (isNaN(newProduce.availability)) {
//       setError('Availability must be a number');
//       return;
//     }
  
//     if (isNaN(newProduce.price_per_kg)) {
//       setError('Price must be a valid number');
//       return;
//     }

//     // Additional validation for Bargaining Market
//     if (selectedMarket === 'Bargaining Market') {
//       if (!newProduce.minimum_quantity) {
//         setError('Minimum quantity is required for Bargaining Market');
//         return;
//       }
      
//       if (isNaN(newProduce.minimum_quantity)) {
//         setError('Minimum quantity must be a number');
//         return;
//       }
      
//       if (parseFloat(newProduce.minimum_quantity) < 10) { // Changed to 10kg minimum
//         setError('Minimum quantity must be at least 10kg for Bargaining Market');
//         return;
//       }

//       if (!newProduce.minimum_price) {
//         setError('Minimum price is required for Bargaining Market');
//         return;
//       }
      
//       if (isNaN(newProduce.minimum_price)) {
//         setError('Minimum price must be a valid number');
//         return;
//       }
      
//       if (parseFloat(newProduce.minimum_price) <= 0) {
//         setError('Minimum price must be greater than 0');
//         return;
//       }

//       if (parseFloat(newProduce.minimum_price) >= parseFloat(newProduce.price_per_kg)) {
//         setError('Minimum price must be less than the regular price');
//         return;
//       }
//     }

//     if (!farmer?.farmer_id) {
//       setError('Farmer information not available. Please log in again.');
//       return;
//     }
  
//     try {
//       setIsLoading(true);
//       const produceData = {
//         ...newProduce,
//         farmer_id: farmer.farmer_id,
//         farmer_name: farmer.full_name || `${farmer.first_name} ${farmer.last_name}`,
//         email: farmer.email,
//         availability: parseFloat(newProduce.availability),
//         price_per_kg: parseFloat(newProduce.price_per_kg),
//         market_type: selectedMarket,
//         ...(selectedMarket === 'Bargaining Market' && {
//           minimum_quantity: parseFloat(newProduce.minimum_quantity),
//           minimum_price: parseFloat(newProduce.minimum_price)
//         })
//       };

//       const config = {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         }
//       };

//       if (newProduce.id) {
//         await axios.put(
//           `http://localhost:5000/api/produces/${newProduce.id}`,
//           produceData,
//           config
//         );
//       } else {
//         await axios.post(
//           'http://localhost:5000/api/produces',
//           produceData,
//           config
//         );
//       }

//       await loadProduces();
//       setNewProduce({
//         produce_name: '',
//         availability: '',
//         price_per_kg: '',
//         produce_type: 'Standard',
//         market_type: selectedMarket,
//         minimum_quantity: '',
//         minimum_price: ''
//       });
//       setIsFormVisible(false);
//     } catch (err) {
//       console.error('Failed to save produce:', err);
//       setError(err.response?.data?.error || 'Failed to save produce. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const editProduce = (produce) => {
//     setNewProduce({
//       ...produce,
//       id: produce.product_id,
//       minimum_quantity: produce.minimum_quantity || '',
//       minimum_price: produce.minimum_price || ''
//     });
//     setIsFormVisible(true);
//   };

//   const deleteProduce = async (productId) => {
//     if (!window.confirm('Are you sure you want to delete this produce?')) return;
    
//     try {
//       setIsLoading(true);
//       await axios.delete(`http://localhost:5000/api/produces/${productId}`, {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         }
//       });
//       await loadProduces();
//     } catch (err) {
//       console.error('Failed to delete produce:', err);
//       setError('Failed to delete produce. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Render instructions if showInstructions is true
//   if (showInstructions) {
//     return (
//       <div className="addproduce-instructions">
//         <h2>Instructions for Adding Produce</h2>
//         <div className="instructions-content">
//           <ol>
//             <li>
//               If you add the produce to <strong>KrishiSetu Market</strong>, it will be stored in the KrishiSetu market or warehouses. 
//               If you add the produce to <strong>Bargaining Market</strong>, it will be stored in the bargain marketplace in the consumer 
//               dashboard and it helps for bargaining with consumers.
//             </li>
//             <li>
//               The <strong>minimum price</strong> field is included to remove price conflicts in the bargaining system.
//             </li>
//             <li>
//               For the <strong>Bargaining Market</strong>, the minimum quantity you should add is <strong>10kg</strong>. 
//               This is because to initiate a bargain, the minimum quantity should be 10kg.
//             </li>
//             <li>
//               The minimum price should always be less than the regular price you set for the produce.
//             </li>
//           </ol>
//           <button 
//             className="close-instructions-button"
//             onClick={() => setShowInstructions(false)}
//           >
//             I Understand, Continue to Add Produce
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Regular UI when instructions are closed
//   return (
//     <div className="addproduce-container">
//       <h1>Produces Added to the List</h1>
      
//       {/* Farmer info section */}
//       <div className="farmer-info">
//         {farmerDetails.isLoaded ? (
//           <>
//             {farmerDetails.id && <p>Farmer ID: {farmerDetails.id}</p>}
//             <p>Farmer Name: {farmerDetails.name}</p>
//           </>
//         ) : (
//           <p>Loading farmer information...</p>
//         )}
//       </div>
//       {error && <div className="error-message">{error}</div>}
//       {isLoading && <div className="loading-indicator">Loading...</div>}

//       <div className="addproduce-market-buttons">
//         <button 
//           onClick={() => handleMarketClick('krishisetu')} 
//           className={selectedMarket === 'KrishiSetu Market' ? 'active' : ''}
//           disabled={isLoading}
//         >
//           <img src={KSlogo} alt="KrishiSetu Logo" />
//           KrishiSetu Market
//         </button>
//         <button 
//           onClick={() => handleMarketClick('bargaining')} 
//           className={selectedMarket === 'Bargaining Market' ? 'active' : ''}
//           disabled={isLoading}
//         >
//           <img src={BSimg} alt="Bargaining Logo" />
//           Bargaining Market
//         </button>
//       </div>

//       {selectedMarket && (
//         <>
//           <button 
//             className="addproduce-button" 
//             onClick={() => {
//               setIsFormVisible(!isFormVisible);
//               if (isFormVisible) {
//                 setNewProduce({
//                   produce_name: '',
//                   availability: '',
//                   price_per_kg: '',
//                   produce_type: 'Standard',
//                   market_type: selectedMarket,
//                   minimum_quantity: '',
//                   minimum_price: ''
//                 });
//               }
//             }}
//             disabled={isLoading}
//           >
//             {isFormVisible ? 'Cancel' : 'Add Produce'}
//           </button>

//           {isFormVisible && (
//             <div className="addproduce-form">
//               <h3>{newProduce.id ? 'Edit Produce' : 'Add Produce'} to {selectedMarket}</h3>
//               <form onSubmit={handleSubmit}>
//                 <div>
//                   <label>Produce Name:</label>
//                   <input
//                     type="text"
//                     name="produce_name"
//                     value={newProduce.produce_name}
//                     onChange={handleFormChange}
//                     placeholder="Enter produce name"
//                     required
//                     disabled={isLoading}
//                   />
//                 </div>
//                 <div>
//                   <label>Availability (kg):</label>
//                   <input
//                     type="number"
//                     name="availability"
//                     value={newProduce.availability}
//                     onChange={handleFormChange}
//                     placeholder="Enter availability in kg"
//                     min="0.1"
//                     step="0.1"
//                     required
//                     disabled={isLoading}
//                   />
//                 </div>
//                 <div>
//                   <label>Price per KG:</label>
//                   <input
//                     type="number"
//                     name="price_per_kg"
//                     value={newProduce.price_per_kg}
//                     onChange={handleFormChange}
//                     placeholder="Enter price per kg"
//                     min="0.01"
//                     step="0.01"
//                     required
//                     disabled={isLoading}
//                   />
//                 </div>
//                 <div>
//                   <label>Produce Type:</label>
//                   <select
//                     name="produce_type"
//                     value={newProduce.produce_type}
//                     onChange={handleFormChange}
//                     required
//                     disabled={isLoading}
//                   >
//                     <option value="Standard">Standard</option>
//                     <option value="Organic">Organic</option>
//                   </select>
//                 </div>
                
//                 {selectedMarket === 'Bargaining Market' && (
//                   <>
//                     <div>
//                       <label>Minimum Quantity (kg):</label>
//                       <input
//                         type="number"
//                         name="minimum_quantity"
//                         value={newProduce.minimum_quantity}
//                         onChange={handleFormChange}
//                         placeholder="Minimum 10kg required"
//                         min="10"
//                         step="0.1"
//                         required
//                         disabled={isLoading}
//                       />
//                     </div>
//                     <div>
//                       <label>Minimum Price (per kg):</label>
//                       <input
//                         type="number"
//                         name="minimum_price"
//                         value={newProduce.minimum_price}
//                         onChange={handleFormChange}
//                         placeholder="Enter minimum acceptable price"
//                         min="0.01"
//                         step="0.01"
//                         max={newProduce.price_per_kg ? newProduce.price_per_kg - 0.01 : ''}
//                         required
//                         disabled={isLoading}
//                       />
//                     </div>
//                   </>
//                 )}
                
//                 <button 
//                   type="submit" 
//                   className="addproduce-submit-button"
//                   disabled={isLoading}
//                 >
//                   {isLoading ? 'Saving...' : newProduce.id ? 'Update Produce' : 'Add Produce'}
//                 </button>
//               </form>
//             </div>
//           )}

//           <h3>List of Produces in {selectedMarket}</h3>
//           {produces.length > 0 ? (
//             <table className="addproduce-table">
//               <thead>
//                 <tr>
//                   <th>Produce Name</th>
//                   <th>Type</th>
//                   <th>Availability (kg)</th>
//                   <th>Price per KG</th>
//                   {selectedMarket === 'Bargaining Market' && (
//                     <>
//                       <th>Min Quantity</th>
//                       <th>Min Price</th>
//                     </>
//                   )}
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {produces.map((produce) => (
//                   <tr key={produce.product_id}>
//                     <td>{produce.produce_name}</td>
//                     <td>{produce.produce_type}</td>
//                     <td>{produce.availability} kg</td>
//                     <td>₹{produce.price_per_kg}</td>
//                     {selectedMarket === 'Bargaining Market' && (
//                       <>
//                         <td>{produce.minimum_quantity || 'N/A'} kg</td>
//                         <td>₹{produce.minimum_price || 'N/A'}</td>
//                       </>
//                     )}
//                     <td>
//                       <button
//                         className="addproduce-edit-button"
//                         onClick={() => editProduce(produce)}
//                         disabled={isLoading}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         className="addproduce-remove-button"
//                         onClick={() => deleteProduce(produce.product_id)}
//                         disabled={isLoading}
//                       >
//                         Remove
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : (
//             <p>No produces added yet for this market.</p>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default AddProduce;
// import React, { useState, useEffect, useCallback, useContext } from 'react';
// import axios from 'axios';
// import './addproduce.css';
// import KSlogo from "../assets/logo.jpg";
// import BSimg from "../assets/bargain.jpeg";
// import { AuthContext } from '../context/AuthContext';

// // Move the helper function outside the component
// const getFarmerName = (farmerData) => {
//   if (!farmerData) return 'Farmer';
//   if (farmerData.full_name) return farmerData.full_name;
//   if (farmerData.first_name && farmerData.last_name) {
//     return `${farmerData.first_name} ${farmerData.last_name}`;
//   }
//   return farmerData.first_name || farmerData.last_name || 'Farmer';
// };

// const AddProduce = () => {
//   // State declarations
//   const [selectedMarket, setSelectedMarket] = useState(null);
//   const [produces, setProduces] = useState([]);
//   const [newProduce, setNewProduce] = useState({
//     produce_name: '',
//     availability: '',
//     price_per_kg: '',
//     produce_type: 'Standard',
//     market_type: '',
//     min_quantity:''
//   });
//   const [isFormVisible, setIsFormVisible] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
  
//   // Get farmer from AuthContext with proper initialization
//   const authContext = useContext(AuthContext);
//   const farmer = authContext?.farmer || {};
  
//   // State for farmer details with proper initialization
//   const [farmerDetails, setFarmerDetails] = useState({
//     id: '',
//     name: 'Loading...',
//     isLoaded: false
//   });

//   // Effect to update farmer details when context changes
//   useEffect(() => {
//     if (authContext?.farmer) {
//       setFarmerDetails({
//         id: authContext.farmer.farmer_id || '',
//         name: getFarmerName(authContext.farmer),
//         isLoaded: true
//       });
//     } else {
//       setFarmerDetails({
//         id: '',
//         name: 'Loading...',
//         isLoaded: false
//       });
//     }
//   }, [authContext?.farmer]);
  

//   const loadProduces = useCallback(async () => {
//     if (!selectedMarket || !farmerDetails.id || !farmerDetails.isLoaded) return;
    
//     try {
//       setIsLoading(true);
//       const response = await axios.get(`http://localhost:5000/api/produces`, {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         },
//         params: {
//           farmer_id: farmerDetails.id,
//           market_type: selectedMarket
//         }
//       });
//       setProduces(response.data);
//       setError('');
//     } catch (err) {
//       console.error('Failed to fetch produces:', err);
//       setError('Failed to load produces. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   }, [selectedMarket, farmerDetails.id, farmerDetails.isLoaded]);

//   useEffect(() => {
//     loadProduces();
//   }, [loadProduces]);

//   const handleMarketClick = (market) => {
//     const marketType = market === 'krishisetu' ? 'KrishiSetu Market' : 'Bargaining Market';
//     setSelectedMarket(marketType);
//     setIsFormVisible(false);
//     setError('');
//   };

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setNewProduce({
//       ...newProduce,
//       [name]: value,
//       market_type: selectedMarket
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
    
//     if (!newProduce.produce_name || !newProduce.availability || !newProduce.price_per_kg) {
//       setError('Please fill all the fields');
//       return;
//     }
  
//     if (isNaN(newProduce.availability)) {
//       setError('Availability must be a number');
//       return;
//     }
  
//     if (isNaN(newProduce.price_per_kg)) {
//       setError('Price must be a valid number');
//       return;
//     }

//     if (!farmer?.farmer_id) {
//       setError('Farmer information not available. Please log in again.');
//       return;
//     }
  
//     try {
//       setIsLoading(true);
//       const produceData = {
//         ...newProduce,
//         farmer_id: farmer.farmer_id,
//         farmer_name: farmer.full_name || `${farmer.first_name} ${farmer.last_name}`,
//         email: farmer.email,
//         availability: parseFloat(newProduce.availability),
//         price_per_kg: parseFloat(newProduce.price_per_kg),
//         market_type: selectedMarket
//       };

//       const config = {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         }
//       };

//       if (newProduce.id) {
//         await axios.put(
//           `http://localhost:5000/api/produces/${newProduce.id}`,
//           produceData,
//           {
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${localStorage.getItem('token')}`
//             }
//           }
//         );
//       } else {
//         await axios.post(
//           'http://localhost:5000/api/produces',
//           produceData,
//           {
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${localStorage.getItem('token')}`
//             }
//           }
//       )};

//       await loadProduces();
//       setNewProduce({
//         produce_name: '',
//         availability: '',
//         price_per_kg: '',
//         produce_type: 'Standard',
//         market_type: selectedMarket
//       });
//       setIsFormVisible(false);
//     } catch (err) {
//       console.error('Failed to save produce:', err);
//       setError(err.response?.data?.error || 'Failed to save produce. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const editProduce = (produce) => {
//     setNewProduce({
//       ...produce,
//       id: produce.product_id
//     });
//     setIsFormVisible(true);
//   };

//   const deleteProduce = async (productId) => {
//     if (!window.confirm('Are you sure you want to delete this produce?')) return;
    
//     try {
//       setIsLoading(true);
//       await axios.delete(`http://localhost:5000/api/produces/${productId}`,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//           }
//         }
//       );
//       await loadProduces();
//     } catch (err) {
//       console.error('Failed to delete produce:', err);
//       setError('Failed to delete produce. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="addproduce-container">
//       <h1>Produces Added to the List</h1>
      
//       {/* Farmer info section */}
//       <div className="farmer-info">
//         {farmerDetails.isLoaded ? (
//           <>
//             {farmerDetails.id && <p>Farmer ID: {farmerDetails.id}</p>}
//             <p>Farmer Name: {farmerDetails.name}</p>
//           </>
//         ) : (
//           <p>Loading farmer information...</p>
//         )}
//       </div>
//       {error && <div className="error-message">{error}</div>}
//       {isLoading && <div className="loading-indicator">Loading...</div>}

//       <div className="addproduce-market-buttons">
//         <button 
//           onClick={() => handleMarketClick('krishisetu')} 
//           className={selectedMarket === 'KrishiSetu Market' ? 'active' : ''}
//           disabled={isLoading}
//         >
//           <img src={KSlogo} alt="KrishiSetu Logo" />
//           KrishiSetu Market
//         </button>
//         <button 
//           onClick={() => handleMarketClick('bargaining')} 
//           className={selectedMarket === 'Bargaining Market' ? 'active' : ''}
//           disabled={isLoading}
//         >
//           <img src={BSimg} alt="Bargaining Logo" />
//           Bargaining System
//         </button>
//       </div>

//       {selectedMarket && (
//         <>
//           <button 
//             className="addproduce-button" 
//             onClick={() => {
//               setIsFormVisible(!isFormVisible);
//               if (isFormVisible) {
//                 setNewProduce({
//                   produce_name: '',
//                   availability: '',
//                   price_per_kg: '',
//                   produce_type: 'Standard',
//                   market_type: selectedMarket
//                 });
//               }
//             }}
//             disabled={isLoading}
//           >
//             {isFormVisible ? 'Cancel' : 'Add Produce'}
//           </button>

//           {isFormVisible && (
//             <div className="addproduce-form">
//               <h3>{newProduce.id ? 'Edit Produce' : 'Add Produce'} to {selectedMarket}</h3>
//               <form onSubmit={handleSubmit}>
//                 <div>
//                   <label>Produce Name:</label>
//                   <input
//                     type="text"
//                     name="produce_name"
//                     value={newProduce.produce_name}
//                     onChange={handleFormChange}
//                     placeholder="Enter produce name"
//                     required
//                     disabled={isLoading}
//                   />
//                 </div>
//                 <div>
//                   <label>Availability (kg):</label>
//                   <input
//                     type="number"
//                     name="availability"
//                     value={newProduce.availability}
//                     onChange={handleFormChange}
//                     placeholder="Enter availability in kg"
//                     min="0.1"
//                     step="0.1"
//                     required
//                     disabled={isLoading}
//                   />
//                 </div>
//                 <div>
//                   <label>Price per KG:</label>
//                   <input
//                     type="number"
//                     name="price_per_kg"
//                     value={newProduce.price_per_kg}
//                     onChange={handleFormChange}
//                     placeholder="Enter price per kg"
//                     min="0.01"
//                     step="0.01"
//                     required
//                     disabled={isLoading}
//                   />
//                 </div>
//                 <div>
//                   <label>Produce Type:</label>
//                   <select
//                     name="produce_type"
//                     value={newProduce.produce_type}
//                     onChange={handleFormChange}
//                     required
//                     disabled={isLoading}
//                   >
//                     <option value="Standard">Standard</option>
//                     <option value="Organic">Organic</option>
//                   </select>
//                 </div>
//                 <button 
//                   type="submit" 
//                   className="addproduce-submit-button"
//                   disabled={isLoading}
//                 >
//                   {isLoading ? 'Saving...' : newProduce.id ? 'Update Produce' : 'Add Produce'}
//                 </button>
//               </form>
//             </div>
//           )}

//           <h3>List of Produces in {selectedMarket}</h3>
//           {produces.length > 0 ? (
//             <table className="addproduce-table">
//               <thead>
//                 <tr>
//                   <th>Produce Name</th>
//                   <th>Type</th>
//                   <th>Availability (kg)</th>
//                   <th>Price per KG</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {produces.map((produce) => (
//                   <tr key={produce.product_id}>
//                     <td>{produce.produce_name}</td>
//                     <td>{produce.produce_type}</td>
//                     <td>{produce.availability} kg</td>
//                     <td>₹{produce.price_per_kg}</td>
//                     <td>
//                       <button
//                         className="addproduce-edit-button"
//                         onClick={() => editProduce(produce)}
//                         disabled={isLoading}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         className="addproduce-remove-button"
//                         onClick={() => deleteProduce(produce.product_id)}
//                         disabled={isLoading}
//                       >
//                         Remove
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : (
//             <p>No produces added yet for this market.</p>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default AddProduce;
///old one
// import React, { useState, useEffect, useCallback, useContext } from 'react';
// import axios from 'axios';
// import './addproduce.css';
// import KSlogo from "../assets/logo.jpg";
// import BSimg from "../assets/bargain.jpeg";
// import { AuthContext } from '../context/AuthContext';

// // Move the helper function outside the component
// const getFarmerName = (farmerData) => {
//   if (!farmerData) return 'Farmer';
//   if (farmerData.full_name) return farmerData.full_name;
//   if (farmerData.first_name && farmerData.last_name) {
//     return `${farmerData.first_name} ${farmerData.last_name}`;
//   }
//   return farmerData.first_name || farmerData.last_name || 'Farmer';
// };

// const AddProduce = () => {
//   // State declarations
//   const [selectedMarket, setSelectedMarket] = useState(null);
//   const [produces, setProduces] = useState([]);
//   const [newProduce, setNewProduce] = useState({
//     produce_name: '',
//     availability: '',
//     price_per_kg: '',
//     produce_type: 'Standard',
//     market_type: '',
//     minimum_quantity: '',
//     minimum_price: '' 
//   });
//   const [isFormVisible, setIsFormVisible] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [showInstructions, setShowInstructions] = useState(true); // New state for instructions
  
//   // Get farmer from AuthContext with proper initialization
//   const authContext = useContext(AuthContext);
//   const farmer = authContext?.farmer || {};
  
//   // State for farmer details with proper initialization
//   const [farmerDetails, setFarmerDetails] = useState({
//     id: '',
//     name: 'Loading...',
//     isLoaded: false
//   });

//   // Effect to update farmer details when context changes
//   useEffect(() => {
//     if (authContext?.farmer) {
//       setFarmerDetails({
//         id: authContext.farmer.farmer_id || '',
//         name: getFarmerName(authContext.farmer),
//         isLoaded: true
//       });
//     } else {
//       setFarmerDetails({
//         id: '',
//         name: 'Loading...',
//         isLoaded: false
//       });
//     }
//   }, [authContext?.farmer]);

//   const loadProduces = useCallback(async () => {
//     if (!selectedMarket || !farmerDetails.id || !farmerDetails.isLoaded) return;
    
//     try {
//       setIsLoading(true);
//       const response = await axios.get(`http://localhost:5000/api/produces`, {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         },
//         params: {
//           farmer_id: farmerDetails.id,
//           market_type: selectedMarket
//         }
//       });
//       setProduces(response.data);
//       setError('');
//     } catch (err) {
//       console.error('Failed to fetch produces:', err);
//       setError('Failed to load produces. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   }, [selectedMarket, farmerDetails.id, farmerDetails.isLoaded]);

//   useEffect(() => {
//     loadProduces();
//   }, [loadProduces]);

//   const handleMarketClick = (market) => {
//     const marketType = market === 'krishisetu' ? 'KrishiSetu Market' : 'Bargaining Market';
//     setSelectedMarket(marketType);
//     setIsFormVisible(false);
//     setError('');
//   };

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setNewProduce({
//       ...newProduce,
//       [name]: value,
//       market_type: selectedMarket
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
    
//     // Basic validation
//     if (!newProduce.produce_name || !newProduce.availability || !newProduce.price_per_kg) {
//       setError('Please fill all the fields');
//       return;
//     }
  
//     if (isNaN(newProduce.availability)) {
//       setError('Availability must be a number');
//       return;
//     }
  
//     if (isNaN(newProduce.price_per_kg)) {
//       setError('Price must be a valid number');
//       return;
//     }

//     // Additional validation for Bargaining Market
//     if (selectedMarket === 'Bargaining Market') {
//       if (!newProduce.minimum_quantity) {
//         setError('Minimum quantity is required for Bargaining Market');
//         return;
//       }
      
//       if (isNaN(newProduce.minimum_quantity)) {
//         setError('Minimum quantity must be a number');
//         return;
//       }
      
//       if (parseFloat(newProduce.minimum_quantity) < 10) { // Changed to 10kg minimum
//         setError('Minimum quantity must be at least 10kg for Bargaining Market');
//         return;
//       }

//       if (!newProduce.minimum_price) {
//         setError('Minimum price is required for Bargaining Market');
//         return;
//       }
      
//       if (isNaN(newProduce.minimum_price)) {
//         setError('Minimum price must be a valid number');
//         return;
//       }
      
//       if (parseFloat(newProduce.minimum_price) <= 0) {
//         setError('Minimum price must be greater than 0');
//         return;
//       }

//       if (parseFloat(newProduce.minimum_price) >= parseFloat(newProduce.price_per_kg)) {
//         setError('Minimum price must be less than the regular price');
//         return;
//       }
//     }

//     if (!farmer?.farmer_id) {
//       setError('Farmer information not available. Please log in again.');
//       return;
//     }
  
//     try {
//       setIsLoading(true);
//       const produceData = {
//         ...newProduce,
//         farmer_id: farmer.farmer_id,
//         farmer_name: farmer.full_name || `${farmer.first_name} ${farmer.last_name}`,
//         email: farmer.email,
//         availability: parseFloat(newProduce.availability),
//         price_per_kg: parseFloat(newProduce.price_per_kg),
//         market_type: selectedMarket,
//         ...(selectedMarket === 'Bargaining Market' && {
//           minimum_quantity: parseFloat(newProduce.minimum_quantity),
//           minimum_price: parseFloat(newProduce.minimum_price)
//         })
//       };

//       const config = {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         }
//       };

//       if (newProduce.id) {
//         await axios.put(
//           `http://localhost:5000/api/produces/${newProduce.id}`,
//           produceData,
//           config
//         );
//       } else {
//         await axios.post(
//           'http://localhost:5000/api/produces',
//           produceData,
//           config
//         );
//       }

//       await loadProduces();
//       setNewProduce({
//         produce_name: '',
//         availability: '',
//         price_per_kg: '',
//         produce_type: 'Standard',
//         market_type: selectedMarket,
//         minimum_quantity: '',
//         minimum_price: ''
//       });
//       setIsFormVisible(false);
//     } catch (err) {
//       console.error('Failed to save produce:', err);
//       setError(err.response?.data?.error || 'Failed to save produce. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const editProduce = (produce) => {
//     setNewProduce({
//       ...produce,
//       id: produce.product_id,
//       minimum_quantity: produce.minimum_quantity || '',
//       minimum_price: produce.minimum_price || ''
//     });
//     setIsFormVisible(true);
//   };

//   const deleteProduce = async (productId) => {
//     if (!window.confirm('Are you sure you want to delete this produce?')) return;
    
//     try {
//       setIsLoading(true);
//       await axios.delete(`http://localhost:5000/api/produces/${productId}`, {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         }
//       });
//       await loadProduces();
//     } catch (err) {
//       console.error('Failed to delete produce:', err);
//       setError('Failed to delete produce. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Render instructions if showInstructions is true
//   if (showInstructions) {
//     return (
//       <div className="addproduce-instructions">
//         <h2>Instructions for Adding Produce</h2>
//         <div className="instructions-content">
//           <ol>
//             <li>
//               If you add the produce to <strong>KrishiSetu Market</strong>, it will be stored in the KrishiSetu market or warehouses. 
//               If you add the produce to <strong>Bargaining Market</strong>, it will be stored in the bargain marketplace in the consumer 
//               dashboard and it helps for bargaining with consumers.
//             </li>
//             <li>
//               The <strong>minimum price</strong> field is included to remove price conflicts in the bargaining system.
//             </li>
//             <li>
//               For the <strong>Bargaining Market</strong>, the minimum quantity you should add is <strong>10kg</strong>. 
//               This is because to initiate a bargain, the minimum quantity should be 10kg.
//             </li>
//             <li>
//               The minimum price should always be less than the regular price you set for the produce.
//             </li>
//           </ol>
//           <button 
//             className="close-instructions-button"
//             onClick={() => setShowInstructions(false)}
//           >
//             I Understand, Continue to Add Produce
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Regular UI when instructions are closed
//   return (
//     <div className="addproduce-container">
//       <h1>Produces Added to the List</h1>
      
//       {/* Farmer info section */}
//       <div className="farmer-info">
//         {farmerDetails.isLoaded ? (
//           <>
//             {farmerDetails.id && <p>Farmer ID: {farmerDetails.id}</p>}
//             <p>Farmer Name: {farmerDetails.name}</p>
//           </>
//         ) : (
//           <p>Loading farmer information...</p>
//         )}
//       </div>
//       {error && <div className="error-message">{error}</div>}
//       {isLoading && <div className="loading-indicator">Loading...</div>}

//       <div className="addproduce-market-buttons">
//         <button 
//           onClick={() => handleMarketClick('krishisetu')} 
//           className={selectedMarket === 'KrishiSetu Market' ? 'active' : ''}
//           disabled={isLoading}
//         >
//           <img src={KSlogo} alt="KrishiSetu Logo" />
//           KrishiSetu Market
//         </button>
//         <button 
//           onClick={() => handleMarketClick('bargaining')} 
//           className={selectedMarket === 'Bargaining Market' ? 'active' : ''}
//           disabled={isLoading}
//         >
//           <img src={BSimg} alt="Bargaining Logo" />
//           Bargaining Market
//         </button>
//       </div>

//       {selectedMarket && (
//         <>
//           <button 
//             className="addproduce-button" 
//             onClick={() => {
//               setIsFormVisible(!isFormVisible);
//               if (isFormVisible) {
//                 setNewProduce({
//                   produce_name: '',
//                   availability: '',
//                   price_per_kg: '',
//                   produce_type: 'Standard',
//                   market_type: selectedMarket,
//                   minimum_quantity: '',
//                   minimum_price: ''
//                 });
//               }
//             }}
//             disabled={isLoading}
//           >
//             {isFormVisible ? 'Cancel' : 'Add Produce'}
//           </button>

//           {isFormVisible && (
//             <div className="addproduce-form">
//               <h3>{newProduce.id ? 'Edit Produce' : 'Add Produce'} to {selectedMarket}</h3>
//               <form onSubmit={handleSubmit}>
//                 <div>
//                   <label>Produce Name:</label>
//                   <input
//                     type="text"
//                     name="produce_name"
//                     value={newProduce.produce_name}
//                     onChange={handleFormChange}
//                     placeholder="Enter produce name"
//                     required
//                     disabled={isLoading}
//                   />
//                 </div>
//                 <div>
//                   <label>Availability (kg):</label>
//                   <input
//                     type="number"
//                     name="availability"
//                     value={newProduce.availability}
//                     onChange={handleFormChange}
//                     placeholder="Enter availability in kg"
//                     min="0.1"
//                     step="0.1"
//                     required
//                     disabled={isLoading}
//                   />
//                 </div>
//                 <div>
//                   <label>Price per KG:</label>
//                   <input
//                     type="number"
//                     name="price_per_kg"
//                     value={newProduce.price_per_kg}
//                     onChange={handleFormChange}
//                     placeholder="Enter price per kg"
//                     min="0.01"
//                     step="0.01"
//                     required
//                     disabled={isLoading}
//                   />
//                 </div>
//                 <div>
//                   <label>Produce Type:</label>
//                   <select
//                     name="produce_type"
//                     value={newProduce.produce_type}
//                     onChange={handleFormChange}
//                     required
//                     disabled={isLoading}
//                   >
//                     <option value="Standard">Standard</option>
//                     <option value="Organic">Organic</option>
//                   </select>
//                 </div>
                
//                 {selectedMarket === 'Bargaining Market' && (
//                   <>
//                     <div>
//                       <label>Minimum Quantity (kg):</label>
//                       <input
//                         type="number"
//                         name="minimum_quantity"
//                         value={newProduce.minimum_quantity}
//                         onChange={handleFormChange}
//                         placeholder="Minimum 10kg required"
//                         min="10"
//                         step="0.1"
//                         required
//                         disabled={isLoading}
//                       />
//                     </div>
//                     <div>
//                       <label>Minimum Price (per kg):</label>
//                       <input
//                         type="number"
//                         name="minimum_price"
//                         value={newProduce.minimum_price}
//                         onChange={handleFormChange}
//                         placeholder="Enter minimum acceptable price"
//                         min="0.01"
//                         step="0.01"
//                         max={newProduce.price_per_kg ? newProduce.price_per_kg - 0.01 : ''}
//                         required
//                         disabled={isLoading}
//                       />
//                     </div>
//                   </>
//                 )}
                
//                 <button 
//                   type="submit" 
//                   className="addproduce-submit-button"
//                   disabled={isLoading}
//                 >
//                   {isLoading ? 'Saving...' : newProduce.id ? 'Update Produce' : 'Add Produce'}
//                 </button>
//               </form>
//             </div>
//           )}

//           <h3>List of Produces in {selectedMarket}</h3>
//           {produces.length > 0 ? (
//             <table className="addproduce-table">
//               <thead>
//                 <tr>
//                   <th>Produce Name</th>
//                   <th>Type</th>
//                   <th>Availability (kg)</th>
//                   <th>Price per KG</th>
//                   {selectedMarket === 'Bargaining Market' && (
//                     <>
//                       <th>Min Quantity</th>
//                       <th>Min Price</th>
//                     </>
//                   )}
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {produces.map((produce) => (
//                   <tr key={produce.product_id}>
//                     <td>{produce.produce_name}</td>
//                     <td>{produce.produce_type}</td>
//                     <td>{produce.availability} kg</td>
//                     <td>₹{produce.price_per_kg}</td>
//                     {selectedMarket === 'Bargaining Market' && (
//                       <>
//                         <td>{produce.minimum_quantity || 'N/A'} kg</td>
//                         <td>₹{produce.minimum_price || 'N/A'}</td>
//                       </>
//                     )}
//                     <td>
//                       <button
//                         className="addproduce-edit-button"
//                         onClick={() => editProduce(produce)}
//                         disabled={isLoading}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         className="addproduce-remove-button"
//                         onClick={() => deleteProduce(produce.product_id)}
//                         disabled={isLoading}
//                       >
//                         Remove
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : (
//             <p>No produces added yet for this market.</p>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default AddProduce;


// import React, { useState, useEffect, useCallback, useContext, useRef } from 'react';
// import axios from 'axios';
// import './addproduce.css';
// import KSlogo from "../assets/logo.jpg";
// import BSimg from "../assets/bargain.jpeg";
// import { AuthContext } from '../context/AuthContext';
// import micIcon from '../assets/microphone.png'; // Add a microphone icon

// // Helper function to get farmer name
// const getFarmerName = (farmerData) => {
//   if (!farmerData) return 'Farmer';
//   if (farmerData.full_name) return farmerData.full_name;
//   if (farmerData.first_name && farmerData.last_name) {
//     return `${farmerData.first_name} ${farmerData.last_name}`;
//   }
//   return farmerData.first_name || farmerData.last_name || 'Farmer';
// };

// // Voice command processor
// const processVoiceCommand = (command, currentState) => {
//   command = command.toLowerCase().trim();
//   const words = command.split(' ');
  
//   // Market selection commands
//   if (command.includes('krishisetu market') || command.includes('krishi setu market')) {
//     return { action: 'selectMarket', market: 'krishisetu' };
//   }
//   if (command.includes('bargaining market') || command.includes('bargain market')) {
//     return { action: 'selectMarket', market: 'bargaining' };
//   }
  
//   // Form commands
//   if (command.includes('add produce') || command.includes('new produce')) {
//     return { action: 'toggleForm', visible: true };
//   }
//   if (command.includes('cancel') || command.includes('close form')) {
//     return { action: 'toggleForm', visible: false };
//   }
  
//   // Form field commands
//   if (command.includes('produce name')) {
//     const name = command.replace('produce name', '').trim();
//     if (name) return { action: 'setField', field: 'produce_name', value: name };
//   }
//   if (command.includes('availability')) {
//     const match = command.match(/(\d+(\.\d+)?)\s*(kg|kilo|kilos|kilograms?)?/);
//     if (match) return { action: 'setField', field: 'availability', value: match[1] };
//   }
//   if (command.includes('price') || command.includes('rate')) {
//     const match = command.match(/(\d+(\.\d+)?)\s*(rs|rupees?|inr)?/);
//     if (match) return { action: 'setField', field: 'price_per_kg', value: match[1] };
//   }
//   if (command.includes('minimum quantity')) {
//     const match = command.match(/(\d+(\.\d+)?)\s*(kg|kilo|kilos|kilograms?)?/);
//     if (match) return { action: 'setField', field: 'minimum_quantity', value: match[1] };
//   }
//   if (command.includes('minimum price')) {
//     const match = command.match(/(\d+(\.\d+)?)\s*(rs|rupees?|inr)?/);
//     if (match) return { action: 'setField', field: 'minimum_price', value: match[1] };
//   }
//   if (command.includes('produce type')) {
//     if (command.includes('organic')) return { action: 'setField', field: 'produce_type', value: 'Organic' };
//     if (command.includes('standard')) return { action: 'setField', field: 'produce_type', value: 'Standard' };
//   }
  
//   // Form submission
//   if (command.includes('submit') || command.includes('save') || command.includes('add')) {
//     return { action: 'submitForm' };
//   }
  
//   // Edit commands
//   const editMatch = command.match(/edit\s+(.+)/);
//   if (editMatch) {
//     const produceName = editMatch[1].trim();
//     const produce = currentState.produces.find(p => 
//       p.produce_name.toLowerCase().includes(produceName.toLowerCase())
//     );
//     if (produce) return { action: 'editProduce', produce };
//   }
  
//   // Delete commands
//   const deleteMatch = command.match(/delete\s+(.+)/);
//   if (deleteMatch) {
//     const produceName = deleteMatch[1].trim();
//     const produce = currentState.produces.find(p => 
//       p.produce_name.toLowerCase().includes(produceName.toLowerCase())
//     );
//     if (produce) return { action: 'deleteProduce', produceId: produce.product_id };
//   }
  
//   // Help commands
//   if (command.includes('help') || command.includes('instructions')) {
//     return { action: 'showInstructions' };
//   }
  
//   return { action: 'unknown' };
// };

// const AddProduce = () => {
//   // State declarations
//   const [selectedMarket, setSelectedMarket] = useState(null);
//   const [produces, setProduces] = useState([]);
//   const [newProduce, setNewProduce] = useState({
//     produce_name: '',
//     availability: '',
//     price_per_kg: '',
//     produce_type: 'Standard',
//     market_type: '',
//     minimum_quantity: '',
//     minimum_price: '' 
//   });
//   const [isFormVisible, setIsFormVisible] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [lastCommand, setLastCommand] = useState('');
//   const [showInstructions, setShowInstructions] = useState(true);
//   const [isListening, setIsListening] = useState(false);
//   const [voiceFeedback, setVoiceFeedback] = useState('');
//   const [commandFeedback, setCommandFeedback] = useState('');
//   const recognitionRef = useRef(null);
  
//   // Get farmer from AuthContext
//   const authContext = useContext(AuthContext);
//   const farmer = authContext?.farmer || {};
  
//   // State for farmer details
//   const [farmerDetails, setFarmerDetails] = useState({
//     id: '',
//     name: 'Loading...',
//     isLoaded: false
//   });

//   // Initialize speech recognition
//   const initSpeechRecognition = useCallback(() => {
//     if (!('webkitSpeechRecognition' in window)) {
//       console.warn('Speech recognition not supported');
//       return false;
//     }
    
//     const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
//     recognitionRef.current = new SpeechRecognition();
//     recognitionRef.current.continuous = true;
//     recognitionRef.current.interimResults = true;
//     recognitionRef.current.lang = 'en-IN';
    
//     recognitionRef.current.onresult = (event) => {
//       const transcript = Array.from(event.results)
//         .map(result => result[0])
//         .map(result => result.transcript)
//         .join('');
      
//       setVoiceFeedback(transcript);
      
//       if (event.results[0].isFinal) {
//         const command = processVoiceCommand(transcript, {
//           produces,
//           selectedMarket,
//           isFormVisible,
//           newProduce
//         });
        
//         handleVoiceCommand(command);
//         setLastCommand(transcript);
//         setVoiceFeedback('');
//       }
//     };
    
//     recognitionRef.current.onerror = (event) => {
//       console.error('Speech recognition error', event.error);
//       setIsListening(false);
//       setError(`Voice command error: ${event.error}`);
//       // Attempt to restart if it was a no-speech error
//       if (event.error === 'no-speech' && isListening) {
//         setTimeout(() => recognitionRef.current.start(), 500);
//       }
//     };
    
//     recognitionRef.current.onend = () => {
//       if (isListening) {
//         setTimeout(() => recognitionRef.current.start(), 100);
//       }
//     };
    
//     return true;
//   }, [produces, selectedMarket, isFormVisible, newProduce, isListening]);


//   // Effect to update farmer details when context changes
//   useEffect(() => {
//     if (authContext?.farmer) {
//       setFarmerDetails({
//         id: authContext.farmer.farmer_id || '',
//         name: getFarmerName(authContext.farmer),
//         isLoaded: true
//       });
//     } else {
//       setFarmerDetails({
//         id: '',
//         name: 'Loading...',
//         isLoaded: false
//       });
//     }
//   }, [authContext?.farmer]);

//   useEffect(() => {
//     const isSupported = initSpeechRecognition();
//     return () => {
//       if (isSupported && recognitionRef.current) {
//         recognitionRef.current.stop();
//       }
//     };
//   }, [initSpeechRecognition]);

//   const loadProduces = useCallback(async () => {
//     if (!selectedMarket || !farmerDetails.id || !farmerDetails.isLoaded) return;
    
//     try {
//       setIsLoading(true);
//       const response = await axios.get(`http://localhost:5000/api/produces`, {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         },
//         params: {
//           farmer_id: farmerDetails.id,
//           market_type: selectedMarket
//         }
//       });
//       setProduces(response.data);
//       setError('');
//     } catch (err) {
//       console.error('Failed to fetch produces:', err);
//       setError('Failed to load produces. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   }, [selectedMarket, farmerDetails.id, farmerDetails.isLoaded]);
//   useEffect(() => {
//     loadProduces();
//   }, [loadProduces]);

//   const toggleVoiceRecognition = () => {
//     if (isListening) {
//       recognitionRef.current.stop();
//       setIsListening(false);
//       setCommandFeedback('Voice commands turned off');
//       setTimeout(() => setCommandFeedback(''), 3000);
//     } else {
//       try {
//         recognitionRef.current.start();
//         setIsListening(true);
//         setError('');
//         setCommandFeedback('Listening... Speak now');
//         setTimeout(() => setCommandFeedback(''), 3000);
//       } catch (err) {
//         console.error('Failed to start recognition:', err);
//         setError('Failed to start voice recognition. Please refresh and try again.');
//       }
//     }
//   };

//   const handleVoiceCommand = (command) => {
//     let feedback = '';
    
//     switch (command.action) {
//       case 'selectMarket':
//         handleMarketClick(command.market);
//         feedback = `Switched to ${command.market === 'krishisetu' ? 'KrishiSetu Market' : 'Bargaining Market'}`;
//         break;
        
//       case 'toggleForm':
//         setIsFormVisible(command.visible);
//         if (!command.visible) {
//           setNewProduce({
//             produce_name: '',
//             availability: '',
//             price_per_kg: '',
//             produce_type: 'Standard',
//             market_type: selectedMarket,
//             minimum_quantity: '',
//             minimum_price: ''
//           });
//         }
//         feedback = command.visible ? 'Add produce form opened' : 'Form closed';
//         break;
        
//       case 'setField':
//         setNewProduce(prev => ({
//           ...prev,
//           [command.field]: command.value,
//           market_type: selectedMarket
//         }));
//         feedback = `Set ${command.field.replace('_', ' ')} to ${command.value}`;
//         break;
        
//       case 'submitForm':
//         handleSubmit({ preventDefault: () => {} });
//         feedback = 'Submitting produce...';
//         break;
        
//       case 'editProduce':
//         editProduce(command.produce);
//         feedback = `Editing ${command.produce.produce_name}`;
//         break;
        
//       case 'confirmDelete':
//         setCommandFeedback(`Are you sure you want to delete ${command.produceName}? Say "confirm delete" to proceed.`);
//         setTimeout(() => {
//           if (commandFeedback.includes('confirm delete')) {
//             deleteProduce(command.produceId);
//           } else {
//             setCommandFeedback('Delete cancelled');
//             setTimeout(() => setCommandFeedback(''), 2000);
//           }
//         }, 5000);
//         return;
        
//       case 'showInstructions':
//         setShowInstructions(true);
//         feedback = 'Showing instructions';
//         break;
        
//       case 'unknown':
//         feedback = `Sorry, I didn't understand "${command.command}". Try saying "help" for instructions.`;
//         break;
        
//       default:
//         feedback = 'Please try your command again';
//     }
    
//     setCommandFeedback(feedback);
//     setTimeout(() => setCommandFeedback(''), 3000);
//   };

//   const handleMarketClick = (market) => {
//     const marketType = market === 'krishisetu' ? 'KrishiSetu Market' : 'Bargaining Market';
//     setSelectedMarket(marketType);
//     setIsFormVisible(false);
//     setError('');
//   };

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setNewProduce({
//       ...newProduce,
//       [name]: value,
//       market_type: selectedMarket
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
    
//     // Basic validation
//     if (!newProduce.produce_name || !newProduce.availability || !newProduce.price_per_kg) {
//       setError('Please fill all the fields');
//       return;
//     }
  
//     if (isNaN(newProduce.availability)) {
//       setError('Availability must be a number');
//       return;
//     }
  
//     if (isNaN(newProduce.price_per_kg)) {
//       setError('Price must be a valid number');
//       return;
//     }

//     // Additional validation for Bargaining Market
//     if (selectedMarket === 'Bargaining Market') {
//       if (!newProduce.minimum_quantity) {
//         setError('Minimum quantity is required for Bargaining Market');
//         return;
//       }
      
//       if (isNaN(newProduce.minimum_quantity)) {
//         setError('Minimum quantity must be a number');
//         return;
//       }
      
//       if (parseFloat(newProduce.minimum_quantity) < 10) {
//         setError('Minimum quantity must be at least 10kg for Bargaining Market');
//         return;
//       }

//       if (!newProduce.minimum_price) {
//         setError('Minimum price is required for Bargaining Market');
//         return;
//       }
      
//       if (isNaN(newProduce.minimum_price)) {
//         setError('Minimum price must be a valid number');
//         return;
//       }
      
//       if (parseFloat(newProduce.minimum_price) <= 0) {
//         setError('Minimum price must be greater than 0');
//         return;
//       }

//       if (parseFloat(newProduce.minimum_price) >= parseFloat(newProduce.price_per_kg)) {
//         setError('Minimum price must be less than the regular price');
//         return;
//       }
//     }

//     if (!farmer?.farmer_id) {
//       setError('Farmer information not available. Please log in again.');
//       return;
//     }
  
//     try {
//       setIsLoading(true);
//       const produceData = {
//         ...newProduce,
//         farmer_id: farmer.farmer_id,
//         farmer_name: farmer.full_name || `${farmer.first_name} ${farmer.last_name}`,
//         email: farmer.email,
//         availability: parseFloat(newProduce.availability),
//         price_per_kg: parseFloat(newProduce.price_per_kg),
//         market_type: selectedMarket,
//         ...(selectedMarket === 'Bargaining Market' && {
//           minimum_quantity: parseFloat(newProduce.minimum_quantity),
//           minimum_price: parseFloat(newProduce.minimum_price)
//         })
//       };

//       const config = {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         }
//       };

//       if (newProduce.id) {
//         await axios.put(
//           `http://localhost:5000/api/produces/${newProduce.id}`,
//           produceData,
//           config
//         );
//       } else {
//         await axios.post(
//           'http://localhost:5000/api/produces',
//           produceData,
//           config
//         );
//       }

//       await loadProduces();
//       setNewProduce({
//         produce_name: '',
//         availability: '',
//         price_per_kg: '',
//         produce_type: 'Standard',
//         market_type: selectedMarket,
//         minimum_quantity: '',
//         minimum_price: ''
//       });
//       setIsFormVisible(false);
//     } catch (err) {
//       console.error('Failed to save produce:', err);
//       setError(err.response?.data?.error || 'Failed to save produce. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const editProduce = (produce) => {
//     setNewProduce({
//       ...produce,
//       id: produce.product_id,
//       minimum_quantity: produce.minimum_quantity || '',
//       minimum_price: produce.minimum_price || ''
//     });
//     setIsFormVisible(true);
//   };

//   const deleteProduce = async (productId) => {
//     try {
//       setIsLoading(true);
//       await axios.delete(`http://localhost:5000/api/produces/${productId}`, {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         }
//       });
//       await loadProduces();
//     } catch (err) {
//       console.error('Failed to delete produce:', err);
//       setError('Failed to delete produce. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Render instructions if showInstructions is true
//   if (showInstructions) {
//     return (
//       <div className="addproduce-instructions">
//         <h2>Instructions for Adding Produce</h2>
//         <div className="instructions-content">
//           <h3>General Instructions</h3>
//           <ol>
//             <li>
//               If you add the produce to <strong>KrishiSetu Market</strong>, it will be stored in the KrishiSetu market or warehouses. 
//               If you add the produce to <strong>Bargaining Market</strong>, it will be stored in the bargain marketplace in the consumer 
//               dashboard and it helps for bargaining with consumers.
//             </li>
//             <li>
//               The <strong>minimum price</strong> field is included to remove price conflicts in the bargaining system.
//             </li>
//             <li>
//               For the <strong>Bargaining Market</strong>, the minimum quantity you should add is <strong>10kg</strong>. 
//               This is because to initiate a bargain, the minimum quantity should be 10kg.
//             </li>
//             <li>
//               The minimum price should always be less than the regular price you set for the produce.
//             </li>
//           </ol>
          
//           <h3>Voice Command Instructions</h3>
//           <ol>
//             <li><strong>"KrishiSetu Market"</strong> - Switch to KrishiSetu Market</li>
//             <li><strong>"Bargaining Market"</strong> - Switch to Bargaining Market</li>
//             <li><strong>"Add produce"</strong> - Open the add produce form</li>
//             <li><strong>"Cancel"</strong> - Close the form</li>
//             <li><strong>"Produce name [name]"</strong> - Set produce name</li>
//             <li><strong>"Availability [number] kg"</strong> - Set availability</li>
//             <li><strong>"Price [number] rupees"</strong> - Set price per kg</li>
//             <li><strong>"Minimum quantity [number] kg"</strong> - Set minimum quantity</li>
//             <li><strong>"Minimum price [number] rupees"</strong> - Set minimum price</li>
//             <li><strong>"Produce type organic"</strong> - Set produce type to organic</li>
//             <li><strong>"Produce type standard"</strong> - Set produce type to standard</li>
//             <li><strong>"Submit"</strong> - Submit the form</li>
//             <li><strong>"Edit [produce name]"</strong> - Edit a produce</li>
//             <li><strong>"Delete [produce name]"</strong> - Delete a produce</li>
//           </ol>
          
//           <button 
//             className="close-instructions-button"
//             onClick={() => setShowInstructions(false)}
//           >
//             I Understand, Continue to Add Produce
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Regular UI when instructions are closed

//     return (
//       <div className="addproduce-container">
//         <h1>Produces Added to the List</h1>
        
//         {/* Enhanced voice controls */}
//         <div className="voice-controls">
//           <button 
//             onClick={toggleVoiceRecognition}
//             className={`voice-button ${isListening ? 'listening' : ''}`}
//             disabled={!('webkitSpeechRecognition' in window)}
//           >
//             <img src={micIcon} alt="Microphone" />
//             {isListening ? 'Listening... (Click to Stop)' : 'Start Voice Commands'}
//           </button>
          
//           <div className="voice-feedback-container">
//             {voiceFeedback && (
//               <div className="voice-feedback">
//                 <p>You said: <strong>{voiceFeedback}</strong></p>
//               </div>
//             )}
//             {commandFeedback && (
//               <div className="command-feedback">
//                 <p>{commandFeedback}</p>
//               </div>
//             )}
//             {lastCommand && (
//               <div className="last-command">
//                 <small>Last command: "{lastCommand}"</small>
//               </div>
//             )}
//           </div>
          
//           {!('webkitSpeechRecognition' in window) && (
//             <p className="voice-warning">Voice commands not supported in your browser. Try Chrome or Edge.</p>
//           )}
//         </div>
      
//       {/* Farmer info section */}
//       <div className="farmer-info">
//         {farmerDetails.isLoaded ? (
//           <>
//             {farmerDetails.id && <p>Farmer ID: {farmerDetails.id}</p>}
//             <p>Farmer Name: {farmerDetails.name}</p>
//           </>
//         ) : (
//           <p>Loading farmer information...</p>
//         )}
//       </div>
//       {error && <div className="error-message">{error}</div>}
//       {isLoading && <div className="loading-indicator">Loading...</div>}

//       <div className="addproduce-market-buttons">
//         <button 
//           onClick={() => handleMarketClick('krishisetu')} 
//           className={selectedMarket === 'KrishiSetu Market' ? 'active' : ''}
//           disabled={isLoading}
//         >
//           <img src={KSlogo} alt="KrishiSetu Logo" />
//           KrishiSetu Market
//         </button>
//         <button 
//           onClick={() => handleMarketClick('bargaining')} 
//           className={selectedMarket === 'Bargaining Market' ? 'active' : ''}
//           disabled={isLoading}
//         >
//           <img src={BSimg} alt="Bargaining Logo" />
//           Bargaining Market
//         </button>
//       </div>

//       {selectedMarket && (
//         <>
//           <button 
//             className="addproduce-button" 
//             onClick={() => {
//               setIsFormVisible(!isFormVisible);
//               if (isFormVisible) {
//                 setNewProduce({
//                   produce_name: '',
//                   availability: '',
//                   price_per_kg: '',
//                   produce_type: 'Standard',
//                   market_type: selectedMarket,
//                   minimum_quantity: '',
//                   minimum_price: ''
//                 });
//               }
//             }}
//             disabled={isLoading}
//           >
//             {isFormVisible ? 'Cancel' : 'Add Produce'}
//           </button>

//           {isFormVisible && (
//             <div className="addproduce-form">
//               <h3>{newProduce.id ? 'Edit Produce' : 'Add Produce'} to {selectedMarket}</h3>
//               <form onSubmit={handleSubmit}>
//                 <div>
//                   <label>Produce Name:</label>
//                   <input
//                     type="text"
//                     name="produce_name"
//                     value={newProduce.produce_name}
//                     onChange={handleFormChange}
//                     placeholder="Enter produce name"
//                     required
//                     disabled={isLoading}
//                   />
//                 </div>
//                 <div>
//                   <label>Availability (kg):</label>
//                   <input
//                     type="number"
//                     name="availability"
//                     value={newProduce.availability}
//                     onChange={handleFormChange}
//                     placeholder="Enter availability in kg"
//                     min="0.1"
//                     step="0.1"
//                     required
//                     disabled={isLoading}
//                   />
//                 </div>
//                 <div>
//                   <label>Price per KG:</label>
//                   <input
//                     type="number"
//                     name="price_per_kg"
//                     value={newProduce.price_per_kg}
//                     onChange={handleFormChange}
//                     placeholder="Enter price per kg"
//                     min="0.01"
//                     step="0.01"
//                     required
//                     disabled={isLoading}
//                   />
//                 </div>
//                 <div>
//                   <label>Produce Type:</label>
//                   <select
//                     name="produce_type"
//                     value={newProduce.produce_type}
//                     onChange={handleFormChange}
//                     required
//                     disabled={isLoading}
//                   >
//                     <option value="Standard">Standard</option>
//                     <option value="Organic">Organic</option>
//                   </select>
//                 </div>
                
//                 {selectedMarket === 'Bargaining Market' && (
//                   <>
//                     <div>
//                       <label>Minimum Quantity (kg):</label>
//                       <input
//                         type="number"
//                         name="minimum_quantity"
//                         value={newProduce.minimum_quantity}
//                         onChange={handleFormChange}
//                         placeholder="Minimum 10kg required"
//                         min="10"
//                         step="0.1"
//                         required
//                         disabled={isLoading}
//                       />
//                     </div>
//                     <div>
//                       <label>Minimum Price (per kg):</label>
//                       <input
//                         type="number"
//                         name="minimum_price"
//                         value={newProduce.minimum_price}
//                         onChange={handleFormChange}
//                         placeholder="Enter minimum acceptable price"
//                         min="0.01"
//                         step="0.01"
//                         max={newProduce.price_per_kg ? newProduce.price_per_kg - 0.01 : ''}
//                         required
//                         disabled={isLoading}
//                       />
//                     </div>
//                   </>
//                 )}
                
//                 <button 
//                   type="submit" 
//                   className="addproduce-submit-button"
//                   disabled={isLoading}
//                 >
//                   {isLoading ? 'Saving...' : newProduce.id ? 'Update Produce' : 'Add Produce'}
//                 </button>
//               </form>
//             </div>
//           )}

//           <h3>List of Produces in {selectedMarket}</h3>
//           {produces.length > 0 ? (
//             <table className="addproduce-table">
//               <thead>
//                 <tr>
//                   <th>Produce Name</th>
//                   <th>Type</th>
//                   <th>Availability (kg)</th>
//                   <th>Price per KG</th>
//                   {selectedMarket === 'Bargaining Market' && (
//                     <>
//                       <th>Min Quantity</th>
//                       <th>Min Price</th>
//                     </>
//                   )}
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {produces.map((produce) => (
//                   <tr key={produce.product_id}>
//                     <td>{produce.produce_name}</td>
//                     <td>{produce.produce_type}</td>
//                     <td>{produce.availability} kg</td>
//                     <td>₹{produce.price_per_kg}</td>
//                     {selectedMarket === 'Bargaining Market' && (
//                       <>
//                         <td>{produce.minimum_quantity || 'N/A'} kg</td>
//                         <td>₹{produce.minimum_price || 'N/A'}</td>
//                       </>
//                     )}
//                     <td>
//                       <button
//                         className="addproduce-edit-button"
//                         onClick={() => editProduce(produce)}
//                         disabled={isLoading}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         className="addproduce-remove-button"
//                         onClick={() => deleteProduce(produce.product_id)}
//                         disabled={isLoading}
//                       >
//                         Remove
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : (
//             <p>No produces added yet for this market.</p>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default AddProduce;




import React, { useState, useEffect, useCallback, useContext, useRef } from 'react';
import axios from 'axios';
import './addproduce.css';
import KSlogo from "../assets/logo.jpg";
import BSimg from "../assets/bargain.jpeg";
import { AuthContext } from '../context/AuthContext';
import micIcon from '../assets/microphone.png';

// Helper function to get farmer name
const getFarmerName = (farmerData) => {
  if (!farmerData) return 'Farmer';
  if (farmerData.full_name) return farmerData.full_name;
  if (farmerData.first_name && farmerData.last_name) {
    return `${farmerData.first_name} ${farmerData.last_name}`;
  }
  return farmerData.first_name || farmerData.last_name || 'Farmer';
};

// Enhanced voice command processor
const processVoiceCommand = (command, currentState) => {
  command = command.toLowerCase().trim();
  
  // Remove common filler words
  const filteredCommand = command.replace(/\b(please|kindly|can you|i want to|i would like to)\b/gi, '').trim();
  
  // Market selection
  if (filteredCommand.includes('krishisetu') || filteredCommand.includes('krishi setu') || filteredCommand.includes('normal market')||filteredCommand.includes('krishi se tu')) {
    return { action: 'selectMarket', market: 'krishisetu' };
  }
  if (filteredCommand.includes('bargaining') || filteredCommand.includes('bargain') || filteredCommand.includes('deal market')) {
    return { action: 'selectMarket', market: 'bargaining' };
  }
  
  // Form actions
  if (filteredCommand.includes('add') || filteredCommand.includes('new') || filteredCommand.includes('create')) {
    if (filteredCommand.includes('cancel') || filteredCommand.includes('close') || filteredCommand.includes('stop')) {
      return { action: 'toggleForm', visible: false };
    }
    return { action: 'toggleForm', visible: true };
  }
  if (filteredCommand.includes('cancel') || filteredCommand.includes('close') || filteredCommand.includes('stop')) {
    return { action: 'toggleForm', visible: false };
  }
  
  // Field setting - more flexible matching
  const setFieldCommand = (fieldName, synonyms, valueParser = (val) => val) => {
    for (const synonym of synonyms) {
      if (filteredCommand.includes(synonym)) {
        const valuePart = filteredCommand.split(synonym)[1]?.trim() || '';
        const valueMatch = valuePart.match(/(\d+(\.\d+)?)|(\b\w+\b)/);
        if (valueMatch) {
          return {
            action: 'setField',
            field: fieldName,
            value: valueParser(valueMatch[0])
          };
        }
      }
    }
    return null;
  };
  
  // Try to match field commands
  const fieldCommands = [
    setFieldCommand('produce_name', ['name', 'call it', 'label'], (val) => val),
    setFieldCommand('availability', ['quantity', 'amount', 'available', 'have'], parseFloat),
    setFieldCommand('price', ['price', 'rate', 'cost', 'per kg'], parseFloat),
    setFieldCommand('minimum_quantity', ['minimum quantity', 'least amount', 'smallest quantity'], parseFloat),
    setFieldCommand('minimum_price', ['minimum price', 'lowest rate', 'least cost'], parseFloat),
    (filteredCommand.includes('organic') || filteredCommand.includes('natural')) ? 
      { action: 'setField', field: 'produce_type', value: 'Organic' } : null,
    (filteredCommand.includes('standard') || filteredCommand.includes('regular')) ? 
      { action: 'setField', field: 'produce_type', value: 'Standard' } : null
  ].filter(cmd => cmd !== null);
  
  if (fieldCommands.length > 0) {
    return fieldCommands[0];
  }
  
  // Form submission
  if (filteredCommand.includes('save') || filteredCommand.includes('submit') || filteredCommand.includes('done')) {
    return { action: 'submitForm' };
  }
  
  // Edit commands with flexible matching
  const editMatch = filteredCommand.match(/(edit|change|modify)\s+(.+)/);
  if (editMatch) {
    const produceName = editMatch[2].trim();
    const produce = currentState.produces.find(p => 
      p.produce_name.toLowerCase().includes(produceName.toLowerCase())
    );
    if (produce) return { action: 'editProduce', produce };
  }
  
  // Delete commands with confirmation
  const deleteMatch = filteredCommand.match(/(delete|remove|erase)\s+(.+)/);
  if (deleteMatch) {
    const produceName = deleteMatch[2].trim();
    const produce = currentState.produces.find(p => 
      p.produce_name.toLowerCase().includes(produceName.toLowerCase())
    );
    if (produce) return { action: 'confirmDelete', produceId: produce.product_id, produceName: produce.produce_name };
  }
  
  // Help commands
  if (filteredCommand.includes('help') || filteredCommand.includes('instruction') || filteredCommand.includes('guide')) {
    return { action: 'showInstructions' };
  }
  
  // Fallback - try to interpret numbers as availability or price
  const numberMatch = filteredCommand.match(/(\d+(\.\d+)?)/);
  if (numberMatch) {
    const num = parseFloat(numberMatch[0]);
    if (currentState.isFormVisible) {
      if (!currentState.newProduce.availability) {
        return { action: 'setField', field: 'availability', value: num.toString() };
      }
      if (!currentState.newProduce.price_per_kg) {
        return { action: 'setField', field: 'price_per_kg', value: num.toString() };
      }
    }
  }
  
  return { action: 'unknown', command: filteredCommand };
};

const AddProduce = () => {
  // State declarations
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [produces, setProduces] = useState([]);
  const [newProduce, setNewProduce] = useState({
    produce_name: '',
    availability: '',
    price_per_kg: '',
    produce_type: 'Standard',
    market_type: '',
    minimum_quantity: '',
    minimum_price: '' 
  });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showInstructions, setShowInstructions] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceFeedback, setVoiceFeedback] = useState('');
  const [lastCommand, setLastCommand] = useState('');
  const [commandFeedback, setCommandFeedback] = useState('');
  const recognitionRef = useRef(null);
  
  // Get farmer from AuthContext
  const authContext = useContext(AuthContext);
  const farmer = authContext?.farmer || {};
  
  // State for farmer details
  const [farmerDetails, setFarmerDetails] = useState({
    id: '',
    name: 'Loading...',
    isLoaded: false
  });

  // Initialize speech recognition with better error handling
  const initSpeechRecognition = useCallback(() => {
    if (!('webkitSpeechRecognition' in window)) {
      console.warn('Speech recognition not supported');
      return false;
    }
    
    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = 'en-IN';
    
    let isProcessing = false;
    
    recognitionRef.current.onresult = (event) => {
      if (isProcessing) return;
      isProcessing = true;
      
      const transcript = event.results[event.results.length - 1][0].transcript.trim();
      setVoiceFeedback(transcript);
      setLastCommand(transcript);
      
      const command = processVoiceCommand(transcript, {
        produces,
        selectedMarket,
        isFormVisible,
        newProduce
      });
      
      setTimeout(() => {
        handleVoiceCommand(command);
        setVoiceFeedback('');
        isProcessing = false;
      }, 300);
    };
    
    recognitionRef.current.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      if (event.error === 'no-speech') {
        setTimeout(() => {
          if (isListening && recognitionRef.current) {
            recognitionRef.current.start();
          }
        }, 500);
      } else {
        setIsListening(false);
        setError(`Voice command error: ${event.error}`);
      }
    };
    
    recognitionRef.current.onend = () => {
      if (isListening) {
        recognitionRef.current.start();
      }
    };
    
    return true;
  }, [produces, selectedMarket, isFormVisible, newProduce, isListening]);

  // Effect to update farmer details when context changes
  useEffect(() => {
    if (authContext?.farmer) {
      setFarmerDetails({
        id: authContext.farmer.farmer_id || '',
        name: getFarmerName(authContext.farmer),
        isLoaded: true
      });
    } else {
      setFarmerDetails({
        id: '',
        name: 'Loading...',
        isLoaded: false
      });
    }
  }, [authContext?.farmer]);

  // Initialize speech recognition on mount
  useEffect(() => {
    const isSupported = initSpeechRecognition();
    return () => {
      if (isSupported && recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [initSpeechRecognition]);

  const loadProduces = useCallback(async () => {
    if (!selectedMarket || !farmerDetails.id || !farmerDetails.isLoaded) return;
    
    try {
      setIsLoading(true);
      const response = await axios.get(`http://localhost:5000/api/produces`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        params: {
          farmer_id: farmerDetails.id,
          market_type: selectedMarket
        }
      });
      setProduces(response.data);
      setError('');
    } catch (err) {
      console.error('Failed to fetch produces:', err);
      setError('Failed to load produces. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [selectedMarket, farmerDetails.id, farmerDetails.isLoaded]);

  useEffect(() => {
    loadProduces();
  }, [loadProduces]);

  const toggleVoiceRecognition = () => {
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      setCommandFeedback('Voice commands turned off');
      setTimeout(() => setCommandFeedback(''), 3000);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
        setError('');
        setCommandFeedback('Listening... Speak now');
        setTimeout(() => setCommandFeedback(''), 3000);
      } catch (err) {
        console.error('Failed to start recognition:', err);
        setError('Failed to start voice recognition. Please refresh and try again.');
      }
    }
  };

  const handleVoiceCommand = (command) => {
    let feedback = '';
    
    const executeCommand = () => {
      switch (command.action) {
        case 'selectMarket':
          handleMarketClick(command.market);
          feedback = `Switched to ${command.market === 'krishisetu' ? 'KrishiSetu Market' : 'Bargaining Market'}`;
          break;
          
        case 'toggleForm':
          setIsFormVisible(command.visible);
          if (!command.visible) {
            setNewProduce({
              produce_name: '',
              availability: '',
              price_per_kg: '',
              produce_type: 'Standard',
              market_type: selectedMarket,
              minimum_quantity: '',
              minimum_price: ''
            });
          }
          feedback = command.visible ? 'Add produce form opened' : 'Form closed';
          break;
          
        case 'setField':
          setNewProduce(prev => ({
            ...prev,
            [command.field]: command.value,
            market_type: selectedMarket
          }));
          feedback = `Set ${command.field.replace('_', ' ')} to ${command.value}`;
          break;
          
        case 'submitForm':
          handleSubmit({ preventDefault: () => {} });
          feedback = 'Submitting produce...';
          break;
          
        case 'editProduce':
          editProduce(command.produce);
          feedback = `Editing ${command.produce.produce_name}`;
          break;
          
        case 'confirmDelete':
          setCommandFeedback(`Are you sure you want to delete ${command.produceName}? Say "confirm delete" to proceed.`);
          const timeout = setTimeout(() => {
            setCommandFeedback('Delete cancelled');
            setTimeout(() => setCommandFeedback(''), 2000);
          }, 5000);
          
          const originalOnResult = recognitionRef.current.onresult;
          
          const confirmListener = (e) => {
            const transcript = e.results[0][0].transcript.toLowerCase();
            if (transcript.includes('confirm delete')) {
              clearTimeout(timeout);
              deleteProduce(command.produceId);
              setCommandFeedback('Deleting produce...');
              recognitionRef.current.onresult = originalOnResult;
            }
          };
          
          recognitionRef.current.onresult = confirmListener;
          return;
          
        case 'showInstructions':
          setShowInstructions(true);
          feedback = 'Showing instructions';
          break;
          
        case 'unknown':
          feedback = `Sorry, I didn't understand "${command.command}". Try saying "help" for instructions.`;
          break;
          
        default:
          feedback = 'Please try your command again';
      }
      
      setCommandFeedback(feedback);
      setTimeout(() => setCommandFeedback(''), 3000);
    };
    
    if (commandFeedback) {
      setTimeout(executeCommand, 3000);
    } else {
      executeCommand();
    }
  };

  const handleMarketClick = (market) => {
    const marketType = market === 'krishisetu' ? 'KrishiSetu Market' : 'Bargaining Market';
    setSelectedMarket(marketType);
    setIsFormVisible(false);
    setError('');
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewProduce({
      ...newProduce,
      [name]: value,
      market_type: selectedMarket
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!newProduce.produce_name || !newProduce.availability || !newProduce.price_per_kg) {
      setError('Please fill all the fields');
      return;
    }
  
    if (isNaN(newProduce.availability)) {
      setError('Availability must be a number');
      return;
    }
  
    if (isNaN(newProduce.price_per_kg)) {
      setError('Price must be a valid number');
      return;
    }

    // Additional validation for Bargaining Market
    if (selectedMarket === 'Bargaining Market') {
      if (!newProduce.minimum_quantity) {
        setError('Minimum quantity is required for Bargaining Market');
        return;
      }
      
      if (isNaN(newProduce.minimum_quantity)) {
        setError('Minimum quantity must be a number');
        return;
      }
      
      if (parseFloat(newProduce.minimum_quantity) < 10) {
        setError('Minimum quantity must be at least 10kg for Bargaining Market');
        return;
      }

      if (!newProduce.minimum_price) {
        setError('Minimum price is required for Bargaining Market');
        return;
      }
      
      if (isNaN(newProduce.minimum_price)) {
        setError('Minimum price must be a valid number');
        return;
      }
      
      if (parseFloat(newProduce.minimum_price) <= 0) {
        setError('Minimum price must be greater than 0');
        return;
      }

      if (parseFloat(newProduce.minimum_price) >= parseFloat(newProduce.price_per_kg)) {
        setError('Minimum price must be less than the regular price');
        return;
      }
    }

    if (!farmer?.farmer_id) {
      setError('Farmer information not available. Please log in again.');
      return;
    }
  
    try {
      setIsLoading(true);
      const produceData = {
        ...newProduce,
        farmer_id: farmer.farmer_id,
        farmer_name: farmer.full_name || `${farmer.first_name} ${farmer.last_name}`,
        email: farmer.email,
        availability: parseFloat(newProduce.availability),
        price_per_kg: parseFloat(newProduce.price_per_kg),
        market_type: selectedMarket,
        ...(selectedMarket === 'Bargaining Market' && {
          minimum_quantity: parseFloat(newProduce.minimum_quantity),
          minimum_price: parseFloat(newProduce.minimum_price)
        })
      };

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      };

      if (newProduce.id) {
        await axios.put(
          `http://localhost:5000/api/produces/${newProduce.id}`,
          produceData,
          config
        );
      } else {
        await axios.post(
          'http://localhost:5000/api/produces',
          produceData,
          config
        );
      }

      await loadProduces();
      setNewProduce({
        produce_name: '',
        availability: '',
        price_per_kg: '',
        produce_type: 'Standard',
        market_type: selectedMarket,
        minimum_quantity: '',
        minimum_price: ''
      });
      setIsFormVisible(false);
    } catch (err) {
      console.error('Failed to save produce:', err);
      setError(err.response?.data?.error || 'Failed to save produce. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const editProduce = (produce) => {
    setNewProduce({
      ...produce,
      id: produce.product_id,
      minimum_quantity: produce.minimum_quantity || '',
      minimum_price: produce.minimum_price || ''
    });
    setIsFormVisible(true);
  };

  const deleteProduce = async (productId) => {
    try {
      setIsLoading(true);
      await axios.delete(`http://localhost:5000/api/produces/${productId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      await loadProduces();
      setCommandFeedback('Produce deleted successfully');
      setTimeout(() => setCommandFeedback(''), 3000);
    } catch (err) {
      console.error('Failed to delete produce:', err);
      setError('Failed to delete produce. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Render instructions if showInstructions is true
  if (showInstructions) {
    return (
      <div className="addproduce-instructions">
        <h2>Instructions for Adding Produce</h2>
        <div className="instructions-content">
          <h3>General Instructions</h3>
          <ol>
            <li>
              If you add the produce to <strong>KrishiSetu Market</strong>, it will be stored in the KrishiSetu market or warehouses. 
              If you add the produce to <strong>Bargaining Market</strong>, it will be stored in the bargain marketplace in the consumer 
              dashboard and it helps for bargaining with consumers.
            </li>
            <li>
              The <strong>minimum price</strong> field is included to remove price conflicts in the bargaining system.
            </li>
            <li>
              For the <strong>Bargaining Market</strong>, the minimum quantity you should add is <strong>10kg</strong>. 
              This is because to initiate a bargain, the minimum quantity should be 10kg.
            </li>
            <li>
              The minimum price should always be less than the regular price you set for the produce.
            </li>
          </ol>
          
          <h3>Voice Command Instructions</h3>
          <ol>
            <li><strong>"KrishiSetu Market"</strong> - Switch to KrishiSetu Market</li>
            <li><strong>"Bargaining Market"</strong> - Switch to Bargaining Market</li>
            <li><strong>"Add produce"</strong> - Open the add produce form</li>
            <li><strong>"Cancel"</strong> - Close the form</li>
            <li><strong>"Produce name [name]"</strong> - Set produce name</li>
            <li><strong>"Availability [number] kg"</strong> - Set availability</li>
            <li><strong>"Price [number] rupees"</strong> - Set price per kg</li>
            <li><strong>"Minimum quantity [number] kg"</strong> - Set minimum quantity</li>
            <li><strong>"Minimum price [number] rupees"</strong> - Set minimum price</li>
            <li><strong>"Produce type organic"</strong> - Set produce type to organic</li>
            <li><strong>"Produce type standard"</strong> - Set produce type to standard</li>
            <li><strong>"Submit"</strong> - Submit the form</li>
            <li><strong>"Edit [produce name]"</strong> - Edit a produce</li>
            <li><strong>"Delete [produce name]"</strong> - Delete a produce</li>
          </ol>
          
          <button 
            className="close-instructions-button"
            onClick={() => setShowInstructions(false)}
          >
            I Understand, Continue to Add Produce
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="addproduce-container">
      <h1>Produces Added to the List</h1>
      
      {/* Enhanced voice controls */}
      <div className="voice-controls">
        <button 
          onClick={toggleVoiceRecognition}
          className={`voice-button ${isListening ? 'listening' : ''}`}
          disabled={!('webkitSpeechRecognition' in window)}
        >
          <img src={micIcon} alt="Microphone" />
          {isListening ? 'Listening... (Click to Stop)' : 'Start Voice Commands'}
        </button>
        
        <div className="voice-feedback-container">
          {voiceFeedback && (
            <div className="voice-feedback">
              <p>You said: <strong>{voiceFeedback}</strong></p>
            </div>
          )}
          {commandFeedback && (
            <div className="command-feedback">
              <p>{commandFeedback}</p>
            </div>
          )}
          {lastCommand && (
            <div className="last-command">
              <small>Last command: "{lastCommand}"</small>
            </div>
          )}
        </div>
        
        {!('webkitSpeechRecognition' in window) && (
          <p className="voice-warning">Voice commands not supported in your browser. Try Chrome or Edge.</p>
        )}
      </div>
      
      {/* Farmer info section */}
      <div className="farmer-info">
        {farmerDetails.isLoaded ? (
          <>
            {farmerDetails.id && <p>Farmer ID: {farmerDetails.id}</p>}
            <p>Farmer Name: {farmerDetails.name}</p>
          </>
        ) : (
          <p>Loading farmer information...</p>
        )}
      </div>
      {error && <div className="error-message">{error}</div>}
      {isLoading && <div className="loading-indicator">Loading...</div>}

      <div className="addproduce-market-buttons">
        <button 
          onClick={() => handleMarketClick('krishisetu')} 
          className={selectedMarket === 'KrishiSetu Market' ? 'active' : ''}
          disabled={isLoading}
        >
          <img src={KSlogo} alt="KrishiSetu Logo" />
          KrishiSetu Market
        </button>
        <button 
          onClick={() => handleMarketClick('bargaining')} 
          className={selectedMarket === 'Bargaining Market' ? 'active' : ''}
          disabled={isLoading}
        >
          <img src={BSimg} alt="Bargaining Logo" />
          Bargaining Market
        </button>
      </div>

      {selectedMarket && (
        <>
          <button 
            className="addproduce-button" 
            onClick={() => {
              setIsFormVisible(!isFormVisible);
              if (isFormVisible) {
                setNewProduce({
                  produce_name: '',
                  availability: '',
                  price_per_kg: '',
                  produce_type: 'Standard',
                  market_type: selectedMarket,
                  minimum_quantity: '',
                  minimum_price: ''
                });
              }
            }}
            disabled={isLoading}
          >
            {isFormVisible ? 'Cancel' : 'Add Produce'}
          </button>

          {isFormVisible && (
            <div className="addproduce-form">
              <h3>{newProduce.id ? 'Edit Produce' : 'Add Produce'} to {selectedMarket}</h3>
              <form onSubmit={handleSubmit}>
                <div>
                  <label>Produce Name:</label>
                  <input
                    type="text"
                    name="produce_name"
                    value={newProduce.produce_name}
                    onChange={handleFormChange}
                    placeholder="Enter produce name"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label>Availability (kg):</label>
                  <input
                    type="number"
                    name="availability"
                    value={newProduce.availability}
                    onChange={handleFormChange}
                    placeholder="Enter availability in kg"
                    min="0.1"
                    step="0.1"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label>Price per KG:</label>
                  <input
                    type="number"
                    name="price_per_kg"
                    value={newProduce.price_per_kg}
                    onChange={handleFormChange}
                    placeholder="Enter price per kg"
                    min="0.01"
                    step="0.01"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label>Produce Type:</label>
                  <select
                    name="produce_type"
                    value={newProduce.produce_type}
                    onChange={handleFormChange}
                    required
                    disabled={isLoading}
                  >
                    <option value="Standard">Standard</option>
                    <option value="Organic">Organic</option>
                  </select>
                </div>
                
                {selectedMarket === 'Bargaining Market' && (
                  <>
                    <div>
                      <label>Minimum Quantity (kg):</label>
                      <input
                        type="number"
                        name="minimum_quantity"
                        value={newProduce.minimum_quantity}
                        onChange={handleFormChange}
                        placeholder="Minimum 10kg required"
                        min="10"
                        step="0.1"
                        required
                        disabled={isLoading}
                      />
                    </div>
                    <div>
                      <label>Minimum Price (per kg):</label>
                      <input
                        type="number"
                        name="minimum_price"
                        value={newProduce.minimum_price}
                        onChange={handleFormChange}
                        placeholder="Enter minimum acceptable price"
                        min="0.01"
                        step="0.01"
                        max={newProduce.price_per_kg ? newProduce.price_per_kg - 0.01 : ''}
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </>
                )}
                
                <button 
                  type="submit" 
                  className="addproduce-submit-button"
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' : newProduce.id ? 'Update Produce' : 'Add Produce'}
                </button>
              </form>
            </div>
          )}

          <h3>List of Produces in {selectedMarket}</h3>
          {produces.length > 0 ? (
            <table className="addproduce-table">
              <thead>
                <tr>
                  <th>Produce Name</th>
                  <th>Type</th>
                  <th>Availability (kg)</th>
                  <th>Price per KG</th>
                  {selectedMarket === 'Bargaining Market' && (
                    <>
                      <th>Min Quantity</th>
                      <th>Min Price</th>
                    </>
                  )}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {produces.map((produce) => (
                  <tr key={produce.product_id}>
                    <td>{produce.produce_name}</td>
                    <td>{produce.produce_type}</td>
                    <td>{produce.availability} kg</td>
                    <td>₹{produce.price_per_kg}</td>
                    {selectedMarket === 'Bargaining Market' && (
                      <>
                        <td>{produce.minimum_quantity || 'N/A'} kg</td>
                        <td>₹{produce.minimum_price || 'N/A'}</td>
                      </>
                    )}
                    <td>
                      <button
                        className="addproduce-edit-button"
                        onClick={() => editProduce(produce)}
                        disabled={isLoading}
                      >
                        Edit
                      </button>
                      <button
                        className="addproduce-remove-button"
                        onClick={() => deleteProduce(produce.product_id)}
                        disabled={isLoading}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No produces added yet for this market.</p>
          )}
        </>
      )}
    </div>
  );
};

export default AddProduce;