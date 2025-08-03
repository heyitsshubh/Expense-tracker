import React, { createContext, useState, useCallback } from "react";

export const GroupContext = createContext();

export const GroupProvider = ({ children }) => {
  const [groups, setGroups] = useState([]);
  const addGroup = (group) => setGroups((prev) => [...prev, group]);
  const fetchGroups = useCallback(async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;
    try {
      const response = await fetch("https://cash-cue.onrender.com/groups", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setGroups(data.groups || []);
      }
    } catch (err) {
      console.error("Failed to fetch groups:", err);
    }
  }, []);

  return (
    <GroupContext.Provider value={{ groups, setGroups, addGroup, fetchGroups }}>
      {children}
    </GroupContext.Provider>
  );
};