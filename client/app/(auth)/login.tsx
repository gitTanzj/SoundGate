import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, ActivityIndicator, Linking } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { router } from 'expo-router';
import { supabase } from '@/lib/supabase';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  
  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        router.replace('/(tabs)');
      }
    });

    // Handle deep linking
    const handleDeepLink = async (url: string) => {
      if (url.includes('auth/callback')) {
        const { data, error } = await supabase.auth.getSession();
        if (data.session) {
          router.replace('/(tabs)');
        }
      }
    };

    // Set up deep link listener
    const deepLinkSubscription = Linking.addEventListener('url', ({ url }) => {
      handleDeepLink(url);
    });

    return () => {
      deepLinkSubscription.remove();
      authSubscription.unsubscribe();
    };
  }, []);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      await signIn(email, password);
      router.replace('/(tabs)');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithSpotify = async () => {
    try {
      setIsLoading(true);
      console.log('Starting Spotify login...');
      
      // First, sign out any existing session
      await supabase.auth.signOut();
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'spotify',
        options: {
          redirectTo: 'soundgate://auth/callback',
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        }
      });

      if (error) {
        console.error('Supabase OAuth error:', error);
        throw error;
      }

      if (!data?.url) {
        throw new Error('No URL returned from OAuth');
      }

      console.log('Opening URL:', data.url);
      await Linking.openURL(data.url);
    } catch (error: any) {
      console.error('Spotify login error:', error);
      Alert.alert(
        'Spotify Login Error',
        error.message || 'Failed to login with Spotify. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        editable={!isLoading}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!isLoading}
      />
      <TouchableOpacity 
        style={[styles.button, isLoading && styles.buttonDisabled]} 
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.button, styles.spotifyButton, isLoading && styles.buttonDisabled]} 
        onPress={signInWithSpotify}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Login with Spotify</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => router.replace('/(auth)/signup')}
        disabled={isLoading}
      >
        <Text style={styles.linkText}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  spotifyButton: {
    backgroundColor: '#1DB954', // Spotify green color
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  linkText: {
    color: '#007AFF',
    textAlign: 'center',
    fontSize: 16,
  },
}); 