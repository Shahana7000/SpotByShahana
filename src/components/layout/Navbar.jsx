import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, User } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { GlassButton } from '../common/GlassButton';

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, session } = useAuth();
  
  // Format pathname as title
  const title = location.pathname === '/' ? 'Home' : 
                location.pathname.split('/')[1].charAt(0).toUpperCase() + location.pathname.split('/')[1].slice(1);

  return (
    <header className="h-16 flex items-center justify-between px-6 bg-transparent backdrop-blur-md sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <div className="flex gap-2">
          <button 
            onClick={() => navigate(-1)}
            className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center text-white/70 hover:text-white transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={() => navigate(1)}
            className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center text-white/70 hover:text-white transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        <h2 className="text-lg font-bold text-white tracking-tight hidden md:block">{title}</h2>
      </div>

      <div className="flex items-center gap-4">
        {session ? (
          <GlassButton variant="ghost" size="icon" className="w-9 h-9 border border-white/10 rounded-full" onClick={() => navigate('/profile')}>
            <User size={18} />
          </GlassButton>
        ) : (
          <>
            <GlassButton variant="ghost" onClick={() => navigate('/register')} className="text-muted-foreground hover:text-white">
              Sign Up
            </GlassButton>
            <GlassButton variant="primary" onClick={() => navigate('/login')} className="rounded-full px-6">
              Log In
            </GlassButton>
          </>
        )}
      </div>
    </header>
  );
};
