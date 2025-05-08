"use client";
import React, { useState } from "react";
import SidebarItem from "./sidebar.item";
import { Card } from "@/components/ui/card";
import DarkLight from "./dark.light";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarCardProps {
  isOpen: boolean
}

function SidebarCard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="h-10 w-10">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-[280px]">
            <div className="flex min-h-screen w-full">
              <Card className="w-full flex flex-col justify-between bg-[#34495E0D]">
                <SidebarItem onClose={() => setIsOpen(false)} />
                <DarkLight />
              </Card>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex min-h-screen w-full p-2 sm:p-4">
        <Card className="w-full p-5 sm:p-4 flex flex-col justify-between bg-[#34495E0D]">
          <SidebarItem />
          <DarkLight />
        </Card>
      </div>
    </>
  );
}

