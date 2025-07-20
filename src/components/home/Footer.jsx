import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Play,
} from "lucide-react";
import logoDark from "../../assets/logo-dark.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: "About Us", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Press", href: "#" },
      { name: "Blog", href: "#" },
    ],
    support: [
      { name: "Help Center", href: "#" },
      { name: "Contact Us", href: "#" },
      { name: "System Requirements", href: "#" },
      { name: "Supported Devices", href: "#" },
    ],
    legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
      { name: "Legal Notices", href: "#" },
    ],
    features: [
      { name: "Watch Anywhere", href: "#" },
      { name: "Mobile Apps", href: "#" },
      { name: "Gift Cards", href: "#" },
      { name: "Redeem Gift Cards", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-[#0a0a0a] text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6">
                <img
                  src={logoDark}
                  alt="Cup Entertainment"
                  className="h-10 w-auto"
                />
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Cup Entertainment is your ultimate destination for movies and TV
                shows. Stream unlimited content across all your devices with the
                best quality and user experience.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-purple-500" />
                  <span className="text-gray-400">
                    support@cupentertainment.com
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-purple-500" />
                  <span className="text-gray-400">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-purple-500" />
                  <span className="text-gray-400">
                    123 Entertainment St, LA, CA
                  </span>
                </div>
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Support</h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Legal</h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              © {currentYear} Cup Entertainment. All rights reserved.
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm mr-2">Follow us:</span>
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label={social.label}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>

            {/* App Download Buttons */}
            <div className="flex items-center space-x-3">
              <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
                <Play className="w-4 h-4" />
                <span className="text-sm">Download App</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
