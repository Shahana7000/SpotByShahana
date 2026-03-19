import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, Library, Music, Heart, Settings } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { motion } from 'framer-motion';

const NAV_ITEMS = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Search, label: 'Search', path: '/search' },
  { icon: Library, label: 'Your Library', path: '/library' },
];

const LIBRARY_ITEMS = [
  { icon: Heart, label: 'Liked Songs', path: '/liked' },
  { icon: Music, label: 'Playlists', path: '/playlists' },
];

export const Sidebar = () => {
  const isTablet = useMediaQuery('(max-width: 1024px)');
  
  return (
    <aside className={cn(
      "h-full flex flex-col bg-card/40 backdrop-blur-3xl border-r border-border transition-all duration-300",
      isTablet ? "w-[72px]" : "w-60"
    )}>
      <div className="p-6 flex items-center justify-center lg:justify-start gap-3">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-[0_0_15px_rgba(21,115,149,0.5)]">
          <Music size={18} className="text-white" />
        </div>
        {!isTablet && <span className="text-xl font-bold tracking-tight text-white">SpotBY</span>}
      </div>

      <nav className="flex-1 px-3 py-4 space-y-6">
        <div className="space-y-1">
          {NAV_ITEMS.map((item, i) => (
            <NavItem key={item.path} item={item} isTablet={isTablet} delay={i * 0.1} />
          ))}
        </div>

        <div className="space-y-1">
          {!isTablet && <h3 className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Library</h3>}
          {LIBRARY_ITEMS.map((item, i) => (
            <NavItem key={item.path} item={item} isTablet={isTablet} delay={(NAV_ITEMS.length + i) * 0.1} />
          ))}
        </div>
      </nav>

      <div className="p-4 mt-auto">
        <NavItem item={{ icon: Settings, label: 'Settings', path: '/profile' }} isTablet={isTablet} delay={0.6} />
      </div>
    </aside>
  );
};

const NavItem = ({ item, isTablet, delay }) => {
  return (
    <NavLink
      to={item.path}
      className={({ isActive }) => cn(
        "flex items-center gap-4 px-3 py-2.5 rounded-xl transition-all duration-200 group text-muted-foreground hover:text-white hover:bg-white/5",
        isActive && "text-white bg-white/10 shadow-[inset_2px_0_0_#157395]",
        isTablet && "justify-center"
      )}
    >
      {({ isActive }) => (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay, duration: 0.3 }}
          className="flex items-center gap-4 w-full"
        >
          <item.icon size={20} className={cn("transition-transform group-hover:scale-110 duration-200", isActive && "text-primary")} />
          {!isTablet && <span className="text-sm font-medium">{item.label}</span>}
        </motion.div>
      )}
    </NavLink>
  );
};
