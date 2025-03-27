import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();

  const handleLogin = async () => {
    try {
      await signIn(email, password);
      router.replace('/(tabs)');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container}>
        <Text style={styles.title}>Log in</Text>
        <TextInput
          style={[styles.input, { color: 'white' }]}
          placeholder="Email"
          placeholderTextColor={'#999'}
          selectionColor="white"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={[styles.input, { color: 'white' }]}
          placeholder="Password"
          placeholderTextColor={'#999'}
          selectionColor="white"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
        <Text style={styles.regularText}>or</Text>
        <TouchableOpacity style={styles.googleButton} onPress={handleLogin}>
          <View style={styles.row}>
            <Image
              source={require('../../assets/images/google_G_logo.png')} // Local image
              style={styles.logo}
            />
            <Text style={styles.googleButtonText}>Sign in with Google</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.replace('/(auth)/signup')}>
          <Text style={styles.linkText}>
          Don't have an account? <Text style={{ color: '#007AFF', fontWeight: 'bold' }}>Sign up.</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#131B22',
  },
  title: {
    fontSize: 64,
    fontWeight: '400',
    marginBottom: 60,
    textAlign: 'center',
    color: 'white',
  },
  input: {
    height: 56,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 30,
    fontSize: 16,
    backgroundColor: '#272e35',
  },
  button: {
    backgroundColor: '#007AFF',
    height: 56,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  regularText: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 15,
  },
  googleButton: {
    backgroundColor: 'white',
    height: 56,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 20,
  },
  googleButtonText: {
    color: 'black',
    fontSize: 20,
    fontWeight: '600',
  },
  linkText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});