import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, Library, User } from 'lucide-react';
import { cn } from '../../utils/cn';

const MOBILE_ITEMS = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Search, label: 'Search', path: '/search' },
  { icon: Library, label: 'Library', path: '/library' },
  { icon: User, label: 'Profile', path: '/profile' }
];

export const MobileNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-[#020d12]/90 backdrop-blur-2xl border-t border-white/10 z-50 flex items-center justify-around px-2 pb-safe">
      {MOBILE_ITEMS.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) => cn(
            "flex flex-col items-center justify-center gap-1 w-16 h-full text-muted-foreground transition-all duration-200",
            isActive && "text-white"
          )}
        >
          {({ isActive }) => (
            <>
              <item.icon size={22} className={cn("transition-transform duration-200", isActive && "scale-110 text-primary")} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};
