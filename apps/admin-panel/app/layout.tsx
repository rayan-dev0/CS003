"use client"

import { SessionProvider } from "next-auth/react";
import "./globals.css";

const RootLayout = ({  children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          {children}
          </SessionProvider>
      </body>
    </html>
  );
}

export default RootLayout;