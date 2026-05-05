import mongoose from 'mongoose';

const superAdminSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: { type: String, required: true },
    permissions: [String],
}, {
    timestamps: true,
});

const SuperAdmin = mongoose.model('SuperAdmin', superAdminSchema);

export default SuperAdmin;