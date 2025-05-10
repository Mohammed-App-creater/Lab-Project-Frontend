"use client";

import SidebarCard from "@/components/global/sidebar/sidebar.card";
import Header from "@/components/global/header/header";
import { ThemeProvider } from "next-themes";
import ProtectedRoute from "@/components/protectedRoute";
import { Suspense, useState } from "react";
import { LoadingSpinner } from "@/components/global/login/loading";
import { Sheet,  SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <ProtectedRoute>
      <ThemeProvider attribute="class">
        <div className="min-h-screen flex flex-col md:flex-row">

          {/* Mobile Sidebar Menu Button */}
            <div className="md:hidden fixed top-4 left-4 z-50">
              <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="h-10 w-10">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <div>
                <SidebarCard />
                </div>
              </Sheet>
            </div>

          {/* Desktop Sidebar */}
          <div className="hidden md:block pt-3 pl-4 w-1/6 ">
            <SidebarCard />
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
