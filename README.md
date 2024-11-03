## Project Overview
Technostacks is a TypeScript-based e-commerce platform that allows users to view a list of products and add new products to the inventory. This platform is built with user-friendly interfaces and modern web technologies.

## Features
- Add new products to the inventory
- View a list of all available products
- Responsive design

## Technologies Used
- **Frontend**: React, TypeScript
- **Backend**: Node.js, Express, MongoDB

## Getting Started
To run this project locally, follow the instructions below.

### Installation
1. **Clone the repository**:
   ```bash
   git clone git@github.com:adityamishramplify/MERN_PROJECT.git

2. **Install dependencies for both client and server**:
   For the server:
     cd server
     npm install --legacy-peer-deps
   For the client:
     cd client
     npm install --legacy-peer-deps

3. **Set up the environment variables in the server directory by creating a .env file in sever with the following content:**
  MONGO_URI:	MongoDB connection string for your database
  GOOGLE_CLIENT_ID:	Google OAuth 2.0 client ID (Need to generate)
  GOOGLE_CLIENT_SECRET:	Google OAuth 2.0 client secret (Need to generate)

  Note : Use MongoDB Compass.
  Run server on :  http://localhost:8000
  Run client on :  http://localhost:3000

4. **Run the Application**:

  Start the server:
    cd server
    npm run dev
    The server will run on: http://localhost:8000

  Start the client:
    cd client
    npm start
    The client will run on: http://localhost:3000
