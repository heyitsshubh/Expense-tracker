import React from 'react';
import { useNavigate } from 'react-router-dom';

function Groups() {
    const navigate = useNavigate();

    const handleCreateGroup = () => {
        navigate('/create-group'); // Navigate to the "Create Group" page
    };

    return (
        <> 
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <button 
                    style={{ width: '310px', height: '53px' }} 
                    onClick={handleCreateGroup}
                >
                    Create New Group
                </button>
            </div>
        </>
    );
}

export default Groups;













