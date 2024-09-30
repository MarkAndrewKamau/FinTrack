import React from 'react';
import { FiMapPin, FiCalendar } from 'react-icons/fi';

const ProfileInfo = ({ profile = {} }) => { // Default to an empty object if no profile is passed
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center space-x-6 mb-4">
        <img
          className="h-28 w-28 object-cover rounded-full"
          src={profile.user?.avatar || "https://via.placeholder.com/112"}  // Default avatar
          alt="User avatar"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{profile.user?.username || 'Anonymous'}</h2>
          <span className="text-gray-600">{profile.user?.role || 'No role specified'}</span>
        </div>
      </div>
      <div className="space-y-4">
        {/* Location */}
        <div className="flex items-center space-x-2 text-gray-700">
          <FiMapPin className="h-5 w-5 text-gray-600" />
          <span>{profile.location || 'Location unknown'}</span>
        </div>
        {/* Birth Date */}
        <div className="flex items-center space-x-2 text-gray-700">
          <FiCalendar className="h-5 w-5 text-gray-600" />
          <span>{profile.birth_date ? new Date(profile.birth_date).toLocaleDateString() : 'No birth date provided'}</span>
        </div>
        {/* Bio */}
        <div className="text-gray-700">
          <p>{profile.bio || 'No bio provided'}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
