repository contains the core backend components for an assignment that demonstrates:

User authentication and authorization

Routing and API structure

Input validation and error handling

Modular code organization

Service layer abstraction

Database interaction logic

🧠 All code is written in JavaScript and designed to run on Node.js.

🗂️ Directory Structure

Here are the key files included in the project:

auth.js
database.js
dto.js
errorHandler.js
index.js
interface.js
jwt.js
model.js
routes.js
server.js
service.js
validation.js
package.json


Each file has a specific role:

server.js – Entry point that starts the server

routes.js – API route definitions

auth.js / jwt.js – Authentication helpers and JWT handling

validation.js – Request validation logic

service.js – Business logic layer

database.js – DB connection setup

model.js / dto.js – Data models and transfer objects

errorHandler.js – Centralized error handling

interface.js – Shared interfaces or utility functions

🛠️ Features

Modular project setup

Token-based authentication

Centralized error handling

Structure suitable for REST APIs

Easily extensible for additional features

📦 Requirements

Make sure you have the following installed:

Node.js (version 14+ recommended)

NPM or Yarn

🚀 Setup & Installation

Clone the repository

git clone https://github.com/anumandlasupraja7674/Kraftshala_Assignment.git
cd Kraftshala_Assignment


Install dependencies

npm install


Configure environment variables

Create a .env file (if needed) and set the following:

PORT=
DATABASE_URL=
JWT_SECRET=


(Replace with your own values depending on your infrastructure)

Run the app

npm start


By default, the server should run on http://localhost:PORT as configured.

📋 API Usage

You can interact with the API using tools like Postman or curl by sending requests to defined endpoints (e.g., auth routes, CRUD operations). As this is a backend API project, make sure your database is configured before hitting protected routes.

📌 Contribution

Feel free to fork this project and improve it with:

Additional routes

Better authentication guards

Tests (Jest / Mocha)

Swagger documentation