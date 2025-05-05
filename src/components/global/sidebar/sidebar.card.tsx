"use client";
import React, { useState } from "react";
import SidebarItem from "./sidebar.item";
import { Card } from "@/components/ui/card";
import DarkLight from "./dark.light";
import { Menu } from "lucide-react";

interface SidebarCardProps {
  isOpen: boolean
}

export default function SidebarCard({ isOpen }: SidebarCardProps) {

  return (
<div
  className={`flex inset-y-0 left-0 transform transition-transform md:fixed md:translate-x-0
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
    ${isOpen ? "w-16 md:w-64" : "w-0"}
    p-2 md:p-4`}
>

  {/* Sidebar Card - visible on desktop or when open on mobile */}
  <Card
  className={` w-16 md:w-64 h-full flex flex-col bg-[#34495E0D] justify-between transition-all duration-300
    ${isOpen ? "flex" : "hidden"} 
    md:flex p-2 md:p-4`}
>

    {/* Sidebar contents only visible if open OR on desktop */}
    <SidebarItem />
  </Card>
</div>

  );
}

