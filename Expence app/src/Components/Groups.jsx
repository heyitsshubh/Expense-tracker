// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// function Groups() {
//     const navigate = useNavigate();

//     const handleCreateGroup = () => {
//         navigate('/dashboard/create-group'); //vigate to the "Create Group" page
//     };

//     return (
//         <> 
//             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//                 <button 
//                     style={{ width: '310px', height: '53px' }} 
//                     onClick={handleCreateGroup}
//                 >
//                     Create New Group
//                 </button>
//             </div>
//         </>
//     );
// }

// export default Groups;
import React, { useContext } from "react";
import { GroupContext } from "./GroupContext";
import { useNavigate } from "react-router-dom";
import "../Styles/Groupname.css";

function Groups() {
    const navigate = useNavigate();
    const { groups } = useContext(GroupContext);

    console.log("Groups in Groupname component:", groups);

    const handleCreateGroup = () => {
        navigate('/dashboard/create-group');
    };

    return (
        <>
            <div className="name-group">
                <button
                    style={{ width: '310px', height: '53px' }}
                    onClick={handleCreateGroup}
                >
                    Create New Group
                </button>
            </div>
            <div className="group-list">
                {groups.map((group, index) => (
                    <ul key={index} className="group-box">
                        <li>
                            <strong>{group.title}</strong>
                        </li>
                        {/* <li>{group.description}</li> */}
                    </ul>
                ))}
            </div>
        </>
    );
}

export default Groups;












