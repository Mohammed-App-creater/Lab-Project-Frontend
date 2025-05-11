// stores/useUserStore.ts
import { create } from "zustand";
import { user } from "@/types/user";

type User = user; // Replace with your actual User type

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

// stores/useProfileUIStore.ts
interface ProfileUIState {
  activeTab: string;
  isEditing: boolean;
  setActiveTab: (tab: string) => void;
  toggleEditing: () => void;
}

export const useProfileUIStore = create<ProfileUIState>((set) => ({
  activeTab: "required",
  isEditing: false,
  setActiveTab: (tab) => set({ activeTab: tab }),
  toggleEditing: () => set((state) => ({ isEditing: !state.isEditing })),
}));
