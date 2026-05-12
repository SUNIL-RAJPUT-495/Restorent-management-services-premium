import mongoose from 'mongoose';

const tableSchema = new mongoose.Schema({

  restId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restorent' },
  number: {
    type: String,
    required: true,
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

tableSchema.index({ number: 1, restId: 1 }, { unique: true });

const Table = mongoose.models.Table || mongoose.model('Table', tableSchema);

export default Table;
