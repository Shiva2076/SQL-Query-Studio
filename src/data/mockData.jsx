// mockData.jsx
// Mock data for SQL query application

// Mock saved queries
export const mockQueries = [
  {
    id: "query-1",
    name: "All Users",
    query: "SELECT * FROM users ORDER BY created_at DESC"
  },
  {
    id: "query-2",
    name: "Active Products",
    query: "SELECT id, name, price, inventory FROM products WHERE active = true"
  },
  {
    id: "query-3",
    name: "Recent Orders",
    query: "SELECT o.id, o.customer_id, o.total, o.created_at, u.name FROM orders o JOIN users u ON o.customer_id = u.id WHERE o.created_at > DATE_SUB(NOW(), INTERVAL 7 DAY) ORDER BY o.created_at DESC"
  },
  {
    id: "query-4",
    name: "Revenue by Month",
    query: "SELECT DATE_FORMAT(created_at, '%Y-%m') as month, SUM(total) as revenue FROM orders GROUP BY DATE_FORMAT(created_at, '%Y-%m') ORDER BY month DESC"
  },
  {
    id: "query-5",
    name: "Out of Stock Products",
    query: "SELECT id, name, last_restock_date FROM products WHERE inventory = 0"
  }
];

// Mock query results for each query
export const mockResults = {
  // All Users query result
  "query-1": {
    columns: ["id", "name", "email", "created_at"],
    rows: [
      {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        created_at: "2025-03-25T12:00:00Z"
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        created_at: "2025-03-24T09:30:00Z"
      },
      {
        id: 3,
        name: "Robert Johnson",
        email: "robert.j@example.com",
        created_at: "2025-03-23T15:45:00Z"
      },
      {
        id: 4,
        name: "Emily Davis",
        email: "emily.davis@example.com",
        created_at: "2025-03-22T11:20:00Z"
      },
      {
        id: 5,
        name: "Michael Wilson",
        email: "michael.w@example.com",
        created_at: "2025-03-21T14:15:00Z"
      }
    ]
  },
  
  // Active Products query result
  "query-2": {
    columns: ["id", "name", "price", "inventory"],
    rows: [
      {
        id: 101,
        name: "Wireless Earbuds",
        price: 79.99,
        inventory: 45
      },
      {
        id: 102,
        name: "Smart Watch",
        price: 199.99,
        inventory: 28
      },
      {
        id: 103,
        name: "Bluetooth Speaker",
        price: 129.99,
        inventory: 32
      },
      {
        id: 104,
        name: "USB-C Cable (3-pack)",
        price: 24.99,
        inventory: 156
      },
      {
        id: 105,
        name: "Wireless Charger",
        price: 39.99,
        inventory: 68
      },
      {
        id: 106,
        name: "Laptop Sleeve",
        price: 29.99,
        inventory: 92
      }
    ]
  },
  
  // Recent Orders query result
  "query-3": {
    columns: ["id", "customer_id", "total", "created_at", "name"],
    rows: [
      {
        id: 1001,
        customer_id: 2,
        total: 249.98,
        created_at: "2025-03-26T13:40:00Z",
        name: "Jane Smith"
      },
      {
        id: 1002,
        customer_id: 5,
        total: 79.99,
        created_at: "2025-03-25T10:30:00Z",
        name: "Michael Wilson"
      },
      {
        id: 1003,
        customer_id: 1,
        total: 154.98,
        created_at: "2025-03-24T16:20:00Z",
        name: "John Doe"
      },
      {
        id: 1004,
        customer_id: 3,
        total: 329.98,
        created_at: "2025-03-23T09:15:00Z",
        name: "Robert Johnson"
      },
      {
        id: 1005,
        customer_id: 4,
        total: 59.98,
        created_at: "2025-03-22T14:50:00Z",
        name: "Emily Davis"
      }
    ]
  },
  
  // Revenue by Month query result
  "query-4": {
    columns: ["month", "revenue"],
    rows: [
      {
        month: "2025-03",
        revenue: 12456.87
      },
      {
        month: "2025-02",
        revenue: 9872.45
      },
      {
        month: "2025-01",
        revenue: 8654.32
      },
      {
        month: "2024-12",
        revenue: 15678.90
      },
      {
        month: "2024-11",
        revenue: 11234.56
      }
    ]
  },
  
  // Out of Stock Products query result
  "query-5": {
    columns: ["id", "name", "last_restock_date"],
    rows: [
      {
        id: 107,
        name: "4K HDMI Cable",
        last_restock_date: "2025-02-15T00:00:00Z"
      },
      {
        id: 108,
        name: "Noise-Cancelling Headphones",
        last_restock_date: "2025-03-01T00:00:00Z"
      },
      {
        id: 109,
        name: "Portable Power Bank",
        last_restock_date: "2025-02-28T00:00:00Z"
      }
    ]
  },
  
  // Default result for any other query
  "default": {
    columns: ["id", "name", "value"],
    rows: [
      {
        id: 1,
        name: "Item 1",
        value: "Result 1"
      },
      {
        id: 2,
        name: "Item 2",
        value: "Result 2"
      },
      {
        id: 3,
        name: "Item 3",
        value: "Result 3"
      }
    ]
  }
};

// Mock query history (recent queries)
export const mockQueryHistory = [
  {
    id: "history-1",
    query: "SELECT * FROM users WHERE last_login > '2025-03-20'",
    timestamp: "2025-03-26T14:30:00Z"
  },
  {
    id: "history-2",
    query: "SELECT COUNT(*) as order_count, status FROM orders GROUP BY status",
    timestamp: "2025-03-26T11:15:00Z"
  },
  {
    id: "history-3",
    query: "SELECT p.name, COUNT(o.id) as times_ordered FROM products p JOIN order_items oi ON p.id = oi.product_id JOIN orders o ON oi.order_id = o.id GROUP BY p.id ORDER BY times_ordered DESC LIMIT 10",
    timestamp: "2025-03-25T16:45:00Z"
  },
  {
    id: "history-4",
    query: "SELECT AVG(total) as avg_order_value FROM orders WHERE created_at > '2025-01-01'",
    timestamp: "2025-03-24T09:30:00Z"
  }
];