import React from 'react';

const RatingStars = ({ rating = 0, size = 'md', showNumber = true, interactive = false, onRatingChange }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
    xl: 'w-6 h-6'
  };

  const handleStarClick = (starIndex) => {
    if (interactive && onRatingChange) {
      onRatingChange(starIndex + 1);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, index) => {
        let starFill = 'none';
        let starClass = 'text-gray-300';
        
        if (index < fullStars) {
          starFill = 'currentColor';
          starClass = 'text-yellow-400';
        } else if (index === fullStars && hasHalfStar) {
          starFill = 'url(#half-star)';
          starClass = 'text-yellow-400';
        }
        
        return (
          <svg
            key={index}
            className={`${sizeClasses[size]} ${starClass} ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
            fill={starFill}
            stroke="currentColor"
            viewBox="0 0 24 24"
            onClick={() => handleStarClick(index)}
          >
            {index === fullStars && hasHalfStar && (
              <defs>
                <linearGradient id="half-star">
                  <stop offset="50%" stopColor="currentColor" />
                  <stop offset="50%" stopColor="transparent" />
                </linearGradient>
              </defs>
            )}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
        );
      })}
      {showNumber && rating > 0 && (
        <span className="text-xs text-gray-600 dark:text-gray-400 ml-1">
          {rating}
        </span>
      )}
    </div>
  );
};

export default RatingStars; 