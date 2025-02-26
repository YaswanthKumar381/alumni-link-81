
import { FC, ReactNode } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

interface MainLayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
}

const MainLayout: FC<MainLayoutProps> = ({ children, showSidebar = true }) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container flex gap-6 pt-6">
        {showSidebar && <Sidebar />}
        <main className={`${showSidebar ? "flex-1" : "w-full"} pb-8 animate-fade-in`}>{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
