"use client";

import SidebarCard from "@/components/global/sidebar/sidebar.card";
import Header from "@/components/global/header/header";
import { ThemeProvider } from "next-themes";
import ProtectedRoute from "@/components/protectedRoute";
import { Suspense, useState } from "react";
import { LoadingSpinner } from "@/components/global/login/loading";
import { Sheet, SheetContent } from "@/components/ui/sheet";

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
        <div className="min-h-screen flex flex-col md:flex-row">
          {/* Mobile Sidebar */}
          <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <SheetContent side="left" className="p-0 w-72">
              <SidebarCard isOpen={true} />
            </SheetContent>
          </Sheet>

          {/* Desktop Sidebar */}
          <div className="hidden md:block pt-3 pl-3">
            <SidebarCard isOpen={true} />
          </div>

          {/* Main Content */}
          <div className="flex-1 min-h-screen flex flex-col transition-all duration-300">
            {/* Header */}
              <Header onMenuClick={toggleSidebar} />


            {/* Main Content Area */}
            <main className="flex-1 p-2 md:p-3 lg:p-4">
              <Suspense fallback={<LoadingSpinner fullPage={true} />}>
                {children}
              </Suspense>
            </main>
          </div>
        </div>
      </ThemeProvider>
    </ProtectedRoute>
  );
}
