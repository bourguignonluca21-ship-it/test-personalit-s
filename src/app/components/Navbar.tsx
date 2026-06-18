export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-200 bg-white">
      <div className="text-xl font-semibold text-gray-800">
        Logo
      </div>
      <div className="flex items-center gap-8 text-sm text-gray-600">
        <a href="/test" className="hover:text-gray-900">Test de personnalité</a>
        <a href="#" className="hover:text-gray-900">Dark personnalité</a>
        <a href="#" className="hover:text-gray-900">Pack carrière</a>
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
