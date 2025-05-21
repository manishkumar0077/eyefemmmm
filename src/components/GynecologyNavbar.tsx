import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Heart } from "lucide-react";

const GynecologyNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: "/gynecology", label: "Overview" },
    { path: "/gynecology/health", label: "Women's Health" },
    { path: "/gynecology/doctor", label: "Dr. Nisha Bhatnagar" },
    { path: "/gynecology/appointment", label: "Book Appointment" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 h-16 flex items-center bg-white shadow-sm ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      <div className="container mx-auto px-4 w-full">
        <div className="flex justify-between items-center">
          <Link
            to="/gynecology"
            className="flex items-center space-x-2"
          >
            <img 
              src="/lovable-uploads/6c43213d-6d60-4790-b8ff-d662e634ee59.png"
              alt="EyeFem Clinic"
              className="h-16 w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors hover:text-gynecology ${
                  location.pathname === link.path
                    ? "text-gynecology font-semibold"
                    : "text-gray-700"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/"
              className="text-gray-700 transition-colors hover:text-gynecology"
            >
              Home
            </Link>
          </div>

          {/* Mobile Nav Toggle */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gynecology/50"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? (
              <X size={24} className="text-gray-700" />
            ) : (
              <Menu size={24} className="text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <div className="fixed top-16 left-0 w-full bg-white shadow-lg z-40 md:hidden" style={{ height: 'calc(100vh - 64px)' }}>
          <div className="container mx-auto px-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block py-2 px-4 rounded-md transition-colors hover:bg-gray-50 ${
                  location.pathname === link.path
                    ? "text-gynecology font-semibold bg-gray-50"
                    : "text-gray-700"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/"
              className="block py-2 px-4 rounded-md text-gray-700 transition-colors hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default GynecologyNavbar;
