import { Toaster } from "sonner";
import "./globals.css";

const AuthLayout = ({  children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="en">
      <head>
        <title>
          Seller Panel
        </title>
      </head>
      <body>
          {children}
          <Toaster />
      </body>
    </html>
  );
}

export default AuthLayout;