import React, { createContext, useState } from "react";

export const GroupContext = createContext();

export const GroupProvider = ({ children }) => {
    const [groups, setGroups] = useState([]);

    const addGroup = (group) => {
        setGroups((prevGroups) => {
            const updatedGroups = [...prevGroups, group];
            console.log("Updated groups in context:", updatedGroups); // Debug log
            return updatedGroups;
        });
    };

    return (
        <GroupContext.Provider value={{ groups, addGroup }}>
            {children}
        </GroupContext.Provider>
    );
};