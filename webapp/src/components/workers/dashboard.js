import React from 'react';
import { useParams } from 'react-router-dom';

const WorkerDashboard = () => {
  const { workerId } = useParams();
  return (
    <div>
      <h1>Worker Dashboard</h1>
      <p>UserId : {workerId}</p>
    </div>
  );
};

export default WorkerDashboard;
