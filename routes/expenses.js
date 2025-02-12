// backend/routes/expenses.js
const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middleware/auth');

// Import all the expense controller functions
const {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
  exportExpensesPDF
} = require('../controllers/expenseController');

// Ensure the middleware is applied for all routes
router.use(authenticateJWT);

// POST /api/expenses/ — Add an expense
router.post('/', addExpense);

// GET /api/expenses/ — List expenses
router.get('/', getExpenses);

// PUT /api/expenses/:id — Update an expense
router.put('/:id', updateExpense);

// DELETE /api/expenses/:id — Delete an expense
router.delete('/:id', deleteExpense);

// GET /api/expenses/export — Export expenses to PDF
router.get('/export', exportExpensesPDF);

module.exports = router;
