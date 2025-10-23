import React, { createContext, useState } from 'react';
import initialImages from '../../assets/objects.json'; 

export const RankingContext = createContext();

const defaultImages = Array.isArray(initialImages) ? initialImages : [];

export function RankingProvider({ children }) {
  const [userName, setUserName] = useState('');
  const [images, setImages] = useState([...defaultImages].sort(() => Math.random() - 0.5)); 
  const [winner, setWinner] = useState(null); 
  const [matchHistory, setMatchHistory] = useState([]); 
  const resetGame = () => {
    setUserName('');
    setWinner(null);
    setMatchHistory([]);
    setImages([...defaultImages].sort(() => Math.random() - 0.5)); 
  };

  const contextValue = {
    userName,
    setUserName,
    images,
    winner,
    setWinner,
    matchHistory,
    setMatchHistory,
    resetGame,
  };

  return (
    <RankingContext.Provider value={contextValue}>
      {children}
    </RankingContext.Provider>
  );
}