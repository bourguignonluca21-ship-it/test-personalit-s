"use client";

import { useState } from "react";
import Link from "next/link";
import { ROLE_ORDER, ROLES, typesByRole } from "../data/types";

const NAV_LINKS = [
  { href: "/test", label: "Test de personnalité" },
  { href: "/dark-personnalite", label: "Dark personnalité" },
  { href: "/types-de-personnalite", label: "Types de personnalité", hasMenu: true },
  { href: "/equipes", label: "Services" },
  { href: "/articles", label: "Articles" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-10 py-3.5 border-b border-black/5 bg-white/70 backdrop-blur-xl backdrop-saturate-150">
      {/* Logo (placeholder — à remplacer par ton identité) */}
      <Link href="/" className="flex items-center gap-2 font-semibold text-[17px] tracking-tight text-gray-800">
        <span className="grid grid-cols-4 gap-[3px]" aria-hidden>
          {["rgba(136,97,154,0.75)", "rgba(51,164,116,0.75)", "rgba(228,174,58,0.75)", "rgba(66,152,180,0.75)", "rgba(51,164,116,0.75)", "rgba(136,97,154,0.75)", "rgba(66,152,180,0.75)", "rgba(228,174,58,0.75)"].map(
            (c, i) => (
              <span key={i} className="w-[6px] h-[6px] rounded-full" style={{ background: c }} />
            ),
          )}
        </span>
        Projet&nbsp;Tests
      </Link>

      {/* Liens (desktop) */}
      <div className="hidden md:flex items-center gap-8 text-[13px] font-normal text-gray-500">
        {NAV_LINKS.map((link) =>
          link.hasMenu ? (
            <div
              key={link.href}
              className="relative"
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
            >
              <Link href={link.href} className="hover:text-gray-900 transition-colors flex items-center gap-1 py-2">
                {link.label}
                <svg
                  className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>

              {open && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2">
                  <div className="w-[480px] bg-white rounded-xl shadow-xl border border-gray-100 p-6 space-y-5">
                    {ROLE_ORDER.map((key) => {
                      const role = ROLES[key];
                      return (
                        <div key={key}>
                          <h3 className="font-bold text-sm mb-1" style={{ color: role.color }}>
                            {role.name}
                          </h3>
                          <p className="text-xs text-gray-500 leading-relaxed mb-2">{role.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {typesByRole(key).map((t) => (
                              <Link
                                key={t.slug}
                                href={`/types-de-personnalite/${t.slug}`}
                                className="text-white text-xs font-semibold px-3 py-1.5 rounded-md hover:opacity-80 transition-opacity"
                                style={{ background: role.color }}
                              >
                                {t.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link key={link.href} href={link.href} className="hover:text-gray-900 transition-colors">
              {link.label}
            </Link>
          ),
        )}
      </div>

      {/* Droite */}
      <div className="hidden md:flex items-center gap-5 text-[13px] text-gray-500">
        <Link href="/connexion" className="font-medium text-gray-800 hover:text-gray-900 transition-colors">
          Se connecter
        </Link>
        <span
          className="w-6 h-6 rounded-full border border-gray-200"
          aria-label="Français"
          title="Français"
          style={{ background: "linear-gradient(90deg,#0055A4 33%,#fff 33% 66%,#EF4135 66%)" }}
        />
      </div>

      {/* Burger (mobile) */}
      <button
        className="md:hidden p-2"
        aria-label="Menu"
        aria-expanded={mobile}
        onClick={() => setMobile((v) => !v)}
      >
        <span className="block w-5 h-0.5 bg-gray-800 mb-1" />
        <span className="block w-5 h-0.5 bg-gray-800 mb-1" />
        <span className="block w-5 h-0.5 bg-gray-800" />
      </button>

      {/* Menu mobile */}
      {mobile && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 px-6 py-4 flex flex-col gap-3 text-sm text-gray-700 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMobile(false)} className="py-1">
              {link.label}
            </Link>
          ))}
          <Link href="/connexion" onClick={() => setMobile(false)} className="py-1 font-semibold">
            Se connecter
          </Link>
        </div>
      )}
    </nav>
  );
}
