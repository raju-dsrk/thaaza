"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/store/auth";

export default function AccountPage() {
  const {
    verified,
    phone,
    name,
    otpSent,
    sendOtp,
    verifyOtp,
    setName,
    logout,
  } = useAuth();
  const [phoneInput, setPhoneInput] = useState("");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [nameInput, setNameInput] = useState(name || "");

  if (verified && phone) {
    return (
      <div className="mx-auto max-w-md px-4 py-12">
        <h1
          className="text-3xl text-charcoal"
          style={{ fontFamily: "var(--font-display), serif" }}
        >
          Your account
        </h1>
        <p className="mt-2 text-sm text-muted">
          Mock login — browsing works without signing in.
        </p>
        <div className="mt-6 space-y-4 rounded-2xl border border-border bg-white p-5 shadow-sm">
          <div>
            <label className="text-sm font-medium">Display name</label>
            <input
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onBlur={() => setName(nameInput.trim() || "Thaaazaa customer")}
              className="mt-1.5 w-full rounded-xl border border-border bg-cream px-3 py-3 text-sm outline-none focus:border-burgundy"
            />
          </div>
          <p className="text-sm">
            <span className="text-muted">Mobile · </span>
            <span className="font-medium">+91 {phone}</span>
          </p>
          <p className="rounded-xl bg-sage/10 px-3 py-2 text-xs text-sage">
            Verified via demo OTP (any 4+ digits). No SMS was sent.
          </p>
          <button
            type="button"
            onClick={logout}
            className="w-full rounded-xl border border-border py-3 text-sm font-semibold text-burgundy"
          >
            Log out
          </button>
        </div>
        <div className="mt-6 flex flex-col gap-2 text-sm">
          <Link href="/cart" className="font-medium text-burgundy">
            View cart →
          </Link>
          <Link href="/stores" className="font-medium text-burgundy">
            Find stores →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1
        className="text-3xl text-charcoal"
        style={{ fontFamily: "var(--font-display), serif" }}
      >
        Account
      </h1>
      <p className="mt-2 text-sm text-muted">
        Optional mock OTP login. You can browse and checkout without signing in.
      </p>

      <div className="mt-6 rounded-2xl border border-border bg-white p-5 shadow-sm">
        {!otpSent ? (
          <>
            <label className="text-sm font-medium">Mobile number</label>
            <input
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
              inputMode="tel"
              placeholder="10-digit Indian mobile"
              className="mt-1.5 w-full rounded-xl border border-border bg-cream px-3 py-3 text-sm outline-none focus:border-burgundy"
            />
            <button
              type="button"
              onClick={() => sendOtp(phoneInput)}
              className="mt-4 flex min-h-12 w-full items-center justify-center rounded-xl bg-burgundy font-semibold text-cream"
            >
              Send demo OTP
            </button>
          </>
        ) : (
          <>
            <p className="text-sm text-muted">
              Enter any 4+ digit code (demo). No real SMS.
            </p>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              inputMode="numeric"
              placeholder="OTP"
              className="mt-3 w-full rounded-xl border border-border bg-cream px-3 py-3 text-sm outline-none focus:border-burgundy"
            />
            {otpError && (
              <p className="mt-2 text-sm text-burgundy">{otpError}</p>
            )}
            <button
              type="button"
              onClick={() => {
                const ok = verifyOtp(otp);
                if (!ok) setOtpError("Enter at least 4 digits.");
              }}
              className="mt-4 flex min-h-12 w-full items-center justify-center rounded-xl bg-burgundy font-semibold text-cream"
            >
              Verify & continue
            </button>
          </>
        )}
      </div>

      <Link
        href="/shop"
        className="mt-6 inline-block text-sm font-semibold text-burgundy"
      >
        Skip — continue shopping →
      </Link>
    </div>
  );
}
