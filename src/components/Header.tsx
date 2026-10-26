import React, { useState } from 'react';
import { useGame } from '../context/GameContext';

export const Header: React.FC = () => {
  const { activeTab, gameMode, streak, coins, soundEnabled, toggleSound, userStats } = useGame();
  const [profileOpen, setProfileOpen] = useState(false);

  // Dynamic subtitle
  let subtitle = 'Daily';
  if (activeTab === 'shop') subtitle = 'Shop';
  else if (activeTab === 'ranks') subtitle = 'Ranks';
  else if (activeTab === 'play') {
    if (gameMode === 'halloween') subtitle = 'Word Haunt';
    else if (gameMode === 'hardcore') subtitle = 'Hardcore';
    else if (gameMode === 'speedrush') subtitle = 'Speed Rush';
    else if (gameMode === 'duel') subtitle = 'Word Duel';
    else subtitle = 'Play';
  }

  return (
    <>
      <header className="fixed top-0 w-full z-40 pt-safe bg-surface/85 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
        <div className="h-16 px-space-md flex items-center justify-between gap-space-sm max-w-[480px] mx-auto">
          {/* Logo & App Title */}
          <div className="flex items-center gap-space-sm min-w-0 flex-1">
            <img
              alt="WordCraft Game Logo"
              className="h-8 w-auto object-contain flex-shrink-0"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBf9hX5C0TK5W3q7AQrpo1IwCf-7h5mBu43X2nsH1S2tPaBVtTBuf-17-Lh-f-JMw_utcvMBf-FWNd1gaCzhk3fuGC8v8eu0jprndcwhuVnaYCKJiKNVT2rJe7p5MiEfdyQANc0k_pljA5gkbIsOs7ciQv-cpGl-FjQP9FBkb7siyXUJ9Y4Xz0NsPhC8zUSLF37kCX5ot-5-oZgfL-i7r6xUhQV3n3weHGuPspgxqs"
            />
            <div className="flex flex-col min-w-0">
              <span className="font-headline-sm text-headline-sm text-primary tracking-tight truncate leading-none">
                WordCraft
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant truncate uppercase tracking-wider">
                {subtitle}
              </span>
            </div>
          </div>

          {/* Right Header Stats & Profile */}
          <div className="flex items-center gap-space-xs flex-shrink-0">
            {/* Streak Pill */}
            <div
              className="flex items-center gap-1 bg-surface-container px-space-sm py-1 rounded-full shadow-[0_2px_8px_rgba(245,158,11,0.15)] cursor-pointer hover:bg-surface-container-high transition-colors"
              title="Daily Active Streak"
            >
              <span
                className="material-symbols-outlined text-secondary text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                local_fire_department
              </span>
              <span className="font-label-md text-label-md text-secondary">
                {streak}
              </span>
            </div>

            {/* Coins Balance Pill */}
            <div
              className="flex items-center gap-1 bg-surface-container-high px-space-sm py-1 rounded-full shadow-[0_0_10px_rgba(255,185,95,0.25)] cursor-pointer hover:bg-surface-container-highest transition-colors"
              title="Coin Treasury Balance"
            >
              <span
                className="material-symbols-outlined text-secondary text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                monetization_on
              </span>
              <span className="font-label-md text-label-md text-on-surface">
                {coins.toLocaleString()}
              </span>
            </div>

            {/* User Profile Avatar */}
            <button
              onClick={() => setProfileOpen(true)}
              className="flex items-center justify-center p-0.5 rounded-full bg-surface-container-high shadow-[0_2px_8px_rgba(0,0,0,0.3)] ml-0.5 active:scale-95 transition-transform hover:ring-2 hover:ring-primary/40 focus:outline-none"
              title="View Player Stats & Settings"
            >
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeL9j3bg0vum77GjSsjPCeyNWMJIMKyAUJUOwUvmP7PhNsWjbakagKZpFdYGWbKCKwpxXIM4A4v3YGMAMPn4Xa3o7DmXpEjBWmG1tYjbHmwWiU598c0YWpZthgDmSyPVcwTCMLl8kVCHD6w0BDy6KBjh1Gp3MsfoHE76yN7PYcT9vSHutqG-onGvDRPHpnOzmbee-7_9hPzEadeKCGZy7PgQOVFOvHonT2a_G3-eQ"
              />
            </button>
          </div>
        </div>
      </header>

      {/* Profile & Settings Modal */}
      {profileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
          <div className="relative w-full max-w-[420px] bg-surface-container-high rounded-2xl p-space-md shadow-2xl border border-surface-container-highest animate-tile-pop">
            {/* Close Button */}
            <button
              onClick={() => setProfileOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>

            {/* Avatar Header */}
            <div className="flex items-center gap-3 pb-3 border-b border-surface-container-highest">
              <div className="relative">
                <img
                  alt="Profile"
                  className="w-14 h-14 rounded-full object-cover shadow-[0_0_16px_rgba(78,222,163,0.3)]"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeL9j3bg0vum77GjSsjPCeyNWMJIMKyAUJUOwUvmP7PhNsWjbakagKZpFdYGWbKCKwpxXIM4A4v3YGMAMPn4Xa3o7DmXpEjBWmG1tYjbHmwWiU598c0YWpZthgDmSyPVcwTCMLl8kVCHD6w0BDy6KBjh1Gp3MsfoHE76yN7PYcT9vSHutqG-onGvDRPHpnOzmbee-7_9hPzEadeKCGZy7PgQOVFOvHonT2a_G3-eQ"
                />
                <span className="absolute -bottom-1 -right-1 text-xs">👑</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">WordWizard</h3>
                  <span className="px-1.5 py-0.5 rounded bg-primary/20 text-primary font-label-sm text-[10px]">
                    YOU
                  </span>
                </div>
                <span className="font-body-sm text-body-sm text-secondary flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px]">diamond</span>
                  Diamond League • Rank #4
                </span>
              </div>
            </div>

            {/* Stats Summary Grid */}
            <div className="grid grid-cols-4 gap-2 my-4 text-center">
              <div className="bg-surface-container p-2.5 rounded-xl">
                <span className="font-headline-sm text-[20px] text-on-surface font-black block">
                  {userStats.gamesPlayed}
                </span>
                <span className="font-label-sm text-[10px] text-on-surface-variant uppercase">
                  Played
                </span>
              </div>
              <div className="bg-surface-container p-2.5 rounded-xl">
                <span className="font-headline-sm text-[20px] text-primary font-black block">
                  {userStats.winRate}%
                </span>
                <span className="font-label-sm text-[10px] text-on-surface-variant uppercase">
                  Win %
                </span>
              </div>
              <div className="bg-surface-container p-2.5 rounded-xl">
                <span className="font-headline-sm text-[20px] text-secondary font-black block">
                  {streak}
                </span>
                <span className="font-label-sm text-[10px] text-on-surface-variant uppercase">
                  Streak
                </span>
              </div>
              <div className="bg-surface-container p-2.5 rounded-xl">
                <span className="font-headline-sm text-[20px] text-candy-pink font-black block">
                  {userStats.trophies}
                </span>
                <span className="font-label-sm text-[10px] text-on-surface-variant uppercase">
                  Trophies
                </span>
              </div>
            </div>

            {/* Audio & Settings Section */}
            <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-surface-container-highest">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[20px]">
                    {soundEnabled ? 'volume_up' : 'volume_off'}
                  </span>
                  <span className="font-label-md text-label-md text-on-surface">Tactile Sound Effects</span>
                </div>
                <button
                  onClick={toggleSound}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ${
                    soundEnabled ? 'bg-primary justify-end' : 'bg-surface-container-highest justify-start'
                  }`}
                >
                  <div className="bg-surface w-4 h-4 rounded-full shadow-md"></div>
                </button>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-glow-success text-[20px]">cloud_done</span>
                  <span className="font-label-md text-label-md text-on-surface">Cloud Progress Sync</span>
                </div>
                <span className="font-label-sm text-glow-success font-bold uppercase text-[11px]">Active</span>
              </div>
            </div>

            <button
              onClick={() => setProfileOpen(false)}
              className="w-full mt-4 py-2.5 rounded-xl bg-primary text-on-primary font-headline-sm text-headline-sm text-center active:scale-95 transition-transform"
            >
              Resume Game
            </button>
          </div>
        </div>
      )}
    </>
  );
};
