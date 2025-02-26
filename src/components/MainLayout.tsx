
import { FC, ReactNode } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container flex gap-6 pt-6">
        <Sidebar />
        <main className="flex-1 pb-8 animate-fade-in">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
