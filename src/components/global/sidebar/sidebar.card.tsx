"use client";
import React from "react";
import SidebarItem from "./sidebar.item";
import { Card } from "@/components/ui/card";

interface SidebarCardProps {
  isOpen: boolean
}

export default function SidebarCard({ isOpen }: SidebarCardProps) {
  return (
    <Card className="h-screen w-full flex flex-col bg-background border-r">
      <div className="flex-1 overflow-y-auto p-4">
        <SidebarItem />
      </div>
    </Card>
  );
}

