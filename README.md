# node-express-sequelize-users-api

Node Express Sequelize MySQL API with Email Sign Up, Verification, Authentication and Forgot Password

# Last updated

02-12-2024

# Functionality of the Web App

- JWT authentication with Refresh Tokens
- Refresh token rotation
- Revoked token reuse detection
- Email sign up and verification
- Forgot password and reset password functionality
- Role based authorization with two roles "User" and "Admin"
- CRUD Account management routes with role based access control

# Tech used for building the Web App

- Node verion 20.18.1
- Sequelize used to implement the ORM at the Web API
- The Node.js Web API is hosted at Azure App Service with the Free App Service Plan
- The React Client is hosted at a traditional Webhotel
- MySQL as the Database for both Dev + Prod
- CORS Policy implemented by Node.js and at Azure
- JWT Token for access secure routes
- Refresh Token by HTTP only Cookie to generate new JWT Tokens

# Installing

- Make sure you have a new version of Node installed
- Download the code by zip or fork
- Run the command npm install by the command promt

# Development server:

- npm run start

- You can view the development server at `localhost:443`

# MySQL Database at the remote server

- By using the above command: "npm run start" the DB will be create if not allready exist

# Production

- Create the Web App at Azure App service
- Publish the Node.js files to the Azure App Service

