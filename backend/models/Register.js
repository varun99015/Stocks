import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,

  portfolio: [
    {
      stockId: { type: mongoose.Schema.Types.ObjectId, ref: 'Stock' },
      quantity: Number,
      avgBuyPrice: Number
    }
  ],

  transactions: [
    {
      stockId: { type: mongoose.Schema.Types.ObjectId, ref: 'Stock' },
      type: { type: String, enum: ['buy', 'sell'] },
      quantity: Number,
      price: Number,
      date: { type: Date, default: Date.now }
    }
  ]
});

const UserModel = mongoose.model('User', userSchema);
export default UserModel;
