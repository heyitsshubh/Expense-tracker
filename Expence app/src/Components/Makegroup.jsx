import React from 'react';
import "../Styles/Creategroup.css";
import "../Styles/Makegroup.css";

import { useNavigate } from 'react-router-dom';

function MakeGroup() {
    const navigate = useNavigate();

    const redirect = () => {
        navigate('/dashboard/addmembers'); 
    };

    return (
        <>
        <div style={{ textAlign: 'center', marginTop: '200px' }}>
            <h1> Add members</h1>
        </div>
        <div className='form-group'>
            <input type="text"
             id="groupName" 
             name="groupName"
              placeholder="Title"/>
                       
         <input type="text"
             id="groupName" 
             name="groupName"
              placeholder="Description"/>
                
         <input type="text"
             id="groupName" 
             name="groupName"
              placeholder="Description"/>
            
         <input type="text"
             id="groupName" 
             name="groupName"
              placeholder="Description"/>

                    
         <input type="text"
             id="groupName" 
             name="groupName"
              placeholder="Description"/>
        </div>
        <div className="button-group1">
                <button>Cancel</button> 
                <button onClick={redirect}>Continue</button>
            </div>

        
        </>
    );
}

export default MakeGroup;