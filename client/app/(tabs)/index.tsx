import { Image, StyleSheet, Platform, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import ScreenView from '@/components/ScreenView';

export default function HomeScreen() {
  const { session, signOut } = useAuth();

  console.log(session?.access_token);

  return (
      <ScreenView>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Welcome {session?.user?.email}!</ThemedText>
        </ThemedView>
        <ThemedView>
          <ThemedText>Log in to get started!</ThemedText>
          { session ? (
            <TouchableOpacity style={styles.button} onPress={() => router.replace('/(tabs)/explore')}>
              <ThemedText>Explore</ThemedText>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={() => router.replace('/(auth)/login')}>
              <ThemedText>Log in</ThemedText>
            </TouchableOpacity>
          )}
          { session && (
            <TouchableOpacity style={styles.button} onPress={() =>  signOut()}>
              <ThemedText>Log out</ThemedText>
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
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  button: {
    color: 'white',
    backgroundColor: '#007AFF',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
});
