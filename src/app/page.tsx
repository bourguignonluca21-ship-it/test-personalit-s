import Hero from "./components/Hero";
import HomeActes from "./components/HomeActes";
import ScrollHaut from "./components/ScrollHaut";

export default function Home() {
  return (
    <div className="home-apple">
      <ScrollHaut />
      <Hero />

      {/* Les actes de la nouvelle home (test, 48 nuances, duo, espace, final) */}
      <HomeActes />
    </div>
  );
}
