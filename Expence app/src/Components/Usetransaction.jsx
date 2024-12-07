import { useState, useEffect } from "react";
import axios from "axios";

export const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }

      const response = await axios.get(
        "https://cash-cue-web.onrender.com/transaction/list",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === "SUCCESS") {
        setTransactions(response.data.transactions);
      } else {
        console.error("Failed to fetch transactions:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error.response || error.message);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return { transactions };
};
