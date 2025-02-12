// backend/controllers/expenseController.js

const Expense = require('../models/Expense');
const PDFDocument = require('pdfkit');

// Add Expense
exports.addExpense = async (req, res) => {
  const { amount, category, description } = req.body;
  try {
    const expense = new Expense({
      user: req.user.userId,
      amount,
      category,
      description,
    });
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    console.error('Add Expense error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get Expenses
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.userId });
    res.json(expenses);
  } catch (error) {
    console.error('Get Expenses error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update Expense
exports.updateExpense = async (req, res) => {
  try {
    const { amount, category, description } = req.body;
    const updatedExpense = await Expense.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      { amount, category, description },
      { new: true }
    );
    if (!updatedExpense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.json(updatedExpense);
  } catch (error) {
    console.error('Update Expense error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete Expense
exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error('Delete Expense error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Export Expenses to PDF
exports.exportExpensesPDF = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.userId });
    
    // Create a PDF document
    const doc = new PDFDocument();
    let buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers);
      res.writeHead(200, {
        'Content-Length': Buffer.byteLength(pdfData),
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment;filename=expense_report.pdf',
      }).end(pdfData);
    });

    doc.fontSize(18).text('Expense Report', { align: 'center' });
    doc.moveDown();

    // Calculate totals and list expenses...
    const totalIncome = expenses
      .filter(exp => exp.category === 'Income')
      .reduce((sum, exp) => sum + exp.amount, 0);
    const totalExpense = expenses
      .filter(exp => exp.category === 'Expense')
      .reduce((sum, exp) => sum + exp.amount, 0);

    doc.fontSize(12).text(`Total Income: $${totalIncome}`);
    doc.fontSize(12).text(`Total Expense: $${totalExpense}`);
    doc.moveDown();

    expenses.forEach(exp => {
      doc.text(
        `Amount: $${exp.amount} | Category: ${exp.category} | Description: ${exp.description || 'N/A'}`
      );
    });

    doc.end();
  } catch (error) {
    console.error('Export PDF error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
