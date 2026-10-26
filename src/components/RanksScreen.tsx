import React, { useState } from 'react';
import { useGame } from '../context/GameContext';

interface PlayerRank {
  rank: number;
  name: string;
  avatar: string;
  flag: string;
  streak: number;
  trophies: number;
  status: string;
  isYou?: boolean;
  deltaPts?: string;
}

export const RanksScreen: React.FC = () => {
  const { startMode, showToast, userStats } = useGame();
  const [tab, setTab] = useState<'global' | 'friends'>('global');
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  const globalPlayers: PlayerRank[] = [
    {
      rank: 4,
      name: 'WordWizard',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDC6ZaHRl3mr5YEuMd5tWpfcSsvhq1n6h0rfVhH3iwVAyeEX3qRyo9mlPm_M9TMmGdux1Dgo2lSxP_0Her2vpj8Ykx0IiHjWvLYg-1GPCVJTqx3QFqxVKNFDAktKM_ufwOxcdoMmS_YIizR83E2L_XMroxtLMj6bESbjhdzivCy2v4kLyMPqz070YgJOKt5CBQ0AJzmvwfdh0lzY54286x79qC81qpL5VUoErnr9psZutbx7U6GAQyt',
      flag: '🇺🇸',
      streak: 7,
      trophies: userStats.trophies,
      status: 'In Master Zone',
      isYou: true,
      deltaPts: '+38 pts today'
    },
    {
      rank: 5,
      name: 'AlphaVowel',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBY6Uqi-9CByy-kdWI2uyVtFPsFGPTUuTwEDIkPhNPv-G9ugftjkzwU7RH-fs34zTLiqwGqUiIn8SEEsCyRvF7NUXRXpSF4zqWm4hw26VA1t0Dbq2P-BlbZUfrBxMfT-FGF3YMZgBcWjIoOHKnnBIrqEy7OW-kCIBjNOsZsz9YVNtQbqtkg2ebVJDhb27ADCyLoXtqOinyjz8T1Ph6UoZ1Wmrb5f8UdEmjb8iiyyoBv5eTpDyav20ys',
      flag: '🇨🇦',
      streak: 6,
      trophies: 1795,
      status: 'Master Zone Cutoff'
    },
    {
      rank: 6,
      name: 'RuneSeeker',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAO-pUqdYcksZdUXC71NQnfNWrq3ECXfwajC8gVu5TI98isPDWopZqr8WGL0IcsE8Q_ibWZygywLz51sPg-XhD6q8LGOPO9YZPVYpYuQ6ShlMpQK1kiTRdK3pO6Hdu808Jn4YMNKzvULM9L-ecmdaYx7oBttkZR2rsBaYsKDlX4EcjovNDTufsIEslNxU3Ew-BkERmKg4XFHx01uBpUTV2YY4e6M9r-OVLRGox3d2X58iejkAYu78Mg',
      flag: '🇬🇧',
      streak: 4,
      trophies: 1740,
      status: '-55 to Advance'
    },
    {
      rank: 7,
      name: 'AnagramHero',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCX2KJK4klIO2BMVtNfrJu84OgPoVkSX3djVQv0qKg0RJ0Cs-8f_FOgzwe-Kmcy2gQhmepfYJFclPYWkWKKofPKooxnOYuCM7aiG3yww_pe8ivzumG8V38HAHkxQBrgQaQakARN9HrDPWOYn0QunT_mom_Z4Zduf6dBbNuxrHutYwg93RbO9hUyHwBpY4mY1tS3hzsF7EIXOrnAyC1Kfvo2iFZsYM6eZxTiGx8RvM68S-sebNQSn5kJ',
      flag: '🇩🇪',
      streak: 5,
      trophies: 1712,
      status: 'Maintained'
    },
    {
      rank: 8,
      name: 'PuzzleKitten',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAn7PCS2M0cAKNESKiQ-RvjE59R4bCT4C8zVqJUIIUYbB3X3krJrqA2ljDFDwTYTZdkTnylliVvwSniTZFlah4kl4G6ewl2YwP-rgIhqrWQvGsSWLO1Er7IEGxdcfFqkJsKa7ew5yRRa7kj-IpxqqWbLtee-Kb0TzhELfXkuudMwy4DXBDZMPr-Y_e6eqNYgGrxJRHzkeWasg2dDAxSL-eQTbPM36R3GGBDQU7ThbP7suivi2KXJw90',
      flag: '🇯🇵',
      streak: 3,
      trophies: 1685,
      status: 'Maintained'
    },
    {
      rank: 9,
      name: 'LexicalBeast',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBYOOAxjjpmKNDPwL_YmVZVvsVu40OA9qV2M0ScT7UDYSQdkC3PG14YvXbOHt0fV7o4fr26JzTVfECVC3nE3d3IMdYv4pYA8C9rZ0gDmdyzydKb9-bwenBdk63rOZmLoMvKwAsoJJJwoo1rr0x1P7ZCS22ZEEz-IbTKRV0l0VrgkY_hfF0TGG6p9yaWX83gwNpi5DynXbddS7z0vcmT3uuGrlEki4C2Z3FDIhkOrDycPPVXgUXPIw4',
      flag: '🇦🇺',
      streak: 2,
      trophies: 1640,
      status: 'Maintained'
    },
    {
      rank: 10,
      name: 'NovaSynapse',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDp8vwwEQzbu2eW2e4qXrx8zZtQg6-qeHWqw_bkeMBXNluO4YkeaoYb5CZ_7OOEVzEu5cfOkZsHAl38JNfYSNJfJWZ_ac0Of8cTZpWXxXb2tPrZYiiJLLL4E9Be2HczJzhEsTKjL4a5wg7Bel_hMdCvllm2zxK04SSXmKorA1FnkBvzKVzsD0EVku-OqVguU9Zzv3FCynwTyYWkVRjjZ-5-twqzzRc-U4RWtt4pggADHZoKHgBeJms9',
      flag: '🇫🇷',
      streak: 4,
      trophies: 1610,
      status: 'Maintained'
    },
    {
      rank: 11,
      name: 'WordTitan',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtSL5a3uQmswt0YPcb4A21P_KEcRE05sRQeGC2S8QS9r6n_6UC5HSaMao_djj62P3PwFwNhlMLExXEksArfeogfNYq6UDhIUp166-enqeu0AVOAdWg2JO-VWYgROfeBs2MBURdpsFTucRlBjRpnqCKmH9kOWmjkhPA06A1QZ387cTnZMsFSDuID92yX8Tq5visJJMUGvB8IqxTI3eJOdVPOiZ6UMUnISWvkEpaIa1FIJ3ICuK5cFqs',
      flag: '🇧🇷',
      streak: 3,
      trophies: 1580,
      status: 'Maintained'
    },
    {
      rank: 12,
      name: 'VowelQueen',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkGoZwNMZ4oYLHhV3RxY6cnj1AVTJnHmRqI3f-a6xw40tS1fAEnEuyU2uPJMrxqik7DaZoahNTXSanpzV9YehM8xyxsxetR29PC1d3dHMaj84tvFixn-Ptj9fc_o4H_mR89cK820pWqE-pGqL7CyPsJWRs6QLD1vQcXPDUBgw99zzsuxvfualQnLiLS8btizdFGJ_-23skRKpEWAZmYgVa-g7JMZpni038jymJVkQPABw7qEGQDFo9',
      flag: '🇸🇪',
      streak: 1,
      trophies: 1540,
      status: 'Maintained'
    },
    {
      rank: 13,
      name: 'CrosswordAce',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4ZW-ZGTwqs2VHda2waIpg9QwlLEcLP3FrszgGiGsWV8qV9jfGK8Rm6el6LawCB4MoBiQ6fovbZL1qykB8RbBP2Y-S2mBq_3E8CmAuS5hMyXHqe_2QfrMyUa5Cgw6j9dJcKUbmVI6YRFzpoiiR934H6EG_z1i7TzT20YewSJmtpmY2ZQB9KFXzy834DzwFh2P_9Gpsneslr9gi-H6xoE_6ZlBGjuR_QuyDFIaKEHfg5jt77MhBhjjN',
      flag: '🇪🇸',
      streak: 2,
      trophies: 1515,
      status: 'Maintained'
    },
    {
      rank: 14,
      name: 'CrypticSolver',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaR2bjAgGi5lhbbYhwA5T1nG5PgcsVA03khwTp2RmmSdH_smLpJ-ewSI8dTkAuYsjijBL_mtmmDmxpy9CE07rJ-fb0GO48oRqspfGy9cv1z0XrTcSTeDtIM15f4UvdW9baHzxGOLMhKnaXx0Gn8M3TVzJ1zV9ChJ8BvxNzwowcTSsqdaHiWTDR_IzlMJM3P4fMLmViQdDBiiYsP7c9M8VZYibH3cUu8-9mMD2Pm1nQY0ywXw7OwzBm',
      flag: '🇰🇷',
      streak: 1,
      trophies: 1490,
      status: 'Maintained'
    },
    {
      rank: 15,
      name: 'SynonymSam',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBE-Va2NtM6V4G3nmIfCfhmiKDyJ9B6PthsP3iaNwf71fSHrW1sHUrcwbw0xikRGhyVXhw64DQZbIVj9orz6ls2PgdHxafZ5omXz50ZzuCpPPMach_jtic7SDLBr0DdE88STYIP3hQNjzjSOKfwXB-86Cgvsf6cJF5YYOKu2mx7lsJyeMlR_2vq9hAatvu4hwZqsl5m79O4uwaOR1o8RUm5sA8DafL_GXFhU9Cl3jJXUia5fZqq8h2q',
      flag: '🇮🇹',
      streak: 0,
      trophies: 1460,
      status: 'Maintained'
    }
  ];

  const friendsList: PlayerRank[] = [
    {
      rank: 1,
      name: 'WordWizard',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDC6ZaHRl3mr5YEuMd5tWpfcSsvhq1n6h0rfVhH3iwVAyeEX3qRyo9mlPm_M9TMmGdux1Dgo2lSxP_0Her2vpj8Ykx0IiHjWvLYg-1GPCVJTqx3QFqxVKNFDAktKM_ufwOxcdoMmS_YIizR83E2L_XMroxtLMj6bESbjhdzivCy2v4kLyMPqz070YgJOKt5CBQ0AJzmvwfdh0lzY54286x79qC81qpL5VUoErnr9psZutbx7U6GAQyt',
      flag: '🇺🇸',
      streak: 7,
      trophies: userStats.trophies,
      status: 'Guild Leader',
      isYou: true
    },
    {
      rank: 2,
      name: 'LexiQuest',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdJjcIamms3fRk_p8At3B4o9g_ru36GT7uHgaxu5i_HBwPmiSdam5gUbObowBCS1Z75tvZhUupJEyiwOYsvxDUjnKWySGV3XvMMNfn-DO_unIw9LvlqUXed_QNMTvhp4zSOpfpQOeSQVcKkMPbIQbG5j_L5CpQO92-1LkwiDDWZP_xTW0Nl93F0r8dRl83tve1ZuwzgaFl5ZnwT36OqwKSvllfMyV1J73azkITKo17K_03xWhv12JG',
      flag: '🇺🇸',
      streak: 11,
      trophies: 1810,
      status: 'Online'
    },
    {
      rank: 3,
      name: 'AnagramHero',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCX2KJK4klIO2BMVtNfrJu84OgPoVkSX3djVQv0qKg0RJ0Cs-8f_FOgzwe-Kmcy2gQhmepfYJFclPYWkWKKofPKooxnOYuCM7aiG3yww_pe8ivzumG8V38HAHkxQBrgQaQakARN9HrDPWOYn0QunT_mom_Z4Zduf6dBbNuxrHutYwg93RbO9hUyHwBpY4mY1tS3hzsF7EIXOrnAyC1Kfvo2iFZsYM6eZxTiGx8RvM68S-sebNQSn5kJ',
      flag: '🇩🇪',
      streak: 5,
      trophies: 1712,
      status: 'Playing Daily'
    },
    {
      rank: 4,
      name: 'PuzzleKitten',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAn7PCS2M0cAKNESKiQ-RvjE59R4bCT4C8zVqJUIIUYbB3X3krJrqA2ljDFDwTYTZdkTnylliVvwSniTZFlah4kl4G6ewl2YwP-rgIhqrWQvGsSWLO1Er7IEGxdcfFqkJsKa7ew5yRRa7kj-IpxqqWbLtee-Kb0TzhELfXkuudMwy4DXBDZMPr-Y_e6eqNYgGrxJRHzkeWasg2dDAxSL-eQTbPM36R3GGBDQU7ThbP7suivi2KXJw90',
      flag: '🇯🇵',
      streak: 3,
      trophies: 1685,
      status: 'Idle 5m'
    }
  ];

  return (
    <div className="flex flex-col w-full px-space-md py-space-sm gap-space-md select-none">
      {/* League Details Modal */}
      {detailsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
          <div className="relative w-full max-w-[380px] bg-surface-container-high rounded-2xl p-space-md shadow-2xl border border-surface-container-highest animate-tile-pop">
            <button
              onClick={() => setDetailsModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
            <div className="w-12 h-12 rounded-xl bg-tertiary/20 text-tertiary flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-[28px]">military_tech</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Diamond League Rules</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              Top 5 players promote to Master League on Sunday reset. Positions 6 to 20 remain safe in Diamond.
              Positions 21 to 30 relegate to Gold League.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <div className="p-2.5 rounded-lg bg-surface-container flex justify-between items-center text-sm">
                <span className="text-primary font-bold">1st Place Bonus</span>
                <span className="text-secondary font-bold">+300 Coins</span>
              </div>
              <div className="p-2.5 rounded-lg bg-surface-container flex justify-between items-center text-sm">
                <span className="text-primary font-bold">Promotion Reward</span>
                <span className="text-secondary font-bold">+150 Coins</span>
              </div>
            </div>
            <button
              onClick={() => setDetailsModalOpen(false)}
              className="w-full mt-4 py-2.5 rounded-xl bg-primary text-on-primary font-label-md text-label-md cursor-pointer"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {/* Friends vs Global Segmented Control */}
      <div className="flex items-center justify-center p-1 rounded-full bg-surface-container-low shadow-inner">
        <button
          onClick={() => setTab('global')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-full font-label-md text-label-md transition-all duration-200 cursor-pointer ${
            tab === 'global'
              ? 'bg-primary text-on-primary shadow-[0_2px_12px_rgba(78,222,163,0.3)]'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">public</span>
          <span>Global League</span>
        </button>
        <button
          onClick={() => setTab('friends')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-full font-label-md text-label-md transition-all duration-200 cursor-pointer ${
            tab === 'friends'
              ? 'bg-primary text-on-primary shadow-[0_2px_12px_rgba(78,222,163,0.3)]'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">group</span>
          <span>Friends (18)</span>
        </button>
      </div>

      {/* Tier Banner: Diamond League Division II */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-surface-container-high via-surface-container to-surface-container-low p-space-md shadow-xl">
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-tertiary/20 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-primary/15 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative flex items-center justify-between gap-space-sm">
          <div className="flex items-center gap-3">
            {/* Diamond Emblem */}
            <div className="relative flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-tr from-surface-container-highest via-tertiary-container/30 to-tertiary/40 shadow-[0_0_20px_rgba(192,193,255,0.35)]">
              <span
                className="material-symbols-outlined text-tertiary text-[32px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                diamond
              </span>
              <span className="absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded-full bg-tertiary-container text-on-tertiary-container font-label-sm text-[10px] shadow font-bold">
                II
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <h2 className="font-headline-sm text-headline-sm text-on-surface leading-tight">
                  Diamond League
                </h2>
                <span className="material-symbols-outlined text-primary text-[16px]">verified</span>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Division II • Tier 8 of 10
              </span>
            </div>
          </div>

          {/* Weekly Countdown Timer Badge */}
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-highest text-secondary shadow-[0_0_8px_rgba(255,185,95,0.2)]">
              <span className="material-symbols-outlined text-[14px]">schedule</span>
              <span className="font-label-sm text-label-sm uppercase font-bold">1d 14h Left</span>
            </div>
            <span className="font-label-sm text-label-sm text-outline mt-1 text-right">
              Weekly reset
            </span>
          </div>
        </div>

        {/* League Rules Mini Bar */}
        <div className="mt-3.5 pt-3 flex items-center justify-between gap-2 text-on-surface-variant font-label-sm text-[11px] bg-surface-container-lowest/60 rounded-lg p-2.5">
          <div className="flex items-center gap-1.5 text-primary">
            <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
            <span className="font-label-md text-label-sm font-bold">Top 5 Advance</span>
            <span className="text-on-surface-variant font-body-sm">to Master</span>
          </div>
          <div className="h-3 w-px bg-surface-container-highest"></div>
          <div className="flex items-center gap-1.5 text-error">
            <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
            <span className="font-label-md text-label-sm font-bold">Bottom 5 Relegate</span>
          </div>
        </div>
      </div>

      {/* Player Standing Pinned Banner (Hero Micro Card) */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-surface-card via-surface-container-high to-surface-card p-space-md shadow-[0_8px_24px_rgba(0,0,0,0.45)]">
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-primary via-glow-success to-primary shadow-[0_0_10px_rgba(78,222,163,0.8)]"></div>
        <div className="flex items-center justify-between gap-space-sm pl-1">
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center justify-center w-8 h-8 rounded-lg bg-primary-container text-on-primary-container font-headline-sm text-headline-sm leading-none shadow-[0_0_12px_rgba(16,185,129,0.4)] font-black">
              #4
            </div>
            <div className="relative">
              <img
                className="w-11 h-11 rounded-full object-cover shadow-[0_0_10px_rgba(78,222,163,0.3)]"
                alt="WordWizard avatar"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7up1qXAgAxkUhRdS4hB32ajB8Yfea9YSmOfxdYli0AXFou7l3YZR9y-vTZZ38SfNDF0HJsnHaNVQLi5avlOZ94vlDUqRnEccFgg92w7uaMI74Vv4KcgfcwwpnVriybGbacNdpk84oWmlO8rFtKCtnOv26BQHblBm3IaifAdP-YjptPE82SEgP7LNYfktNg_m49dgXKS5rpCM160anYLA-lFGg0Uy_K0b76BpkhtSoo636Ev8t5nCL"
              />
              <span className="absolute -bottom-1 -right-1 px-1 rounded-full bg-surface-container text-[10px]">
                👑
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-headline-sm text-headline-sm text-on-surface leading-tight font-extrabold">
                  WordWizard
                </span>
                <span className="px-1.5 py-0.5 rounded bg-surface-container-highest font-label-sm text-[10px] text-primary font-bold">
                  YOU
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-body-sm text-body-sm text-primary flex items-center gap-0.5 font-bold">
                  <span className="material-symbols-outlined text-[14px]">arrow_drop_up</span> Promotion Zone
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 text-secondary font-headline-sm text-headline-sm leading-tight font-black">
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                military_tech
              </span>
              <span>{userStats.trophies}</span>
            </div>
            <div className="flex items-center gap-1 font-label-sm text-[11px] text-secondary-fixed bg-secondary-container/20 px-2 py-0.5 rounded-full mt-1">
              <span>Reward:</span>
              <span className="text-secondary font-label-md font-bold">+150</span>
              <span className="material-symbols-outlined text-[13px] text-secondary">monetization_on</span>
            </div>
          </div>
        </div>
      </div>

      {tab === 'global' ? (
        <>
          {/* Top 3 Podium Showcase */}
          <div className="flex flex-col gap-2 pt-1">
            <div className="flex items-center justify-between px-1">
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                Top Performers
              </span>
              <span className="font-label-sm text-label-sm text-secondary flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">local_fire_department</span> High Intensity
              </span>
            </div>

            {/* 3-Column Podium Grid */}
            <div className="grid grid-cols-3 gap-2 items-end pt-5 pb-1">
              {/* Rank 2: Silver (LexiQuest) */}
              <div className="flex flex-col items-center">
                <span className="material-symbols-outlined text-outline text-[22px] mb-1">
                  workspace_premium
                </span>
                <div className="relative -mb-3 z-10">
                  <img
                    className="w-14 h-14 rounded-full object-cover shadow-[0_4px_16px_rgba(134,148,138,0.35)]"
                    alt="LexiQuest"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdJjcIamms3fRk_p8At3B4o9g_ru36GT7uHgaxu5i_HBwPmiSdam5gUbObowBCS1Z75tvZhUupJEyiwOYsvxDUjnKWySGV3XvMMNfn-DO_unIw9LvlqUXed_QNMTvhp4zSOpfpQOeSQVcKkMPbIQbG5j_L5CpQO92-1LkwiDDWZP_xTW0Nl93F0r8dRl83tve1ZuwzgaFl5ZnwT36OqwKSvllfMyV1J73azkITKo17K_03xWhv12JG"
                  />
                  <span className="absolute -bottom-1 -right-1 flex items-center justify-center w-5 h-5 rounded-full bg-outline text-surface font-label-sm text-[11px] font-bold shadow">
                    2
                  </span>
                </div>
                <div className="w-full pt-5 pb-3 px-1.5 flex flex-col items-center bg-surface-container rounded-t-xl rounded-b-lg shadow-md text-center">
                  <span className="font-headline-sm text-[13px] text-on-surface truncate w-full font-bold">
                    LexiQuest
                  </span>
                  <div className="flex items-center gap-0.5 text-secondary font-label-md text-[13px] mt-0.5">
                    <span
                      className="material-symbols-outlined text-[14px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      military_tech
                    </span>
                    <span>2,045</span>
                  </div>
                  <span className="font-label-sm text-[10px] text-on-surface-variant flex items-center gap-0.5 mt-1 bg-surface-container-high px-1.5 py-0.5 rounded-full font-bold">
                    🔥 11 Streak
                  </span>
                </div>
              </div>

              {/* Rank 1: Gold Champion (SpellCraft) */}
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 mb-1">
                  <span
                    className="material-symbols-outlined text-secondary text-[28px] animate-pulse"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    crown
                  </span>
                </div>
                <div className="relative -mb-3.5 z-10">
                  <img
                    className="w-18 h-18 rounded-full object-cover shadow-[0_0_24px_rgba(255,185,95,0.55)]"
                    alt="SpellCraft"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfgCkGp5Ps1p3rJ_Y-TSvs4VyAExaWfB0CRBQiNqhS6Nrdoc-KTNc2DpDKK2xF5XfDUdZB7EOyZMokyWYkqv52Ywa4mECJynE8XRbEfSSLUubq_HMrXn8eFQtjYdUKhFX3H15z27IzEOiVmIYgVghktjHvdQvHCaeLPUTsatf6RuSI7PuJVACJMgNDWdycvrLwSOJiAyPuKfjVFif80HIj_KqHyyWBL5IsEYZvFD1PigJBEzk0H_bF"
                  />
                  <span className="absolute -bottom-1 -right-1 flex items-center justify-center w-6 h-6 rounded-full bg-secondary text-on-secondary font-label-md text-[12px] font-extrabold shadow-lg">
                    1
                  </span>
                </div>
                <div className="w-full pt-6 pb-4 px-1.5 flex flex-col items-center bg-gradient-to-b from-surface-container-high to-surface-container rounded-t-2xl rounded-b-lg shadow-xl text-center">
                  <span className="font-headline-sm text-headline-sm text-secondary truncate w-full leading-tight font-black">
                    SpellCraft
                  </span>
                  <div className="flex items-center gap-0.5 text-secondary font-headline-sm text-headline-sm mt-0.5 font-bold">
                    <span
                      className="material-symbols-outlined text-[16px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      military_tech
                    </span>
                    <span>2,280</span>
                  </div>
                  <span className="font-label-sm text-[11px] text-on-secondary-container bg-secondary/20 px-2 py-0.5 rounded-full mt-1.5 font-bold">
                    +300 🪙 Rank 1
                  </span>
                </div>
              </div>

              {/* Rank 3: Bronze (GridMaster) */}
              <div className="flex flex-col items-center">
                <span className="material-symbols-outlined text-secondary-container text-[22px] mb-1">
                  military_tech
                </span>
                <div className="relative -mb-3 z-10">
                  <img
                    className="w-14 h-14 rounded-full object-cover shadow-[0_4px_16px_rgba(238,152,0,0.3)]"
                    alt="GridMaster"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCz_rxb84JrsBgM5befN0T1CjZKjq6RmI8psCGBTmalhlpL-oqLDpgjyVbvMIDzA0EjuNDMRykSkcp_2ZdITlaT-T1DscHxHPGKVRgaM6lTJpvUGhOwo38fLin54ivbvz92WYxrPNCnzbAhKI5zMx9fDQWj-F6KriB7NrzmYFTwFT82Oo544wEhRqPcfKT-FLzQCqPX41vx1B7DwGi21E10BogWdWTX6r-CiOBUVjTTsTk9EFSypSc0"
                  />
                  <span className="absolute -bottom-1 -right-1 flex items-center justify-center w-5 h-5 rounded-full bg-secondary-container text-on-secondary font-label-sm text-[11px] font-bold shadow">
                    3
                  </span>
                </div>
                <div className="w-full pt-5 pb-3 px-1.5 flex flex-col items-center bg-surface-container rounded-t-xl rounded-b-lg shadow-md text-center">
                  <span className="font-headline-sm text-[13px] text-on-surface truncate w-full font-bold">
                    GridMaster
                  </span>
                  <div className="flex items-center gap-0.5 text-secondary font-label-md text-[13px] mt-0.5">
                    <span
                      className="material-symbols-outlined text-[14px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      military_tech
                    </span>
                    <span>1,960</span>
                  </div>
                  <span className="font-label-sm text-[10px] text-on-surface-variant flex items-center gap-0.5 mt-1 bg-surface-container-high px-1.5 py-0.5 rounded-full font-bold">
                    🔥 8 Streak
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Promotion Cutoff Indicator */}
          <div className="relative flex items-center justify-center my-0.5 py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_12px_rgba(78,222,163,0.8)]"></div>
            </div>
            <div className="relative flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm shadow-md">
              <span className="material-symbols-outlined text-[15px]">keyboard_double_arrow_up</span>
              <span className="uppercase tracking-wider font-extrabold">
                Promotion Threshold • Top 5 Advance
              </span>
            </div>
          </div>

          {/* League Ranks List (Ranks 4-15) */}
          <div className="flex flex-col gap-2">
            {globalPlayers.map(p => {
              const isYou = p.isYou;
              return (
                <React.Fragment key={p.rank}>
                  {p.rank === 6 && (
                    <div className="flex items-center justify-center py-1">
                      <span className="font-label-sm text-[11px] text-outline uppercase tracking-wider bg-surface-container-lowest px-3 py-0.5 rounded-full">
                        Safe Zone (Ranks 6 - 20)
                      </span>
                    </div>
                  )}

                  <div
                    className={`flex items-center justify-between p-2.5 rounded-xl transition-colors shadow-sm ${
                      isYou
                        ? 'bg-surface-container-high shadow-[0_4px_16px_rgba(16,185,129,0.2)]'
                        : 'bg-surface-container hover:bg-surface-container-high'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className={`flex items-center justify-center w-7 h-7 rounded-lg font-label-md text-label-md font-bold ${
                          isYou
                            ? 'bg-primary text-on-primary'
                            : 'bg-surface-container-highest text-on-surface'
                        }`}
                      >
                        {p.rank}
                      </span>
                      <div className="relative flex-shrink-0">
                        <img
                          className="w-10 h-10 rounded-full object-cover"
                          alt={p.name}
                          src={p.avatar}
                        />
                        <span className="absolute -bottom-0.5 -right-0.5 text-[11px]">{p.flag}</span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`font-headline-sm text-[15px] truncate font-bold ${
                              isYou ? 'text-primary' : 'text-on-surface'
                            }`}
                          >
                            {p.name}
                          </span>
                          {isYou && (
                            <span className="px-1 py-0.2 rounded bg-primary/20 text-primary font-label-sm text-[9px] font-bold">
                              YOU
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 text-on-surface-variant font-body-sm text-[12px]">
                          <span className="text-secondary font-label-sm">🔥 {p.streak} Win Streak</span>
                          {p.deltaPts && (
                            <>
                              <span>•</span>
                              <span className="text-primary font-label-sm">{p.deltaPts}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end flex-shrink-0 pl-2">
                      <span className="font-headline-sm text-[16px] text-on-surface font-extrabold flex items-center gap-0.5">
                        <span
                          className="material-symbols-outlined text-secondary text-[16px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          military_tech
                        </span>
                        {p.trophies.toLocaleString()}
                      </span>
                      <span
                        className={`font-label-sm text-[10px] font-bold ${
                          isYou || p.rank === 5 ? 'text-primary' : 'text-on-surface-variant'
                        }`}
                      >
                        {p.status}
                      </span>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </>
      ) : (
        /* Friends League Tab */
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between px-1">
            <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
              Friend Leaderboard
            </span>
            <span className="font-label-sm text-label-sm text-primary font-bold">18 Friends Active</span>
          </div>

          {friendsList.map(friend => (
            <div
              key={friend.rank}
              className={`flex items-center justify-between p-2.5 rounded-xl transition-colors shadow-sm ${
                friend.isYou
                  ? 'bg-surface-container-high shadow-[0_4px_16px_rgba(16,185,129,0.2)]'
                  : 'bg-surface-container hover:bg-surface-container-high'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span
                  className={`flex items-center justify-center w-7 h-7 rounded-lg font-label-md text-label-md font-bold ${
                    friend.isYou
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container-highest text-on-surface'
                  }`}
                >
                  {friend.rank}
                </span>
                <div className="relative flex-shrink-0">
                  <img
                    className="w-10 h-10 rounded-full object-cover"
                    alt={friend.name}
                    src={friend.avatar}
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 text-[11px]">{friend.flag}</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`font-headline-sm text-[15px] truncate font-bold ${
                        friend.isYou ? 'text-primary' : 'text-on-surface'
                      }`}
                    >
                      {friend.name}
                    </span>
                    {friend.isYou && (
                      <span className="px-1 py-0.2 rounded bg-primary/20 text-primary font-label-sm text-[9px] font-bold">
                        YOU
                      </span>
                    )}
                  </div>
                  <span className="text-secondary font-label-sm">🔥 {friend.streak} Streak</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-headline-sm text-[15px] text-on-surface font-extrabold flex items-center gap-0.5">
                  <span
                    className="material-symbols-outlined text-secondary text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    military_tech
                  </span>
                  {friend.trophies}
                </span>
                {!friend.isYou && (
                  <button
                    onClick={() => {
                      showToast(`Challenging ${friend.name} to a Word Duel!`);
                      startMode('duel');
                    }}
                    className="px-2 py-1 rounded-lg bg-surface-bright text-primary font-label-sm text-[11px] hover:bg-surface-container-highest active:scale-95 transition-all cursor-pointer font-bold"
                  >
                    Duel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Relegation Warning Footer Card */}
      <div className="flex items-center justify-between p-space-md rounded-xl bg-surface-container-low shadow-sm mt-1">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-error-container/40 text-error">
            <span className="material-symbols-outlined text-[18px]">warning</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-md text-label-md text-on-surface font-bold">
              Demotion Zone starts at Rank 26
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Stay above 1,320 points to avoid Gold League
            </span>
          </div>
        </div>
        <button
          onClick={() => setDetailsModalOpen(true)}
          className="px-3 py-1.5 rounded-lg bg-surface-container-high text-on-surface font-label-sm text-label-sm hover:bg-surface-bright active:scale-95 transition-all cursor-pointer font-bold"
        >
          Details
        </button>
      </div>

      {/* Quick Play Word Duel Sticky Action Callout */}
      <div className="sticky bottom-2 z-20 pt-2 pb-1">
        <button
          onClick={() => startMode('duel')}
          className="w-full flex items-center justify-center gap-2 py-3.5 px-space-md rounded-xl bg-gradient-to-r from-primary-container via-glow-success to-primary-container text-on-primary-container font-headline-sm text-headline-sm shadow-[0_8px_24px_rgba(16,185,129,0.45)] active:scale-95 transition-transform cursor-pointer font-extrabold"
        >
          <span className="material-symbols-outlined text-[24px]">sports_esports</span>
          <span>Play Word Duel (+45 Trophies)</span>
        </button>
      </div>
    </div>
  );
};
