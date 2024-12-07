// useTransactions.js
import { useState, useEffect } from "react";
import axios from "axios";

export const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

      console.log("Transactions API Response:", response.data); // Log the response

      if (response.data.status === "SUCCESS") {
        setTransactions(response.data.transactions);
      } else {
        setError("Failed to fetch transactions: " + response.data.message);
      }
    } catch (error) {
      setError("Error fetching transactions: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return { transactions, loading, error };
};


