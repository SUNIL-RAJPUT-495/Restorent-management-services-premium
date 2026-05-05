import mongoose from 'mongoose';

const tableSchema = new mongoose.Schema({

  restId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restorent' },
  number: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ['vacant', 'occupied', 'reserved'],
    default: 'vacant',
  },
  capacity: {
    type: Number,
    default: 4,
  },
  guests: {
    type: Number,
    default: 0,
  },
  occupiedSince: {
    type: Date,
  },
}, {
  timestamps: true,
});

const Table = mongoose.model('Table', tableSchema);

export default Table;
