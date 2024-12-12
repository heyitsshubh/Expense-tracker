// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import '../Styles/CreateOption.css';

// const GroupOptions = () => {
//   const { groupId } = useParams(); // Retrieve groupId from the URL
//   const [groupDetails, setGroupDetails] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchGroupDetails = async () => {
//       const token = sessionStorage.getItem('authToken');
//       if (!token) {
//         navigate('/'); // Redirect to login if token is missing
//         return;
//       }

//       try {
//         const response = await axios.get(
//           `https://cash-cue-web.onrender.com/groups/group/${groupId}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         if (response.status === 200) {
//           setGroupDetails(response.data);
//         } else {
//           console.error('Failed to fetch group details');
//         }
//       } catch (error) {
//         console.error('Error fetching group details:', error);
//       }
//     };

//     if (groupId) {
//       fetchGroupDetails();
//     } else {
//       console.error('Group ID is missing');
//       navigate('/dashboard');
//     }
//   }, [groupId, navigate]);

//   return (
//     <div className="group-options-container">
//       {groupDetails ? (
//         <>
//           <h1>{groupDetails.title}</h1>
//           <p><strong>Description:</strong> {groupDetails.description}</p>
//           <h3>Members:</h3>
//           <ul>
//             {groupDetails.members.map((member, index) => (
//               <li key={index}>{member}</li>
//             ))}
//           </ul>

//           <div className="options-container">
//             <button onClick={() => navigate(`/expense/${groupId}`)} className="option-btn">Expense</button>
//             <button onClick={() => navigate(`/balance/${groupId}`)} className="option-btn">Balance</button>
//             <button onClick={() => navigate(`/info/${groupId}`)} className="option-btn">Info</button>
//           </div>
//         </>
//       ) : (
//         <p>Loading group details...</p>
//       )}
//     </div>
//   );
// };

// export default GroupOptions;


