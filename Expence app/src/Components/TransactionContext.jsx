import React, { createContext, useState } from "react";

export const TransactionsContext = createContext();

export const TransactionsProvider = ({ children }) => {
  const [refreshTransactions, setRefreshTransactions] = useState(false);

  const triggerRefresh = () => {
    setRefreshTransactions((prev) => !prev); 
  };

  return (
    <TransactionsContext.Provider value={{ refreshTransactions, triggerRefresh }}>
      {children}
    </TransactionsContext.Provider>
  );
};




