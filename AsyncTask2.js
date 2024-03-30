import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AsyncTask2 = () => {
  const [inputText, setInputText] = useState('');
  const [storedText, setStoredText] = useState('');

  useEffect(() => {
    // Load stored text on component mount
    loadStoredText();
  }, []);

  const loadStoredText = async () => {
    try {
      const storedText = await AsyncStorage.getItem('userText');
      if (storedText !== null) {
        setStoredText(storedText);
      }
    } catch (error) {
      console.error('Error loading stored text:', error);
    }
  };

  const saveText = async () => {
    try {
      await AsyncStorage.setItem('userText', inputText);
      setStoredText(inputText);
    } catch (error) {
      console.error('Error saving text:', error);
    }
  };

  const printStoredText = () => {
    // Print stored text when the "Print Text" button is clicked
    alert(`Stored Text: ${storedText}`);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Type something..."
        value={inputText}
        onChangeText={(text) => setInputText(text)}
      />
      <Button title="Save Text" onPress={saveText} />
      <Button title="Print Text" onPress={printStoredText} />
      <Text>{storedText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
});

export default AsyncTask2;
