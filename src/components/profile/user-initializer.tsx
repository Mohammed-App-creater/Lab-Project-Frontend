// components/member/user-initializer.tsx
"use client";

import { useEffect } from "react";
import { fetchUserProfile } from "@/api/user";
import { useUserStore } from "@/store/userprofileStore";
import { user } from "@/types/user";

export const UserInitializer = ({ userId }: { userId: string }) => {
  const setUser = useUserStore((state) => state.setUser);
  
  useEffect(() => {
    const init = async () => {
      try {
        const user: user = await fetchUserProfile(userId);
        setUser(user);
      } catch (err) {
        console.error("Failed to fetch user profile", err);
      }
    };
    init();
  }, [setUser, userId]); // if it get in loop remove setUser from the dependency array

  return null;
};
