// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import '../Styles/Group.css';

// const CreateGroup = () => {
//   const [groupTitle, setGroupTitle] = useState('');
//   const [groupDescription, setGroupDescription] = useState('');
//   const [users, setUsers] = useState([]);
//   const [userInput, setUserInput] = useState('');
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const handleAddUser = () => {
//     if (userInput && users.length < 3) {
//       setUsers([...users, userInput]);
//       setUserInput('');
//       setMessage('');
//     } else if (users.length >= 3) {
//       setMessage('You can only add up to 3 users.');
//     }
//   };

//   const handleDeleteUser = (userToDelete) => {
//     setUsers(users.filter(user => user !== userToDelete));
//   };

//   const handleCreateGroup = async () => {
//     if (!groupTitle || !groupDescription || users.length !== 3) {
//       setMessage('Please fill all fields and add exactly 3 users!');
//       return;
//     }

//     const token = sessionStorage.getItem('authToken');
//     if (!token) {
//       setMessage('Authentication token is missing. Please log in.');
//       return;
//     }

//     const payload = {
//       title: groupTitle,
//       description: groupDescription,
//       members: users,
//     };

//     try {
//       const response = await axios.post(
//         'https://cash-cue-web.onrender.com/groups/create',
//         payload,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (response.status === 201) {
//         const groupId = response.data.id; // Store groupId
//         sessionStorage.setItem('currentGroupId', groupId);
//         navigate(`/group/${groupId}`); // Redirect to GroupOptions
//       } else {
//         setMessage('Failed to create group. Please try again.');
//       }
//     } catch (error) {
//       setMessage(`Error: ${error.response?.data?.message || error.message}`);
//     }
//   };

//   return (
//     <div className="create-group-container">
//       <h1>Create New Group</h1>

//       <div className="input-container">
//         <input
//           type="text"
//           placeholder="Enter Group Title"
//           value={groupTitle}
//           onChange={(e) => setGroupTitle(e.target.value)}
//           className="input-field1"
//         />
//       </div>

//       <div className="input-container">
//         <textarea
//           placeholder="Enter Group Description"
//           value={groupDescription}
//           onChange={(e) => setGroupDescription(e.target.value)}
//           className="input-field1"
//         />
//       </div>

//       <div className="input-container">
//         <input
//           type="text"
//           placeholder="Add User"
//           value={userInput}
//           onChange={(e) => setUserInput(e.target.value)}
//           className="input-field1"
//         />
//         <button onClick={handleAddUser} className="add-user-btn">Add User</button>
//       </div>

//       <div className="users-list">
//         <h3>Users:</h3>
//         <ul>
//           {users.map((user, index) => (
//             <li key={index}>
//               {user}
//               <button onClick={() => handleDeleteUser(user)} className="delete-user-btn">Delete</button>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <button onClick={handleCreateGroup} className="create-group-btn">Create Group</button>
//       {message && <div className="message">{message}</div>}
//     </div>
//   );
// };

// export default CreateGroup;












