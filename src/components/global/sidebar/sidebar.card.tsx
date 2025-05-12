"use client";
import React from "react";
import SidebarItem from "./sidebar.item";
import { Card } from "@/components/ui/card";
import DarkLight from "./dark.light";

interface SidebarCardProps {
  onClose?: () => void;
}

function SidebarCard({ onClose }: SidebarCardProps) {
  return (
    <Card className="w-full md:h-screen flex flex-col justify-between bg-[#34495E0D] rounded-xl border-r shadow-sm">
      <div className="flex-1 overflow-y-auto py-2 px-3">
        <SidebarItem onClose={onClose} />
      </div>
      <div className="mt-auto border-t border-gray-200 dark:border-gray-800">
        <DarkLight />
      </div>
    </Card>
  );
}

export default SidebarCard;
