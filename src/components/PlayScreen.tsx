import React, { useState } from 'react';
import { useGame, GameMode } from '../context/GameContext';

export const PlayScreen: React.FC = () => {
  const {
    gameMode,
    startMode,
    restartCurrentGame,
    targetWord,
    wordLength,
    maxGuesses,
    guesses,
    currentGuess,
    currentRow,
    gameStatus,
    keyboardStatus,
    eliminatedLetters,
    revealedPositions,
    inventory,
    useBooster,
    addLetter,
    removeLetter,
    submitGuess,
    speedRushSeconds,
    speedRushScore,
    duelOpponent,
    showToast,
    setActiveTab,
    userStats,
  } = useGame();

  const [shareCopied, setShareCopied] = useState(false);

  // Keyboard layout
  const KEYBOARD_ROWS = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
  ];

  // Helper for mode title and badge
  const getModeDetails = () => {
    switch (gameMode) {
      case 'daily':
        return { title: "Today's Daily #241", badge: 'Daily', badgeColor: 'bg-primary/20 text-primary' };
      case 'halloween':
        return { title: 'Halloween Word Haunt', badge: '+500 Bonus', badgeColor: 'bg-candy-pink/20 text-candy-pink' };
      case 'hardcore':
        return { title: 'Hardcore 6-Letter', badge: 'Hard', badgeColor: 'bg-secondary/20 text-secondary' };
      case 'speedrush':
        return {
          title: `Speed Rush (${Math.floor(speedRushSeconds / 60)}:${String(speedRushSeconds % 60).padStart(2, '0')})`,
          badge: `Score: ${speedRushScore}`,
          badgeColor: 'bg-secondary/20 text-secondary'
        };
      case 'duel':
        return { title: 'Word Duel vs SpellCraft', badge: '+45 Trophies', badgeColor: 'bg-glow-success/20 text-glow-success' };
      case 'classic':
      default:
        return { title: 'Classic 5-Letter', badge: 'Archive', badgeColor: 'bg-primary/20 text-primary' };
    }
  };

  const modeDetails = getModeDetails();

  // Share result to clipboard
  const handleShare = () => {
    let text = `WordCraft - ${modeDetails.title}\n`;
    text += `${gameStatus === 'won' ? guesses.length : 'X'}/${maxGuesses}\n\n`;

    guesses.forEach(row => {
      row.forEach(letter => {
        if (letter.status === 'correct') text += '🟩';
        else if (letter.status === 'present') text += '🟨';
        else text += '⬛';
      });
      text += '\n';
    });

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setShareCopied(true);
      showToast('Result copied to clipboard!');
      setTimeout(() => setShareCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col w-full px-space-md py-space-sm gap-space-md select-none">
      {/* Mode Bar & Quick Selector */}
      <div className="flex flex-col gap-2 bg-surface-container-high p-3 rounded-xl shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-headline-sm text-[17px] text-on-surface font-extrabold truncate">
              {modeDetails.title}
            </span>
            <span className={`px-2 py-0.5 rounded-full font-label-sm text-[11px] font-bold ${modeDetails.badgeColor}`}>
              {modeDetails.badge}
            </span>
          </div>
          <button
            onClick={restartCurrentGame}
            className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface active:scale-95 transition-transform cursor-pointer"
            title="Restart Puzzle"
          >
            <span className="material-symbols-outlined text-[18px]">replay</span>
          </button>
        </div>

        {/* Quick Mode Toggle Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
          {[
            { id: 'daily', label: 'Daily #241' },
            { id: 'classic', label: 'Classic' },
            { id: 'halloween', label: 'Spooky Haunt' },
            { id: 'hardcore', label: '6-Letter' },
            { id: 'speedrush', label: 'Speed 2m' },
            { id: 'duel', label: 'Word Duel' },
          ].map(m => (
            <button
              key={m.id}
              onClick={() => startMode(m.id as GameMode)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                gameMode === m.id
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Duel Opponent Live Progress Bar (if in Duel mode) */}
      {gameMode === 'duel' && duelOpponent && (
        <div className="bg-surface-container p-3 rounded-xl flex items-center justify-between shadow-sm border border-secondary/20">
          <div className="flex items-center gap-2.5">
            <img
              className="w-9 h-9 rounded-full object-cover border border-secondary"
              src={duelOpponent.avatar}
              alt={duelOpponent.name}
            />
            <div className="flex flex-col">
              <span className="font-label-md text-label-md text-on-surface font-bold">
                {duelOpponent.name} (Rank #1)
              </span>
              <span className="font-body-sm text-[11px] text-secondary">
                {duelOpponent.hasWon ? 'Completed!' : `Attempt ${duelOpponent.guesses.length + 1} of 6...`}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i < duelOpponent.guesses.length
                    ? duelOpponent.guesses[i]?.every(l => l.status === 'correct')
                      ? 'bg-tile-correct shadow-[0_0_8px_rgba(16,185,129,0.8)]'
                      : 'bg-secondary'
                    : 'bg-surface-container-highest'
                }`}
              ></div>
            ))}
          </div>
        </div>
      )}

      {/* Tactical Boosters In-Round Arsenal Bar */}
      <div className="flex items-center justify-between bg-surface-container p-2 rounded-xl shadow-inner gap-1">
        {/* Booster 1: Vowel Finder */}
        <button
          onClick={() => useBooster('vowelFinder')}
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-lg bg-surface-container-high hover:bg-surface-bright active:scale-95 transition-all relative cursor-pointer group"
          title="Vowel Finder: Scan and light up vowel positions"
        >
          <span className="material-symbols-outlined text-primary text-[20px]">visibility</span>
          <span className="font-label-sm text-[10px] text-on-surface font-bold mt-0.5">Vowels</span>
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-on-primary text-[9px] font-black flex items-center justify-center shadow">
            {inventory.vowelFinder}
          </span>
        </button>

        {/* Booster 2: Letter Eliminator */}
        <button
          onClick={() => useBooster('letterEliminator')}
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-lg bg-surface-container-high hover:bg-surface-bright active:scale-95 transition-all relative cursor-pointer group"
          title="Letter Eliminator: Disintegrates 3 unused letters from keyboard"
        >
          <span className="material-symbols-outlined text-candy-pink text-[20px]">backspace</span>
          <span className="font-label-sm text-[10px] text-on-surface font-bold mt-0.5">Eliminate</span>
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-candy-pink text-surface-container-lowest text-[9px] font-black flex items-center justify-center shadow">
            {inventory.letterEliminator}
          </span>
        </button>

        {/* Booster 3: Magic Revealer */}
        <button
          onClick={() => useBooster('magicRevealer')}
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-lg bg-surface-container-high hover:bg-surface-bright active:scale-95 transition-all relative cursor-pointer group"
          title="Magic Revealer: Locks in 1 unknown green tile"
        >
          <span className="material-symbols-outlined text-glow-success text-[20px]">flash_on</span>
          <span className="font-label-sm text-[10px] text-on-surface font-bold mt-0.5">Reveal</span>
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-glow-success text-surface-container-lowest text-[9px] font-black flex items-center justify-center shadow">
            {inventory.magicRevealer}
          </span>
        </button>

        {/* Booster 4: Shuffle Rewind */}
        <button
          onClick={() => useBooster('shuffleRewind')}
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-lg bg-surface-container-high hover:bg-surface-bright active:scale-95 transition-all relative cursor-pointer group"
          title="Shuffle Rewind: Undo last row + anagram hint"
        >
          <span className="material-symbols-outlined text-tertiary text-[20px]">replay</span>
          <span className="font-label-sm text-[10px] text-on-surface font-bold mt-0.5">Rewind</span>
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-tertiary text-on-tertiary text-[9px] font-black flex items-center justify-center shadow">
            {inventory.shuffleRewind}
          </span>
        </button>

        {/* Shop Quick Buy */}
        <button
          onClick={() => setActiveTab('shop')}
          className="w-10 h-12 flex flex-col items-center justify-center rounded-lg bg-secondary/15 text-secondary hover:bg-secondary/25 active:scale-95 transition-all cursor-pointer"
          title="Restock boosters in Shop"
        >
          <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
          <span className="font-label-sm text-[9px] font-bold">Shop</span>
        </button>
      </div>

      {/* Game Board Matrix (5 or 6 columns x 6 rows) */}
      <div className="flex flex-col items-center justify-center gap-1.5 my-1">
        {Array.from({ length: maxGuesses }).map((_, rowIdx) => {
          const isCurrentRow = rowIdx === currentRow;
          const guessRow = guesses[rowIdx];

          return (
            <div
              key={rowIdx}
              className={`flex items-center justify-center gap-1.5 w-full max-w-[360px] ${
                isCurrentRow && gameStatus === 'playing' ? '' : ''
              }`}
            >
              {Array.from({ length: wordLength }).map((_, colIdx) => {
                let letter = '';
                let tileStatus: 'empty' | 'pop' | 'correct' | 'present' | 'absent' = 'empty';

                if (guessRow) {
                  letter = guessRow[colIdx]?.letter || '';
                  tileStatus = guessRow[colIdx]?.status || 'absent';
                } else if (isCurrentRow) {
                  letter = currentGuess[colIdx] || '';
                  tileStatus = letter ? 'pop' : 'empty';
                }

                // If revealed by Magic Revealer booster
                const isMagicRevealed = revealedPositions[colIdx] !== undefined;
                if (!guessRow && !letter && isMagicRevealed) {
                  letter = revealedPositions[colIdx];
                  tileStatus = 'correct';
                }

                // Styling logic matching design spec
                let tileClasses =
                  'aspect-square flex-1 max-w-[58px] rounded-lg font-tile-letter text-tile-letter font-black flex items-center justify-center transition-all duration-300 relative select-none ';

                if (tileStatus === 'empty') {
                  tileClasses +=
                    'border-2 border-tile-border/40 bg-tile-empty/60 text-on-surface shadow-inner';
                } else if (tileStatus === 'pop') {
                  tileClasses +=
                    'border-2 border-outline bg-tile-empty text-on-surface shadow-[0_0_12px_rgba(134,148,138,0.4)] animate-tile-pop';
                } else if (tileStatus === 'correct') {
                  tileClasses +=
                    'bg-tile-correct text-on-primary border-b-[3px] border-[#0b8058] shadow-[0_4px_14px_rgba(16,185,129,0.4)] animate-tile-flip';
                } else if (tileStatus === 'present') {
                  tileClasses +=
                    'bg-tile-present text-on-primary border-b-[3px] border-[#b47100] shadow-[0_4px_14px_rgba(245,158,11,0.4)] animate-tile-flip';
                } else if (tileStatus === 'absent') {
                  tileClasses +=
                    'bg-tile-absent text-on-surface-variant/70 border-b-[2px] border-surface-container-highest animate-tile-flip';
                }

                return (
                  <div key={colIdx} className={tileClasses}>
                    {letter}
                    {isMagicRevealed && !guessRow && (
                      <span className="absolute -top-1 -right-1 text-[10px]">✨</span>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Tactile Virtual Keyboard */}
      <div className="flex flex-col gap-1.5 w-full max-w-[480px] mx-auto mt-1">
        {KEYBOARD_ROWS.map((row, rIdx) => (
          <div key={rIdx} className="flex items-center justify-center gap-1 w-full">
            {row.map(key => {
              const isEnter = key === 'ENTER';
              const isBackspace = key === 'BACKSPACE';
              const isEliminated = eliminatedLetters.has(key);
              const status = keyboardStatus[key];

              let keyStyle =
                'flex items-center justify-center font-keyboard-letter font-bold rounded-md select-none transition-all active:translate-y-[2px] cursor-pointer ';

              // Width sizing
              if (isEnter || isBackspace) {
                keyStyle += 'flex-[1.5] h-12 text-[12px] px-1 ';
              } else {
                keyStyle += 'flex-1 h-12 text-[15px] ';
              }

              // Color coding
              if (isEliminated) {
                keyStyle +=
                  'bg-surface-container-lowest/40 text-on-surface-variant/30 line-through opacity-35 border-b-[2px] border-surface-container-lowest pointer-events-none ';
              } else if (status === 'correct') {
                keyStyle +=
                  'bg-tile-correct text-on-primary border-b-[3px] border-[#0b8058] shadow-[0_2px_8px_rgba(16,185,129,0.3)] ';
              } else if (status === 'present') {
                keyStyle +=
                  'bg-tile-present text-on-primary border-b-[3px] border-[#b47100] shadow-[0_2px_8px_rgba(245,158,11,0.3)] ';
              } else if (status === 'absent') {
                keyStyle +=
                  'bg-surface-container-lowest text-on-surface-variant/50 border-b-[2px] border-surface-container-lowest ';
              } else {
                keyStyle +=
                  'bg-key-bg text-on-surface border-b-[3px] border-[#1E293B] hover:bg-surface-container-highest ';
              }

              return (
                <button
                  key={key}
                  onClick={() => {
                    if (isEnter) submitGuess();
                    else if (isBackspace) removeLetter();
                    else addLetter(key);
                  }}
                  className={keyStyle}
                  type="button"
                >
                  {isBackspace ? (
                    <span className="material-symbols-outlined text-[20px]">backspace</span>
                  ) : (
                    key
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Victory / Defeat Modal */}
      {gameStatus !== 'playing' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/85 backdrop-blur-md">
          <div className="relative w-full max-w-[380px] bg-surface-container-high rounded-2xl p-space-md shadow-2xl border border-surface-container-highest animate-tile-pop text-center">
            {/* Header Icon */}
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-xl ${
                gameStatus === 'won'
                  ? 'bg-tile-correct/20 text-tile-correct shadow-[0_0_20px_rgba(16,185,129,0.35)] animate-win'
                  : 'bg-error/20 text-error'
              }`}
            >
              <span
                className="material-symbols-outlined text-[36px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {gameStatus === 'won' ? 'trophy' : 'sentiment_very_dissatisfied'}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-headline-md text-headline-md text-on-surface font-black">
              {gameStatus === 'won'
                ? currentRow <= 2
                  ? 'GENIUS!'
                  : currentRow <= 4
                  ? 'SPLENDID!'
                  : 'WELL PLAYED!'
                : 'NICE TRY!'}
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              The secret word was <strong className="text-primary text-base font-black">{targetWord}</strong>
            </p>

            {/* Reward Pill */}
            {gameStatus === 'won' && (
              <div className="flex items-center justify-center gap-3 my-3">
                <div className="flex items-center gap-1 bg-surface-container px-3 py-1 rounded-full text-secondary font-label-md">
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    monetization_on
                  </span>
                  <span>
                    +{gameMode === 'halloween' ? 500 : gameMode === 'hardcore' ? 150 : 50} Coins
                  </span>
                </div>
                {gameMode === 'duel' && (
                  <div className="flex items-center gap-1 bg-surface-container px-3 py-1 rounded-full text-glow-success font-label-md">
                    <span className="material-symbols-outlined text-[16px]">military_tech</span>
                    <span>+45 Trophies</span>
                  </div>
                )}
              </div>
            )}

            {/* Guess Distribution Histogram */}
            <div className="my-3 p-3 rounded-xl bg-surface-container text-left flex flex-col gap-1.5">
              <span className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-wider font-bold">
                Guess Distribution
              </span>
              {userStats.distribution.map((count, idx) => {
                const isThisRow = gameStatus === 'won' && currentRow === idx + 1;
                const max = Math.max(...userStats.distribution, 1);
                const widthPercent = Math.max(8, (count / max) * 100);

                return (
                  <div key={idx} className="flex items-center gap-2 text-xs">
                    <span className="font-mono w-3 text-on-surface-variant font-bold">
                      {idx + 1}
                    </span>
                    <div className="flex-1 bg-surface-container-highest rounded-full h-4 overflow-hidden flex items-center">
                      <div
                        className={`h-full flex items-center justify-end px-1.5 text-[10px] font-bold text-on-primary transition-all duration-500 ${
                          isThisRow ? 'bg-primary' : 'bg-surface-bright text-on-surface-variant'
                        }`}
                        style={{ width: `${widthPercent}%` }}
                      >
                        {count}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleShare}
                className="flex-1 py-3 rounded-xl bg-surface-container-highest hover:bg-surface-bright text-on-surface font-label-md text-label-md flex items-center justify-center gap-1.5 transition-all cursor-pointer font-bold"
              >
                <span className="material-symbols-outlined text-[18px]">share</span>
                <span>{shareCopied ? 'Copied!' : 'Share'}</span>
              </button>
              <button
                onClick={restartCurrentGame}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-container text-on-primary font-label-md text-label-md shadow-md active:scale-95 transition-all cursor-pointer font-extrabold"
              >
                Play Again
              </button>
            </div>

            <button
              onClick={() => setActiveTab('daily')}
              className="mt-2 text-on-surface-variant hover:text-on-surface font-label-sm text-[11px] uppercase tracking-wider underline cursor-pointer"
            >
              Return to Daily Hub
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
