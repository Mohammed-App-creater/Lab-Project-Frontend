"use client";

import SidebarCard from "@/components/global/sidebar/sidebar.card";
import Header from "@/components/global/header/header";
import { ThemeProvider } from "next-themes";
import ProtectedRoute from "@/components/protectedRoute";
import { Suspense } from "react";
import { LoadingSpinner } from "@/components/global/login/loading";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <ThemeProvider attribute="class">
        <div className="min-h-screen flex justify-center">
          <div className="min-h-screen w-full flex pr-8 ">
            <div className=" w-1/5  ">
              <SidebarCard />
            </div>

            <div className=" w-full ">
              <div className="flex flex-col justify-start items- w-full h-screen">
                <div className="w-full mb-5 ">
                  <Header />
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
