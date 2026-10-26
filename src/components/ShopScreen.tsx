import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';

export const ShopScreen: React.FC = () => {
  const {
    inventory,
    buyBooster,
    buyCoins,
    unlockBundle,
    claimFreeMysteryChest,
    speedClaimChest,
    showToast,
  } = useGame();

  const [chestCountdown, setChestCountdown] = useState<string>('04:32:10');
  const [bundleCountdown, setBundleCountdown] = useState<string>('18h 42m');
  const [adModalOpen, setAdModalOpen] = useState(false);
  const [adSeconds, setAdSeconds] = useState(3);

  // Live timer simulation
  useEffect(() => {
    let totalSecs = 4 * 3600 + 32 * 60 + 10;
    const interval = setInterval(() => {
      if (totalSecs <= 0) {
        setChestCountdown('READY!');
        return;
      }
      totalSecs--;
      const h = Math.floor(totalSecs / 3600).toString().padStart(2, '0');
      const m = Math.floor((totalSecs % 3600) / 60).toString().padStart(2, '0');
      const s = (totalSecs % 60).toString().padStart(2, '0');
      setChestCountdown(`${h}:${m}:${s}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Ad simulation modal
  const handleWatchAd = () => {
    setAdModalOpen(true);
    setAdSeconds(3);
    const adTimer = setInterval(() => {
      setAdSeconds(prev => {
        if (prev <= 1) {
          clearInterval(adTimer);
          setAdModalOpen(false);
          claimFreeMysteryChest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="flex flex-col w-full pb-8 select-none">
      {/* Simulated Ad Modal */}
      {adModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-md">
          <div className="relative w-full max-w-[360px] bg-surface-container-high rounded-2xl p-6 shadow-2xl border border-secondary/30 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center text-secondary mb-4 animate-bounce">
              <span className="material-symbols-outlined text-[36px]">ondemand_video</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Watching Sponsor Clip</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              Unlocking Mystery Vault in <strong className="text-secondary">{adSeconds}s</strong>
            </p>
            <div className="w-full bg-surface-container rounded-full h-2 mt-4 overflow-hidden">
              <div
                className="bg-secondary h-full transition-all duration-1000"
                style={{ width: `${((3 - adSeconds) / 3) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Special Offer Featured Hero Banner */}
      <div className="px-space-md pt-space-xs pb-space-sm">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-b from-surface-container-high via-surface-container to-surface-container-low p-space-md shadow-[0_12px_32px_rgba(0,0,0,0.45)]">
          {/* Glow Underlay */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/15 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-secondary/15 rounded-full blur-2xl pointer-events-none"></div>

          {/* Top Row Badges */}
          <div className="flex items-center justify-between gap-space-xs mb-space-sm relative z-10">
            <div className="flex items-center gap-1.5 px-space-sm py-0.5 rounded-full bg-secondary/20 shadow-[0_0_12px_rgba(245,158,11,0.3)]">
              <span
                className="material-symbols-outlined text-secondary text-[16px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                stars
              </span>
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">
                Limited Edition
              </span>
            </div>
            <div className="flex items-center gap-1 px-space-sm py-0.5 rounded-full bg-candy-pink/25 shadow-[0_0_14px_rgba(236,72,153,0.35)]">
              <span className="font-label-sm text-label-sm text-candy-pink uppercase font-extrabold tracking-wider">
                70% OFF
              </span>
            </div>
          </div>

          {/* Main Bundle Title & Skin Highlight */}
          <div className="flex items-start justify-between gap-space-sm relative z-10">
            <div className="flex-1 min-w-0">
              <h2 className="font-headline-md text-headline-md text-on-surface leading-tight font-extrabold tracking-tight">
                Grand Master Bundle
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Dominate the daily grids with the legendary gilded arsenal.
              </p>
            </div>

            {/* 3D Golden Skin Emblem Card */}
            <div className="relative flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-tr from-surface-container-highest to-surface-bright flex items-center justify-center shadow-[0_8px_16px_rgba(0,0,0,0.4)]">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-secondary via-secondary-container to-secondary flex items-center justify-center shadow-[0_4px_12px_rgba(245,158,11,0.5)] transform rotate-3 active:rotate-0 transition-transform">
                <span className="font-tile-letter text-tile-letter text-surface-container-lowest font-black leading-none drop-shadow-md">
                  W
                </span>
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-surface-container-lowest text-[10px] font-bold">
                ★
              </span>
            </div>
          </div>

          {/* Included Perks Pills Grid */}
          <div className="grid grid-cols-2 gap-space-xs my-space-md relative z-10">
            <div className="flex items-center gap-2 bg-surface-container-highest/90 px-space-sm py-1.5 rounded-lg shadow-sm">
              <span
                className="material-symbols-outlined text-secondary text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                monetization_on
              </span>
              <span className="font-label-md text-label-md text-on-surface">2,500 Coins</span>
            </div>
            <div className="flex items-center gap-2 bg-surface-container-highest/90 px-space-sm py-1.5 rounded-lg shadow-sm">
              <span className="material-symbols-outlined text-glow-success text-[18px]">lightbulb</span>
              <span className="font-label-md text-label-md text-on-surface">10x Super Hints</span>
            </div>
            <div className="flex items-center gap-2 bg-surface-container-highest/90 px-space-sm py-1.5 rounded-lg shadow-sm">
              <span className="material-symbols-outlined text-candy-pink text-[18px]">auto_fix_high</span>
              <span className="font-label-md text-label-md text-on-surface">5x Eliminators</span>
            </div>
            <div className="flex items-center gap-2 bg-surface-container-highest/90 px-space-sm py-1.5 rounded-lg shadow-sm">
              <span
                className="material-symbols-outlined text-secondary text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                workspace_premium
              </span>
              <span className="font-label-md text-label-md text-secondary">
                {inventory.goldenSkin ? 'Skin Owned' : 'Golden Skin'}
              </span>
            </div>
          </div>

          {/* Action Button Row with Timer */}
          <div className="flex items-center justify-between gap-space-sm pt-space-xs relative z-10">
            <div className="flex items-center gap-1.5 text-on-surface-variant">
              <span className="material-symbols-outlined text-secondary text-[18px] animate-pulse">
                timer
              </span>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm uppercase text-on-surface-variant leading-none">
                  Expires in
                </span>
                <span className="font-label-md text-label-md text-secondary font-bold leading-tight">
                  {bundleCountdown}
                </span>
              </div>
            </div>
            <button
              onClick={unlockBundle}
              className="relative group flex items-center justify-center gap-2 px-space-lg py-2.5 rounded-xl bg-gradient-to-r from-primary-container via-primary to-glow-success text-on-primary-container font-headline-sm text-headline-sm font-extrabold shadow-[0_6px_20px_rgba(16,185,129,0.4)] active:translate-y-0.5 active:shadow-[0_2px_8px_rgba(16,185,129,0.3)] transition-all cursor-pointer"
            >
              <span className="line-through text-on-primary-container/70 text-[13px] font-normal">
                $29.99
              </span>
              <span className="text-[17px] font-black">$8.99</span>
            </button>
          </div>
        </div>
      </div>

      {/* Daily Vault Chest (Freebie Section) */}
      <div className="px-space-md py-space-xs">
        <div className="relative overflow-hidden rounded-xl bg-surface-container-high p-space-md shadow-[0_8px_20px_rgba(0,0,0,0.3)]">
          <div className="flex items-center gap-space-md">
            {/* Animated 3D Chest Container */}
            <div className="relative flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-b from-surface-bright to-surface-container-highest flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
              <span
                className="material-symbols-outlined text-secondary text-[36px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                inventory_2
              </span>
              <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary"></span>
              </span>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-headline-sm text-headline-sm text-on-surface leading-tight">
                  Mystery Vault
                </span>
                <span className="px-1.5 py-0.2 bg-glow-success/20 text-glow-success font-label-sm text-label-sm rounded uppercase font-bold">
                  Free
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Contains 50-250 Coins + 1 Random Booster.
              </p>
              <div className="flex items-center gap-1.5 mt-1 text-on-surface-variant font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[15px] text-outline">schedule</span>
                <span>
                  Next free drop in: <strong className="text-on-surface">{chestCountdown}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Action Footer for Freebie */}
          <div className="mt-space-md pt-space-xs flex items-center gap-space-sm">
            <button
              onClick={handleWatchAd}
              className="flex-1 flex items-center justify-center gap-2 py-2 px-space-sm rounded-lg bg-surface-bright text-on-surface font-label-md text-label-md shadow-sm active:translate-y-0.5 transition-all cursor-pointer hover:bg-surface-container-highest"
            >
              <span
                className="material-symbols-outlined text-secondary text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                ondemand_video
              </span>
              <span>Watch Ad to Unlock</span>
            </button>
            <button
              onClick={speedClaimChest}
              className="flex items-center justify-center gap-1 px-space-md py-2 rounded-lg bg-surface-container-highest text-secondary font-label-md text-label-md shadow-sm active:translate-y-0.5 transition-all cursor-pointer hover:bg-surface-bright"
            >
              <span className="material-symbols-outlined text-[18px]">bolt</span>
              <span>25</span>
              <span className="material-symbols-outlined text-[14px]">monetization_on</span>
            </button>
          </div>
        </div>
      </div>

      {/* Booster Packs Section Header */}
      <div className="px-space-md pt-space-lg pb-space-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="material-symbols-outlined text-primary text-[22px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            token
          </span>
          <h3 className="font-headline-sm text-headline-sm text-on-surface">Tactical Boosters</h3>
        </div>
        <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
          In-Round Arsenal
        </span>
      </div>

      {/* Boosters Tactical Grid */}
      <div className="px-space-md flex flex-col gap-space-sm">
        {/* Booster 1: Vowel Finder */}
        <div className="rounded-xl bg-surface-container p-space-md shadow-[0_4px_16px_rgba(0,0,0,0.25)] flex flex-col gap-space-sm">
          <div className="flex items-start gap-space-sm">
            <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center flex-shrink-0 shadow-[0_4px_10px_rgba(0,0,0,0.3)]">
              <span className="material-symbols-outlined text-primary text-[26px]">visibility</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="font-label-md text-label-md text-on-surface font-bold text-[16px]">
                  Vowel Finder
                </h4>
                <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-medium">
                  Equipped: {inventory.vowelFinder}
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Scans puzzle and lights up all vowel tile coordinates instantly.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-space-xs mt-1">
            <button
              onClick={() => buyBooster('vowelFinder', 3, 150, '3x Vowel Finder')}
              className="flex items-center justify-between px-space-sm py-2 rounded-lg bg-surface-container-high active:bg-surface-bright active:translate-y-0.5 shadow-sm transition-all cursor-pointer"
            >
              <span className="font-label-md text-label-md text-on-surface font-bold">3-Pack</span>
              <div className="flex items-center gap-1 bg-surface-container px-2 py-0.5 rounded-full">
                <span className="font-label-sm text-label-sm text-secondary font-bold">150</span>
                <span className="material-symbols-outlined text-secondary text-[14px]">monetization_on</span>
              </div>
            </button>
            <button
              onClick={() => buyBooster('vowelFinder', 10, 420, '10x Vowel Finder')}
              className="flex items-center justify-between px-space-sm py-2 rounded-lg bg-surface-container-high active:bg-surface-bright active:translate-y-0.5 shadow-sm transition-all relative overflow-hidden cursor-pointer"
            >
              <div className="flex flex-col items-start leading-none">
                <span className="font-label-md text-label-md text-on-surface font-bold">10-Pack</span>
                <span className="font-label-sm text-label-sm text-glow-success text-[10px] mt-0.5">
                  SAVE 15%
                </span>
              </div>
              <div className="flex items-center gap-1 bg-surface-container px-2 py-0.5 rounded-full">
                <span className="font-label-sm text-label-sm text-secondary font-bold">420</span>
                <span className="material-symbols-outlined text-secondary text-[14px]">monetization_on</span>
              </div>
            </button>
          </div>
        </div>

        {/* Booster 2: Letter Eliminator */}
        <div className="rounded-xl bg-surface-container p-space-md shadow-[0_4px_16px_rgba(0,0,0,0.25)] flex flex-col gap-space-sm">
          <div className="flex items-start gap-space-sm">
            <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center flex-shrink-0 shadow-[0_4px_10px_rgba(0,0,0,0.3)]">
              <span className="material-symbols-outlined text-candy-pink text-[26px]">backspace</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="font-label-md text-label-md text-on-surface font-bold text-[16px]">
                  Letter Eliminator
                </h4>
                <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-medium">
                  Equipped: {inventory.letterEliminator}
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Disintegrates 3 unused slate letters directly from the keyboard.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-space-xs mt-1">
            <button
              onClick={() => buyBooster('letterEliminator', 3, 180, '3x Letter Eliminator')}
              className="flex items-center justify-between px-space-sm py-2 rounded-lg bg-surface-container-high active:bg-surface-bright active:translate-y-0.5 shadow-sm transition-all cursor-pointer"
            >
              <span className="font-label-md text-label-md text-on-surface font-bold">3-Pack</span>
              <div className="flex items-center gap-1 bg-surface-container px-2 py-0.5 rounded-full">
                <span className="font-label-sm text-label-sm text-secondary font-bold">180</span>
                <span className="material-symbols-outlined text-secondary text-[14px]">monetization_on</span>
              </div>
            </button>
            <button
              onClick={() => buyBooster('letterEliminator', 10, 480, '10x Letter Eliminator')}
              className="flex items-center justify-between px-space-sm py-2 rounded-lg bg-surface-container-high active:bg-surface-bright active:translate-y-0.5 shadow-sm transition-all relative overflow-hidden cursor-pointer"
            >
              <div className="flex flex-col items-start leading-none">
                <span className="font-label-md text-label-md text-on-surface font-bold">10-Pack</span>
                <span className="font-label-sm text-label-sm text-glow-success text-[10px] mt-0.5">
                  SAVE 20%
                </span>
              </div>
              <div className="flex items-center gap-1 bg-surface-container px-2 py-0.5 rounded-full">
                <span className="font-label-sm text-label-sm text-secondary font-bold">480</span>
                <span className="material-symbols-outlined text-secondary text-[14px]">monetization_on</span>
              </div>
            </button>
          </div>
        </div>

        {/* Booster 3: Magic Revealer */}
        <div className="rounded-xl bg-surface-container p-space-md shadow-[0_4px_16px_rgba(0,0,0,0.25)] flex flex-col gap-space-sm">
          <div className="flex items-start gap-space-sm">
            <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center flex-shrink-0 shadow-[0_4px_10px_rgba(0,0,0,0.3)]">
              <span className="material-symbols-outlined text-glow-success text-[26px]">flash_on</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="font-label-md text-label-md text-on-surface font-bold text-[16px]">
                  Magic Revealer
                </h4>
                <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-medium">
                  Equipped: {inventory.magicRevealer}
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Locks in exactly 1 unknown green tile in its rightful slot.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-space-xs mt-1">
            <button
              onClick={() => buyBooster('magicRevealer', 1, 250, '1x Magic Revealer')}
              className="flex items-center justify-between px-space-sm py-2 rounded-lg bg-surface-container-high active:bg-surface-bright active:translate-y-0.5 shadow-sm transition-all cursor-pointer"
            >
              <span className="font-label-md text-label-md text-on-surface font-bold">Single Unit</span>
              <div className="flex items-center gap-1 bg-surface-container px-2 py-0.5 rounded-full">
                <span className="font-label-sm text-label-sm text-secondary font-bold">250</span>
                <span className="material-symbols-outlined text-secondary text-[14px]">monetization_on</span>
              </div>
            </button>
            <button
              onClick={() => buyBooster('magicRevealer', 3, 650, '3x Magic Revealer')}
              className="flex items-center justify-between px-space-sm py-2 rounded-lg bg-surface-container-high active:bg-surface-bright active:translate-y-0.5 shadow-sm transition-all relative overflow-hidden cursor-pointer"
            >
              <div className="flex flex-col items-start leading-none">
                <span className="font-label-md text-label-md text-on-surface font-bold">3-Pack</span>
                <span className="font-label-sm text-label-sm text-glow-success text-[10px] mt-0.5">
                  POPULAR
                </span>
              </div>
              <div className="flex items-center gap-1 bg-surface-container px-2 py-0.5 rounded-full">
                <span className="font-label-sm text-label-sm text-secondary font-bold">650</span>
                <span className="material-symbols-outlined text-secondary text-[14px]">monetization_on</span>
              </div>
            </button>
          </div>
        </div>

        {/* Booster 4: Shuffle Rewind */}
        <div className="rounded-xl bg-surface-container p-space-md shadow-[0_4px_16px_rgba(0,0,0,0.25)] flex flex-col gap-space-sm">
          <div className="flex items-start gap-space-sm">
            <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center flex-shrink-0 shadow-[0_4px_10px_rgba(0,0,0,0.3)]">
              <span className="material-symbols-outlined text-tertiary text-[26px]">replay</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="font-label-md text-label-md text-on-surface font-bold text-[16px]">
                  Shuffle Rewind
                </h4>
                <span className="font-label-sm text-label-sm px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-medium">
                  Equipped: {inventory.shuffleRewind}
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Undo your last invalid row and receive an anagram hint.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-space-xs mt-1">
            <button
              onClick={() => buyBooster('shuffleRewind', 2, 120, '2x Shuffle Rewind')}
              className="flex items-center justify-between px-space-sm py-2 rounded-lg bg-surface-container-high active:bg-surface-bright active:translate-y-0.5 shadow-sm transition-all cursor-pointer"
            >
              <span className="font-label-md text-label-md text-on-surface font-bold">2-Pack</span>
              <div className="flex items-center gap-1 bg-surface-container px-2 py-0.5 rounded-full">
                <span className="font-label-sm text-label-sm text-secondary font-bold">120</span>
                <span className="material-symbols-outlined text-secondary text-[14px]">monetization_on</span>
              </div>
            </button>
            <button
              onClick={() => buyBooster('shuffleRewind', 6, 300, '6x Shuffle Rewind')}
              className="flex items-center justify-between px-space-sm py-2 rounded-lg bg-surface-container-high active:bg-surface-bright active:translate-y-0.5 shadow-sm transition-all relative overflow-hidden cursor-pointer"
            >
              <div className="flex flex-col items-start leading-none">
                <span className="font-label-md text-label-md text-on-surface font-bold">6-Pack</span>
                <span className="font-label-sm text-label-sm text-glow-success text-[10px] mt-0.5">
                  HOT VALUE
                </span>
              </div>
              <div className="flex items-center gap-1 bg-surface-container px-2 py-0.5 rounded-full">
                <span className="font-label-sm text-label-sm text-secondary font-bold">300</span>
                <span className="material-symbols-outlined text-secondary text-[14px]">monetization_on</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Coin Vault Section Header */}
      <div className="px-space-md pt-space-lg pb-space-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="material-symbols-outlined text-secondary text-[22px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            savings
          </span>
          <h3 className="font-headline-sm text-headline-sm text-on-surface">Coin Treasury</h3>
        </div>
        <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
          Instant Refill
        </span>
      </div>

      {/* Coin Vault Tiers */}
      <div className="px-space-md flex flex-col gap-space-sm">
        {/* Tier 1: Pouch of 500 Coins */}
        <div className="relative overflow-hidden rounded-xl bg-surface-container p-space-md shadow-[0_4px_16px_rgba(0,0,0,0.25)] flex items-center justify-between gap-space-sm">
          <div className="flex items-center gap-space-md">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-surface-container-high to-surface-bright flex items-center justify-center shadow-inner flex-shrink-0">
              <span
                className="material-symbols-outlined text-secondary text-[32px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                paid
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-headline-sm text-headline-sm text-on-surface leading-snug">
                500 Coins
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Pouch of Gold</span>
            </div>
          </div>
          <button
            onClick={() => buyCoins(500, '$1.99')}
            className="px-space-md py-2.5 rounded-xl bg-surface-bright text-secondary font-headline-sm text-headline-sm font-bold shadow-sm active:translate-y-0.5 transition-all cursor-pointer hover:bg-surface-container-highest"
          >
            $1.99
          </button>
        </div>

        {/* Tier 2: Chest of 2,500 Coins (Most Popular) */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-surface-container-high via-surface-container to-surface-container p-space-md shadow-[0_6px_20px_rgba(0,0,0,0.35)] flex items-center justify-between gap-space-sm">
          <div className="absolute -top-1 right-6 bg-gradient-to-r from-primary to-primary-container px-space-sm py-0.5 rounded-b-md shadow-sm">
            <span className="font-label-sm text-label-sm text-on-primary-container font-extrabold uppercase tracking-wider text-[10px]">
              Most Popular
            </span>
          </div>
          <div className="flex items-center gap-space-md">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-surface-container-high to-surface-bright flex items-center justify-center shadow-inner flex-shrink-0">
              <span
                className="material-symbols-outlined text-secondary text-[34px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                currency_exchange
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-headline-sm text-headline-sm text-on-surface leading-snug">
                  2,500 Coins
                </span>
              </div>
              <span className="font-body-sm text-body-sm text-primary font-bold">
                +250 Bonus Coins
              </span>
            </div>
          </div>
          <button
            onClick={() => buyCoins(2750, '$4.99')}
            className="px-space-md py-2.5 rounded-xl bg-gradient-to-r from-primary-container to-primary text-on-primary-container font-headline-sm text-headline-sm font-extrabold shadow-[0_4px_14px_rgba(16,185,129,0.35)] active:translate-y-0.5 transition-all cursor-pointer"
          >
            $4.99
          </button>
        </div>

        {/* Tier 3: Vault of 10,000 Coins (Best Value) */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-surface-container-highest via-surface-container-high to-surface-container p-space-md shadow-[0_8px_24px_rgba(0,0,0,0.45)] flex items-center justify-between gap-space-sm">
          <div className="absolute -top-1 right-6 bg-gradient-to-r from-secondary-container to-secondary px-space-sm py-0.5 rounded-b-md shadow-sm">
            <span className="font-label-sm text-label-sm text-on-secondary-container font-extrabold uppercase tracking-wider text-[10px]">
              Best Value
            </span>
          </div>
          <div className="flex items-center gap-space-md">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-surface-container-highest to-surface-bright flex items-center justify-center shadow-inner flex-shrink-0">
              <span
                className="material-symbols-outlined text-secondary text-[36px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                lock_open
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-headline-sm text-headline-sm text-secondary font-black leading-snug">
                10,000 Coins
              </span>
              <span className="font-body-sm text-body-sm text-glow-success font-bold">
                +2,000 Bonus Coins
              </span>
            </div>
          </div>
          <button
            onClick={() => buyCoins(12000, '$14.99')}
            className="px-space-md py-2.5 rounded-xl bg-gradient-to-r from-secondary to-secondary-container text-on-secondary-container font-headline-sm text-headline-sm font-black shadow-[0_4px_16px_rgba(245,158,11,0.35)] active:translate-y-0.5 transition-all cursor-pointer"
          >
            $14.99
          </button>
        </div>
      </div>

      {/* Trust & Restore Purchases Safe Footer */}
      <div className="px-space-md pt-space-lg pb-space-xs text-center flex flex-col items-center gap-space-xs">
        <div className="flex items-center gap-4">
          <button
            className="font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface underline tracking-wider uppercase cursor-pointer"
            onClick={() => showToast('Restoring previous purchases... Restored!')}
          >
            Restore Purchases
          </button>
          <span className="text-outline text-[12px]">•</span>
          <button
            className="font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface underline tracking-wider uppercase cursor-pointer"
            onClick={() => showToast('Cloud Sync Active: Player save updated')}
          >
            Cloud Save
          </button>
          <span className="text-outline text-[12px]">•</span>
          <button
            className="font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface underline tracking-wider uppercase cursor-pointer"
            onClick={() => showToast('Terms of Play: WordCraft Fair League System')}
          >
            Terms
          </button>
        </div>
        <div className="flex items-center gap-1.5 text-on-surface-variant/70 mt-1">
          <span className="material-symbols-outlined text-[14px]">lock</span>
          <span className="font-body-sm text-body-sm text-[11px]">
            Guaranteed safe checkout & instantaneous delivery
          </span>
        </div>
      </div>
    </div>
  );
};
