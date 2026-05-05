import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  
  restId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restorent' },
  name: {
    type: String,
    required: true,
  },
  description: String,
}, {
  timestamps: true,
});

const Category = mongoose.model('Category', categorySchema);

export default Category;
