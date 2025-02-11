CS003 - Muaz Hasan P

E-Commerce Platform Overview
A multi-role e-commerce platform, catering to four distinct user roles: Customer, Seller, Delivery Boy, and Admin. The system is designed to be scalable, with a cross-platform mobile app for Customers and Delivery Boys (React Expo) and web dashboards for Sellers and Admins (Next.js). MongoDB serves as the database, and Azure Blob Storage is used for storing files and media.

1. Customer Panel (React Expo - Mobile App)
Key Features:
* User Registration/Login (via email, phone, social media)
* Product Browsing & Search (categories, filters, recommendations)
* Product Details Page (images, descriptions, reviews, ratings)
* Shopping Cart & Checkout
* Order Placement
* Order Tracking & Status Updates (Pending, Shipped, Out for Delivery, Delivered)
* Notifications (Order Updates, Discounts, Promotions)

2. Seller Panel (Next.js - Web Dashboard)
Key Features:
* Seller Registration/Login
* Store Management (business details, store profile)
* Product Management (add, edit, delete products)
* Inventory Management (track stock levels)
* Order Management (view customer orders, process orders)
* Assign Orders to Delivery Boys (manual/automated allocation)
* Delivery Boy Management (add, remove, assign orders)
* Revenue & Sales Analytics (track earnings, order trends)

3. Delivery Boy Panel (React Expo - Mobile App)
Key Features:
* Delivery Boy Registration/Login
* Receive Delivery Alerts (push notifications for new deliveries)
* View Assigned Deliveries (list of deliveries assigned by the seller)
* Navigation to Customer Address (integrated Google Maps)
* Update Order Status (Picked Up, Out for Delivery, Delivered, Paid)
* Profile Management (contact details, availability)

4. Admin Panel (Next.js - Web Dashboard)
Key Features:
* Admin Login
* Seller Management (approve/reject seller applications, remove sellers)
* Delivery Boy Management (add/remove delivery personnel, assign to sellers)
* View All Sellers’ Data (orders, customers, revenue, performance)
* Order Monitoring (track all orders across all sellers)
* Financial Overview (platform-wide sales and earnings)
* User Role & Permissions Management (manage access control)
* Platform Analytics & Metrics (sales trends, user engagement)
* Reports & Data Export (generate reports for analysis)

Tech Stack
Frontend:
* Customer & Delivery Boy Panels: React Native (Expo)
* Seller & Admin Panels: Next.js (React)
Backend:
* Framework: Node.js (Express.js)
* Database: MongoDB (NoSQL)
* Storage: Azure Blob Storage (for images, invoices, etc.)
* Authentication: Firebase Auth / JWT-based authentication
* Notifications: Firebase Cloud Messaging (FCM) for mobile apps
Integrations:
* Maps & Navigation: Google Maps API for delivery tracking

Business Workflow
1. Admin onboards sellers → Admin adds and manages sellers.
2. Seller manages store → Adds products, handles inventory, and assigns delivery personnel.
3. Customers place orders → Orders go to the seller for processing.
4. Seller assigns order to delivery boy → Delivery person gets an alert.
5. Delivery boy delivers the order → Updates status after pickup/delivery.
6. Admin monitors the entire system → Manages platform performance, earnings, and compliance.
