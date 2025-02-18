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
      </body>
    </html>
  );
}

export default AuthLayout;