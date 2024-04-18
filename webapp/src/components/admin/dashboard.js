import React from 'react';
import { useParams } from 'react-router-dom';

const AdminDashboard = () => {
  const { adminId } = useParams();

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>User ID: {adminId}</p>
    </div>
  );
};

export default AdminDashboard;
