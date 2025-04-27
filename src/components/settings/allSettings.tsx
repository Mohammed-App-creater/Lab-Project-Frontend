// "use client";

// import { useState, useEffect } from "react";
// import { useTheme } from "next-themes";
// import { Switch } from "@/components/ui/switch";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// export default function SettingsPage() {
//   const { theme, setTheme } = useTheme();
//   const [addEvents, setAddEvents] = useState(true);
//   const [phonePublic, setPhonePublic] = useState(true);
//   const [loading, setLoading] = useState(true);
//   const [mounted, setMounted] = useState(false);

//   const userId = "192de509-4940-4af1-a407-fed9b417b5fe";

//   useEffect(() => {
//     async function fetchSettings() {
//       try {
//         const res = await fetch(`/api/user/users/${userId}/settings`, { 
//           cache: "no-store" 
//         });

//         if (!res.ok) {
//           throw new Error(`Failed to fetch settings: ${res.status}`);
//         }

//         const data = await res.json();
//         setAddEvents(data.authUpdateCalendar);
//         setPhonePublic(data.phonePublic);
//         setTheme(data.theme.toLowerCase());
//       } catch (error) {
//         console.error("Failed to load settings", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchSettings();
//   }, [setTheme, userId]);

//   async function updateSettings(updated: Partial<{ 
//     addEvents: boolean; 
//     phonePublic: boolean; 
//     theme: string 
//   }>) {
//     try {
//       const payload = {
//         theme: updated.theme ? updated.theme.toUpperCase() : undefined,
//         phonePublic: updated.phonePublic,
//         authUpdateCalendar: updated.addEvents,
//       };

//       const filteredPayload = Object.fromEntries(
//         Object.entries(payload).filter(([_, value]) => value !== undefined)
//       );

//       const res = await fetch(`/api/user/users/${userId}/settings`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(filteredPayload),
//       });

//       if (!res.ok) {
//         throw new Error(`Failed to update settings: ${res.status}`);
//       }
//     } catch (error) {
//       console.error("Failed to update settings", error);
//     }
//   }

//   const handleThemeChange = (value: string) => {
//     setTheme(value);
//     updateSettings({ theme: value });
//   };

//   const handleAddEventsToggle = (checked: boolean) => {
//     setAddEvents(checked);
//     updateSettings({ addEvents: checked });
//   };

//   const handlePhonePublicToggle = (checked: boolean) => {
//     setPhonePublic(checked);
//     updateSettings({ phonePublic: checked });
//   };

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (loading) return <div className="p-4">Loading settings...</div>;
//   if (!mounted) return null;

//   return (
//     <div className="flex h-[350px] border-1 bg-white dark:bg-[#1a1a1a] rounded-sm ml-5 mt-1 text-black dark:text-white">
//       <div className="flex-1">
//         <div className="max-w-5xl rounded-lg">
//           <div className="rounded-lg p-4">
//             <div className="flex justify-between items-center">
//               <div>
//                 <h2 className="text-lg font-medium">Appearance</h2>
//                 <p className="text-sm text-[#A2A1A8] dark:text-gray-400">
//                   Customize how your theme looks on your device
//                 </p>
//               </div>
//               <Select value={theme} onValueChange={handleThemeChange}>
//                 <SelectTrigger className="w-25 bg-[#A2A1A81A] dark:bg-[#333]">
//                   <SelectValue placeholder="Theme" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="light">Light</SelectItem>
//                   <SelectItem value="dark">Dark</SelectItem>
//                   <SelectItem value="system">System</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           <hr className="border-gray-300 dark:border-gray-600" />

//           <div className="flex justify-between items-center p-4">
//             <div>
//               <h2 className="text-lg font-medium">Automatically Add Events to Calendar</h2>
//               <p className="text-sm text-[#A2A1A8] dark:text-gray-400">
//                 Save time by auto-adding events to your calendar, or manually enter them for more control.
//               </p>
//             </div>
//             <Switch
//               checked={addEvents}
//               onCheckedChange={handleAddEventsToggle}
//               className="data-[state=checked]:bg-green-500"
//             />
//           </div>

//           <hr className="border-gray-300 dark:border-gray-600" />

//           <div className="p-4 mb-4">
//             <div className="flex justify-between items-center">
//               <div>
//                 <h2 className="text-lg font-medium">Make your Phone Public</h2>
//                 <p className="text-sm text-[#A2A1A8] dark:text-gray-400">
//                   Keep your phone private for safety, or share it for convenience.
//                 </p>
//               </div>
//               <Switch
//                 checked={phonePublic}
//                 onCheckedChange={handlePhonePublicToggle}
//                 className="data-[state=checked]:bg-green-500"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
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
    <div className="flex min-h-[350px] border bg-white dark:bg-[#1a1a1a] rounded-sm ml-5 mt-1 text-black dark:text-white">
      <div className="flex-1">
        <div className="max-w-5xl rounded-lg">
          <div className="rounded-lg p-4">
            <div className="flex justify-between items-center">
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
          </div>

          <hr className="border-gray-300 dark:border-gray-600" />
          <div className="flex justify-between items-center p-4">
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

          <div className="p-4 mb-4">
            <div className="flex justify-between items-center">
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
    </div>
  );
}
