"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  phone: string | null;
  name: string | null;
  verified: boolean;
  otpSent: boolean;
  pendingPhone: string | null;
  sendOtp: (phone: string) => void;
  verifyOtp: (otp: string) => boolean;
  setName: (name: string) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      phone: null,
      name: null,
      verified: false,
      otpSent: false,
      pendingPhone: null,
      sendOtp: (phone) => {
        const cleaned = phone.replace(/\D/g, "").slice(-10);
        if (cleaned.length !== 10) return;
        set({ otpSent: true, pendingPhone: cleaned });
      },
      verifyOtp: (otp) => {
        // Demo: any 4+ digit OTP works
        if (otp.replace(/\D/g, "").length < 4) return false;
        const phone = get().pendingPhone;
        if (!phone) return false;
        set({
          verified: true,
          phone,
          otpSent: false,
          pendingPhone: null,
          name: get().name || "Thaaza customer",
        });
        return true;
      },
      setName: (name) => set({ name }),
      logout: () =>
        set({
          phone: null,
          name: null,
          verified: false,
          otpSent: false,
          pendingPhone: null,
        }),
    }),
    { name: "thaaza-auth-v1" }
  )
);
