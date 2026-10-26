import React from 'react';
import { useGame, AppTab } from '../context/GameContext';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab } = useGame();

  const tabs: { id: AppTab; label: string; icon: string }[] = [
    { id: 'play', label: 'Play', icon: 'sports_esports' },
    { id: 'daily', label: 'Daily', icon: 'calendar_month' },
    { id: 'ranks', label: 'Ranks', icon: 'emoji_events' },
    { id: 'shop', label: 'Shop', icon: 'shopping_bag' },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-40 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-4px_24px_rgba(0,0,0,0.4)]">
      <div className="max-w-[480px] mx-auto flex justify-around items-center h-20 px-space-sm">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col items-center justify-center gap-1 min-w-[64px] min-h-[48px] px-2 py-1 rounded-xl transition-all duration-150 ${
                isActive
                  ? 'text-primary font-label-md scale-105'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[24px]">
                {tab.icon}
              </span>
              <span className="font-label-sm text-label-sm">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
