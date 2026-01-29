/*
  ORDER LIFECYCLE SERVICE
  ----------------------
  Handles:
  - Order creation
  - Stock validation
  - Order completion
  - Billing trigger (conceptual)
*/

/**
 * Create a new order
 * Status: Pending
 */
export function createOrder(orderData) {
  /*
    Steps:
    1. Create order with status = 'Pending'
    2. Insert items into order_items
    3. Reduce product stock after validation
  */

  // PSEUDOCODE:
  /*
    INSERT INTO orders (buyer_id, seller_id, total_amount, status)
    VALUES (..., 'Pending');

    FOR EACH item:
      IF product.stock >= quantity
        UPDATE products SET stock = stock - quantity
      ELSE
        reject order
  */

  console.log("Order created with status Pending");

  // Dummy return for now
  return {
    orderId: "ORDER123",
    status: "Pending",
  };
}

/**
 * Complete an order
 * Triggered by seller
 */
export function completeOrder(orderId) {
  /*
    Steps:
    1. Update order status to 'Completed'
    2. Generate invoice
  */

  // SQL CONCEPT:
  /*
    UPDATE orders
    SET status = 'Completed'
    WHERE id = orderId;
  */

  console.log(`Order ${orderId} marked as Completed`);

  // Trigger invoice generation (next priority)
  generateInvoice(orderId);
}

/**
 * Generate invoice (called only after order completion)
 */
function generateInvoice(orderId) {
  /*
    Invoice Rules:
    - One invoice per order
    - Invoice data is immutable
    - Created only when order is Completed
  */

  // SQL CONCEPT:
  /*
    INSERT INTO invoices (order_id, invoice_number, total_amount)
    VALUES (...);
  */

  console.log(`Invoice generated for order ${orderId}`);
}
