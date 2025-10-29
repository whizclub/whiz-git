'use client';

import { useState } from 'react';
import { 
  Instagram, 
  Youtube,
  Send
} from 'lucide-react';

export function FloatingSocial() {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  const socialLinks = [
    {
      name: 'Instagram',
      label: 'INSTAGRAM',
      icon: Instagram,
      bgColor: 'bg-gradient-to-r from-purple-600 via-pink-600 to-red-500',
      url: 'https://instagram.com/whiz_club/profilecard/?igsh=Nnh0MGo0dTVkaXNk',
    },
    {
      name: 'YouTube',
      label: 'YOUTUBE',
      icon: Youtube,
      bgColor: 'bg-red-600',
      url: 'https://www.youtube.com/@WHIZCLUB07',
    },
    {
      name: 'Telegram',
      label: 'TELEGRAM',
      icon: Send,
      bgColor: 'bg-blue-500',
      url: 'https://t.me/whizclub_for_AP_POLICE',
    },
  ];

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden md:block pointer-events-none">
      <div className="flex flex-col gap-2">
        {socialLinks.map((social) => {
          const isHovered = hoveredIcon === social.name;
          const isAnyHovered = hoveredIcon !== null;
          const shouldHide = isAnyHovered && !isHovered;

          return (
            <div 
              key={social.name} 
              className={`relative pointer-events-auto transition-all duration-300 ${
                shouldHide ? 'opacity-0 translate-x-12' : 'opacity-100 translate-x-0'
              }`}
            >
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHoveredIcon(social.name)}
                onMouseLeave={() => setHoveredIcon(null)}
                className={`${social.bgColor} flex items-center justify-end transition-all duration-300 hover:shadow-xl shadow-md group h-10 ${
                  isHovered ? 'w-40 rounded-l-full' : 'w-10 rounded-full'
                }`}
                title={social.name}
              >
                {/* Text label - hidden by default, expands on hover */}
                <span className={`overflow-hidden whitespace-nowrap text-white font-bold text-xs transition-all duration-300 ease-out pl-3 pr-1 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}>
                  {social.label}
                </span>
                
                {/* Icon - always visible */}
                <div className="flex items-center justify-center w-10 h-10 flex-shrink-0 rounded-full">
                  <social.icon className="w-5 h-5 text-white" strokeWidth={2} />
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

