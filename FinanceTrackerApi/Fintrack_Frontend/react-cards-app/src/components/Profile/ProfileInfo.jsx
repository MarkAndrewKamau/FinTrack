import React from 'react';
import { FiUser, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const ProfileInfo = ({ user = {} }) => {  // Default to an empty object if no user is passed
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center space-x-6 mb-4">
        <img
          className="h-28 w-28 object-cover rounded-full"
          src={user.avatar || "https://via.placeholder.com/112"}  // Default avatar
          alt="User avatar"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{user.name || 'Anonymous'}</h2>
          <span className="text-gray-600">{user.role || 'No role specified'}</span>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-gray-700">
          <FiMail className="h-5 w-5 text-gray-600" />
          <span>{user.email || 'No email provided'}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-700">
          <FiPhone className="h-5 w-5 text-gray-600" />
          <span>{user.phone || 'No phone number provided'}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-700">
          <FiMapPin className="h-5 w-5 text-gray-600" />
          <span>{user.location || 'Location unknown'}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
