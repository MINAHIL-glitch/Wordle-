/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Toast } from './components/Toast';
import { DailyScreen } from './components/DailyScreen';
import { ShopScreen } from './components/ShopScreen';
import { RanksScreen } from './components/RanksScreen';
import { PlayScreen } from './components/PlayScreen';

const MainContent: React.FC = () => {
  const { activeTab } = useGame();

  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface flex flex-col min-h-screen selection:bg-primary-container selection:text-on-primary-container relative">
      <Header />
      <Toast />

      <main className="flex-1 flex flex-col relative w-full pt-16 pb-20 bg-surface max-w-[480px] mx-auto overflow-x-hidden">
        {activeTab === 'daily' && <DailyScreen />}
        {activeTab === 'shop' && <ShopScreen />}
        {activeTab === 'ranks' && <RanksScreen />}
        {activeTab === 'play' && <PlayScreen />}
      </main>

      <BottomNav />
    </div>
  );
};

export default function App() {
  return (
    <GameProvider>
      <MainContent />
    </GameProvider>
  );
}
