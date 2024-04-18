import React from 'react';
import { useParams } from 'react-router-dom';

const RepairCenterDashboard = () => {
  const { repaircenterId } = useParams();

  return (
    <div>
      <h1>Repair Center Dashboard</h1>
      <p>User ID: {repaircenterId}</p>
    </div>
  );
};

export default RepairCenterDashboard;
