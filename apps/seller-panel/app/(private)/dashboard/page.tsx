import { auth } from '@/auth';
import React from 'react';

const Dashboard = async () => {
  const sessionAuth = await auth()
  console.log("sessionAuth====>", sessionAuth);

  return (
    <div>

    </div>
  )
}

export default Dashboard;
