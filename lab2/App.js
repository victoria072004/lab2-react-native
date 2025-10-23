import React, { useState, useContext } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { RankingProvider, RankingContext } from './src/context/RankingContext';
import NameScreen from './src/components/NameScreen';
import PairVoting from './src/components/PairVoting';
import ResultScreen from './src/components/ResultScreen';

// componenta care gestioneaza schimbarea intre ecrane
const ScreenSwitcher = () => {
  const [screen, setScreen] = useState('name');
  const { resetGame } = useContext(RankingContext);
// functie pentru resetarea jocului 
  const handleRestart = () => {
    resetGame();
    setScreen('name');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar barStyle="dark-content" />
      {screen === 'name' && <NameScreen onStart={() => setScreen('pair')} />}
      {screen === 'pair' && <PairVoting onFinish={() => setScreen('result')} />} 
      {}
      {screen === 'result' && <ResultScreen onRestart={handleRestart} />}
    </SafeAreaView>
  );
};

export default function App() {
  return (
    <RankingProvider>
      <ScreenSwitcher />
    </RankingProvider>
  );
}