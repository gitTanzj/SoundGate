import { useState, useEffect, createContext, useContext } from 'react';
import React from 'react';
import { supabase } from '../lib/supabase';
import { Session } from '@supabase/supabase-js';
import { View, ActivityIndicator } from 'react-native';
interface AuthContextType {
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithSpotify: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
import * as WebBrowser from 'expo-web-browser';

// Ensure WebBrowser redirects are handled properly
WebBrowser.maybeCompleteAuthSession();

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('session', session);
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
    } catch (error) {
      throw error;
    }
  };

  const signInWithSpotify = async () => {
    try {
      // Close any existing browser sessions
      await WebBrowser.dismissBrowser();
      
      // Sign out any existing session
      await supabase.auth.signOut();
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'spotify',
        options: {
          redirectTo: 'soundgate://auth/callback',
          scopes: 'user-read-email user-read-private user-modify-playback-state user-read-playback-state',
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        }
      });

      if (error) throw error;
      if (!data?.url) throw new Error('No authentication URL returned');

      console.log('Opening Spotify auth URL:', data.url);
      
      const result = await WebBrowser.openAuthSessionAsync(
        data.url,
        'soundgate://auth/callback',
        {
          showInRecents: true,
          dismissButtonStyle: 'done',
        }
      );

      console.log('WebBrowser result:', result);

      if (result.type === 'success') {
        // Wait a moment for the session to be established
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;
        if (session) {
          setSession(session);
        }
      }
      
      throw new Error('Authentication failed or was cancelled');
    } catch (error) {
      console.error('Spotify auth error:', error);
      throw error;
    } finally {
      // Always try to dismiss the browser
      await WebBrowser.dismissBrowser();
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    try {
      // Close any existing browser sessions
      await WebBrowser.dismissBrowser();
      
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setSession(null);
    } catch (error) {
      throw error;
    }
  };

  const value = {
    session,
    loading,
    signIn,
    signInWithSpotify,
    signUp,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading &&children}
    </AuthContext.Provider>
  )
} 