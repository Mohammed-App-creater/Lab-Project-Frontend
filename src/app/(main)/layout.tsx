"use client";

import SidebarCard from "@/components/global/sidebar/sidebar.card";
import Header from "@/components/global/header/header";
import ProtectedRoute from "@/components/protectedRoute";
import { Suspense, useState } from "react";
import { LoadingSpinner } from "@/components/global/login/loading";
import { Sheet,  SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col md:flex-row">
        {/* Mobile Sidebar Menu Button */}
        <div className="md:hidden fixed top-4 left-4 z-50">
          <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-10 w-10 bg-background/80 backdrop-blur-sm hover:bg-accent/50 transition-all duration-200 shadow-sm border border-border/50 hover:border-border/80 hover:shadow-md"
              >
                <Menu className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="left" 
              className="p-0 w-[280px] border-r border-border bg-background/95 backdrop-blur-sm"
            >
              <SidebarCard onClose={() => setIsSidebarOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden md:block pt-3 pl-4 w-1/6 h-screen sticky top-0">
          <SidebarCard />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-h-screen flex flex-col transition-all duration-300">
          {/* Header */}
          <div className="md:hidden h-16" /> {/* Spacer for mobile header */}
          <Header />

          {/* Main Content Area */}
          <main className="flex-1 p-2 md:p-3 lg:p-4">
            <Suspense fallback={<LoadingSpinner fullPage={true} />}>
              {children}
            </Suspense>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
