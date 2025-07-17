import reviewModel from '../models/reviewModel.js';
import doctorModel from '../models/doctormodel.js';
import userModel from '../models/userModel.js';

// Add a review for a doctor
const addReview = async (req, res) => {
    try {
        const { userId, doctorId, rating, comment } = req.body;

        // Validate input
        if (!userId || !doctorId || !rating || !comment) {
            return res.json({ success: false, message: "All fields are required" });
        }

        if (rating < 1 || rating > 5) {
            return res.json({ success: false, message: "Rating must be between 1 and 5" });
        }

        // Check if user has already reviewed this doctor
        const existingReview = await reviewModel.findOne({ userId, doctorId });
        if (existingReview) {
            return res.json({ success: false, message: "You have already reviewed this doctor" });
        }

        // Get user data
        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        // Create new review
        const reviewData = {
            userId,
            doctorId,
            rating,
            comment,
            userName: userData.name,
            userImage: userData.image || '',
            date: Date.now()
        };

        const newReview = new reviewModel(reviewData);
        await newReview.save();

        // Update doctor's average rating
        await updateDoctorAverageRating(doctorId);

        res.json({ success: true, message: "Review added successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Get all reviews for a doctor
const getDoctorReviews = async (req, res) => {
    try {
        const { doctorId } = req.params;

        const reviews = await reviewModel.find({ doctorId })
            .sort({ date: -1 })
            .limit(50);

        res.json({ success: true, reviews });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Get user's review for a specific doctor
const getUserReview = async (req, res) => {
    try {
        const { userId, doctorId } = req.params;

        const review = await reviewModel.findOne({ userId, doctorId });
        
        res.json({ success: true, review });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Update doctor's average rating in doctor model
const updateDoctorAverageRating = async (doctorId) => {
    try {
        const reviews = await reviewModel.find({ doctorId });
        
        if (reviews.length === 0) return;

        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRating / reviews.length;

        await doctorModel.findByIdAndUpdate(doctorId, {
            averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal place
            totalReviews: reviews.length
        });
    } catch (error) {
        console.log("Error updating doctor rating:", error);
    }
};

// Get doctor's rating statistics
const getDoctorRatingStats = async (req, res) => {
    try {
        const { doctorId } = req.params;

        const reviews = await reviewModel.find({ doctorId });
        
        if (reviews.length === 0) {
            return res.json({
                success: true,
                stats: {
                    averageRating: 0,
                    totalReviews: 0,
                    ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
                }
            });
        }

        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRating / reviews.length;

        // Calculate rating distribution
        const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        reviews.forEach(review => {
            ratingDistribution[review.rating]++;
        });

        res.json({
            success: true,
            stats: {
                averageRating: Math.round(averageRating * 10) / 10,
                totalReviews: reviews.length,
                ratingDistribution
            }
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export {
    addReview,
    getDoctorReviews,
    getUserReview,
    getDoctorRatingStats,
    updateDoctorAverageRating
}; 