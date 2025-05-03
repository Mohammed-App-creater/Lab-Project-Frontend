// store/useSettingStore.ts
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type Setting = {
  id: string
  theme: 'Light' | 'Dark'
  phonePublic: boolean
  authUpdateCalendar: boolean
  userId: string
}

type SettingStore = {
  setting: Setting | null
  setSetting: (data: Setting) => void
  clearSetting: () => void
}

export const useSettingStore = create<SettingStore>()(
  persist(
    (set) => ({
      setting: null,
      setSetting: (data) => set({ setting: data }),
      clearSetting: () => set({ setting: null }),
    }),
    {
      name: 'setting-storage',
      storage: createJSONStorage(() => localStorage), // ✅ Fix here
    }
  )
)
