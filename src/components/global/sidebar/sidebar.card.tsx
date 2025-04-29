import React from "react";
import SidebarItem from "./sidebar.item";
import { Card } from "@/components/ui/card";
import DarkLight from "./dark.light";

function SidebarCard() {
  return (
    <div className="flex min-h-screen w-full p-6   ">
      <Card className="w-full  p-4 md:flex flex-col justify-between ">
        <SidebarItem />
        <DarkLight />
      </Card>
    </div>
  );
}
export default SidebarCard;
