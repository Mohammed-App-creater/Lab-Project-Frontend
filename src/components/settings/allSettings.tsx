"use client";

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useSettingStore } from '@/Store/settingstore'
import { useMutation } from '@tanstack/react-query'

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const setting = useSettingStore((state) => state.setting)
  const setSetting = useSettingStore((state) => state.setSetting)

  const [addEvents, setAddEvents] = useState(false)
  const [phonePublic, setPhonePublic] = useState(false)

  
  useEffect(() => {
    if (setting) {
      setAddEvents(setting.authUpdateCalendar ?? false)
      setPhonePublic(setting.phonePublic ?? false)
      if (setting.theme) {
        setTheme(setting.theme.toLowerCase()) 
      }
    }
  }, [setting, setTheme])

  const mutation = useMutation({
    mutationFn: async (updates: Partial<typeof setting>) => {
      const res = await fetch(
        'https://csec-lab-portal-backend.onrender.com/api/user/users/355569f7-0930-4146-bfbf-b5644dc77427/settings',
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updates),
        }
      )
      if (!res.ok) throw new Error('Failed to update setting')
      return res.json()
    },
    onSuccess: (data) => {
      setSetting(data)
      if (data.theme) setTheme(data.theme.toLowerCase())
    },
  })

  const toTitleCase = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()

  const handleThemeChange = (value: string) => {
    const formatted = toTitleCase(value)
    if (formatted === "Light" || formatted === "Dark") {
      mutation.mutate({ theme: formatted })
    }
  }

  const handleAddEventsToggle = (checked: boolean) => {
    setAddEvents(checked)
    mutation.mutate({ authUpdateCalendar: checked })
  }

  const handlePhonePublicToggle = (checked: boolean) => {
    setPhonePublic(checked)
    mutation.mutate({ phonePublic: checked })
  }

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
