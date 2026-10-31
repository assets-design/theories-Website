"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useContactPopup } from "@/components/contact/ContactPopupContext";
import { ScrollLink } from "@/components/layout/ScrollLink";

const navLinks = [
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Agency", href: "/agency" },
] as const;

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="8"
      viewBox="0 0 12 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`h-[clamp(7px,0.5vw,10px)] w-[clamp(10px,0.73vw,14px)] shrink-0 transition-transform duration-200 ${
        open ? "rotate-180" : ""
      }`}
      aria-hidden
    >
      <path
        d="M1 1.5L6 6.5L11 1.5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BusinessDesignDropdown({
  open,
  menuId,
  onNavigate,
}: {
  open: boolean;
  menuId: string;
  onNavigate: () => void;
}) {
  return (
    <div
      id={menuId}
      role="menu"
      aria-hidden={!open}
      className={`absolute top-full z-50 w-[clamp(340px,35.83vw,688px)] transition duration-200 ${
        open
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-1 opacity-0"
      }`}
      style={{
        // Align dropdown right edge with header pill right edge (offset header padding)
        right: "calc(-1 * clamp(1.25rem, 3.125vw, 3.75rem))",
        // Invisible hover bridge so the 10px gap doesn't close the menu
        paddingTop: "20px",
      }}
    >
      <div
        className="grid h-full grid-cols-2 rounded-none bg-white shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
        style={{
          minHeight: "clamp(280px, 19.06vw, 366px)",
          columnGap: "clamp(24px, 4.43vw, 85px)",
          padding: "clamp(20px, 1.56vw, 30px)",
        }}
      >
        {/* Theories column */}
        <div className="flex flex-col" role="none">
          <h3
            className="text-black"
            style={{
              fontFamily: '"Power Grotesk", sans-serif',
              fontSize: "clamp(1.75rem, 2.29vw, 2.75rem)",
              fontWeight: 400,
              lineHeight: 1.2,
            }}
          >
            Theories
          </h3>
          <p
            className="mt-[clamp(12px,0.78vw,15px)]"
            style={{
              fontFamily: '"Poppins", sans-serif',
              fontSize: "clamp(0.75rem, 0.83vw, 1rem)",
              fontWeight: 400,
              lineHeight: 1.445,
              color: "rgba(0, 0, 0, 0.6)",
              maxWidth: "272px",
            }}
          >
            Growth strategy, branding, digital experiences, AI automation, and
            performance marketing that help ambitious businesses scale with
            measurable results.
          </p>
          <ScrollLink
            href="/"
            role="menuitem"
            onClick={onNavigate}
            className="mt-auto inline-flex items-center justify-center bg-black text-white capitalize"
            style={{
              fontFamily: '"Poppins", sans-serif',
              fontSize: "clamp(0.875rem, 1.04vw, 1.25rem)",
              fontWeight: 400,
              lineHeight: 1.445,
              height: "clamp(44px, 3.07vw, 59px)",
              width: "clamp(140px, 10.16vw, 195px)",
              borderRadius: "clamp(28px, 3.125vw, 60px)",
              marginTop: "clamp(24px, 1.77vw, 34px)",
            }}
          >
            Your Are Here
          </ScrollLink>
        </div>

        {/* Mediverse column */}
        <div className="flex flex-col" role="none">
          <h3
            className="text-black"
            style={{
              fontFamily: '"Power Grotesk", sans-serif',
              fontSize: "clamp(1.75rem, 2.29vw, 2.75rem)",
              fontWeight: 400,
              lineHeight: 1.2,
            }}
          >
            Mediverse
          </h3>
          <p
            className="mt-[clamp(12px,0.78vw,15px)]"
            style={{
              fontFamily: '"Poppins", sans-serif',
              fontSize: "clamp(0.75rem, 0.83vw, 1rem)",
              fontWeight: 400,
              lineHeight: 1.445,
              color: "rgba(0, 0, 0, 0.6)",
              maxWidth: "252px",
            }}
          >
            AI-powered solutions for hospitals, clinics, and doctors—streamlining
            patient journeys, operations, appointments, and healthcare growth.
          </p>
          <a
            href="https://mediversemarketing.com/"
            target="_blank"
            rel="noopener noreferrer"
            role="menuitem"
            onClick={onNavigate}
            className="bg-brand-gradient mt-auto inline-flex items-center justify-center text-white capitalize"
            style={{
              fontFamily: '"Poppins", sans-serif',
              fontSize: "clamp(0.875rem, 1.04vw, 1.25rem)",
              fontWeight: 400,
              lineHeight: 1.445,
              height: "clamp(44px, 3.07vw, 59px)",
              width: "clamp(170px, 12.45vw, 239px)",
              borderRadius: "clamp(28px, 3.125vw, 60px)",
              marginTop: "clamp(24px, 1.77vw, 34px)",
            }}
          >
            Explore Mediverse
          </a>
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const { open: openContact } = useContactPopup();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bdOpen, setBdOpen] = useState(false);
  const bdMenuId = useId();
  const bdWrapRef = useRef<HTMLDivElement>(null);
  const mobileBdToggleRef = useRef<HTMLButtonElement>(null);
  const mobileBdPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bdOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setBdOpen(false);
    };
    const onPointer = (event: MouseEvent) => {
      const target = event.target as Node;
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

      // Desktop: unchanged — close when clicking outside the desktop CTA wrap
      if (isDesktop) {
        if (!bdWrapRef.current?.contains(target)) setBdOpen(false);
        return;
      }

      // Mobile/tablet: ignore the toggle button so one click can open and one click can close
      if (mobileBdToggleRef.current?.contains(target)) return;
      if (mobileBdPanelRef.current?.contains(target)) return;
      setBdOpen(false);
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onPointer);
    };
  }, [bdOpen]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-[clamp(12px,1.56vw,30px)] z-50">
      <div className="pointer-events-auto mx-auto flex w-full max-w-[1920px] justify-center px-4 lg:px-[clamp(1rem,6.875vw,16.25rem)]">
        <div className="relative flex h-14 w-full max-w-[clamp(920px,72.7vw,1396px)] items-center justify-between gap-3 rounded-[clamp(28px,2.19vw,42px)] border-[0.5px] border-white bg-[rgba(104,104,102,0.2)] px-4 backdrop-blur-[12px] lg:h-[clamp(56px,4.375vw,84px)] lg:gap-0 lg:px-[clamp(1.25rem,3.125vw,3.75rem)]">
          <ScrollLink href="/" aria-label="Theories home" className="shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/brand/logo-header.svg"
              alt="Theories"
              width={220}
              height={25}
              className="h-[14px] w-auto lg:h-[clamp(16px,1.31vw,25px)]"
            />
          </ScrollLink>

          <div className="hidden items-center gap-[clamp(1.5rem,3.2vw,4rem)] lg:flex">
            <nav
              aria-label="Primary"
              className="flex items-center gap-[clamp(1.5rem,2.8vw,3.75rem)]"
            >
              {navLinks.map((link) => (
                <ScrollLink
                  key={link.href}
                  href={link.href}
                  className="text-nav whitespace-nowrap text-white hover:opacity-80"
                >
                  {link.label}
                </ScrollLink>
              ))}
            </nav>

            <div
              ref={bdWrapRef}
              className="relative"
              onMouseLeave={() => setBdOpen(false)}
            >
              <div className="relative flex h-[clamp(44px,3.07vw,59px)] w-[clamp(300px,23.5vw,451px)] shrink-0 items-center">
                {/* Figma 1720:4578 — white outline for the full CTA pill */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-[clamp(28px,3.125vw,60px)] border border-white"
                />
                {/* Figma Our Brands — overlaps left of outline so left white stroke is hidden */}
                <button
                  type="button"
                  aria-expanded={bdOpen}
                  aria-controls={bdMenuId}
                  aria-haspopup="true"
                  className="bg-brand-gradient text-cta relative z-10 inline-flex h-full w-[clamp(168px,13.07vw,251px)] shrink-0 items-center justify-center gap-[clamp(0.35rem,0.5vw,0.5rem)] rounded-[clamp(28px,3.125vw,60px)] border-0 capitalize text-white"
                  onMouseEnter={() => setBdOpen(true)}
                  onClick={() => setBdOpen((value) => !value)}
                >
                  Our Brands
                  <Chevron open={bdOpen} />
                </button>
                <button
                  type="button"
                  className="text-cta relative z-0 inline-flex h-full flex-1 items-center justify-center pl-[clamp(0.5rem,1vw,1rem)] pr-[clamp(1rem,1.56vw,1.875rem)] text-white hover:opacity-80"
                  onMouseEnter={() => setBdOpen(false)}
                  onClick={() => {
                    setBdOpen(false);
                    openContact();
                  }}
                >
                  Work With Us
                </button>
              </div>

              <BusinessDesignDropdown
                open={bdOpen}
                menuId={bdMenuId}
                onNavigate={() => setBdOpen(false)}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              ref={mobileBdToggleRef}
              type="button"
              className="bg-brand-gradient inline-flex h-9 shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-3 text-[12px] capitalize leading-none text-white"
              style={{ fontFamily: '"Poppins", sans-serif' }}
              aria-expanded={bdOpen}
              onClick={() => {
                setMobileOpen(false);
                setBdOpen((value) => !value);
              }}
            >
              Our Brands
              <Chevron open={bdOpen} />
            </button>
            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="inline-flex size-9 items-center justify-center border-0 bg-transparent text-white"
              onClick={() => {
                setBdOpen(false);
                setMobileOpen((value) => !value);
              }}
            >
              <span className="sr-only">Menu</span>
              <span className="flex flex-col gap-1.5">
                <span
                  className={`block h-0.5 w-5 bg-white transition ${
                    mobileOpen ? "translate-y-2 rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-5 bg-white transition ${
                    mobileOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-5 bg-white transition ${
                    mobileOpen ? "-translate-y-2 -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      {bdOpen ? (
        <div className="pointer-events-none mx-auto mt-3 flex w-full max-w-[1920px] justify-center px-4 md:justify-end lg:hidden">
          <div
            ref={mobileBdPanelRef}
            className="pointer-events-auto w-full max-w-lg rounded-none bg-white px-2.5 py-[15px] md:w-[min(100%,380px)]"
          >
            <div className="flex flex-col gap-4">
              <div>
                <h3
                  style={{
                    fontFamily: '"Power Grotesk", sans-serif',
                    fontSize: "18px",
                    color: "#000",
                  }}
                >
                  Theories
                </h3>
                <p
                  className="mt-1.5"
                  style={{
                    fontFamily: '"Poppins", sans-serif',
                    fontSize: "12px",
                    lineHeight: 1.445,
                    color: "rgba(0,0,0,0.6)",
                  }}
                >
                  Growth strategy, branding, digital experiences, AI automation, and
                  performance marketing that help ambitious businesses scale with
                  measurable results.
                </p>
                <ScrollLink
                  href="/"
                  onClick={() => setBdOpen(false)}
                  className="mt-2 inline-flex h-8 items-center justify-center rounded-full bg-black px-4 text-white"
                  style={{ fontFamily: '"Poppins", sans-serif', fontSize: "12px" }}
                >
                  Your Are Here
                </ScrollLink>
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: '"Power Grotesk", sans-serif',
                    fontSize: "18px",
                    color: "#000",
                  }}
                >
                  Mediverse
                </h3>
                <p
                  className="mt-1.5"
                  style={{
                    fontFamily: '"Poppins", sans-serif',
                    fontSize: "12px",
                    lineHeight: 1.445,
                    color: "rgba(0,0,0,0.6)",
                  }}
                >
                  AI-powered solutions for hospitals, clinics, and doctors—streamlining
                  patient journeys, operations, appointments, and healthcare growth.
                </p>
                <a
                  href="https://mediversemarketing.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setBdOpen(false)}
                  className="bg-brand-gradient mt-2 inline-flex h-8 items-center justify-center rounded-full px-4 text-white"
                  style={{ fontFamily: '"Poppins", sans-serif', fontSize: "12px" }}
                >
                  Explore Mediverse
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {mobileOpen ? (
        <div className="pointer-events-auto mx-auto mt-3 w-[calc(100%-2rem)] max-w-md rounded-3xl border border-white/40 bg-black/85 p-6 backdrop-blur-md lg:hidden">
          <nav className="flex flex-col gap-4" aria-label="Mobile">
            {navLinks.map((link) => (
              <ScrollLink
                key={link.href}
                href={link.href}
                className="text-nav text-white"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </ScrollLink>
            ))}
            <button
              type="button"
              className="text-cta inline-flex h-[clamp(44px,3.07vw,59px)] items-center justify-center rounded-[clamp(28px,3.125vw,60px)] border border-white capitalize text-white"
              onClick={() => {
                setMobileOpen(false);
                openContact();
              }}
            >
              Work with us
            </button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
