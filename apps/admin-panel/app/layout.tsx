import "./globals.css";

const AuthLayout = ({  children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="en">
      <body>
          {children}
      </body>
    </html>
  );
}

export default AuthLayout;