import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Apparitions from "./components/Apparitions";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/*
 * La serif des grands titres. Le modèle était New Spirit (Adobe Fonts), qui
 * est sous licence payante : Fraunces en est l'équivalent libre le plus proche
 * — même serif contemporaine à contraste marqué, formes douces.
 * `opsz` est son axe de taille optique : poussé au maximum, les déliés se
 * creusent et les empattements s'affinent, ce qu'on veut sur un très grand
 * titre. SOFT arrondit les angles, WONK laisse ses italiques penchées.
 */
const fraunces = Fraunces({
  variable: "--font-titre",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
});

export const metadata: Metadata = {
  title: {
    default: "Test de personnalité — découvre ton type",
    template: "%s | Projet Tests",
  },
  description:
    "Test de personnalité gratuit en français : découvre ton type parmi 16, avec un portrait nuancé et personnalisé. Ludique, moderne, plus fin.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <div className="grain-overlay" aria-hidden />
        <Apparitions />
        <a href="#contenu" className="skip-link">
          Passer au contenu principal
        </a>
        <Navbar />
        <main id="contenu" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
