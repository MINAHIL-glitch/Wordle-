import React, { useState, useEffect } from 'react';
import { useGame, SolvedDayInfo } from '../context/GameContext';

export const DailyScreen: React.FC = () => {
  const { streak, solvedCalendar, startMode, showToast } = useGame();
  const [chestTimer, setChestTimer] = useState<string>('14:28:37');
  const [selectedDayInfo, setSelectedDayInfo] = useState<{ day: number; info: SolvedDayInfo } | null>(null);

  // Countdown timer for mystery chest
  useEffect(() => {
    let totalSeconds = 14 * 3600 + 28 * 60 + 37;
    const interval = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds--;
        const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
        const seconds = String(totalSeconds % 60).padStart(2, '0');
        setChestTimer(`${hours}:${minutes}:${seconds}`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const totalMastered = Object.values(solvedCalendar).filter(d => d.solved).length;

  return (
    <div className="flex flex-col w-full px-space-md py-space-sm gap-space-lg select-none">
      {/* Top Hero Streak & Reward Card */}
      <div className="relative overflow-hidden rounded-xl bg-surface-container-high p-space-md shadow-xl">
        <div className="absolute -right-12 -top-12 w-44 h-44 rounded-full bg-gradient-to-br from-secondary/20 via-primary/10 to-transparent blur-2xl pointer-events-none"></div>
        <div className="absolute -left-10 -bottom-10 w-36 h-36 rounded-full bg-candy-pink/10 blur-xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col gap-space-md">
          {/* Streak Banner & Badge Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-sm">
              <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center shadow-[0_0_16px_rgba(245,158,11,0.3)]">
                <span
                  className="material-symbols-outlined text-secondary text-[30px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  local_fire_department
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Unstoppable Heat
                </span>
                <div className="flex items-center gap-1">
                  <span className="font-headline-md text-headline-md text-secondary">
                    {streak} Days
                  </span>
                  <span className="font-headline-sm text-headline-sm text-on-surface">
                    Streak!
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <span className="px-space-sm py-0.5 rounded-full bg-secondary-container/20 text-secondary font-label-sm text-label-sm shadow-[0_0_12px_rgba(245,158,11,0.25)] flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">shield</span> Tier IV
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant mt-1">
                Multiplier 1.5x
              </span>
            </div>
          </div>

          {/* Monthly Ring & Mystery Reward Split Bento */}
          <div className="grid grid-cols-2 gap-space-sm pt-space-xs">
            {/* Monthly Completion Progress Ring Card */}
            <div className="flex items-center gap-space-sm bg-surface-container-low p-space-sm rounded-xl">
              <div className="relative w-14 h-14 flex-shrink-0 flex items-center justify-center">
                <svg className="w-14 h-14 -rotate-90" viewBox="0 0 48 48">
                  <circle
                    className="text-surface-container-highest"
                    cx="24"
                    cy="24"
                    fill="none"
                    r="18"
                    stroke="currentColor"
                    strokeWidth="4.5"
                  />
                  <circle
                    className="text-primary transition-all duration-500"
                    cx="24"
                    cy="24"
                    fill="none"
                    r="18"
                    stroke="currentColor"
                    strokeDasharray="113.1"
                    strokeDashoffset={Math.max(0, 113.1 - (113.1 * totalMastered) / 28)}
                    strokeLinecap="round"
                    strokeWidth="4.5"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-label-md text-label-md text-primary leading-none font-extrabold">
                    {Math.round((totalMastered / 28) * 100)}%
                  </span>
                </div>
              </div>

              <div className="flex flex-col min-w-0">
                <span className="font-label-sm text-label-sm text-on-surface-variant">Monthly Goal</span>
                <span className="font-label-md text-label-md text-on-surface font-bold truncate">
                  {totalMastered} / 28 Done
                </span>
                <span className="font-label-sm text-label-sm text-primary flex items-center gap-0.5">
                  +{Math.max(0, 25 - totalMastered)} to Master
                </span>
              </div>
            </div>

            {/* Mystery Chest Unlocking Card */}
            <div
              onClick={() => showToast('Unlock the chest at 25 days streak in 1 day!')}
              className="relative bg-surface-container-low p-space-sm rounded-xl flex items-center gap-space-sm overflow-hidden group cursor-pointer active:scale-95 transition-transform"
            >
              <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center relative flex-shrink-0 shadow-[0_0_16px_rgba(255,185,95,0.2)]">
                <span
                  className="material-symbols-outlined text-secondary text-[26px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  lock_open
                </span>
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-candy-pink shadow-[0_0_8px_rgba(236,72,153,0.8)]"></span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1">
                  <span className="font-label-sm text-label-sm text-secondary font-bold truncate">
                    Chest at 25
                  </span>
                </div>
                <span className="font-label-md text-label-md text-on-surface font-bold">1 Day Left!</span>
                <div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[12px]">alarm</span>
                  <span className="font-mono">{chestTimer}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Special Weekly Event Banner */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-surface-container-highest via-surface-container-high to-surface-container-highest p-space-md shadow-lg">
        <div className="absolute -left-6 -bottom-6 w-32 h-32 rounded-full bg-candy-pink/15 blur-2xl pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-28 opacity-10 bg-gradient-to-l from-candy-pink to-transparent pointer-events-none"></div>

        <div className="relative z-10 flex flex-col gap-space-sm">
          <div className="flex items-center justify-between">
            <span className="px-space-sm py-0.5 rounded-full bg-candy-pink/20 text-candy-pink font-label-sm text-label-sm flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px]">mode_fan</span> Spooky Mini-Season
            </span>
            <div className="flex items-center gap-1 text-secondary bg-surface-container-lowest px-2 py-0.5 rounded-full shadow-inner">
              <span className="material-symbols-outlined text-[15px]">monetization_on</span>
              <span className="font-label-sm text-label-sm font-bold">+500 Bonus</span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-space-sm">
            <div className="flex flex-col min-w-0">
              <h3 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-1.5">
                Halloween Word Haunt
                <span className="material-symbols-outlined text-secondary text-[20px]">cruelty_free</span>
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">
                7 unique eerie puzzles with rare collectible badge.
              </p>
            </div>
            <button
              onClick={() => startMode('halloween')}
              className="flex-shrink-0 px-space-md py-2.5 rounded-lg bg-primary text-on-primary font-label-md text-label-md shadow-[0_4px_14px_rgba(16,185,129,0.35)] active:translate-y-0.5 transition-all flex items-center gap-1 cursor-pointer"
              type="button"
            >
              <span>Enter</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      {/* Month Selector & Calendar Hub Section */}
      <div className="flex flex-col gap-space-sm">
        {/* Month Header */}
        <div className="flex items-center justify-between bg-surface-container-high px-space-md py-space-sm rounded-xl">
          <button
            onClick={() => showToast('Previous month: September 2024 archived')}
            aria-label="Previous month"
            className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface active:scale-95 transition-transform"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">chevron_left</span>
          </button>
          <div className="flex flex-col items-center">
            <span className="font-headline-sm text-headline-sm text-on-surface tracking-wide flex items-center gap-1">
              October 2024
            </span>
            <span className="font-label-sm text-label-sm text-primary tracking-widest uppercase">
              {totalMastered}/31 Days Mastered
            </span>
          </div>
          <button
            onClick={() => showToast('Next month: November 2024 unlocks soon')}
            aria-label="Next month"
            className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface active:scale-95 transition-transform"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">chevron_right</span>
          </button>
        </div>

        {/* Calendar Legend Pill Row */}
        <div className="flex items-center justify-around px-space-xs py-1 text-on-surface-variant">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-tile-correct"></span>
            <span className="font-label-sm text-label-sm">Solved</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
            <span className="font-label-sm text-label-sm">3-Guess Star</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-tertiary-container shadow-[0_0_8px_rgba(150,153,255,0.6)]"></span>
            <span className="font-label-sm text-label-sm">Today</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-surface-container-highest"></span>
            <span className="font-label-sm text-label-sm">Locked</span>
          </div>
        </div>

        {/* Days of Week Header */}
        <div className="grid grid-cols-7 gap-1 text-center font-label-sm text-label-sm text-on-surface-variant pt-1">
          <div>M</div>
          <div>T</div>
          <div>W</div>
          <div>T</div>
          <div>F</div>
          <div>S</div>
          <div>S</div>
        </div>

        {/* Calendar 7x5 Grid */}
        <div className="grid grid-cols-7 gap-1.5 p-space-xs rounded-xl bg-surface-container-low shadow-inner">
          {/* Prior Month Bleed */}
          <div className="aspect-square rounded-lg bg-surface-container-lowest/60 flex items-center justify-center opacity-30">
            <span className="font-label-sm text-label-sm text-on-surface-variant">29</span>
          </div>
          <div className="aspect-square rounded-lg bg-surface-container-lowest/60 flex items-center justify-center opacity-30">
            <span className="font-label-sm text-label-sm text-on-surface-variant">30</span>
          </div>

          {/* Days 1 to 21 */}
          {Array.from({ length: 21 }, (_, i) => {
            const dayNum = i + 1;
            const dayInfo = solvedCalendar[dayNum];
            const hasStar = dayInfo?.star;
            return (
              <button
                key={dayNum}
                onClick={() => setSelectedDayInfo({ day: dayNum, info: dayInfo })}
                className="aspect-square rounded-lg bg-tile-correct text-on-primary flex flex-col items-center justify-center relative shadow-[0_3px_8px_rgba(16,185,129,0.25)] active:scale-95 transition-transform overflow-hidden cursor-pointer"
                type="button"
                title={`Day ${dayNum}: Solved (${dayInfo?.word || 'Word'}) in ${dayInfo?.guesses || 4} guesses`}
              >
                {hasStar && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full flex items-center justify-center shadow-md">
                    <span
                      className="material-symbols-outlined text-surface text-[11px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  </div>
                )}
                <span className="font-label-md text-label-md font-bold leading-none">{dayNum}</span>
                <span className="material-symbols-outlined text-[13px] leading-none mt-0.5">check</span>
              </button>
            );
          })}

          {/* Day 22: TODAY (Ready to Play! Glow state) */}
          <button
            onClick={() => startMode('daily')}
            className={`aspect-square rounded-lg ${
              solvedCalendar[22]?.solved
                ? 'bg-tile-correct text-on-primary'
                : 'bg-tertiary-container text-on-tertiary-container shadow-[0_0_18px_rgba(150,153,255,0.7)] animate-pulse'
            } flex flex-col items-center justify-center relative active:scale-90 transition-transform cursor-pointer`}
            id="today-play-btn"
            type="button"
            title="Today's Challenge #241"
          >
            <span className="font-label-md text-label-md font-extrabold leading-none">22</span>
            <span className="material-symbols-outlined text-[15px] leading-none mt-0.5">
              {solvedCalendar[22]?.solved ? 'check' : 'play_arrow'}
            </span>
          </button>

          {/* Locked Future Days 23 to 31 */}
          {Array.from({ length: 9 }, (_, i) => {
            const dayNum = i + 23;
            return (
              <div
                key={dayNum}
                onClick={() => showToast(`Day ${dayNum} unlocks on October ${dayNum}!`)}
                className="aspect-square rounded-lg bg-surface-container flex flex-col items-center justify-center opacity-65 text-on-surface-variant cursor-not-allowed"
              >
                <span className="font-label-md text-label-md leading-none">{dayNum}</span>
                <span className="material-symbols-outlined text-[12px] leading-none mt-0.5">lock</span>
              </div>
            );
          })}

          {/* Future Month Bleed */}
          <div className="aspect-square rounded-lg bg-surface-container-lowest/60 flex items-center justify-center opacity-30">
            <span className="font-label-sm text-label-sm text-on-surface-variant">1</span>
          </div>
          <div className="aspect-square rounded-lg bg-surface-container-lowest/60 flex items-center justify-center opacity-30">
            <span className="font-label-sm text-label-sm text-on-surface-variant">2</span>
          </div>
        </div>
      </div>

      {/* Selected Day Archive Modal */}
      {selectedDayInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
          <div className="relative w-full max-w-[360px] bg-surface-container-high rounded-2xl p-space-md shadow-2xl border border-surface-container-highest animate-tile-pop text-center">
            <div className="w-12 h-12 rounded-full bg-tile-correct/20 text-tile-correct flex items-center justify-center mx-auto mb-2">
              <span className="material-symbols-outlined text-[28px]">verified</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">
              October {selectedDayInfo.day}, 2024
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              Daily Mastered Word:
            </p>
            <div className="flex justify-center gap-1.5 my-3">
              {selectedDayInfo.info.word.split('').map((letter, idx) => (
                <div
                  key={idx}
                  className="w-10 h-10 rounded-lg bg-tile-correct text-on-primary font-tile-letter text-[20px] font-black flex items-center justify-center shadow-md"
                >
                  {letter}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-2 text-on-surface-variant font-label-md text-label-md mb-4">
              <span>Solved in {selectedDayInfo.info.guesses} Guesses</span>
              {selectedDayInfo.info.star && (
                <span className="px-2 py-0.5 rounded-full bg-secondary/20 text-secondary flex items-center gap-1 font-bold">
                  ★ 3-Guess Star
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setSelectedDayInfo(null);
                  startMode('classic');
                }}
                className="flex-1 py-2.5 rounded-xl bg-surface-container-highest text-on-surface font-label-md text-label-md"
              >
                Replay Archive
              </button>
              <button
                onClick={() => setSelectedDayInfo(null)}
                className="flex-1 py-2.5 rounded-xl bg-primary text-on-primary font-label-md text-label-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Today's Quick Play Tactical CTA Card */}
      <div className="rounded-xl bg-surface-container-high p-space-md flex items-center justify-between shadow-lg relative overflow-hidden">
        <div className="flex items-center gap-space-sm min-w-0">
          <div className="w-11 h-11 rounded-xl bg-tertiary-container text-on-tertiary-container flex items-center justify-center flex-shrink-0 shadow-[0_0_14px_rgba(150,153,255,0.4)]">
            <span className="material-symbols-outlined text-[26px]">edit_calendar</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-headline-sm text-headline-sm text-on-surface leading-tight truncate">
              Today's Daily #241
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
              Keep your {streak}-day streak alive!
            </span>
          </div>
        </div>
        <button
          onClick={() => startMode('daily')}
          className="flex-shrink-0 px-space-lg py-3 rounded-xl bg-primary text-on-primary font-headline-sm text-headline-sm shadow-[0_4px_16px_rgba(16,185,129,0.4)] active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
          type="button"
        >
          <span>Play</span>
          <span className="material-symbols-outlined text-[20px]">bolt</span>
        </button>
      </div>

      {/* Daily Puzzle Archives & Modes Section */}
      <div className="flex flex-col gap-space-sm pb-space-sm">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-on-surface">Archive Modes</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Replay past themes & custom difficulties
            </span>
          </div>
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-bold">
            3 Modes
          </span>
        </div>

        {/* Mode Filter Card Stack */}
        <div className="flex flex-col gap-space-sm">
          {/* Classic 5-Letter Card */}
          <div
            onClick={() => startMode('classic')}
            className="p-space-md rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors flex items-center justify-between group cursor-pointer shadow-md"
          >
            <div className="flex items-center gap-space-md min-w-0">
              <div className="w-12 h-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[28px]">spellcheck</span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-label-md text-label-md text-on-surface font-extrabold truncate">
                    Classic 5-Letter
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-primary/20 text-primary font-label-sm text-label-sm">
                    Standard
                  </span>
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                  Unlimited historical archive catalog
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="font-label-sm text-label-sm text-on-surface-variant">342 Solved</span>
              <span className="material-symbols-outlined text-on-surface-variant text-[20px] group-hover:text-primary transition-colors">
                chevron_right
              </span>
            </div>
          </div>

          {/* Hardcore 6-Letter Card */}
          <div
            onClick={() => startMode('hardcore')}
            className="p-space-md rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors flex items-center justify-between group cursor-pointer shadow-md"
          >
            <div className="flex items-center gap-space-md min-w-0">
              <div className="w-12 h-12 rounded-xl bg-candy-pink/15 text-candy-pink flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[28px]">psychology</span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-label-md text-label-md text-on-surface font-extrabold truncate">
                    Hardcore 6-Letter
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-candy-pink/20 text-candy-pink font-label-sm text-label-sm">
                    Hard
                  </span>
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                  Strict dictionary rules with rare vocabulary
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="font-label-sm text-label-sm text-on-surface-variant">88 Solved</span>
              <span className="material-symbols-outlined text-on-surface-variant text-[20px] group-hover:text-candy-pink transition-colors">
                chevron_right
              </span>
            </div>
          </div>

          {/* Speed Rush (2 Min) Card */}
          <div
            onClick={() => startMode('speedrush')}
            className="p-space-md rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors flex items-center justify-between group cursor-pointer shadow-md"
          >
            <div className="flex items-center gap-space-md min-w-0">
              <div className="w-12 h-12 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[28px]">timer</span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-label-md text-label-md text-on-surface font-extrabold truncate">
                    Speed Rush (2 Min)
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-secondary/20 text-secondary font-label-sm text-label-sm">
                    Time Trial
                  </span>
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                  Rapid anagram solving against the clock
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="font-label-sm text-label-sm text-secondary font-bold">Top: 18 wpm</span>
              <span className="material-symbols-outlined text-on-surface-variant text-[20px] group-hover:text-secondary transition-colors">
                chevron_right
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
