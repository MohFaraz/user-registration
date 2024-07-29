import React, { useState, useEffect } from "react";
import axios from "axios";

function Profile({ token }) {
  const [profile, setProfile] = useState({});
  console.log(token)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data)
        setProfile(response.data);
      } catch (error) {
        alert("Failed to fetch profile");
      }
    };

    fetchProfile();
  }, [token]);

  return (
    <div className='profile'>
      <h1>Profile</h1>
      <p>Name: {profile.name}</p>
      <p>Email: {profile.email}</p>
      <p>Company: {profile.company}</p>
    </div>
  );
}

export default Profile;
