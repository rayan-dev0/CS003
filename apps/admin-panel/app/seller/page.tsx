"use client";

// import { authOptions } from "@/backend/utils/auth";
// import { getServerSession } from "next-auth";
import { signOut, useSession } from "next-auth/react";

export default function Sellers() {
  // const session = await getServerSession(authOptions); 
  const session = useSession()

  return (
    <div>
      <h1>Seller Page</h1>
      <h2>Welcome, {session.data?.user?.name}</h2>
      <button onClick={() => signOut({ redirect: false })}>
        Logout
      </button>
    </div>
  );
}
