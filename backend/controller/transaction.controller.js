import Transaction from "../models/transaction.model.js";
import User from "../models/user.model.js";

// Credit Money
export const credit = async (req, res) => {
  try {
    const { amount, description } = req.body;

    const transactionAmount = Number(amount);

    if (!transactionAmount || transactionAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid amount is required",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.balance += transactionAmount;
    await user.save();

    const transaction = await Transaction.create({
      user: req.user.id,
      type: "credit",
      amount: transactionAmount,
      description,
    });

    res.status(201).json({
      success: true,
      message: "Amount credited successfully",
      transaction,
      balance: user.balance,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Debit Money
export const debit = async (req, res) => {
  try {
    const { amount, description } = req.body;

    const transactionAmount = Number(amount);

    if (!transactionAmount || transactionAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid amount is required",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.balance < transactionAmount) {
      return res.status(400).json({
        success: false,
        message: "Insufficient Balance",
      });
    }

    user.balance -= transactionAmount;
    await user.save();

    const transaction = await Transaction.create({
      user: req.user.id,
      type: "debit",
      amount: transactionAmount,
      description,
    });

    res.status(201).json({
      success: true,
      message: "Amount debited successfully",
      transaction,
      balance: user.balance,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Transaction History
export const getTransaction = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json(transactions);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
