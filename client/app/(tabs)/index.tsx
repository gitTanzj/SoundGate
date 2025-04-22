import { Image, StyleSheet, Platform, TouchableOpacity, ActivityIndicator, Alert, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import ScreenView from '@/components/ScreenView';
import * as QueryParams from 'expo-auth-session/build/QueryParams';
import * as Linking from 'expo-linking';
import { supabase } from '@/lib/supabase';
import * as WebBrowser from 'expo-web-browser';



export default function HomeScreen() {
  const { session, signOut } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const createSessionFromUrl = async (url: string) => {
    console.log('Creating session from URL:', url);
    try {
      const { params, errorCode } = QueryParams.getQueryParams(url);
      if (errorCode) throw new Error(errorCode);

      const { access_token, refresh_token } = params;
      if (!access_token) return;

      const { data, error } = await supabase.auth.setSession({
        access_token,
        refresh_token,
      });

      if (error) throw error;
      return data.session;
    } catch (error) {
      console.error('Error creating session from URL:', error);
      Alert.alert('Error', 'Failed to create session from URL. Please try again.');
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session ? 'Session exists' : 'No session');
      if (event === 'SIGNED_IN' && session) {
        router.replace('/(tabs)');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signInWithSpotify = async () => {
    try {
      setIsLoading(true);
      console.log('Starting Spotify login...');
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'spotify',
        options: {
          redirectTo: 'soundgate://auth/callback',
          skipBrowserRedirect: true,
        }
      });

      if (error) {
        console.error('Supabase OAuth error:', error);
        throw error;
      }

      if (!data?.url) {
        throw new Error('No authentication URL returned');
      }

      console.log('Opening URL:', data.url);
      const result = await WebBrowser.openAuthSessionAsync(
        data.url,
        'soundgate://auth/callback'
      );

      console.log('WebBrowser result:', result);

      if (result.type === 'success') {
        const { url } = result;
        if (url) {
          await createSessionFromUrl(url);
        }
        
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) {
          throw sessionError;
        }
        if (session) {
          router.replace('/(tabs)');
        }
      } else if (result.type === 'cancel') {
        console.log('Authentication was cancelled by the user');
      } else {
        throw new Error('Authentication failed');
      }
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

  // Handle deep linking
  useEffect(() => {
    const handleDeepLink = async (url: string) => {
      try {
        if (!url) return;
        
        const session = await createSessionFromUrl(url);
        console.log('Session:', session);
        if (session) {
          router.replace('/(tabs)');
        }
      } catch (error) {
        console.error('Deep link handling error:', error);
      }
    };

    // Check for initial URL
    Linking.getInitialURL().then(url => {
      if (url) handleDeepLink(url);
    }).catch(err => {
      console.error('Error getting initial URL:', err);
    });

    // Listen for new URLs
    const subscription = Linking.addEventListener('url', ({ url }) => {
      handleDeepLink(url);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
      <ScreenView>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">
            {session ? `Welcome ${session.user?.email || 'User'}!` : 'Welcome!'}
          </ThemedText>
        </ThemedView>
        <ThemedView>
          {!session && <ThemedText>Log in to get started!</ThemedText>}
          
          {!session && (
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
          )}
          
          {session ? (
            <TouchableOpacity style={styles.button} onPress={() => router.replace('/(tabs)/explore')}>
              <ThemedText style={styles.buttonText}>Explore</ThemedText>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={() => router.replace('/(auth)/login')}>
              <ThemedText style={styles.buttonText}>Log in</ThemedText>
            </TouchableOpacity>
          )}
          
          {session && (
            <TouchableOpacity style={styles.button} onPress={() => signOut()}>
              <ThemedText style={styles.buttonText}>Log out</ThemedText>
            </TouchableOpacity>
          )}
        </ThemedView>
      </ScreenView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  spotifyButton: {
    backgroundColor: '#1DB954',
  },
  button: {
    backgroundColor: '#007AFF',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 20,
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
