import { auth } from '@/auth';
import React from 'react';

const Dashboard: React.FC = async () => {

  const session = await auth();

  return (
    <div>
      <h1>Admin Dashboard Page</h1>
      <h2>Welcome, {session?.user?.name}</h2>
    </div>
  )
}

export default Dashboard;