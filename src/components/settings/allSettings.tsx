"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [addEvents, setAddEvents] = useState(true);
  const [phonePublic, setPhonePublic] = useState(true);

  const handleThemeChange = (value: string) => {
    setTheme(value);
  };

  const handleAddEventsToggle = (checked: boolean) => {
    setAddEvents(checked);
  };

  const handlePhonePublicToggle = (checked: boolean) => {
    setPhonePublic(checked);
  };

  return (
    <div className="w-full flex justify-center px-2 sm:px-4 py-4">
      <div className="w-full max-w-lg bg-white dark:bg-[#1a1a1a] rounded-lg shadow border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h2 className="text-lg font-medium">Appearance</h2>
              <p className="text-sm text-[#A2A1A8] dark:text-gray-400">
                Customize how your theme looks on your device
              </p>
            </div>
            <Select value={theme} onValueChange={handleThemeChange}>
              <SelectTrigger className="w-28 bg-[#A2A1A81A] dark:bg-[#333]">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <hr className="border-gray-300 dark:border-gray-600" />
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h2 className="text-lg font-medium">Automatically Add Events to Calendar</h2>
              <p className="text-sm text-[#A2A1A8] dark:text-gray-400">
                Save time by auto-adding events to your calendar, or manually enter them for more control.
              </p>
            </div>
            <Switch
              checked={addEvents}
              onCheckedChange={handleAddEventsToggle}
              className="data-[state=checked]:bg-green-500"
            />
          </div>

          <hr className="border-gray-300 dark:border-gray-600" />

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h2 className="text-lg font-medium">Make your Phone Public</h2>
              <p className="text-sm text-[#A2A1A8] dark:text-gray-400">
                Keep your phone private for safety, or share it for convenience.
              </p>
            </div>
            <Switch
              checked={phonePublic}
              onCheckedChange={handlePhonePublicToggle}
              className="data-[state=checked]:bg-green-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
