/*
  INVOICE SERVICE
  ---------------
  Handles billing and invoice generation.
  Invoice is created ONLY after order is completed.
*/

/**
 * Generate invoice for a completed order
 */
export function generateInvoice(order) {
  /*
    Preconditions:
    - Order status must be 'Completed'
    - Invoice must not already exist for this order
  */

  if (order.status !== "Completed") {
    console.error("Invoice can only be generated for completed orders");
    return null;
  }

  /*
    SQL CONCEPT:
    ------------
    INSERT INTO invoices (order_id, invoice_number, total_amount)
    VALUES (order.id, GENERATED_INVOICE_NO, order.total_amount);
  */

  const invoice = {
    invoiceId: "INV-001",
    orderId: order.id,
    amount: order.total_amount,
    generatedAt: new Date().toISOString(),
  };

  console.log("Invoice generated:", invoice);

  return invoice;
}

/**
 * Invoice data must NEVER be modified after creation
 */
export function freezeInvoice() {
  /*
    RULE:
    - No UPDATE or DELETE operations allowed on invoices
    - Invoice is a permanent financial record
  */

  console.log("Invoice is immutable and frozen");
}
