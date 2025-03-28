import React, { useState } from 'react';
import "../Styles/Creategroup.css";
import { useNavigate } from 'react-router-dom';

function CreateGroup() {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [members, setMembers] = useState(['']);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleAddMember = () => {
        setMembers([...members, '']);
    };

    const handleMemberChange = (index, value) => {
        const updatedMembers = [...members];
        updatedMembers[index] = value;
        setMembers(updatedMembers);
    };

    const handleCreateGroup = async () => {
        if (!title || !description) {
            setError('Both title and description are required.');
            return;
        }

        // Validate email format for all members
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (members.some((member) => !emailRegex.test(member))) {
            setError('One or more email addresses are invalid.');
            return;
        }

        // Remove duplicate emails
        const uniqueMembers = [...new Set(members)];
        if (uniqueMembers.some((member) => !member)) {
            setError('All member fields must be filled.');
            return;
        }

        try {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                setError('You are not authorized. Please log in again.');
                return;
            }

            const payload = { title, description, members: uniqueMembers };
            console.log('Request Payload:', payload);

            const response = await fetch('https://cash-cue.onrender.com/groups/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Server Error:', errorData);
                setError(errorData.message || 'Failed to create group.');
                return;
            }

            const data = await response.json();
            console.log('Response Data:', data);
            setSuccess('Group created successfully!');
            setError('');
            setTitle('');
            setDescription('');
            setMembers(['']);
            navigate('/dashboard/groupname');
        } catch (err) {
            console.error('Fetch Error:', err);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <>
            <div style={{ textAlign: 'center', marginTop: '200px' }}>
                <h1>New Group</h1>
            </div>
            <div className="form-group">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                {members.map((member, index) => (
                    <input
                        key={index}
                        type="email"
                        placeholder={`Member ${index + 1} Email`}
                        value={member}
                        onChange={(e) => handleMemberChange(index, e.target.value)}
                    />
                ))}
                  <div style={{ textAlign: 'center', marginTop: '10px' }}>
                    <button type="button" onClick={handleAddMember}>
                        Add Member
                    </button>
                </div>
            </div>
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
            {success && <p style={{ color: 'green', textAlign: 'center' }}>{success}</p>}
            <div className="button-group">
                <button onClick={() => navigate('/dashboard/groups')}>Cancel</button>
                <button onClick={handleCreateGroup}>Create Group</button>
            </div>
        </>
    );
}

export default CreateGroup;