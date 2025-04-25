import { supabase } from "./supabase";
import * as WebBrowser from 'expo-web-browser';

export const getApiUrl = () => {
    return 'http://192.168.1.113:3000';
}

export const signUp = async (email: string, password: string) => {
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

export const signOut = async () => {
    try {
        // Close any existing browser sessions
        await WebBrowser.dismissBrowser();
        
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    } catch (error) {
        throw error;
    }
};   

export const signIn = async (email: string, password: string) => {
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

export const signInWithSpotify = async () => {
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