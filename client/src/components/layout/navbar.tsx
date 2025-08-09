import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Microchip } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/events", label: "Activities" },
    { href: "/learning", label: "Education" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm transition-all duration-300">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
              <Microchip className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">CyberHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Log In Button */}
          <div className="hidden md:block">
            <Button 
              variant="outline" 
              size="sm"
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Log In
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4">
            <div className="flex flex-col space-y-4 bg-white rounded-lg p-4 shadow-lg border">
              {navLinks.map((link) => (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Button 
                variant="outline" 
                size="sm"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 w-full mt-2"
              >
                Log In
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
