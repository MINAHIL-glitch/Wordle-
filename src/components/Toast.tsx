import React from 'react';
import { useGame } from '../context/GameContext';

export const Toast: React.FC = () => {
  const { toast } = useGame();

  if (!toast.visible) return null;

  return (
    <div
      className="fixed top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none flex items-center gap-space-xs bg-surface-container-highest px-space-md py-space-xs rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.6)] border border-outline-variant/40 animate-tile-pop transition-all duration-300"
      id="toastNotification"
    >
      <span
        className="material-symbols-outlined text-primary text-[20px]"
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        check_circle
      </span>
      <span className="font-label-md text-label-md text-on-surface">
        {toast.message}
      </span>
    </div>
  );
};
