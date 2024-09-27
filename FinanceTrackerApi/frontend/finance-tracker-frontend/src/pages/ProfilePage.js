import React, { useState, useEffect } from 'react';
import './ProfilePage.css'; // Import the CSS file

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [newProfile, setNewProfile] = useState({
    bio: '',
    location: '',
    birth_date: '',
    profile_pic: null,
  });

  // Fetch profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token'); // Retrieve JWT token from local storage

      try {
        const response = await fetch('http://127.0.0.1:8000/api/profiles/', {
          headers: {
            'Authorization': `Bearer ${token}`, // Include token in request headers
          },
        });

        if (!response.ok) {
          throw new Error('Unable to fetch profile');
        }

        const data = await response.json();
        setProfile(data.length ? data[0] : null); // Check if profile exists
      } catch (error) {
        setErrorMessage('Error fetching profile. Please try again.');
      }
    };

    fetchProfile();
  }, []);

  // Handle form input changes for new profile
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProfile({
      ...newProfile,
      [name]: value,
    });
  };

  // Handle profile picture change
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'image/jpeg') {
      setNewProfile({
        ...newProfile,
        profile_pic: file,
      });
    } else {
      setErrorMessage('Please upload a JPG image only.');
    }
  };

  // Handle form submission for profile creation
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Retrieve JWT token

    const formData = new FormData();
    formData.append('bio', newProfile.bio);
    formData.append('location', newProfile.location);
    formData.append('birth_date', newProfile.birth_date);
    if (newProfile.profile_pic) {
      formData.append('profile_pic', newProfile.profile_pic);
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/profiles/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Include token in headers
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data); // Set the profile once created
        setIsEditing(false); // Stop editing mode
      } else {
        setErrorMessage('Error creating profile.');
      }
    } catch (error) {
      setErrorMessage('Error creating profile.');
    }
  };

  if (errorMessage) {
    return <div className="error-message">{errorMessage}</div>;
  }

  if (!profile) {
    // If no profile exists, show a form to create one
    return (
      <div className="profile-container">
        <h2>No profile found</h2>
        {isEditing ? (
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-group">
              <label htmlFor="bio">Bio</label>
              <input
                type="text"
                id="bio"
                name="bio"
                value={newProfile.bio}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={newProfile.location}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="birth_date">Birth Date</label>
              <input
                type="date"
                id="birth_date"
                name="birth_date"
                value={newProfile.birth_date}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="profile_pic">Profile Picture (JPG only)</label>
              <input
                type="file"
                id="profile_pic"
                name="profile_pic"
                accept="image/jpeg"
                onChange={handleProfilePicChange}
              />
            </div>
            <button type="submit" className="btn">Save Profile</button>
          </form>
        ) : (
          <button className="btn" onClick={() => setIsEditing(true)}>Create Profile</button>
        )}
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h2>Profile Details</h2>
      <p><strong>Bio:</strong> {profile.bio}</p>
      <p><strong>Location:</strong> {profile.location}</p>
      <p><strong>Birth Date:</strong> {profile.birth_date}</p>
      {profile.profile_pic && (
        <div>
          <img src={`http://127.0.0.1:8000${profile.profile_pic}`} alt="Profile" className="profile-pic" />
        </div>
      )}
      <button className="btn" onClick={() => setIsEditing(true)}>Edit Profile</button>

      {isEditing && (
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <input
              type="text"
              id="bio"
              name="bio"
              value={newProfile.bio}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={newProfile.location}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="birth_date">Birth Date</label>
            <input
              type="date"
              id="birth_date"
              name="birth_date"
              value={newProfile.birth_date}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="profile_pic">Profile Picture (JPG only)</label>
            <input
              type="file"
              id="profile_pic"
              name="profile_pic"
              accept="image/jpeg"
              onChange={handleProfilePicChange}
            />
          </div>
          <button type="submit" className="btn">Save Profile</button>
        </form>
      )}
    </div>
  );
}

export default ProfilePage;
