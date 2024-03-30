import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AsyncTask = () => {
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

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Type something..."
        value={inputText}
        onChangeText={(text) => setInputText(text)}
      />
      <Button title="Save Text" onPress={saveText} />
      {storedText !== '' && (
        <View style={styles.displayContainer}>
          <Text style={styles.displayText}>Stored Text:</Text>
          <Text>{storedText}</Text>
        </View>
      )}
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
  displayContainer: {
    marginTop: 20,
  },
  displayText: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default AsyncTask;
