import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import { toast } from 'react-toastify'
import axios from 'axios'
import ThemeToggle from '../components/ThemeToggle'
import RatingStars from '../components/RatingStars'
import { IoStarHalfSharp } from "react-icons/io5";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { FaUserDoctor } from "react-icons/fa6";

const Appointment = () => {
  const { docId } = useParams()
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext)
  const dayOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')
  const navigate = useNavigate()

  const fetchDocInfoFromBackend = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/${docId}`);
      setDocInfo(data.doctor);
      getAvailableSlots(data.doctor);
    } catch (error) {
      console.error('Error fetching doctor info:', error);
      toast.error('Failed to load doctor details. Please try again.');
    }
  };

  const fetchDocInfoFromContext = () => {
    const doctor = doctors.find(doc => doc._id === docId);
    if (doctor) {
      setDocInfo(doctor);
      getAvailableSlots(doctor);
    }
  };

  const getAvailableSlots = async () => {
    try {
      // Always fetch the latest doctor data
      const { data } = await axios.get(`${backendUrl}/api/doctor/${docId}`);
      if (!data.success) {
        toast.error('Failed to load doctor data');
        return;
      }
      setDocInfo(data.doctor);
  
      const freshDocInfo = data.doctor;
  
      setDocSlots([]);
  
      let today = new Date();
  
      for (let i = 0; i < 7; i++) {
        let currentDate = new Date(today);
        currentDate.setDate(today.getDate() + i);
  
        let endTime = new Date();
        endTime.setDate(today.getDate() + i);
        endTime.setHours(21, 0, 0, 0);
  
        if (today.getDate() === currentDate.getDate()) {
          currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
          currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
        } else {
          currentDate.setHours(10);
          currentDate.setMinutes(0);
        }
  
        let timeSlots = [];
        while (currentDate < endTime) {
          let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
          let day = currentDate.getDate();
          let month = currentDate.getMonth() + 1;
          let year = currentDate.getFullYear();
  
          const slotDate = `${day}_${month}_${year}`;
          const slotTime = formattedTime;
  
          const isSlotAvailable = freshDocInfo.slots_booked?.[slotDate]?.includes(slotTime) ? false : true;
  
          if (isSlotAvailable) {
            timeSlots.push({
              datetime: new Date(currentDate),
              time: formattedTime
            });
          }
  
          currentDate.setMinutes(currentDate.getMinutes() + 30);
        }
  
        setDocSlots(prev => [...prev, timeSlots]);
      }
    } catch (error) {
      console.error(error);
      toast.error('Error loading available slots');
    }
  };
  

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book Appointment');
      return navigate('/login');
    }
    try {
      const date = docSlots[slotIndex][0].datetime;
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const slotDate = `${day}_${month}_${year}`;
      const docDate = date.toISOString();

      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId, slotDate, slotTime, docDate },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await getDoctorsData();
        await fetchDocInfoFromBackend();
        setSlotTime('');
        navigate('/my-appointments');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast.error(error.message || 'Booking failed. Please try again.');
    }
  };

  // load initial doctor info from context
  useEffect(() => {
    fetchDocInfoFromContext();
  }, [doctors, docId]);

  return docInfo && (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <ThemeToggle />
        </div>

        {/* Doctor Profile Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="relative">
            <div className="h-48 bg-primary dark:bg-secondary relative">
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <div className="absolute bottom-4 left-6">
                <div className="flex items-center gap-4">
                  <img 
                    className="w-28 h-28 rounded border-4 border-white dark:border-black shadow-lg" 
                    src={docInfo.image} 
                    alt={docInfo.name} 
                  />
                  <div className="text-white dark:text-black">
                    <h1 className="text-2xl font-bold">{docInfo.name}</h1>
                    <p className="text-white dark:text-black">{docInfo.speciality}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-blue-100 dark:bg-gray-700 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FaUserDoctor size={20}/>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Doctor Info</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{docInfo.degree}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{docInfo.experience} experience</p>
                </div>

                <div className="bg-green-100 dark:bg-gray-700 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <IoStarHalfSharp size={20}/>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Rating</h3>
                  </div>
                  <RatingStars rating={docInfo.averageRating || 0} size="sm" />
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                    {docInfo.totalReviews || 0} reviews
                  </p>
                </div>

                <div className="bg-red-100 dark:bg-gray-700 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <HiOutlineCurrencyDollar size={20}/>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Consultation Fee</h3>
                  </div>
                  <p className="text-2xl font-bold text-primary dark:text-secondary">
                    {currencySymbol}{docInfo.fees}
                  </p>
                </div>
              </div>

              <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <img src={assets.info_icon} alt="" className="w-5 h-5" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">About Doctor</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {docInfo.about || 'No about information available for this doctor.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Book Your Appointment</h2>

          <div className="mb-5">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Select Date</h3>
            <div className="flex gap-3 overflow-x-auto pb-3">
              {docSlots.length > 0 && docSlots.map((item, index) => (
                <div 
                  onClick={() => {
                    setSlotIndex(index);
                    setSlotTime('');
                  }}
                  className={`flex flex-col items-center justify-center min-w-16 h-20 rounded-full cursor-pointer transition-all duration-200 ${
                    slotIndex === index 
                      ? 'bg-primary dark:bg-secondary text-white shadow-lg scale-105' 
                      : 'bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`} 
                  key={index}
                >
                  <p className="text-xs font-medium">{item[0] && dayOfWeek[item[0].datetime.getDay()]}</p>
                  <p className="text-lg font-bold">{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Select Time</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {docSlots.length > 0 && docSlots[slotIndex].map((item, index) => (
                <button
                  onClick={() => setSlotTime(item.time)}
                  className={`py-3 px-4 rounded-full text-sm font-medium transition-all duration-200 ${
                    item.time === slotTime
                      ? 'bg-primary dark:bg-secondary text-white shadow-lg'
                      : 'bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                  key={index}
                >
                  {item.time.toLowerCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <button 
              onClick={bookAppointment} 
              disabled={!slotTime}
              className="bg-primary dark:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-12 py-4 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              {slotTime ? `Book Appointment at ${slotTime}` : 'Select a time slot'}
            </button>
          </div>
        </div>

        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    </div>
  )
}

export default Appointment
