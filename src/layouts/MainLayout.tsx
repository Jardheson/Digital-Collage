import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Layout/Header";
import { Footer } from "../components/Layout/Footer";
import { BottomNav } from "../components/Layout/BottomNav";

export const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow pb-20 lg:pb-0">
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};
