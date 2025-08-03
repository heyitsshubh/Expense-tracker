import React, { useContext, useEffect } from "react";
import { GroupContext } from "./GroupContext";
import { useNavigate } from "react-router-dom";
import "../Styles/Groupname.css";

function Groups() {
    const navigate = useNavigate();
    const { groups, fetchGroups } = useContext(GroupContext);

    useEffect(() => {
        fetchGroups();
    }, [fetchGroups]);

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
                    </ul>
                ))}
            </div>
        </>
    );
}

export default Groups;












