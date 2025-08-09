import { Link } from "wouter";
import { Microchip, Github, Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-cyber-dark text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Microchip className="h-8 w-8 text-cyber-accent" />
              <span className="text-xl font-bold">CyberHub</span>
            </div>
            <p className="text-gray-300 mb-4">Where Innovation Begins</p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-300 hover:text-cyber-accent transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-cyber-accent transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-cyber-accent transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-cyber-accent transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-cyber-accent transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-gray-300 hover:text-cyber-accent transition-colors"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/leaderboard"
                  className="text-gray-300 hover:text-cyber-accent transition-colors"
                >
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link
                  href="/learning"
                  className="text-gray-300 hover:text-cyber-accent transition-colors"
                >
                  Learning Zone
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Community</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-cyber-accent transition-colors"
                >
                  Join Discord
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-cyber-accent transition-colors"
                >
                  Become a Mentor
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-cyber-accent transition-colors"
                >
                  Partner with Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-cyber-accent transition-colors"
                >
                  Code of Conduct
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>hello@cyberhub.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>San Francisco, CA</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            &copy; 2024 CyberHub. All rights reserved. Built with ❤️ for the tech community.
          </p>
        </div>
      </div>
    </footer>
  );
}
