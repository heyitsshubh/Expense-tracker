import React from 'react';
import "../Styles/Creategroup.css";

function CreateGroup() {
    return (
        <>
        <div style={{ textAlign: 'center', marginTop: '200px' }}>
            <h1> New Group</h1>
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
        </div>
        <div className="button-group">
                <button>Cancel</button> 
                <button>Continue</button>
            </div>

        
        </>
    );
}

export default CreateGroup;