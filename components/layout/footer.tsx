import Link from 'next/link';
import { Brain, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, Youtube, Send } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();


  const socialLinks = [
    { name: 'YouTube', href: 'https://www.youtube.com/@WHIZCLUB07', icon: Youtube, color: 'bg-red-600 hover:bg-red-700' },
    { name: 'Instagram', href: 'https://instagram.com/whiz_club/profilecard/?igsh=Nnh0MGo0dTVkaXNk', icon: Instagram, color: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600' },
    { name: 'Telegram', href: 'https://t.me/whizclub_for_AP_POLICE', icon: Send, color: 'bg-blue-500 hover:bg-blue-600' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          {/* Brand Section */}
          <div className="flex-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-green-400 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">WhizClub</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail className="w-4 h-4" />
                <span>whizopedia07@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>Andhra Pradesh, India</span>
              </div>
            </div>
          </div>

          {/* Social Media Icons - Left Corner */}
          <div className="flex flex-col items-center lg:items-end">
            <h3 className="text-lg font-semibold mb-4 text-center lg:text-right">Connect With Us</h3>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                  aria-label={social.name}
                >
                  <div className={`w-12 h-12 ${social.color} rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg`}>
                    <social.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    {social.name}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="text-center">
            <div className="text-gray-400 text-sm">
              © {currentYear} WhizClub. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}