import React, { useState, useEffect } from 'react';

function ProfilePage() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data from API
    const fetchUserData = async () => {
      const response = await fetch('/api/user-profile');
      const data = await response.json();
      setUserData(data);
    };

    fetchUserData();
  }, []);

  if (!userData) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Profile Page</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">User Information</h2>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-1">Name:</label>
          <p className="text-xl">{userData.name}</p>
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-1">Email:</label>
          <p className="text-xl">{userData.email}</p>
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-1">Date Joined:</label>
          <p className="text-xl">{new Date(userData.dateJoined).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
