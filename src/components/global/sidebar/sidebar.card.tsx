"use client";
import React, { useState } from "react";
import SidebarItem from "./sidebar.item";
import { Card } from "@/components/ui/card";
import DarkLight from "./dark.light";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarCardProps {
  onClose?: () => void;
}

function SidebarCard({ onClose }: SidebarCardProps) {
  return (
    <>
      {/* Desktop Sidebar - visible from 768px and up */}
      <div className="hidden md:!block min-h-screen w-full">
        <Card className="w-full flex flex-col justify-between bg-[#34495E0D] min-h-screen rounded-none border-r shadow-sm">
          <div className="flex-1 overflow-y-auto py-2">
            <SidebarItem onClose={onClose} />
          </div>
          <div className="mt-auto border-t border-gray-200 dark:border-gray-800">
            <DarkLight />
          </div>
        </Card>
      </div>
    </>
  );
}

export default SidebarCard;
