# API Documentation

## Authentication
All endpoints require authentication. Different endpoints require different types of authentication:
- Admin authentication for admin-related endpoints
- Seller authentication for seller-related endpoints

## Seller Management (Admin Only)
Base URL: `https://cs003-server.vercel.app/seller`

### Create Seller Account
- **Endpoint**: `POST https://cs003-server.vercel.app/seller/create-seller-account`
- **Authentication**: Admin
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string",
    "name": "string",
    "phone": "string"
  }
  ```
- **Response**: 200 OK with created seller data or 400 Bad Request with error message

### Get All Sellers
- **Endpoint**: `GET https://cs003-server.vercel.app/seller/get-all-sellers`
- **Authentication**: Admin
- **Response**: 200 OK with array of sellers or 400 Bad Request with error message

### Get Seller by Email
- **Endpoint**: `GET https://cs003-server.vercel.app/seller/get-seller/:emailId`
- **Authentication**: Admin
- **Response**: 200 OK with seller data or 400 Bad Request with error message

### Update Seller
- **Endpoint**: `PUT https://cs003-server.vercel.app/seller/update-seller/:sellerId`
- **Authentication**: Admin
- **Request Body**: Seller data to update
- **Response**: 200 OK with updated seller data or 400 Bad Request with error message

### Delete Seller
- **Endpoint**: `DELETE https://cs003-server.vercel.app/seller/delete-seller/:sellerId`
- **Authentication**: Admin
- **Response**: 200 OK with deletion confirmation or 400 Bad Request with error message

## Delivery Agent Management (Admin Only)
Base URL: `https://cs003-server.vercel.app/agent`

### Create Delivery Agent
- **Endpoint**: `POST https://cs003-server.vercel.app/agent/create-agent-account`
- **Authentication**: Admin
- **Request Body**: Agent credentials
- **Response**: 200 OK with created agent data or 400 Bad Request with error message

### Get All Agents
- **Endpoint**: `GET https://cs003-server.vercel.app/agent/get-all-agents`
- **Authentication**: Admin
- **Response**: 200 OK with array of agents or 400 Bad Request with error message

### Get Agent by ID
- **Endpoint**: `GET https://cs003-server.vercel.app/agent/get-agent/:agentId`
- **Authentication**: Admin
- **Response**: 200 OK with agent data or 400 Bad Request with error message

### Update Agent
- **Endpoint**: `PUT https://cs003-server.vercel.app/agent/update-agent/:agentId`
- **Authentication**: Admin
- **Request Body**: Agent data to update
- **Response**: 200 OK with updated agent data or 400 Bad Request with error message

### Delete Agent
- **Endpoint**: `DELETE https://cs003-server.vercel.app/agent/delete-agent/:agentId`
- **Authentication**: Admin
- **Response**: 200 OK with deletion confirmation or 400 Bad Request with error message

## Inventory Management

### Product Management (Seller Only)
Base URL: `https://cs003-server.vercel.app/inventory/product`

#### Create Product
- **Endpoint**: `POST https://cs003-server.vercel.app/inventory/product/create`
- **Authentication**: Seller
- **Request Body**:
  ```json
  {
    "name": "string",
    "description": "string",
    "price": "number",
    "stock_quantity": "number",
    "barcode": "string",
    "admin_category": "ObjectId",
    "category": "ObjectId",
    "images": ["string"]
  }
  ```
- **Response**: 200 OK with created product data or 400 Bad Request with error message

#### Get All Products
- **Endpoint**: `GET https://cs003-server.vercel.app/inventory/product/get`
- **Authentication**: Seller
- **Response**: 200 OK with array of products or 400 Bad Request with error message

#### Update Product
- **Endpoint**: `PUT https://cs003-server.vercel.app/inventory/product/update/:productId`
- **Authentication**: Seller
- **Request Body**: Product data to update
- **Response**: 200 OK with updated product data or 400 Bad Request with error message

#### Delete Product
- **Endpoint**: `DELETE https://cs003-server.vercel.app/inventory/product/delete/:productId`
- **Authentication**: Seller
- **Response**: 200 OK with deletion confirmation or 400 Bad Request with error message

#### Upload Product Images
- **Endpoint**: `POST https://cs003-server.vercel.app/inventory/product/upload`
- **Authentication**: Seller
- **Request**: Multipart form data with up to 5 images
- **Response**: 200 OK with array of image URLs or 400 Bad Request with error message

### Category Management (Seller Only)
Base URL: `https://cs003-server.vercel.app/inventory/category`

#### Create Category
- **Endpoint**: `POST https://cs003-server.vercel.app/inventory/category/create`
- **Authentication**: Seller
- **Request Body**: Category data
- **Response**: 200 OK with created category data or 400 Bad Request with error message

#### Get All Categories
- **Endpoint**: `GET https://cs003-server.vercel.app/inventory/category/get`
- **Authentication**: Seller
- **Response**: 200 OK with array of categories or 400 Bad Request with error message

#### Update Category
- **Endpoint**: `PUT https://cs003-server.vercel.app/inventory/category/update/:categoryId`
- **Authentication**: Seller
- **Request Body**: Category data to update
- **Response**: 200 OK with updated category data or 400 Bad Request with error message

#### Delete Category
- **Endpoint**: `DELETE https://cs003-server.vercel.app/inventory/category/delete/:categoryId`
- **Authentication**: Seller
- **Response**: 200 OK with deletion confirmation or 400 Bad Request with error message

### Admin Category Management (Admin Only)
Base URL: `https://cs003-server.vercel.app/inventory/admin-category`

#### Create Admin Category
- **Endpoint**: `POST https://cs003-server.vercel.app/inventory/admin-category/create`
- **Authentication**: Admin
- **Request Body**: Admin category data
- **Response**: 200 OK with created admin category data or 400 Bad Request with error message

#### Get All Admin Categories
- **Endpoint**: `GET https://cs003-server.vercel.app/inventory/admin-category/get`
- **Authentication**: Admin
- **Response**: 200 OK with array of admin categories or 400 Bad Request with error message

#### Update Admin Category
- **Endpoint**: `PUT https://cs003-server.vercel.app/inventory/admin-category/update/:adminCategoryId`
- **Authentication**: Admin
- **Request Body**: Admin category data to update
- **Response**: 200 OK with updated admin category data or 400 Bad Request with error message

#### Delete Admin Category
- **Endpoint**: `DELETE https://cs003-server.vercel.app/inventory/admin-category/delete/:adminCategoryId`
- **Authentication**: Admin
- **Response**: 200 OK with deletion confirmation or 400 Bad Request with error message

## Error Responses
All endpoints may return a 400 Bad Request with the following error format:
```json
{
  "message": "Error message description"
}
```

## Authentication Headers
All requests must include the appropriate authentication token in the Authorization header:
```
Authorization: Bearer <token>
```

Note: Make sure to include the appropriate authentication token in the Authorization header for all requests. 