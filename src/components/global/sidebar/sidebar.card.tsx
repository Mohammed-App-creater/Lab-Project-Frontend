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
      {/* Desktop Sidebar */}
      <div className="min-h-screen w-full">
        <Card className="w-full sm:p-4 flex flex-col justify-between bg-[#34495E0D]">
          <SidebarItem onClose={onClose} />
          <DarkLight />
        </Card>
      </div>
    </>
  );
}

export default SidebarCard;
