"use client";

import { useState } from "react";

const groups = [
  {
    name: "Les analystes",
    description: "Types de personnalité Intuitif (N) et Rationnel (T), reconnus pour leur rationalité, leur impartialité et leur excellence intellectuelle.",
    color: "bg-[#88619a]",
    types: ["Architecte", "Logicien", "Commandant", "Innovateur"],
  },
  {
    name: "Les diplomates",
    description: "Types de personnalité Intuitif (N) et Sensible (F), connus pour leur empathie, leurs compétences diplomatiques et leur idéalisme passionné.",
    color: "bg-[#33a474]",
    types: ["Avocat", "Médiateur", "Protagoniste", "Inspirateur"],
  },
  {
    name: "Les sentinelles",
    description: "Types de personnalité Observateur (S) et Organisé (J), connus pour leur sens pratique et leur attachement à l'ordre, à la sécurité et à la stabilité.",
    color: "bg-[#4298b4]",
    types: ["Logisticien", "Défenseur", "Directeur", "Consul"],
  },
  {
    name: "Les explorateurs",
    description: "Types de personnalité Observateur (S) et Explorateur (P), connus pour leur spontanéité, leur ingéniosité et leur flexibilité.",
    color: "bg-[#e4ae3a]",
    types: ["Virtuose", "Aventurier", "Entrepreneur", "Amuseur"],
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="relative flex items-center justify-between px-8 py-4 border-b border-gray-200 bg-white z-50">
      <a href="/" className="text-xl font-semibold text-gray-800 hover:text-gray-900">
        Logo
      </a>
      <div className="flex items-center gap-8 text-sm text-gray-600">
        <a href="/test" className="hover:text-gray-900">Test de personnalité</a>
        <a href="#" className="hover:text-gray-900">Dark personnalité</a>
        <div
          className="relative"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <a href="/types-de-personnalite" className="hover:text-gray-900 flex items-center gap-1 py-2">
            Types de personnalité
            <svg className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </a>

          {open && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50">
            <div className="w-[480px] bg-white rounded-xl shadow-xl border border-gray-100 p-6 space-y-6">
              {groups.map((group) => (
                <div key={group.name}>
                  <h3 className="font-bold text-gray-800 text-base mb-1">{group.name}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed mb-3">{group.description}</p>
                  <div className="flex gap-2">
                    {group.types.map((type) => (
                      <a
                        key={type}
                        href="#"
                        className={`${group.color} text-white text-xs font-semibold px-4 py-2 rounded-md hover:opacity-80 transition-opacity`}
                      >
                        {type}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            </div>
          )}
        </div>
        <a href="#" className="hover:text-gray-900">Services</a>
        <a href="#" className="hover:text-gray-900">Articles</a>
      </div>
      <div className="flex items-center gap-6 text-sm text-gray-600">
        <a href="#" className="hover:text-gray-900">Se connecter</a>
        <span>Français</span>
      </div>
    </nav>
  );
}
