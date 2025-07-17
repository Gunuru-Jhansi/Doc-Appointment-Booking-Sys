import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import ThemeToggle from '../components/ThemeToggle';
import Chatbot from '../components/Chatbot';

const DoctorReview = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const { userData: user, token } = useContext(AppContext);
  
  console.log('DoctorReview component - doctorId from params:', doctorId);
  
  const [doctor, setDoctor] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [ratingStats, setRatingStats] = useState(null);
  const [userReview, setUserReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  // Form state
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    console.log('DoctorReview useEffect - user:', user, 'doctorId:', doctorId);
    
    if (!doctorId) {
      console.log('No doctorId found');
      return;
    }
    
    if (user) {
      fetchDoctorData();
    }
  }, [doctorId, user]);

  const fetchDoctorData = async () => {
    try {
      setLoading(true);
      
      // Fetch doctor details
      const doctorResponse = await axios.get(`${backendUrl}/api/doctor/list`);
      const doctorData = doctorResponse.data.doctors.find(d => d._id === doctorId);
      setDoctor(doctorData);

      // Fetch reviews
      const reviewsResponse = await axios.get(`${backendUrl}/api/review/doctor/${doctorId}`);
      setReviews(reviewsResponse.data.reviews);

      // Fetch rating stats
      const statsResponse = await axios.get(`${backendUrl}/api/review/stats/${doctorId}`);
      setRatingStats(statsResponse.data.stats);

      // Check if user has already reviewed
      const userReviewResponse = await axios.get(`${backendUrl}/api/review/user/${user._id}/${doctorId}`, {
        headers: { token }
      });
      if (userReviewResponse.data.review) {
        setUserReview(userReviewResponse.data.review);
        setRating(userReviewResponse.data.review.rating);
        setComment(userReviewResponse.data.review.comment);
      }

    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Error loading doctor data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    if (!rating) {
      toast.error('Please select a rating');
      return;
    }
    
    if (!comment.trim()) {
      toast.error('Please write a comment');
      return;
    }

    try {
      setSubmitting(true);
      
      const response = await axios.post(`${backendUrl}/api/review/add`, {
        userId: user._id,
        doctorId,
        rating,
        comment: comment.trim()
      }, {
        headers: { token }
      });

      if (response.data.success) {
        toast.success('Review submitted successfully!');
        fetchDoctorData(); // Refresh data
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Error submitting review');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-600 dark:text-white mb-4">Please login to review doctors</h2>
          <button 
            onClick={() => navigate('/login')}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-600 dark:text-white mb-4">Doctor not found</h2>
          <button 
            onClick={() => navigate('/doctors')}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Back to Doctors
          </button>
        </div>
      </div>
    );
  }

  return ( 
    
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div>
        <ThemeToggle/>
      </div>
      <div>
        <Chatbot/>
      </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-6">
            <img 
              src={doctor.image} 
              alt={doctor.name}
              className="w-24 h-24 rounded-full object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {doctor.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-1">{doctor.speciality}</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{doctor.degree}</p>
              
              {/* Rating Display */}
              {ratingStats && (
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {ratingStats.averageRating}
                    </span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`w-5 h-5 ${
                            star <= ratingStats.averageRating 
                              ? 'text-yellow-400' 
                              : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <span className="text-gray-600 dark:text-gray-400">
                    ({ratingStats.totalReviews} reviews)
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Review Form */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {userReview ? 'Your Review' : 'Write a Review'}
              </h2>
              
              <form onSubmit={handleSubmitReview}>
                {/* Star Rating */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Rating
                  </label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="focus:outline-none"
                      >
                        <svg
                          className={`w-8 h-8 ${
                            star <= (hoveredRating || rating)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          } transition-colors`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {rating > 0 && (
                      <span>
                        {rating === 1 && 'Poor'}
                        {rating === 2 && 'Fair'}
                        {rating === 3 && 'Good'}
                        {rating === 4 && 'Very Good'}
                        {rating === 5 && 'Excellent'}
                      </span>
                    )}
                  </p>
                </div>

                {/* Comment */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Comment
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Share your experience with this doctor..."
                    maxLength="500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {comment.length}/500 characters
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={submitting || userReview}
                  className="w-full bg-primary dark:bg-secondary text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Submitting...' : userReview ? 'Already Reviewed' : 'Submit Review'}
                </button>
              </form>
            </div>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                All Reviews ({reviews.length})
              </h2>
              
              {reviews.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                  No reviews yet. Be the first to review this doctor!
                </p>
              ) : (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review._id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                          {review.userImage ? (
                            <img 
                              src={review.userImage} 
                              alt={review.userName}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <span className="text-gray-600 dark:text-gray-400 font-medium">
                              {review.userName.charAt(0).toUpperCase()}
                            </span>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-gray-900 dark:text-white">
                              {review.userName}
                            </span>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                  key={star}
                                  className={`w-4 h-4 ${
                                    star <= review.rating 
                                      ? 'text-yellow-400' 
                                      : 'text-gray-300'
                                  }`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 mb-2">
                            {review.comment}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {formatDate(review.date)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorReview; 