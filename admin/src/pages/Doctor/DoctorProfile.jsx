import React, { useContext, useEffect, useState, useRef } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { dToken, profileData, backendUrl, setProfileData, getProfileData } =
    useContext(DoctorContext);
  const { currency } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const updateProfile = async () => {
    setIsLoading(true);
    try {
      let imageUrl = profileData.image;
      // If a new image is selected, upload it first
      if (newImage) {
        const formData = new FormData();
        formData.append("image", newImage);
        // Assuming you have an endpoint for image upload
        const uploadRes = await axios.post(
          backendUrl + "/api/doctor/upload-image",
          formData,
          { headers: { dToken, "Content-Type": "multipart/form-data" } }
        );
        if (uploadRes.data.success) {
          imageUrl = uploadRes.data.imageUrl;
        } else {
          toast.error("Image upload failed");
          setIsLoading(false);
          return;
        }
      }
      const updateData = {
        name: profileData.name,
        image: imageUrl,
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
      };
      const { data } = await axios.post(
        backendUrl + "/api/doctor/update-profile",
        updateData,
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        setNewImage(null);
        setImagePreview(null);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProfileData();
  }, [dToken]);

  return (
    profileData && (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
        <div className="max-w-4xl mx-auto ">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Doctor Profile</h1>
            <p className="text-gray-600">Manage your professional information and availability</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Profile Header */}
            <div className="bg-primary px-6 py-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="relative">
                  <img
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-lg"
                    src={imagePreview || profileData.image}
                    alt={profileData.name}
                  />
                  {isEdit && (
                    <>
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleImageChange}
                      />
                      <button
                        className="absolute bottom-2 right-2 bg-white bg-opacity-80 rounded-full p-2 shadow hover:bg-blue-100 transition"
                        onClick={() => fileInputRef.current.click()}
                        type="button"
                        title="Change profile photo"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-600">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 01.75-.75h9a.75.75 0 01.75.75v6a2.25 2.25 0 01-2.25 2.25h-6A2.25 2.25 0 016 18v-6zm0 0V9A2.25 2.25 0 018.25 6.75h7.5A2.25 2.25 0 0118 9v3" />
                        </svg>
                      </button>
                    </>
                  )}
                </div>
                
                <div className="flex-1 text-white">
                  {isEdit ? (
                    <input
                      type="text"
                      className="text-2xl md:text-3xl font-bold mb-2 bg-white bg-opacity-20 rounded-lg px-3 py-2 text-white placeholder:text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      value={profileData.name}
                      onChange={e => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Doctor Name"
                    />
                  ) : (
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">{profileData.name}</h2>
                  )}
                  <div className="flex items-center gap-3 mb-3">
                    <p className="text-blue-100 text-lg">
                      {profileData.degree} - {profileData.speciality}
                    </p>
                    <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm font-medium">
                      {profileData.experience}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      profileData.available 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {profileData.available ? 'Available' : 'Unavailable'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Content */}
            <div className="p-6 space-y-6">
              {/* About Section */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  About
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {profileData.about}
                </p>
              </div>

              {/* Professional Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Appointment Fee */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Appointment Fee
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-green-600">
                      {currency}
                    </span>
                    {isEdit ? (
                      <input
                        type="number"
                        className="text-2xl font-bold text-green-600 bg-white border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        onChange={(e) =>
                          setProfileData((prev) => ({
                            ...prev,
                            fees: e.target.value,
                          }))
                        }
                        value={profileData.fees}
                      />
                    ) : (
                      <span className="text-2xl font-bold text-green-600">
                        {profileData.fees}
                      </span>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    Address
                  </h3>
                  <div className="space-y-2">
                    {isEdit ? (
                      <>
                        <input
                          type="text"
                          className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          onChange={(e) =>
                            setProfileData((prev) => ({
                              ...prev,
                              address: { ...prev.address, line1: e.target.value },
                            }))
                          }
                          value={profileData.address.line1}
                          placeholder="Address Line 1"
                        />
                        <input
                          type="text"
                          className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          onChange={(e) =>
                            setProfileData((prev) => ({
                              ...prev,
                              address: { ...prev.address, line2: e.target.value },
                            }))
                          }
                          value={profileData.address.line2}
                          placeholder="Address Line 2"
                        />
                      </>
                    ) : (
                      <div className="text-gray-700">
                        <p>{profileData.address.line1}</p>
                        <p>{profileData.address.line2}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Availability Toggle */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  Availability
                </h3>
                <div className="flex items-center gap-3">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={profileData.available}
                      onChange={() =>
                        isEdit &&
                        setProfileData((prev) => ({
                          ...prev,
                          available: !prev.available,
                        }))
                      }
                      disabled={!isEdit}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                  <span className="text-gray-700 font-medium">
                    {profileData.available ? 'Available for appointments' : 'Currently unavailable'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                {isEdit ? (
                  <>
                    <button
                      onClick={updateProfile}
                      disabled={isLoading}
                      className="flex-1 md:flex-none px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      onClick={() => { setIsEdit(false); setNewImage(null); setImagePreview(null); }}
                      className="flex-1 md:flex-none px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEdit(true)}
                    className="flex-1 md:flex-none px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
