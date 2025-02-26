
import { FC, ReactNode } from "react";
import Navbar from "./Navbar";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container pt-6">
        <main className="w-full pb-8 animate-fade-in">{children}</main>
      </div>
    </div>
  );
};

export default AuthLayout;
