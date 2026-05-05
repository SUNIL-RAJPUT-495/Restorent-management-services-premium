import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true }, // URL-friendly name
  content: { type: String, required: true }, // Rich text or HTML content
  thumbnailUrl: { type: String }, // AWS S3 ya image URL
  
  author: { type: String, default: 'Admin' },
  
  // Draft mode ya live mode
  isPublished: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Blog', blogSchema);