import React, { useState } from 'react';

const ProfileForm = ({ profile = {}, onUpdate }) => {
  const [formData, setFormData] = useState({
    bio: profile.bio || '',
    location: profile.location || '',
    birthDate: profile.birth_date || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>
      <div className="grid grid-cols-1 gap-6">
        {/* Bio */}
        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
          <textarea
            name="bio"
            id="bio"
            value={formData.bio}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            maxLength="350"  // Limit the input to the max length defined in the model
          />
        </div>
        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            id="location"
            value={formData.location}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        {/* Birth Date */}
        <div>
          <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">Birth Date</label>
          <input
            type="date"
            name="birthDate"
            id="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
      </div>
      <div className="mt-6">
        <button
          type="submit"
          className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Update Profile
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
