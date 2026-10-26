/**
 * Words data and validation engine for WordCraft
 */

export const FIVE_LETTER_WORDS = [
  "CRAFT", "FLAME", "SHINE", "PRIDE", "LIGHT", "SPARK", "GLOWS", "STONE",
  "CHARM", "ROYAL", "MAGIC", "OCEAN", "TIGER", "BRAVE", "QUEST", "FROST",
  "BRISK", "DREAM", "STORM", "POWER", "CROWN", "BLAZE", "VALOR", "SWIFT",
  "PEARL", "NOBLE", "EMBER", "SHARP", "CLOUD", "SWEET", "VIVID", "TRAIN",
  "BEACH", "CHIEF", "FRESH", "GREEN", "HEART", "JUDGE", "LUCKY", "NIGHT",
  "PLANT", "RIVER", "SMILE", "TRACK", "WATER", "YOUTH", "SPACE", "FAITH",
  "BLOOM", "CRISP", "FLASH", "GRAIN", "HONOR", "IMAGE", "LEMON", "MUSIC",
  "PEACE", "RADIO", "SOLAR", "TRUTH", "WORLD", "ALERT", "BOARD", "CLEAN",
  "DRIVE", "EARTH", "FORCE", "GRACE", "HOUSE", "LOGIC", "MONEY", "NORTH",
  "PAINT", "SHARE", "TOTAL", "VOICE", "WHITE", "SMART", "BRAIN", "VIGOR"
];

export const HALLOWEEN_WORDS = [
  "HAUNT", "GHOST", "WITCH", "SKULL", "SPOOK", "GRAVE", "FANGS", "BEAST", "CURSE", "BLOOD", "TOMB"
];

export const SIX_LETTER_WORDS = [
  "WIZARD", "SHADOW", "MYSTIC", "KNIGHT", "SPHERE", "BRIGHT", "DRAGON",
  "CASTLE", "SILVER", "FOREST", "ENIGMA", "PIRATE", "GALAXY", "TEMPLE",
  "LEGEND", "HUNTER", "SUMMIT", "BEACON", "WONDER", "PHOENIX", "SHIELD",
  "NATURE", "SPIRIT", "COSMIC", "CRYSTAL", "ENERGY", "ORBITAL", "MASTER"
];

export const SPEED_RUSH_WORDS = [
  "SPELL", "QUICK", "ALERT", "SWIFT", "BRAIN", "POWER", "MAGIC", "GLOWS", "FLAME", "SPARK", "CRAFT", "SOLVE"
];

// Combine into valid guess set
const VALID_SET = new Set([
  ...FIVE_LETTER_WORDS,
  ...HALLOWEEN_WORDS,
  ...SPEED_RUSH_WORDS,
  // Popular additional 5-letter words
  "ABOUT", "ABOVE", "ACTOR", "ACUTE", "ADAPT", "ADMIT", "ADOPT", "ADULT", "AFTER", "AGAIN",
  "AGENT", "AGREE", "AHEAD", "ALBUM", "ALIEN", "ALIGN", "ALIKE", "ALIVE", "ALLOW", "ALONE",
  "ALONG", "ALTER", "AMONG", "ANGEL", "ANGER", "ANGLE", "ANGRY", "APART", "APPLE", "APPLY",
  "ARENA", "ARGUE", "ARISE", "ARRAY", "ASIDE", "ASSET", "AUDIO", "AUDIT", "AVOID", "AWAIT",
  "AWAKE", "AWARD", "AWARE", "BADLY", "BAKER", "BASES", "BASIC", "BASIS", "BEAST", "BEGIN",
  "BEING", "BELOW", "BENCH", "BILLY", "BIRTH", "BLACK", "BLAME", "BLIND", "BLOCK", "BLOOD",
  "BOARD", "BOAST", "BOBBY", "BOOST", "BOOTH", "BOUND", "BRAIN", "BRAND", "BREAD", "BREAK",
  "BREED", "BRIEF", "BRING", "BROAD", "BROKE", "BROWN", "BUILD", "BUILT", "BUYER", "CABLE",
  "CALIF", "CARRY", "CATCH", "CAUSE", "CHAIN", "CHAIR", "CHART", "CHASE", "CHEAP", "CHECK",
  "CHEST", "CHIEF", "CHILD", "CHINA", "CHOSE", "CIVIL", "CLAIM", "CLASS", "CLEAN", "CLEAR",
  "CLICK", "CLOCK", "CLOSE", "COACH", "COAST", "COULD", "COUNT", "COURT", "COVER", "CRACK",
  "CRIME", "CROSS", "CROWD", "CROWN", "CURVE", "CYCLE", "DAILY", "DANCE", "DATED", "DEALT",
  "DEATH", "DEBUT", "DELAY", "DEPTH", "DOING", "DOUBT", "DOZEN", "DRAWN", "DREAM", "DRESS",
  "DRILL", "DRINK", "DRIVE", "DROVE", "DYING", "EAGER", "EARLY", "EARTH", "EIGHT", "ELITE",
  "EMPTY", "ENEMY", "ENJOY", "ENTER", "ENTRY", "EQUAL", "ERROR", "EVENT", "EVERY", "EXACT",
  "EXIST", "EXTRA", "FAITH", "FALSE", "FAULT", "FIBER", "FIELD", "FIFTH", "FIFTY", "FIGHT",
  "FINAL", "FIRST", "FIXED", "FLASH", "FLEET", "FLOOR", "FLUID", "FOCUS", "FORTH", "FORTY",
  "FORUM", "FOUND", "FRAME", "FRANK", "FRAUD", "FRESH", "FRONT", "FRUIT", "FULLY", "FUNNY",
  "GIANT", "GIVEN", "GLASS", "GLOBE", "GOING", "GRACE", "GRADE", "GRAND", "GRANT", "GRASS",
  "GREAT", "GREEN", "GROSS", "GROUP", "GROWN", "GUARD", "GUESS", "GUEST", "GUIDE", "HAPPY",
  "HARRY", "HEART", "HEAVY", "HENCE", "HENRY", "HORSE", "HOTEL", "HOUSE", "HUMAN", "IDEAL",
  "IMAGE", "INDEX", "INNER", "INPUT", "ISSUE", "JAPAN", "JIMMY", "JOINT", "JONES", "JUDGE",
  "KNOWN", "LABEL", "LARGE", "LASER", "LATER", "LAUGH", "LAYER", "LEARN", "LEASE", "LEAST",
  "LEAVE", "LEGAL", "LEVEL", "LEWIS", "LIGHT", "LIMIT", "LINKS", "LIVES", "LOCAL", "LOGIC",
  "LOOSE", "LOWER", "LUCKY", "LUNCH", "LYING", "MAGIC", "MAJOR", "MAKER", "MARCH", "MATCH",
  "MAYBE", "MAYOR", "MEANT", "MEDIA", "METAL", "MIGHT", "MINOR", "MINUS", "MIXED", "MODEL",
  "MONEY", "MONTH", "MORAL", "MOTOR", "MOUNT", "MOUSE", "MOUTH", "MOVIE", "MUSIC", "NEEDS",
  "NEVER", "NEWLY", "NIGHT", "NOISE", "NORTH", "NOTED", "NOVEL", "NURSE", "OCCUR", "OFFER",
  "OFTEN", "ORDER", "OTHER", "OUGHT", "PAINT", "PANEL", "PAPER", "PARTY", "PEACE", "PETER",
  "PHASE", "PHONE", "PHOTO", "PIECE", "PILOT", "PITCH", "PLACE", "PLAIN", "PLANE", "PLANT",
  "PLATE", "POINT", "POUND", "POWER", "PRESS", "PRICE", "PRIDE", "PRIME", "PRINT", "PRIOR",
  "PRIZE", "PROOF", "PROUD", "PROVE", "QUEEN", "QUICK", "QUIET", "QUITE", "RADIO", "RAISE",
  "RANGE", "RAPID", "RATIO", "REACH", "READY", "REFER", "RIGHT", "RIVAL", "RIVER", "ROBIN",
  "ROGER", "ROMAN", "ROUGH", "ROUND", "ROUTE", "ROYAL", "RURAL", "SCALE", "SCENE", "SCOPE",
  "SCORE", "SENSE", "SERVE", "SEVEN", "SHALL", "SHAPE", "SHARE", "SHARP", "SHEET", "SHELF",
  "SHELL", "SHIFT", "SHINE", "SHIRT", "SHOCK", "SHOOT", "SHORT", "SHOWN", "SIGHT", "SINCE",
  "SIXTH", "SIXTY", "SIZED", "SKILL", "SLEEP", "SLIDE", "SMALL", "SMART", "SMILE", "SMITH",
  "SMOKE", "SOLID", "SOLVE", "SORRY", "SOUND", "SOUTH", "SPACE", "SPARE", "SPEAK", "SPEED",
  "SPEND", "SPENT", "SPLIT", "SPOKE", "SPORT", "STAFF", "STAGE", "STAKE", "STAND", "START",
  "STATE", "STEAM", "STEEL", "STICK", "STILL", "STOCK", "STONE", "STOOD", "STORE", "STORM",
  "STORY", "STRIP", "STUCK", "STUDY", "STUFF", "STYLE", "SUGAR", "SUITE", "SUPER", "SWEET",
  "TABLE", "TAKEN", "TASTE", "TAXES", "TEACH", "TEETH", "TERRY", "TEXAS", "THANK", "THEFT",
  "THEIR", "THEME", "THERE", "THESE", "THICK", "THING", "THINK", "THIRD", "THOSE", "THREE",
  "THREW", "THROW", "TIGHT", "TIMES", "TIRED", "TITLE", "TODAY", "TOPIC", "TOTAL", "TOUCH",
  "TOUGH", "TOWER", "TRACK", "TRADE", "TRAIN", "TREAT", "TREND", "TRIAL", "TRIED", "TRIES",
  "TRUCK", "TRULY", "TRUST", "TRUTH", "TWICE", "UNDER", "UNDUE", "UNION", "UNITY", "UNTIL",
  "UPPER", "UPSET", "URBAN", "USAGE", "USUAL", "VALID", "VALUE", "VIDEO", "VIRUS", "VISIT",
  "VITAL", "VOICE", "WASTE", "WATCH", "WATER", "WHEEL", "WHERE", "WHICH", "WHILE", "WHITE",
  "WHOLE", "WHOSE", "WOMAN", "WOMEN", "WORLD", "WORRY", "WORSE", "WORST", "WORTH", "WOULD",
  "WOUND", "WRITE", "WRONG", "WROTE", "YIELD", "YOUNG", "YOUTH"
]);

export type LetterStatus = 'empty' | 'pop' | 'correct' | 'present' | 'absent';

export interface EvaluatedLetter {
  letter: string;
  status: LetterStatus;
}

/**
 * Accurately evaluate a guess against target word respecting letter multiplicity
 */
export function evaluateGuess(guess: string, target: string): EvaluatedLetter[] {
  const g = guess.toUpperCase();
  const t = target.toUpperCase();
  const len = t.length;
  const result: EvaluatedLetter[] = Array.from({ length: len }, (_, i) => ({
    letter: g[i] || '',
    status: 'absent' as LetterStatus
  }));

  const targetLetterCounts: Record<string, number> = {};

  // First pass: mark correct (greens) and count remaining target letters
  for (let i = 0; i < len; i++) {
    if (g[i] === t[i]) {
      result[i].status = 'correct';
    } else {
      targetLetterCounts[t[i]] = (targetLetterCounts[t[i]] || 0) + 1;
    }
  }

  // Second pass: mark present (yellows) if letter count allows
  for (let i = 0; i < len; i++) {
    if (result[i].status !== 'correct') {
      const letter = g[i];
      if (targetLetterCounts[letter] && targetLetterCounts[letter] > 0) {
        result[i].status = 'present';
        targetLetterCounts[letter]--;
      } else {
        result[i].status = 'absent';
      }
    }
  }

  return result;
}

export function isValidWord(word: string): boolean {
  const w = word.toUpperCase();
  if (w.length === 5) {
    return VALID_SET.has(w) || FIVE_LETTER_WORDS.includes(w) || HALLOWEEN_WORDS.includes(w);
  }
  if (w.length === 6) {
    return SIX_LETTER_WORDS.includes(w);
  }
  return false;
}

export const VOWELS = new Set(['A', 'E', 'I', 'O', 'U']);
