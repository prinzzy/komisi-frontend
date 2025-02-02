// services/payment.js
import axios from "axios";

const API_URL = "http://localhost:5500/api";

export const makePayment = async (transactionNumber, paymentAmount) => {
  try {
    const response = await axios.post(`${API_URL}/pembayaran`, {
      transactionNumber,
      paymentAmount,
      paymentDate: new Date().toISOString(),
    });
    return response.data;
  } catch (error) {
    console.error("Error processing payment:", error);
    throw error;
  }
};
