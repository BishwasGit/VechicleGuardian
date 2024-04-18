import React from 'react';
import { useParams } from 'react-router-dom';

const CustomerDashboard = () => {
  const { customerId } = useParams();

  return (
    <div>
      <h1>Customer Dashboard</h1>
      <p>User ID: {customerId}</p>
    </div>
  );
};

export default CustomerDashboard;