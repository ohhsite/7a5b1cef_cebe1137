import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { Phone } from "lucide-react";
import configData from "../data/config.json";
import { ConfigData } from "../../types";

const typedConfigData = configData as ConfigData;

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { title: "O mnie", target: "about" },
    { title: "Specjalizacje", target: "specializations" },
    { title: "Jak pracuję", target: "process" },
    { title: "Opinie", target: "testimonials" },
    { title: "Cennik", target: "pricing" },
    { title: "FAQ", target: "faq" },
    { title: "Kontakt", target: "contact" },
  ];

  const siteName = typedConfigData?.siteName;
  const phoneNumber = typedConfigData?.therapist?.phone;
  const primaryColor = typedConfigData?.colors?.primary || "#000000";

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300 py-3 bg-white/95 backdrop-blur-sm shadow-md">
      <div className="container-custom flex justify-between items-center">
        <div className="flex items-center">
          <Link to="hero" smooth={true} duration={500} className="cursor-pointer">
            {siteName && (
              <h1
                className="text-xl md:text-2xl font-montserrat font-bold"
                style={{ color: primaryColor }}
              >
                {siteName}
              </h1>
            )}
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.target}
              to={item.target}
              smooth={true}
              duration={500}
              offset={-70}
              className="px-3 py-2 rounded-md text-base font-medium text-gray-700 transition-colors cursor-pointer"
              style={{ "--tw-text-opacity": 1 } as React.CSSProperties}
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="hover:underline" style={{ color: primaryColor }}>
                {item.title}
              </span>
            </Link>
          ))}
        </nav>

        {/* Contact button */}
        {phoneNumber && (
          <div className="hidden md:flex items-center">
            <a
              href={`tel:${phoneNumber}`}
              className="flex items-center px-4 py-2 rounded-full text-white font-medium transition-colors"
              style={{ backgroundColor: primaryColor }}
            >
              <Phone size={18} className="mr-2" />
              <span className="font-semibold">{phoneNumber}</span>
            </a>
          </div>
        )}

        {/* Mobile menu button */}
        <button
          className="lg:hidden text-gray-700"
          style={{ color: primaryColor }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white shadow-lg py-4 px-6 absolute top-full left-0 right-0">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.target}
                to={item.target}
                smooth={true}
                duration={500}
                offset={-70}
                className="px-3 py-2 rounded-md text-base font-medium text-gray-700 transition-colors cursor-pointer"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="hover:underline" style={{ color: primaryColor }}>
                  {item.title}
                </span>
              </Link>
            ))}

            {phoneNumber && (
              <div className="pt-3 border-t border-gray-200 mt-2">
                <a
                  href={`tel:${phoneNumber}`}
                  className="flex items-center justify-center mt-3 px-4 py-2 rounded-full text-white font-medium cursor-pointer"
                  style={{ backgroundColor: primaryColor }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Phone size={18} className="mr-2" />
                  <span className="font-semibold">{phoneNumber}</span>
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
