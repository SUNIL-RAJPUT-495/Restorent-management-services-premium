import mongoose from 'mongoose';

const restoSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    logo: String,
    password: { type: String, required: true },
    ownerName: { type: String, },
    subscription: {
        plan: String,
        status: String,
        expiresAt: Date,
    },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
});

const Restorent = mongoose.model('Restorent', restoSchema);
export default Restorent;