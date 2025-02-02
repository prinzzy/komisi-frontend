// services/commission.js
import axios from "axios";

const API_URL = "http://localhost:5500/api"; 

export const getCommissions = async (month, year) => {
  try {
    const response = await axios.get(`${API_URL}/komisi`, {
      params: { month, year },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching commissions:", error);
    throw error;
  }
};
