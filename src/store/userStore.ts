import { create } from "zustand";
import axios from "axios";

const BASE_URL = "https://csec-lab-portal-backend.onrender.com";

interface SocialLink {
  id: string;
  userId: string;
  socialLinkName: string;
  socialLinkUrl: string;
  updatedAt: string;
  platform: string;
  url: string;
}

interface ResourceLink {
  id: string;
  userId: string;
  resourceLinkName: string;
  resourceLinkUrl: string;
  updatedAt: string;
}

interface UserProfile {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  email: string;
  phone_number: string;
  telegramUserName: string;
  bio: string;
  berthDate: string;
  profileImageUrl: string;
  clubStatus: string;
  specialty: string;
  cvUrl: string;
  lastSeen: string;
  role: string;
  socialLinks: SocialLink[];
  resourceLinks: ResourceLink[];
  name: string;
}

interface UserStore {
  token: string | null;
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string, remember: boolean) => Promise<void>;
  logout: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  token: null,
  user: null,
  loading: false,
  error: null,

  login: async (email, password, remember) => {
    set({ loading: true, error: null });

    try {
      // Step 1: Login
      const loginRes = await axios.post(`${BASE_URL}/api/auth/login`, {
        email,
        password,
        remember,
      });

      const { token, user } = loginRes.data;

      // Step 2: Fetch full profile using userId
      const profileRes = await axios.post(
        `${BASE_URL}/api/user/userProfile`,
        { userId: user.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      set({
        token,
        user: profileRes.data,
        loading: false,
      });

      // Optional: persist token if remember is true
      if (remember) {
        localStorage.setItem("token", token);
      }
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Login failed",
        loading: false,
      });
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({
      token: null,
      user: null,
    });
  },
}));
