import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import ThemeToggle from '../components/ThemeToggle';
import Chatbot from '../components/Chatbot';
import RatingStars from '../components/RatingStars';

const Doctors = () => {
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState('All');

  /**
   * ✅ 1. Extract unique city names from address.line2
   * - Handle missing/null
   * - Lowercase to deduplicate consistently
   * - Capitalize nicely for dropdown
   */
  const cityList = React.useMemo(() => {
    const cities = doctors
      .map(doc => doc?.address?.line2?.trim().toLowerCase())
      .filter(Boolean);

    const unique = Array.from(new Set(cities));

    const capitalized = unique.map(city => city[0].toUpperCase() + city.slice(1));
    return ['All', ...capitalized];
  }, [doctors]);

  /**
   * ✅ 2. Apply filter based on selected speciality and city
   */
  const applyFilter = () => {
    let filtered = doctors;

    if (speciality) {
      filtered = filtered.filter(doc => doc.speciality === speciality);
    }

    if (selectedCity && selectedCity !== 'All') {
      filtered = filtered.filter(
        doc => doc?.address?.line2?.trim().toLowerCase() === selectedCity.toLowerCase()
      );
    }

    setFilterDoc(filtered);
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality, selectedCity]);

  const handleReviewClick = (e, doctorId) => {
    e.stopPropagation();
    navigate(`/review/${doctorId}`);
  };

  return (
    <div>
      <div>
        <ThemeToggle />
      </div>
      <div>
        <Chatbot />
      </div>

      <p className='text-gray-600 dark:text-white'>
        Browse through the doctors specialist.In your nearby area.
      </p>

      {/* ✅ City Filter Dropdown */}
      <div className='my-4'>
        <label className='font-medium text-gray-700 dark:text-white mr-2'>
          Filter by City:
        </label>
        <select
          value={selectedCity}
          onChange={e => setSelectedCity(e.target.value)}
          className='border rounded px-2 py-1 text-gray-800 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400'
        >
          {cityList.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
            showFilter ? 'bg-primary text-white' : ''
          }`}
          onClick={() => setShowFilter(prev => !prev)}
        >
          Filters
        </button>

        {/* ✅ Speciality Filters */}
        <div
          className={`flex-col gap-4 text-sm text-gray-600 ${
            showFilter ? 'flex' : 'hidden sm:flex'
          }`}
        >
          {[
            'General physician',
            'Gynecologist',
            'Dermatologist',
            'Pediatricians',
            'Neurologist',
            'Gastroenterologist'
          ].map(type => (
            <p
              key={type}
              onClick={() =>
                speciality === type
                  ? navigate('/doctors')
                  : navigate(`/doctors/${type}`)
              }
              className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                speciality === type
                  ? 'bg-indigo-100 text-black'
                  : 'dark:text-white'
              }`}
            >
              {type}
            </p>
          ))}
        </div>

        {/* ✅ Doctor Cards */}
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {filterDoc.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(`/appointment/${item._id}`)}
              className='border border-blue-200 dark:border-black rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 relative'
            >
              <img
                className='bg-blue-100 dark:bg-gray-800'
                src={item.image}
                alt=""
              />

              {/* Availability Badge */}
              <div className="absolute top-3 right-3">
                <div
                  className={`px-3 py-1 rounded-full text-xs font-medium shadow-md ${
                    item.available
                      ? 'bg-primary dark:bg-secondary text-white'
                      : 'bg-gray-500 text-white'
                  }`}
                >
                  {item.available ? 'Available' : 'Not Available'}
                </div>
              </div>

              <div className='p-4'>
                <p className='text-gray-900 dark:text-white text-lg font-medium mb-2'>
                  {item.name}
                </p>
                <p className='text-gray-600 dark:text-gray-100 text-sm mb-3'>
                  {item.speciality}
                </p>

                {/* Rating Display */}
                <div className="flex items-center justify-between mb-3">
                  <RatingStars
                    rating={item.averageRating || 0}
                    size="sm"
                    showNumber={true}
                  />
                  {item.totalReviews > 0 && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {item.totalReviews} review{item.totalReviews !== 1 ? 's' : ''}
                    </span>
                  )}
                </div>

                {/* Review Button */}
                <button
                  onClick={(e) => handleReviewClick(e, item._id)}
                  className="w-full bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400 py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Show Reviews
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
};

export default Doctors;
