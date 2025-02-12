# Expense Tracker Backend

This is the backend API for the Expense Tracker application. It is built using Node.js, Express, and MongoDB Atlas. The API supports user authentication and expense management, including operations such as adding, editing, deleting, listing expenses, and exporting expense reports to PDF.

## Features

- **User Authentication:**  
  - User registration and login using email and password.
  - JWT (JSON Web Token) based authentication for protected routes.
  
- **Expense Management:**  
  - CRUD operations for expenses (Create, Read, Update, Delete).
  - Export expense data as a PDF report.
  
- **MongoDB Integration:**  
  - Uses MongoDB Atlas for cloud database storage.
  - Mongoose for object data modeling (ODM).

## Project Structure

```plaintext
server/
├── config/
│   └── db.js               # MongoDB connection configuration
├── controllers/
│   ├── authController.js   # Handlers for user authentication
│   └── expenseController.js# Handlers for expense management
├── middleware/
│   └── auth.js             # JWT authentication middleware
├── models/
│   ├── User.js             # User schema/model
│   └── Expense.js          # Expense schema/model
├── routes/
│   ├── auth.js             # Authentication routes (mounted at /api/auth)
│   └── expenses.js         # Expense routes (mounted at /api/expenses)
├── .env                    # Environment variables (do not commit sensitive info)
├── app.js                  # Main Express application file
└── package.json            # Backend package configuration


## What the Backend Does
The backend of the Expense Tracker application is built with Node.js and Express, and it serves as the core engine that powers the application’s functionality. Here's an overview of its responsibilities:

User Authentication:
The backend handles user registration and login using email and password. It securely stores user credentials (with password hashing) and issues JSON Web Tokens (JWT) for authenticated sessions. This ensures that only authorized users can access sensitive endpoints.

Expense Management:
It provides a set of RESTful API endpoints to manage expenses. Users can add new expenses, update or delete existing expenses, and retrieve a list of all their expenses. This CRUD (Create, Read, Update, Delete) functionality allows users to efficiently track their financial transactions.

Data Persistence with MongoDB Atlas:
The backend uses MongoDB Atlas as its cloud-based database to store user information and expense records. Mongoose is used as the Object Data Modeling (ODM) library to interact with MongoDB, allowing for schema definition and data validation.

Export to PDF:
In addition to managing expenses, the backend includes functionality to export a summary of the expenses as a PDF report. This feature leverages a PDF generation library (such as PDFKit) to produce downloadable reports.

Security & Scalability:
By using JWT-based authentication and middleware to protect routes, the backend ensures that data operations are secure. Additionally, the architecture is designed to scale, making it easier to support growing datasets and user numbers.

Overall, the backend acts as the bridge between the frontend user interface and the database, processing client requests, enforcing business logic, and ensuring a secure, reliable, and scalable API for the Expense Tracker application.
