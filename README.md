# Node js Ecommerce 

This project is a RESTful API for an e-commerce platform built using Node.js (Express.js) and PostgreSQL. It provides user authentication, product management with categories and image upload, a shopping cart, and order processing. The API also supports product filtering by categories, price range, and name, along with Swagger API documentation and automated testing


![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-blue)
![Swagger](https://img.shields.io/badge/API-Swagger-orange)


 # Create a .env file in the root directory and add the following environment variables:


```ini
# Database Configuration
DB_USER=your_db_user
DB_PASS=your_db_password
DB_NAME=your_db_name
DB_HOST=your_db_host
DB_DIALECT=postgres

# Server Configuration
PORT=3000
NODE_ENV=development

# Authentication
JWT_SECRET=your_jwt_secret_key

# Cloudinary (Image Upload)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```


## Install dependencies:

npm install



## Start the server:
npm run dev

# local server
http://localhost:3000


## API Documentation  
✅ **Swagger Docs are available at:** **[http://localhost:3000/api-docs](http://localhost:3000/api-docs)**  



