import React, { useContext, useMemo } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Pressable } from 'react-native';
import { RankingContext } from '../context/RankingContext'; 

const MATCH_HEIGHT = 100;
// componenta pentru afisarea rezultatelor 
const RoundCell = ({ item, isWinner }) => (
  <View style={styles.cellContainer}>
    <Image source={{ uri: item.image }} style={styles.image} />
    <Text style={[styles.name, isWinner && styles.winnerName]}>{item.name}</Text>
  </View>
);

export default function ResultScreen({ onRestart }) {
  const { winner, matchHistory } = useContext(RankingContext);
  // grupam meciurile pe runde pentru afisare
  const rounds = useMemo(() => {
    if (!matchHistory || matchHistory.length === 0) return []; 

    const groupedRounds = matchHistory.reduce((acc, match) => {
      const roundNum = match.round;
      acc[roundNum] = acc[roundNum] || [];
      acc[roundNum].push(match);
      return acc;
    }, {});

    return Object.keys(groupedRounds)
      .sort((a, b) => parseInt(a) - parseInt(b))
      .map(key => ({
        roundNumber: parseInt(key),
        matches: groupedRounds[key]
      }));
  }, [matchHistory]);


  if (!matchHistory || matchHistory.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Nu există date de afișat.</Text>
        <Pressable style={styles.button} onPress={onRestart}>
          <Text style={styles.buttonText}>Începe Turneul</Text>
        </Pressable>
      </View>
    );
  }
// construim arborele turneului pentru afisare
  return (
    <ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
      <View style={styles.bracketContainer}>
        {}
        {rounds.map((roundData, i) => {
          const heightMultiplier = Math.pow(2, i);

          return (
            <View key={i} style={styles.roundWrapper}>
              <Text style={styles.roundTitle}>Runda {roundData.roundNumber}</Text>

              <View style={styles.matchesColumn}>
                {roundData.matches.map((match, j) => {
                  const isWinnerLeft = match.winner.id === match.left.id;
                  
                  const marginTop = (MATCH_HEIGHT / 2) * heightMultiplier;
                  const marginBottom = (MATCH_HEIGHT / 2) * heightMultiplier;

                  return (
                    <View 
                      key={j} 
                      style={[
                        styles.matchGroup, 
                        { marginTop: i === 0 ? 0 : marginTop, marginBottom: i === rounds.length - 1 ? 0 : marginBottom }
                      ]}
                    >
                      <View style={styles.matchContent}>
                          {}
                          <View style={[styles.matchRow, isWinnerLeft && styles.winnerBackground]}>
                            <RoundCell item={match.left} isWinner={isWinnerLeft} />
                          </View>

                          <Text style={styles.vsText}>vs</Text>
                          
                          {}
                          <View style={[styles.matchRow, !isWinnerLeft && styles.winnerBackground]}>
                            <RoundCell item={match.right} isWinner={!isWinnerLeft} />
                          </View>

                          <Text style={styles.winnerText}>
                            🏆 {match.winner?.name || '—'}
                          </Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          );
        })}

        {/* Afișăm câștigătorul final */}
        {winner && (
          <View style={styles.finalContainer}>
            <Text style={styles.finalTitle}>🏁 Campion:</Text>
            <RoundCell item={winner} isWinner={true} />
            <Pressable style={styles.restartButton} onPress={onRestart}>
              <Text style={styles.restartText}>🔁 Joacă din nou</Text>
            </Pressable>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { padding: 20, minHeight: '100%', backgroundColor: '#f9f9f9' },
  bracketContainer: { flexDirection: 'row', alignItems: 'flex-start', paddingTop: 50 },
  roundWrapper: { marginHorizontal: 15, minWidth: 160, alignItems: 'center' },
  
  roundTitle: { position: 'absolute', top: -40, fontWeight: 'bold', fontSize: 18, color: '#18b833ff' },
  matchesColumn: { marginTop: 0 },
  matchGroup: { width: 150, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, backgroundColor: '#fff', paddingBottom: 5 },
  matchContent: { padding: 5, alignItems: 'center' },
  
  matchRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingHorizontal: 5, marginVertical: 2, width: '100%' },
  winnerBackground: { backgroundColor: '#FFFACD', borderRadius: 5 },
  cellContainer: { flexDirection: 'row', alignItems: 'center', padding: 2, flex: 1 },
  image: { width: 30, height: 30, borderRadius: 5, marginRight: 5 },
  
  name: { fontSize: 12, fontWeight: '500', color: '#333', flexShrink: 1 },
  winnerName: { fontWeight: '700', color: '#18b833ff' },
  vsText: { fontSize: 12, color: '#666', marginVertical: 2, fontWeight: 'bold' },
  winnerText: { fontSize: 12, color: '#18b833ff', marginTop: 5, fontWeight: 'bold', borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 5, textAlign: 'center', width: '100%' },
  
  finalContainer: { alignItems: 'center', marginHorizontal: 30, paddingTop: 10, borderWidth: 2, borderColor: '#18b833ff', borderRadius: 15, height: 150, justifyContent: 'center' },
  finalTitle: { fontSize: 20, fontWeight: 'bold', color: '#18b833ff', marginBottom: 5 },
  restartButton: { marginTop: 15, backgroundColor: '#18b833ff', padding: 10, borderRadius: 8 },
  restartText: { color: 'white', fontWeight: 'bold' },
  
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f9f9f9' },
  errorText: { fontSize: 18, color: '#18b833ff', marginBottom: 20 },
  button: { backgroundColor: '#18b833ff', padding: 10, borderRadius: 5 },
  buttonText: { color: 'white', fontWeight: 'bold' },
});