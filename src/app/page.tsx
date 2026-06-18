import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-1">
        <h1 className="text-2xl font-semibold">Mon test de personnalité</h1>
        <p className="text-gray-600 mt-2">Le site arrive bientôt.</p>
      </div>
    </>
  );
}
