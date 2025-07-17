import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const DoctorDashboard = () => {
  const { dToken, getDashData, setDashData, dashData, completeAppointment, cancelAppointment } = useContext(DoctorContext);
  const { currency, slotDateFormat } = useContext(AppContext);
  
  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  const getStatusText = (item) => {
    if (item.cancelled) return 'Cancelled';
    if (item.isCompleted) return 'Completed';
    return 'Upcoming';
  };

  return (
    dashData && (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Doctor Dashboard</h1>
          <p className="text-gray-600">Welcome back, Doctor! Here's your practice overview.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Earnings</p>
                <p className="text-3xl font-bold text-green-600">
                  {currency} {dashData.earnings}
                </p>
                <p className="text-xs text-gray-500 mt-1">This month</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <img className="w-8 h-8" src={assets.earning_icon} alt="Earnings" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Appointments</p>
                <p className="text-3xl font-bold text-blue-600">{dashData.appointments}</p>
                <p className="text-xs text-gray-500 mt-1">Total bookings</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <img className="w-8 h-8" src={assets.appointments_icon} alt="Appointments" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Patients</p>
                <p className="text-3xl font-bold text-purple-600">{dashData.patients}</p>
                <p className="text-xs text-gray-500 mt-1">Under your care</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <img className="w-8 h-8" src={assets.patients_icon} alt="Patients" />
              </div>
            </div>
          </div>
        </div>

        {/* Latest Bookings Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-blue-200 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                <img className="w-6 h-6" src={assets.list_icon} alt="" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-black">Latest Appointments</h2>
                <p className="text-blue-600 text-sm">Your upcoming patient consultations</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            {dashData.latestAppointments.length > 0 ? (
              <div className="space-y-4">
                {dashData.latestAppointments.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  >
                    <div className="flex-shrink-0">
                      <img
                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                        src={item.userData.image}
                        alt={item.userData.name}
                      />
                    </div>

                    <div className="flex-1 ml-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            {item.userData.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {slotDateFormat(item.slotDate)}
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(getStatusText(item).toLowerCase())}`}>
                            {getStatusText(item)}
                          </span>
                          
                          {!item.cancelled && !item.isCompleted && (
                            <div className="flex gap-2">
                              <button
                                onClick={() => completeAppointment(item._id)}
                                className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-colors duration-200"
                                title="Complete Appointment"
                              >
                                <img className="w-5 h-5" src={assets.tick_icon} alt="Complete" />
                              </button>
                              <button
                                onClick={() => cancelAppointment(item._id)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                                title="Cancel Appointment"
                              >
                                <img className="w-5 h-5" src={assets.cancel_icon} alt="Cancel" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <img className="w-8 h-8 text-gray-400" src={assets.appointments_icon} alt="" />
                </div>
                <p className="text-gray-500 text-lg font-medium">No appointments scheduled</p>
                <p className="text-gray-400 text-sm">New patient bookings will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorDashboard;
