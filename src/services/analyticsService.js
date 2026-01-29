/*
  ANALYTICS SERVICE
  -----------------
  Contains SQL-based analytics queries.
  These are read-only insights derived from order data.
*/

// Total sales revenue
export const totalSalesQuery = `
  SELECT SUM(total_amount) AS total_sales
  FROM orders
  WHERE status = 'Completed';
`;

// Top selling products
export const topSellingProductsQuery = `
  SELECT product_id, SUM(quantity) AS total_sold
  FROM order_items
  GROUP BY product_id
  ORDER BY total_sold DESC;
`;

// Monthly revenue
export const monthlyRevenueQuery = `
  SELECT DATE_TRUNC('month', created_at) AS month,
         SUM(total_amount) AS revenue
  FROM orders
  WHERE status = 'Completed'
  GROUP BY month
  ORDER BY month;
`;

// Frequently bought together
export const frequentlyBoughtTogetherQuery = `
  SELECT oi1.product_id AS product_1,
         oi2.product_id AS product_2,
         COUNT(*) AS frequency
  FROM order_items oi1
  JOIN order_items oi2
    ON oi1.order_id = oi2.order_id
   AND oi1.product_id < oi2.product_id
  GROUP BY product_1, product_2
  ORDER BY frequency DESC;
`;
