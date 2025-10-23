import React, { useContext, useState } from 'react';
import { View, Image, Pressable, Text, StyleSheet } from 'react-native';
import { RankingContext } from '../context/RankingContext';

// componenta pentru votarea perechilor de imagini
export default function PairVoting({ onFinish }) {
  const { images, setWinner, setMatchHistory } = useContext(RankingContext);
  const [currentRoundOptions, setCurrentRoundOptions] = useState([...images]); 
  const [nextRoundWinners, setNextRoundWinners] = useState([]); 
  const [roundNumber, setRoundNumber] = useState(1);
  
  // extragerea celor doua optiuni curente pentru votare
  const [a, b] = currentRoundOptions.length >= 2 ? currentRoundOptions.slice(0, 2) : [null, null];
  
  // gestionam aici alegerile utilizatorului
  const handleChoice = (selectedOption) => {
    if (!a || !b) return;
    // determinam optiunea pierzatoare
    const loser = selectedOption.id === a.id ? b : a;

    // actualizam istoricul meciurilor
    setMatchHistory(prev => [...prev, {
      round: roundNumber,
      left: a,
      right: b,
      winner: selectedOption
    }]);

    // actualizam lista optiunilor care au castigat pentru runda urmatoare
    const updatedNextRoundWinners = [...nextRoundWinners, selectedOption];
    setNextRoundWinners(updatedNextRoundWinners);

    const remainingOptions = currentRoundOptions.slice(2);
    setCurrentRoundOptions(remainingOptions);

    
    if (remainingOptions.length >= 2) {
        return;
    }
    
    if (remainingOptions.length === 0) { 
        if (updatedNextRoundWinners.length === 1) {
            setWinner(updatedNextRoundWinners[0]);
            onFinish();
            return;
        }
// pregatim runda urmatoare
        if (updatedNextRoundWinners.length >= 2) {
            setRoundNumber(prev => prev + 1);
            const newRoundOptions = updatedNextRoundWinners.sort(() => Math.random() - 0.5); 
            setCurrentRoundOptions(newRoundOptions);
            setNextRoundWinners([]); 
            return;
        }
    }
  };

  if (!a || !b) {
    return (
        <View style={styles.container}>
            <Text style={styles.roundText}>Runda {roundNumber}</Text>
            <Text style={styles.vsTextMain}>Așteaptă Runda {roundNumber + 1}...</Text>
        </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.roundText}>Runda {roundNumber}</Text>
      <Text style={styles.vsTextMain}>Cine este mai bun?</Text>
      <View style={styles.imagesRow}>
        {[a, b].map((item) => (
          <Pressable 
            key={item.id} 
            style={styles.imageBox} 
            onPress={() => handleChoice(item)}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' },
  roundText: { fontSize: 22, marginBottom: 5, fontWeight: 'bold', color: '#FF8C00' },
  vsTextMain: { fontSize: 18, marginBottom: 30, color: '#333' },
  imagesRow: { flexDirection: 'row', justifyContent: 'space-around', width: '90%' }, 
  imageBox: { alignItems: 'center', borderWidth: 3, borderColor: '#ccc', borderRadius: 15, padding: 10, flex: 1, marginHorizontal: 5 },
  image: { width: '100%', aspectRatio: 1, borderRadius: 10 },
  name: { marginTop: 10, fontSize: 16, fontWeight: '700', textAlign: 'center' },
});