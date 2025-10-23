import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { RankingContext } from '../context/RankingContext';

// componenta care cere numele inainte de turneu
export default function NameScreen({ onStart }) {
  
  const { setUserName } = useContext(RankingContext);
  const [name, setName] = useState('');
  const handleStart = () => {
    if (name.trim() === '') return;
    setUserName(name);
    onStart();
  };

  // interfata pentru introducerea numelui
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Introdu numele tău:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nume"
        value={name}
        onChangeText={setName}
      />
      {/* buton pentru a începe turneul */}
      <Pressable style={styles.button} onPress={handleStart}>
        <Text style={styles.buttonText}>Start</Text>
      </Pressable>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: 'white' },
  title: { fontSize: 24, marginBottom: 20 },
  input: { borderWidth: 1, width: '100%', padding: 10, marginBottom: 20, borderRadius: 5 },
  button: { backgroundColor: '#FF8C00', padding: 10, borderRadius: 5 },
  buttonText: { color: 'white', fontWeight: 'bold' },
});