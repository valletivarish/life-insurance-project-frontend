import React, { useState, useEffect } from 'react';
import { getAdminDetails } from '../../../../services/adminServices';
import './AdminProfile.css';

const AdminProfile = () => {
  const [adminData, setAdminData] = useState({
    username: '',
    email: '',
    active: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await getAdminDetails();
        setAdminData(response);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };

    fetchAdminData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="admin-profile-container">
      <h2>Admin Details</h2>
      <div className="form-group">
        <label>Username:</label>
        <input type="text" name="username" value={adminData.username} readOnly />
      </div>

      <div className="form-group">
        <label>Email:</label>
        <input type="email" name="email" value={adminData.email} readOnly />
      </div>

      <div className="form-group">
        <label>Status:</label>
        <span className={`status-badge ${adminData.active ? 'active' : 'inactive'}`}>
          {adminData.active ? 'Active' : 'Inactive'}
        </span>
      </div>
    </div>
  );
};

export default AdminProfile;
