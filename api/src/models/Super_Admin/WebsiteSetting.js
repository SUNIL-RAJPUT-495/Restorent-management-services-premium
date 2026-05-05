import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true }
});

const websiteSettingSchema = new mongoose.Schema({
  contactEmail: { type: String, required: true },
  contactPhone: { type: String, required: true },
  officeAddress: { type: String, required: true },
  
  socialLinks: {
    facebook: { type: String },
    instagram: { type: String },
    twitter: { type: String }
  },
  
  faqs: [faqSchema] // Array of FAQs
}, { timestamps: true });

export default mongoose.model('WebsiteSetting', websiteSettingSchema);