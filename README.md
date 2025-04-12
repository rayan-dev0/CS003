# CS003 - Open Source Inventory & EMS Platform 🚀

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)
![Status](https://img.shields.io/badge/status-in%20development-orange.svg)

## 📋 E-Commerce Platform Overview

A comprehensive multi-role e-commerce platform, catering to four distinct user roles: Customer, Seller, Delivery Boy, and Admin. The system is designed to be scalable, with a cross-platform mobile app for Customers and Delivery Boys (React Expo) and web dashboards for Sellers and Admins (Next.js). MongoDB serves as the database, and Azure Blob Storage is used for storing files and media.

## 🧩 System Architecture

| Role | Platform | Technology | Key Purpose |
|------|----------|------------|-------------|
| 🛒 **Customer** | Mobile App | React Native (Expo) | Shopping & Order Management |
| 🏪 **Seller** | Web Dashboard | Next.js | Inventory & Business Management |
| 🚚 **Delivery Boy** | Mobile App | React Native (Expo) | Order Delivery & Tracking |
| 👑 **Admin** | Web Dashboard | Next.js | Platform Oversight & Management |

## ✨ Key Features

### 🛒 Customer Panel (React Expo - Mobile App)

- 🔐 User Registration/Login (via email, phone, social media)
- 🔍 Product Browsing & Search (categories, filters, recommendations)
- 📝 Product Details Page (images, descriptions, reviews, ratings)
- 🛍️ Shopping Cart & Checkout
- 📦 Order Placement
- 📱 Order Tracking & Status Updates (Pending, Shipped, Out for Delivery, Delivered)
- 🔔 Notifications (Order Updates, Discounts, Promotions)

### 🏪 Seller Panel (Next.js - Web Dashboard)

- 🔐 Seller Registration/Login
- 🏢 Store Management (business details, store profile)
- 📝 Product Management (add, edit, delete products)
- 📊 Inventory Management (track stock levels)
- 📦 Order Management (view customer orders, process orders)
- 🚚 Assign Orders to Delivery Boys (manual/automated allocation)
- 👥 Delivery Boy Management (add, remove, assign orders)
- 📈 Revenue & Sales Analytics (track earnings, order trends)

### 🚚 Delivery Boy Panel (React Expo - Mobile App)

- 🔐 Delivery Boy Registration/Login
- 🔔 Receive Delivery Alerts (push notifications for new deliveries)
- 📋 View Assigned Deliveries (list of deliveries assigned by the seller)
- 🗺️ Navigation to Customer Address (integrated Google Maps)
- 📱 Update Order Status (Picked Up, Out for Delivery, Delivered, Paid)
- 👤 Profile Management (contact details, availability)

### 👑 Admin Panel (Next.js - Web Dashboard)

- 🔐 Admin Login
- 🏪 Seller Management (approve/reject seller applications, remove sellers)
- 🚚 Delivery Boy Management (add/remove delivery personnel, assign to sellers)
- 📊 View All Sellers' Data (orders, customers, revenue, performance)
- 📦 Order Monitoring (track all orders across all sellers)
- 💰 Financial Overview (platform-wide sales and earnings)
- 🔒 User Role & Permissions Management (manage access control)
- 📈 Platform Analytics & Metrics (sales trends, user engagement)
- 📄 Reports & Data Export (generate reports for analysis)

## 🛠️ Tech Stack

### Frontend

| Component | Technology | Purpose |
|-----------|------------|----------|
| 📱 Customer & Delivery Boy Panels | React Native (Expo) | Cross-platform mobile experience |
| 💻 Seller & Admin Panels | Next.js (React) | Responsive web dashboards |

### Backend

| Component | Technology | Purpose |
|-----------|------------|----------|
| 🖥️ Framework | Node.js (Express.js) | API and server-side logic |
| 🗄️ Database | MongoDB (NoSQL) | Data storage and management |
| 📁 Storage | Azure Blob Storage | File and media storage |
| 🔒 Authentication | Firebase Auth / JWT | User authentication and security |
| 🔔 Notifications | Firebase Cloud Messaging | Push notifications for mobile apps |

### Integrations

| Service | Purpose |
|---------|----------|
| 🗺️ Google Maps API | Location tracking and navigation |

## 🔄 Business Workflow

1. 👑 **Admin onboards sellers** → Admin adds and manages sellers
2. 🏪 **Seller manages store** → Adds products, handles inventory, and assigns delivery personnel
3. 🛒 **Customers place orders** → Orders go to the seller for processing
4. 🚚 **Seller assigns order to delivery boy** → Delivery person gets an alert
5. 📦 **Delivery boy delivers the order** → Updates status after pickup/delivery
6. 📊 **Admin monitors the entire system** → Manages platform performance, earnings, and compliance

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/yourusername/cs003-inventory-ems.git

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
