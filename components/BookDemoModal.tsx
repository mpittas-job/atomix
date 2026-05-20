"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, X } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const ROLE_OPTIONS = [
  "Lender",
  "Borrower",
  "Capital provider",
  "Solicitor",
  "Broker / Referrer",
  "Other",
] as const;

const COUNTRIES = [
  { code: "gb", dial: "+44", name: "United Kingdom" },
  { code: "us", dial: "+1", name: "United States" },
  { code: "ie", dial: "+353", name: "Ireland" },
  { code: "de", dial: "+49", name: "Germany" },
  { code: "fr", dial: "+33", name: "France" },
  { code: "es", dial: "+34", name: "Spain" },
  { code: "it", dial: "+39", name: "Italy" },
  { code: "nl", dial: "+31", name: "Netherlands" },
  { code: "au", dial: "+61", name: "Australia" },
  { code: "ca", dial: "+1", name: "Canada" },
  { code: "sg", dial: "+65", name: "Singapore" },
  { code: "ae", dial: "+971", name: "United Arab Emirates" },
] as const;

type Country = (typeof COUNTRIES)[number];

interface BookDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function RequiredLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-2 block text-sm font-medium text-gray-900">
      {children}
      <span className="text-red-500"> *</span>
    </label>
  );
}

function OptionalLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-2 block text-sm font-medium text-gray-900">
      {children}
    </label>
  );
}

function FlagIcon({ code, size = "md" }: { code: string; size?: "sm" | "md" }) {
  const sizeClass = size === "sm" ? "text-base" : "text-xl";

  return (
    <span
      className={`fi fi-${code} fis shrink-0 overflow-hidden rounded-full ${sizeClass}`}
      aria-hidden="true"
    />
  );
}

const inputClassName =
  "w-full rounded-lg border border-[#D9DEE2] bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#24A9C8] focus:outline-none focus:ring-2 focus:ring-[#24A9C8]/20";

export default function BookDemoModal({ isOpen, onClose }: BookDemoModalProps) {
  const [mounted, setMounted] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]);
  const [countryMenuOpen, setCountryMenuOpen] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const countryMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClose = useCallback(() => {
    if (!backdropRef.current || !modalRef.current) {
      onClose();
      return;
    }

    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
    });
    gsap.to(modalRef.current, {
      opacity: 0,
      y: 12,
      scale: 0.98,
      duration: 0.2,
      ease: "power2.in",
      onComplete: onClose,
    });
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleClose]);

  useEffect(() => {
    if (!countryMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        countryMenuRef.current &&
        !countryMenuRef.current.contains(event.target as Node)
      ) {
        setCountryMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [countryMenuOpen]);

  useGSAP(
    () => {
      if (!isOpen || !backdropRef.current || !modalRef.current) return;

      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: "power2.out" },
      );
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, y: 24, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "power2.out" },
      );
    },
    { dependencies: [isOpen], scope: overlayRef },
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleClose();
  };

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="book-demo-title"
    >
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-black/45"
        onClick={handleClose}
        aria-hidden="true"
      />

      <div
        ref={modalRef}
        className="relative z-10 max-h-[90vh] w-full max-w-[540px] overflow-y-auto rounded-3xl bg-white p-8 shadow-[0_24px_80px_rgba(0,0,0,0.18)]"
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2
              id="book-demo-title"
              className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-[2rem]"
            >
              Book a demo
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-gray-600 sm:text-[15px]">
              See how Atomix enables faster, more efficient lending through
              automation, real-time visibility, and a unified platform.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="shrink-0 rounded-full p-1 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <RequiredLabel>Name</RequiredLabel>
              <input
                type="text"
                name="name"
                required
                placeholder="Enter your full name"
                className={inputClassName}
              />
            </div>

            <div>
              <RequiredLabel>Company</RequiredLabel>
              <input
                type="text"
                name="company"
                required
                placeholder="Enter your company name"
                className={inputClassName}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <RequiredLabel>Email</RequiredLabel>
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email address"
                className={inputClassName}
              />
            </div>

            <div>
              <OptionalLabel>Phone (optional)</OptionalLabel>
              <div className="flex overflow-hidden rounded-lg border border-[#D9DEE2] focus-within:border-[#24A9C8] focus-within:ring-2 focus-within:ring-[#24A9C8]/20">
                <div ref={countryMenuRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setCountryMenuOpen((open) => !open)}
                    className="flex h-full items-center gap-1.5 border-r border-[#D9DEE2] bg-white px-3 py-3 text-sm text-gray-700"
                    aria-label="Select country code"
                    aria-expanded={countryMenuOpen}
                  >
                    <FlagIcon code={selectedCountry.code} />
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </button>

                  {countryMenuOpen && (
                    <div className="absolute left-0 top-[calc(100%+4px)] z-20 max-h-56 w-56 overflow-y-auto rounded-lg border border-[#D9DEE2] bg-white py-1 shadow-lg">
                      {COUNTRIES.map((country) => (
                        <button
                          key={country.code}
                          type="button"
                          onClick={() => {
                            setSelectedCountry(country);
                            setCountryMenuOpen(false);
                          }}
                          className="flex w-full items-center gap-3 px-3 py-2 text-left text-sm text-gray-800 hover:bg-gray-50"
                        >
                          <FlagIcon code={country.code} size="sm" />
                          <span className="flex-1">{country.name}</span>
                          <span className="text-gray-500">{country.dial}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <input
                  type="tel"
                  name="phone"
                  placeholder={selectedCountry.dial}
                  className="min-w-0 flex-1 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <RequiredLabel>I am a...</RequiredLabel>
            <div className="relative">
              <select
                name="role"
                required
                defaultValue=""
                className={`${inputClassName} appearance-none pr-10`}
              >
                <option value="" disabled>
                  Select
                </option>
                {ROLE_OPTIONS.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          <div>
            <RequiredLabel>LinkedIn</RequiredLabel>
            <div className="flex overflow-hidden rounded-lg border border-[#D9DEE2] focus-within:border-[#24A9C8] focus-within:ring-2 focus-within:ring-[#24A9C8]/20">
              <div className="flex items-center border-r border-[#D9DEE2] bg-white px-3">
                <FaLinkedin className="h-5 w-5 text-[#0A66C2]" />
              </div>
              <input
                type="url"
                name="linkedin"
                required
                placeholder="https://"
                className="min-w-0 flex-1 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <OptionalLabel>Message (optional)</OptionalLabel>
            <textarea
              name="message"
              rows={4}
              placeholder="Tell us a bit about your interest"
              className={`${inputClassName} resize-none`}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-[#24A9C8] py-4 text-base font-semibold text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#24A9C8] focus:ring-offset-2"
          >
            Book a demo
          </button>
        </form>
      </div>
    </div>,
    document.body,
  );
}
