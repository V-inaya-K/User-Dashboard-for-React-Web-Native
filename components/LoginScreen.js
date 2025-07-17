import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ImageBackground } from 'react-native';

export default function LoginScreen({ setIsLoggedIn, storage }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    if (typeof localStorage !== 'undefined') {
      await storage.setItem('isLoggedIn', 'true');
    } else {
      await storage.setItem('isLoggedIn', 'true');
    }

    setIsLoggedIn(true);
  };

  return (
    <ImageBackground
  source={{ uri: 'https://t4.ftcdn.net/jpg/15/57/60/19/240_F_1557601976_uUOyRBNxptYrcRpbd4zFYHs3rSOYROvt.jpg' }} // 🌅 Use any image URL
  style={styles.background}
  resizeMode="cover"
>
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry style={styles.input} value={password} onChangeText={setPassword} />
      <Button title="Login" onPress={handleLogin} />
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',


  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
});
