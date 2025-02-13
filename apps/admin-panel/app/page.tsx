import { getServerSession } from 'next-auth';
import React from 'react';

const Dashboard: React.FC = async () => {

  const session = await getServerSession();

  return (
    <div>
      <h1>Admin Dashboard Page</h1>
      <h2>Welcome, {session?.user?.name}</h2>

      {/* <form action={signOut}>
        <button type="submit">Logout</button>
      </form> */}
    </div>
  )
}

export default Dashboard;