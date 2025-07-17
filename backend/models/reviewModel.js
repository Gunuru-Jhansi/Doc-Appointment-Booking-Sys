import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    doctorId: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true,
        maxlength: 500
    },
    userName: {
        type: String,
        required: true
    },
    userImage: {
        type: String,
        default: ''
    },
    date: {
        type: Number,
        default: Date.now
    }
}, { timestamps: true });

// Compound index to prevent multiple reviews from same user for same doctor
reviewSchema.index({ userId: 1, doctorId: 1 }, { unique: true });

const reviewModel = mongoose.models.review || mongoose.model('review', reviewSchema);

export default reviewModel; 