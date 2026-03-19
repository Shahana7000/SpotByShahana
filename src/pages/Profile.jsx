import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { AnimatedPage } from '../components/common/AnimatedPage';
import { GlassCard } from '../components/common/GlassCard';
import { GlassButton } from '../components/common/GlassButton';
import { User as UserIcon, LogOut, Settings, Bell, Shield } from 'lucide-react';
import { formatNumber } from '../utils/formatTime';

export const Profile = () => {
  const { user, signOut } = useAuth();
  
  if (!user) return null;

  return (
    <AnimatedPage className="p-4 md:p-8 max-w-4xl mx-auto space-y-8">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mt-8">
        <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-primary to-violet-600 p-1 shadow-[0_16px_40px_rgba(21,115,149,0.3)]">
          <div className="w-full h-full rounded-full bg-[#020d12] flex items-center justify-center overflow-hidden">
            {user.user_metadata?.avatar_url ? (
               <img src={user.user_metadata.avatar_url} alt="Profile" className="w-full h-full object-cover" />
            ) : (
                <UserIcon size={64} className="text-primary" />
            )}
          </div>
        </div>
        
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2 flex-1 mt-4 md:mt-10">
          <span className="text-sm font-bold uppercase tracking-widest text-white/50">Profile</span>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
            {user.user_metadata?.name || 'Listener'}
          </h1>
          <p className="text-muted-foreground">{user.email}</p>
          
          <div className="flex items-center gap-6 mt-4">
            <div className="flex flex-col items-center md:items-start">
              <span className="text-xl font-bold text-white">12</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Playlists</span>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <span className="text-xl font-bold text-white">{formatNumber(1337)}</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Followers</span>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <span className="text-xl font-bold text-white">42</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Following</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 pt-8">
        <GlassCard className="p-6 md:col-span-2">
           <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Settings size={20}/> Account Settings</h3>
           <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-white/5">
                 <div>
                    <p className="font-medium text-white">Subscription</p>
                    <p className="text-sm text-muted-foreground">SpotBY Premium</p>
                 </div>
                 <GlassButton variant="ghost" className="text-sm">Manage</GlassButton>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-white/5">
                 <div>
                    <p className="font-medium text-white">Email Preferences</p>
                    <p className="text-sm text-muted-foreground">Manage notifications</p>
                 </div>
                 <GlassButton variant="ghost" className="text-sm">Edit</GlassButton>
              </div>
              <div className="flex justify-between items-center py-3">
                 <div>
                    <p className="font-medium text-white">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">Enhance account security</p>
                 </div>
                 <GlassButton variant="primary" className="text-sm h-8 px-4 rounded-full">Enable</GlassButton>
              </div>
           </div>
        </GlassCard>

        <div className="space-y-6">
            <GlassCard className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Shield size={20}/> Privacy</h3>
              <p className="text-sm text-muted-foreground mb-4">Manage how your data is used and who can see your activity.</p>
              <GlassButton variant="ghost" className="w-full justify-between pb-0 border-b-0 h-auto px-0 text-white hover:text-primary">
                 Privacy Settings &rarr;
              </GlassButton>
            </GlassCard>

            <GlassButton 
              onClick={signOut}
              variant="ghost" 
              className="w-full text-destructive border border-destructive/20 hover:bg-destructive/10 h-12"
            >
              <LogOut size={18} className="mr-2" />
              Sign Out
            </GlassButton>
        </div>
      </div>
    </AnimatedPage>
  );
};
