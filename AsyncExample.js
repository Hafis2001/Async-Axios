import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [textInputValue, setTextInputValue] = useState('');
  const [getValue, setGetValue] = useState('');

  const saveValueFunction = () => {
    if (textInputValue) {
      AsyncStorage.setItem('any_key_here', textInputValue);
      setTextInputValue('');
      alert('Data Saved');
    } else {
      alert('Please fill data');
    }
  };

  const getValueFunction = () => {
    AsyncStorage.getItem('any_key_here').then((value) => {
      if (value !== null) {
        setGetValue(value);
      } else {
        alert('No data found');
      }
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.titleText}></Text>
        <TextInput
          placeholder="Enter Some Text here"
          value={textInputValue}
          onChangeText={(data) => setTextInputValue(data)}
          underlineColorAndroid="transparent"
          style={styles.textInputStyle}
        />
        <TouchableOpacity onPress={saveValueFunction} style={styles.buttonStyle}>
          <Text style={styles.buttonTextStyle}> SAVE VALUE </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={getValueFunction} style={styles.buttonStyle}>
          <Text style={styles.buttonTextStyle}> GET VALUE </Text>
        </TouchableOpacity>
        <Text style={styles.textStyle}>{getValue}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    padding: 10,
    textAlign: 'center',
  },
  buttonStyle: {
    fontSize: 16,
    color: 'white',
    backgroundColor: 'green',
    padding: 5,
    marginTop: 32,
    minWidth: 250,
  },
  buttonTextStyle: {
    padding: 5,
    color: 'white',
    textAlign: 'center',
  },
  textInputStyle: {
    textAlign: 'center',
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: 'green',
  },
});

export default App;
