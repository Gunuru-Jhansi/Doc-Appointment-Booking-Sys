import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import RatingStars from "./RatingStars";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-600 dark:text-white">
      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {doctors.slice(0, 10).map((item, index) => (
          <div
            onClick={() => {
              navigate(`/appointment/${item._id}`);
            }}
            className="border border-blue-200 dark:border-black  rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 relative"
            key={index}
          >
            <img className="bg-blue-100 dark:bg-gray-800" src={item.image} alt="" />
            
            {/* Availability Badge */}
            <div className="absolute top-3 right-3">
              <div className={`px-3 py-1 rounded-full text-xs font-medium shadow-md ${
                item.available 
                  ? 'bg-primary dark:bg-secondary text-white' 
                  : 'bg-gray-500 text-white'
              }`}>
                {item.available ? 'Available' : 'Not Available'}
              </div>
            </div>
            
            <div className="p-4">
              <p className="text-gray-900 text-lg font-medium dark:text-white">{item.name}</p>
              <p className="text-gray-600 text-sm dark:text-gray-400 mb-2">{item.speciality}</p>
              
              {/* Rating Component */}
              <RatingStars 
                rating={item.averageRating || 0} 
                size="sm" 
                showNumber={true}
              />
              
              {/* Review Count */}
              {item.totalReviews > 0 && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {item.totalReviews} review{item.totalReviews !== 1 ? 's' : ''}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
        className="bg-blue-100 dark:bg-gray-700 dark:text-white text-gray-600 px-12 py-3 rounded-full mt-10"
      >
        more
      </button>
    </div>
  );
};

export default TopDoctors;
