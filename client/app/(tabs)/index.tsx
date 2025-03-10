import { Image, StyleSheet, Platform, TouchableOpacity } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';

export default function HomeScreen() {
  const { session } = useAuth();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome {session?.user?.email}!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView>
        <ThemedText>Log in to get started!</ThemedText>
        { session ? (
          <TouchableOpacity onPress={() => router.replace('/(tabs)/explore')}>
            <ThemedText>Explore</ThemedText>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => router.replace('/(auth)/login')}>
            <ThemedText>Log in</ThemedText>
          </TouchableOpacity>
        )}
      </ThemedView>
    </ParallaxScrollView>
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
});
