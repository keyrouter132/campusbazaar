require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

console.log("APP ID:", process.env.CASHFREE_APP_ID);
console.log("SECRET:", process.env.CASHFREE_SECRET_KEY);

app.post("/create-order", async (req, res) => {
  try {
    const { order_id, amount, customer_id, customer_phone } = req.body;

    // ✅ Use the order_id sent from frontend (already saved in Supabase)
    // Falls back to generating one if not provided
    const finalOrderId = order_id || "order_" + Date.now();

    const payload = {
      order_id: finalOrderId,
      order_amount: Number(amount),
      order_currency: "INR",
      customer_details: {
        customer_id: customer_id || "user_123",
        customer_email: "test@gmail.com",
        customer_phone: customer_phone || "9999999999",
      },
      order_meta: {
        return_url: `http://localhost:5173/payment-success?order_id=${finalOrderId}`,
        notify_url: "http://localhost:5000/payment-webhook",
      },
    };

    console.log("📤 Sending to Cashfree:", JSON.stringify(payload, null, 2));

    const response = await axios.post(
      "https://sandbox.cashfree.com/pg/orders",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          "x-client-id": process.env.CASHFREE_APP_ID,
          "x-client-secret": process.env.CASHFREE_SECRET_KEY,
          "x-api-version": "2023-08-01",
        },
      }
    );

    console.log("✅ Cashfree response:", JSON.stringify(response.data, null, 2));

    const { order_id: cfOrderId, payment_session_id } = response.data;

    if (!payment_session_id) {
      throw new Error("No payment_session_id returned from Cashfree");
    }

    res.json({
      success: true,
      order_id: cfOrderId,
      payment_session_id,
    });

  } catch (error) {
    console.error("❌ CASHFREE ERROR:");
    console.error("Status:", error.response?.status);
    console.error("Data:", JSON.stringify(error.response?.data, null, 2));

    res.status(500).json({
      success: false,
      error: error.response?.data || error.message || "Payment initiation failed",
    });
  }
});

app.post("/payment-webhook", (req, res) => {
  console.log("🔔 Webhook received:", req.body);
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});