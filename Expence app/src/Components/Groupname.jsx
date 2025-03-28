import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../Styles/Groupname.css";

function Groupname() {
    const navigate = useNavigate();

    const [groups, setGroups] = useState([
        { name: 'Group 1', description: 'This is the first group' },
        { name: 'Group 2', description: 'This is the second group' },
    ]);

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
                <ul>
                    {groups.map((group, index) => (
                        <li key={index}>
                            <strong>{group.name}</strong>: {group.description}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default Groupname;