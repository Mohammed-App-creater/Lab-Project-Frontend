'use client';

import SidebarCard from "@/components/global/sidebar/sidebar.card";
import Header from "@/components/global/header/header";
import { ThemeProvider } from "next-themes";
import ProtectedRoute from "@/components/protectedRoute";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <ThemeProvider attribute="class">
        <div className="min-h-screen flex justify-center">
          <div className="min-h-screen w-full max-w-[1600px] relative">
            <div className="fixed top-0 left-5 z-40">
              <SidebarCard />
            </div>

            <div className="flex flex-col justify-start items-end w-full h-screen">
              <div className="w-10/12 mb-5">
                <Header />
              </div>

              <div className="w-[83.5%] h-full">{children}</div>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </ProtectedRoute>
  );
}
