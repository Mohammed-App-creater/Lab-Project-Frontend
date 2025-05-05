"use client";

import SidebarCard from "@/components/global/sidebar/sidebar.card";
import Header from "@/components/global/header/header";
import { ThemeProvider } from "next-themes";
import ProtectedRoute from "@/components/protectedRoute";
import { Suspense, useState } from "react";
import { LoadingSpinner } from "@/components/global/login/loading";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }
  return (
    <ProtectedRoute>
      <ThemeProvider attribute="class">
        <div className="min-h-screen flex justify-center">
          <div className="min-h-screen w-full  flex pr-8 ">
            <div className=" lg:w-1/5 md:w-1/4  ">
              <SidebarCard isOpen={isSidebarOpen} />
            </div>

            <div className=" w-full     ">
              <div className="flex flex-col justify-start items- w-full h-screen">
                <div className="w-full mb-5 ">
                  <Header onMenuClick={toggleSidebar} />
                </div>

                <div className="w-full h-full ">
                  <Suspense fallback={<LoadingSpinner fullPage={true} />}>
                    {children}
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </ProtectedRoute>
  );
}
