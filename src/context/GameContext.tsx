import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { FIVE_LETTER_WORDS, SIX_LETTER_WORDS, HALLOWEEN_WORDS, SPEED_RUSH_WORDS, evaluateGuess, isValidWord, EvaluatedLetter, LetterStatus, VOWELS } from '../data/words';
import { sound } from '../utils/audio';

export type GameMode = 'daily' | 'classic' | 'hardcore' | 'speedrush' | 'halloween' | 'duel';
export type AppTab = 'play' | 'daily' | 'ranks' | 'shop';

export interface BoosterInventory {
  vowelFinder: number;
  letterEliminator: number;
  magicRevealer: number;
  shuffleRewind: number;
  superHints: number;
  goldenSkin: boolean;
}

export interface SolvedDayInfo {
  solved: boolean;
  star: boolean; // 3-guess star
  word: string;
  guesses: number;
}

interface OpponentState {
  name: string;
  avatar: string;
  rank: number;
  trophies: number;
  guesses: EvaluatedLetter[][];
  hasWon: boolean;
}

interface GameContextType {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  gameMode: GameMode;
  setGameMode: (mode: GameMode) => void;
  coins: number;
  streak: number;
  inventory: BoosterInventory;
  solvedCalendar: Record<number, SolvedDayInfo>;
  targetWord: string;
  wordLength: number;
  maxGuesses: number;
  guesses: EvaluatedLetter[][];
  currentGuess: string;
  currentRow: number;
  gameStatus: 'playing' | 'won' | 'lost';
  keyboardStatus: Record<string, LetterStatus>;
  eliminatedLetters: Set<string>;
  revealedPositions: Record<number, string>;
  soundEnabled: boolean;
  toggleSound: () => void;
  toast: { message: string; visible: boolean };
  showToast: (msg: string) => void;
  // Speed rush timer
  speedRushSeconds: number;
  speedRushScore: number;
  // Duel opponent
  duelOpponent: OpponentState | null;
  // Actions
  addLetter: (char: string) => void;
  removeLetter: () => void;
  submitGuess: () => void;
  startMode: (mode: GameMode) => void;
  restartCurrentGame: () => void;
  useBooster: (type: 'vowelFinder' | 'letterEliminator' | 'magicRevealer' | 'shuffleRewind') => boolean;
  buyBooster: (type: keyof BoosterInventory, count: number, costCoins: number, label: string) => boolean;
  buyCoins: (amount: number, label: string) => void;
  unlockBundle: () => void;
  claimFreeMysteryChest: () => void;
  speedClaimChest: () => boolean;
  userStats: {
    gamesPlayed: number;
    winRate: number;
    currentStreak: number;
    maxStreak: number;
    trophies: number;
    rank: number;
    distribution: number[];
  };
}

const STORAGE_KEY = 'wordcraft_save_v1';

const defaultSolvedDays: Record<number, SolvedDayInfo> = {
  1: { solved: true, star: false, word: 'STONE', guesses: 4 },
  2: { solved: true, star: false, word: 'FLAME', guesses: 4 },
  3: { solved: true, star: true, word: 'SPARK', guesses: 3 },
  4: { solved: true, star: false, word: 'CRAFT', guesses: 5 },
  5: { solved: true, star: false, word: 'GLOWS', guesses: 4 },
  6: { solved: true, star: false, word: 'ROYAL', guesses: 4 },
  7: { solved: true, star: true, word: 'MAGIC', guesses: 3 },
  8: { solved: true, star: false, word: 'OCEAN', guesses: 4 },
  9: { solved: true, star: false, word: 'TIGER', guesses: 5 },
  10: { solved: true, star: false, word: 'QUEST', guesses: 4 },
  11: { solved: true, star: true, word: 'FROST', guesses: 3 },
  12: { solved: true, star: false, word: 'DREAM', guesses: 4 },
  13: { solved: true, star: false, word: 'STORM', guesses: 4 },
  14: { solved: true, star: false, word: 'POWER', guesses: 5 },
  15: { solved: true, star: true, word: 'CROWN', guesses: 3 },
  16: { solved: true, star: false, word: 'BLAZE', guesses: 4 },
  17: { solved: true, star: false, word: 'SWIFT', guesses: 4 },
  18: { solved: true, star: true, word: 'PEARL', guesses: 3 },
  19: { solved: true, star: false, word: 'NOBLE', guesses: 4 },
  20: { solved: true, star: false, word: 'EMBER', guesses: 4 },
  21: { solved: true, star: true, word: 'SHARP', guesses: 3 },
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTabState] = useState<AppTab>('daily');
  const [gameMode, setGameModeState] = useState<GameMode>('daily');
  
  // Player state
  const [coins, setCoins] = useState<number>(480);
  const [streak, setStreak] = useState<number>(24);
  const [inventory, setInventory] = useState<BoosterInventory>({
    vowelFinder: 2,
    letterEliminator: 5,
    magicRevealer: 0,
    shuffleRewind: 4,
    superHints: 10,
    goldenSkin: false,
  });
  const [solvedCalendar, setSolvedCalendar] = useState<Record<number, SolvedDayInfo>>(defaultSolvedDays);

  // Active game play
  const [targetWord, setTargetWord] = useState<string>('SHINE');
  const [wordLength, setWordLength] = useState<number>(5);
  const [maxGuesses] = useState<number>(6);
  const [guesses, setGuesses] = useState<EvaluatedLetter[][]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [currentRow, setCurrentRow] = useState<number>(0);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [keyboardStatus, setKeyboardStatus] = useState<Record<string, LetterStatus>>({});
  const [eliminatedLetters, setEliminatedLetters] = useState<Set<string>>(new Set());
  const [revealedPositions, setRevealedPositions] = useState<Record<number, string>>({});

  // Speed Rush mode timer & score
  const [speedRushSeconds, setSpeedRushSeconds] = useState<number>(120);
  const [speedRushScore, setSpeedRushScore] = useState<number>(0);

  // Word Duel mode opponent
  const [duelOpponent, setDuelOpponent] = useState<OpponentState | null>(null);

  // Sound toggle
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Toast
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });

  // Stats
  const [userStats, setUserStats] = useState({
    gamesPlayed: 342,
    winRate: 97,
    currentStreak: 24,
    maxStreak: 31,
    trophies: 1840,
    rank: 4,
    distribution: [8, 38, 126, 114, 42, 14],
  });

  // Load from local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.coins !== undefined) setCoins(parsed.coins);
        if (parsed.streak !== undefined) setStreak(parsed.streak);
        if (parsed.inventory) setInventory(parsed.inventory);
        if (parsed.solvedCalendar) setSolvedCalendar(parsed.solvedCalendar);
        if (parsed.userStats) setUserStats(parsed.userStats);
        if (parsed.soundEnabled !== undefined) {
          setSoundEnabled(parsed.soundEnabled);
          sound.enabled = parsed.soundEnabled;
        }
      }
    } catch {}
  }, []);

  // Save to local storage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        coins,
        streak,
        inventory,
        solvedCalendar,
        userStats,
        soundEnabled
      }));
    } catch {}
  }, [coins, streak, inventory, solvedCalendar, userStats, soundEnabled]);

  const showToast = useCallback((msg: string) => {
    setToast({ message: msg, visible: true });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 2500);
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => {
      const next = !prev;
      sound.enabled = next;
      showToast(next ? 'Sound effects turned On' : 'Sound effects Muted');
      return next;
    });
  }, [showToast]);

  // Tab switch
  const setActiveTab = useCallback((tab: AppTab) => {
    sound.playKeyClick();
    setActiveTabState(tab);
  }, []);

  // Initialize a puzzle for a mode
  const startMode = useCallback((mode: GameMode) => {
    sound.playKeyClick();
    setGameModeState(mode);
    setGuesses([]);
    setCurrentGuess('');
    setCurrentRow(0);
    setGameStatus('playing');
    setKeyboardStatus({});
    setEliminatedLetters(new Set());
    setRevealedPositions({});

    if (mode === 'daily') {
      setTargetWord('SHINE'); // Daily #241
      setWordLength(5);
      setDuelOpponent(null);
    } else if (mode === 'halloween') {
      const spookyWord = HALLOWEEN_WORDS[Math.floor(Math.random() * HALLOWEEN_WORDS.length)];
      setTargetWord(spookyWord);
      setWordLength(spookyWord.length);
      setDuelOpponent(null);
      showToast('Entered Halloween Word Haunt: +500 Bonus!');
    } else if (mode === 'hardcore') {
      const sixWord = SIX_LETTER_WORDS[Math.floor(Math.random() * SIX_LETTER_WORDS.length)];
      setTargetWord(sixWord);
      setWordLength(6);
      setDuelOpponent(null);
      showToast('Hardcore 6-Letter Mode Active');
    } else if (mode === 'speedrush') {
      const speedWord = SPEED_RUSH_WORDS[Math.floor(Math.random() * SPEED_RUSH_WORDS.length)];
      setTargetWord(speedWord);
      setWordLength(5);
      setSpeedRushSeconds(120);
      setSpeedRushScore(0);
      setDuelOpponent(null);
      showToast('Speed Rush 2-Min Clock Started!');
    } else if (mode === 'duel') {
      const duelWord = FIVE_LETTER_WORDS[Math.floor(Math.random() * FIVE_LETTER_WORDS.length)];
      setTargetWord(duelWord);
      setWordLength(5);
      setDuelOpponent({
        name: 'SpellCraft',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfgCkGp5Ps1p3rJ_Y-TSvs4VyAExaWfB0CRBQiNqhS6Nrdoc-KTNc2DpDKK2xF5XfDUdZB7EOyZMokyWYkqv52Ywa4mECJynE8XRbEfSSLUubq_HMrXn8eFQtjYdUKhFX3H15z27IzEOiVmIYgVghktjHvdQvHCaeLPUTsatf6RuSI7PuJVACJMgNDWdycvrLwSOJiAyPuKfjVFif80HIj_KqHyyWBL5IsEYZvFD1PigJBEzk0H_bF',
        rank: 1,
        trophies: 2280,
        guesses: [],
        hasWon: false
      });
      showToast('Word Duel vs SpellCraft (+45 Trophies)');
    } else {
      // Classic 5-Letter
      const randomWord = FIVE_LETTER_WORDS[Math.floor(Math.random() * FIVE_LETTER_WORDS.length)];
      setTargetWord(randomWord);
      setWordLength(5);
      setDuelOpponent(null);
    }

    setActiveTabState('play');
  }, [showToast]);

  const restartCurrentGame = useCallback(() => {
    startMode(gameMode);
  }, [startMode, gameMode]);

  // Speed rush timer effect
  useEffect(() => {
    if (activeTab === 'play' && gameMode === 'speedrush' && gameStatus === 'playing') {
      const interval = setInterval(() => {
        setSpeedRushSeconds(sec => {
          if (sec <= 1) {
            clearInterval(interval);
            setGameStatus('lost');
            showToast('Time is up! Final score: ' + speedRushScore);
            return 0;
          }
          return sec - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [activeTab, gameMode, gameStatus, speedRushScore, showToast]);

  // Simulated Word Duel opponent progression
  useEffect(() => {
    if (activeTab === 'play' && gameMode === 'duel' && duelOpponent && gameStatus === 'playing') {
      const opponentTimer = setTimeout(() => {
        if (duelOpponent.guesses.length < 5 && !duelOpponent.hasWon) {
          const sampleGuesses = ['ALERT', 'STARE', 'CRANE', 'POINT', 'SHINE'];
          const nextGuessStr = sampleGuesses[duelOpponent.guesses.length] || 'CRAFT';
          const evalResult = evaluateGuess(nextGuessStr, targetWord);
          const isWin = evalResult.every(l => l.status === 'correct');
          setDuelOpponent(prev => prev ? ({
            ...prev,
            guesses: [...prev.guesses, evalResult],
            hasWon: isWin
          }) : null);
        }
      }, 7000 + Math.random() * 5000);
      return () => clearTimeout(opponentTimer);
    }
  }, [activeTab, gameMode, duelOpponent, targetWord, gameStatus]);

  // Add letter
  const addLetter = useCallback((char: string) => {
    if (gameStatus !== 'playing') return;
    const clean = char.toUpperCase();
    if (/^[A-Z]$/.test(clean) && currentGuess.length < wordLength) {
      sound.playTilePop();
      setCurrentGuess(prev => prev + clean);
    }
  }, [gameStatus, currentGuess.length, wordLength]);

  // Remove letter
  const removeLetter = useCallback(() => {
    if (gameStatus !== 'playing') return;
    if (currentGuess.length > 0) {
      sound.playKeyClick();
      setCurrentGuess(prev => prev.slice(0, -1));
    }
  }, [gameStatus, currentGuess.length]);

  // Submit guess
  const submitGuess = useCallback(() => {
    if (gameStatus !== 'playing') return;
    if (currentGuess.length < wordLength) {
      sound.playError();
      showToast(`Word must be ${wordLength} letters`);
      return;
    }

    if (!isValidWord(currentGuess)) {
      sound.playError();
      showToast('Not in dictionary');
      return;
    }

    // Evaluate
    const evaluation = evaluateGuess(currentGuess, targetWord);
    const newGuesses = [...guesses, evaluation];
    setGuesses(newGuesses);
    setCurrentGuess('');
    const nextRow = currentRow + 1;
    setCurrentRow(nextRow);

    // Update keyboard statuses
    const updatedKeyboard = { ...keyboardStatus };
    evaluation.forEach(({ letter, status }, idx) => {
      const prev = updatedKeyboard[letter];
      if (status === 'correct') {
        updatedKeyboard[letter] = 'correct';
        sound.playTileCorrect(idx);
      } else if (status === 'present' && prev !== 'correct') {
        updatedKeyboard[letter] = 'present';
        sound.playTilePresent();
      } else if (status === 'absent' && !prev) {
        updatedKeyboard[letter] = 'absent';
        sound.playTileAbsent();
      }
    });
    setKeyboardStatus(updatedKeyboard);

    // Check Win
    const isWin = evaluation.every(l => l.status === 'correct');
    if (isWin) {
      sound.playWin();
      setGameStatus('won');

      // Rewards
      let coinReward = 50;
      if (gameMode === 'halloween') coinReward = 500;
      if (gameMode === 'hardcore') coinReward = 150;
      if (gameMode === 'duel') coinReward = 120;
      setCoins(c => c + coinReward);

      // If Daily, record calendar day 22 solved
      if (gameMode === 'daily') {
        setSolvedCalendar(prev => ({
          ...prev,
          22: {
            solved: true,
            star: nextRow <= 3,
            word: targetWord,
            guesses: nextRow
          }
        }));
        setStreak(s => s + 1);
      }

      if (gameMode === 'duel') {
        setUserStats(prev => ({
          ...prev,
          trophies: prev.trophies + 45
        }));
        showToast(`Victorious! +45 Trophies & +${coinReward} Coins!`);
      } else if (gameMode === 'speedrush') {
        setSpeedRushScore(s => s + 1);
        showToast(`Solved! +1 Score! Next word loading...`);
        // load next speed rush word
        setTimeout(() => {
          const nextW = SPEED_RUSH_WORDS[Math.floor(Math.random() * SPEED_RUSH_WORDS.length)];
          setTargetWord(nextW);
          setGuesses([]);
          setCurrentGuess('');
          setCurrentRow(0);
          setGameStatus('playing');
        }, 1200);
      } else {
        showToast(`Brilliant! Solved in ${nextRow} guesses (+${coinReward} Coins)`);
      }

      // Update stats distribution
      setUserStats(prev => {
        const dist = [...prev.distribution];
        if (nextRow <= 6) {
          dist[nextRow - 1] = (dist[nextRow - 1] || 0) + 1;
        }
        return {
          ...prev,
          gamesPlayed: prev.gamesPlayed + 1,
          currentStreak: prev.currentStreak + 1,
          maxStreak: Math.max(prev.maxStreak, prev.currentStreak + 1),
          distribution: dist
        };
      });

    } else if (nextRow >= maxGuesses) {
      // Lost
      sound.playError();
      setGameStatus('lost');
      showToast(`The word was ${targetWord}`);
      setUserStats(prev => ({
        ...prev,
        gamesPlayed: prev.gamesPlayed + 1,
        currentStreak: 0
      }));
    }
  }, [gameStatus, currentGuess, wordLength, targetWord, guesses, currentRow, keyboardStatus, gameMode, maxGuesses, showToast]);

  // Keyboard physical listener
  useEffect(() => {
    if (activeTab !== 'play') return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === 'Enter') {
        e.preventDefault();
        submitGuess();
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        removeLetter();
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        e.preventDefault();
        addLetter(e.key);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, submitGuess, removeLetter, addLetter]);

  // Tactical Boosters usage
  const useBooster = useCallback((type: 'vowelFinder' | 'letterEliminator' | 'magicRevealer' | 'shuffleRewind'): boolean => {
    if (gameStatus !== 'playing') {
      showToast('Game is not active');
      return false;
    }

    if (inventory[type] <= 0) {
      showToast(`No ${type} available! Visit the Shop to restock.`);
      return false;
    }

    sound.playBoosterUse();

    if (type === 'vowelFinder') {
      // Find vowels in target word
      const targetVowels: string[] = [];
      targetWord.split('').forEach((char, idx) => {
        if (VOWELS.has(char)) {
          targetVowels.push(`Letter ${idx + 1}: ${char}`);
        }
      });
      if (targetVowels.length > 0) {
        showToast(`Vowel Finder: ${targetVowels.join(', ')}`);
      } else {
        showToast(`Vowel Finder: No standard vowels in this word!`);
      }
    } else if (type === 'letterEliminator') {
      // Disintegrate 3 unused letters from keyboard that are NOT in targetWord
      const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
      const targetLetters = new Set(targetWord.split(''));
      const candidates = alphabet.filter(l => !targetLetters.has(l) && !eliminatedLetters.has(l) && !keyboardStatus[l]);
      
      const toEliminate = candidates.slice(0, 3);
      if (toEliminate.length > 0) {
        setEliminatedLetters(prev => {
          const next = new Set(prev);
          toEliminate.forEach(c => next.add(c));
          return next;
        });
        showToast(`Letter Eliminator: Disintegrated ${toEliminate.join(', ')} from keyboard!`);
      } else {
        showToast(`No more unused letters to eliminate!`);
      }
    } else if (type === 'magicRevealer') {
      // Lock in 1 unknown green position
      const targetChars = targetWord.split('');
      const unrevealedIndices: number[] = [];
      targetChars.forEach((_, idx) => {
        if (!revealedPositions[idx]) {
          // Check if already correctly guessed in previous row
          const alreadyGreen = guesses.some(g => g[idx]?.status === 'correct');
          if (!alreadyGreen) {
            unrevealedIndices.push(idx);
          }
        }
      });

      if (unrevealedIndices.length > 0) {
        const chooseIdx = unrevealedIndices[0];
        const letter = targetChars[chooseIdx];
        setRevealedPositions(prev => ({ ...prev, [chooseIdx]: letter }));
        showToast(`Magic Revealer locked '${letter}' into Slot ${chooseIdx + 1}!`);
      } else {
        showToast(`All letters already revealed!`);
      }
    } else if (type === 'shuffleRewind') {
      // Undo last guess
      if (guesses.length > 0) {
        setGuesses(prev => prev.slice(0, -1));
        setCurrentRow(r => Math.max(0, r - 1));
        setCurrentGuess('');
        // Anagram hint
        const sorted = targetWord.split('').sort().join(' ');
        showToast(`Shuffle Rewind active! Row restored. Anagram Clue: [ ${sorted} ]`);
      } else {
        showToast('No rows to rewind yet!');
        return false;
      }
    }

    // Deduct inventory
    setInventory(prev => ({
      ...prev,
      [type]: prev[type] - 1
    }));

    return true;
  }, [gameStatus, inventory, targetWord, eliminatedLetters, keyboardStatus, revealedPositions, guesses, showToast]);

  // Buy boosters
  const buyBooster = useCallback((type: keyof BoosterInventory, count: number, costCoins: number, label: string): boolean => {
    if (coins < costCoins) {
      sound.playError();
      showToast(`Not enough coins! Refill in Coin Treasury.`);
      return false;
    }
    sound.playCoinChime();
    setCoins(c => c - costCoins);
    setInventory(prev => ({
      ...prev,
      [type]: (prev[type] as number) + count
    }));
    showToast(`Purchased ${label}! Equipped.`);
    return true;
  }, [coins, showToast]);

  // Buy coins
  const buyCoins = useCallback((amount: number, label: string) => {
    sound.playCoinChime();
    setCoins(c => c + amount);
    showToast(`Acquired ${amount.toLocaleString()} Coins (${label})!`);
  }, [showToast]);

  // Unlock Grand Master Bundle
  const unlockBundle = useCallback(() => {
    sound.playCoinChime();
    sound.playWin();
    setCoins(c => c + 2500);
    setInventory(prev => ({
      ...prev,
      superHints: prev.superHints + 10,
      letterEliminator: prev.letterEliminator + 5,
      goldenSkin: true
    }));
    showToast(`Grand Master Bundle Unlocked! +2,500 Coins & Golden Skin.`);
  }, [showToast]);

  // Claim free mystery chest
  const claimFreeMysteryChest = useCallback(() => {
    sound.playCoinChime();
    const randomCoin = Math.floor(Math.random() * 200) + 50;
    setCoins(c => c + randomCoin);
    setInventory(prev => ({
      ...prev,
      magicRevealer: prev.magicRevealer + 1,
      vowelFinder: prev.vowelFinder + 1
    }));
    showToast(`Mystery Vault Opened! +${randomCoin} Coins & Boosters added!`);
  }, [showToast]);

  // Speed claim chest for 25 coins
  const speedClaimChest = useCallback((): boolean => {
    if (coins < 25) {
      sound.playError();
      showToast(`Need 25 Coins to speed unlock.`);
      return false;
    }
    sound.playCoinChime();
    setCoins(c => c - 25 + 100);
    setInventory(prev => ({
      ...prev,
      vowelFinder: prev.vowelFinder + 1,
      shuffleRewind: prev.shuffleRewind + 1
    }));
    showToast(`Speed Unlock Complete! +100 Coins & 2 Boosters Claimed!`);
    return true;
  }, [coins, showToast]);

  return (
    <GameContext.Provider value={{
      activeTab,
      setActiveTab,
      gameMode,
      setGameMode: setGameModeState,
      coins,
      streak,
      inventory,
      solvedCalendar,
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
      soundEnabled,
      toggleSound,
      toast,
      showToast,
      speedRushSeconds,
      speedRushScore,
      duelOpponent,
      addLetter,
      removeLetter,
      submitGuess,
      startMode,
      restartCurrentGame,
      useBooster,
      buyBooster,
      buyCoins,
      unlockBundle,
      claimFreeMysteryChest,
      speedClaimChest,
      userStats,
    }}>
      {children}
    </GameContext.Provider>
  );
};

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
