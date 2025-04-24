import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { signUp } from '@/lib/functions';

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async () => {
    try {
      if (password !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match');
        return;
      }
      await signUp(email, password);
      router.replace('/(tabs)'); // Navigate to main app after successful login
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container}>
        <Text style={styles.title}>Sign up</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={'#999'}
          selectionColor="white"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={'#999'}
          selectionColor="white"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor={'#999'}
          selectionColor="white"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.replace('/(auth)/login')}>
          <Text style={styles.linkText}>
          Already have an account? <Text style={{ color: '#007AFF', fontWeight: 'bold' }}>Log in.</Text>
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
    color: 'white',
    backgroundColor: '#272e35',
  },
  button: {
    backgroundColor: '#007AFF',
    height: 56,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  linkText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
}); 