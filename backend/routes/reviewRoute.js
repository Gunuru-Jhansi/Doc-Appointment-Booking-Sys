import express from 'express';
import { 
    addReview, 
    getDoctorReviews, 
    getUserReview, 
    getDoctorRatingStats 
} from '../controllers/reviewController.js';
import authUser from '../middlewares/authUser.js';

const reviewRouter = express.Router();

// Add a review (requires user authentication)
reviewRouter.post('/add', authUser, addReview);

// Get all reviews for a doctor (public)
reviewRouter.get('/doctor/:doctorId', getDoctorReviews);

// Get user's review for a specific doctor (requires user authentication)
reviewRouter.get('/user/:userId/:doctorId', authUser, getUserReview);

// Get doctor's rating statistics (public)
reviewRouter.get('/stats/:doctorId', getDoctorRatingStats);

export default reviewRouter; 