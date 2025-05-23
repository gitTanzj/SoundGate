import { Image, StyleSheet, Platform, TouchableOpacity, View, ScrollView, Touchable } from 'react-native';
import { useEffect } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { router } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { useColorScheme } from 'react-native';
import { signOut } from '@/lib/functions';

const recommendations = [
  {
      id: 1,
      title: 'APT.',
      artist: 'ROSÉ, Bruno Mars',
      image: '',
  },
  {
      id: 2,
      title: 'Lose Control',
      artist: 'Teddy Swims',
      image: '',
  },
  {
      id: 3,
      title: 'Close To You',
      artist: 'Gracie Abrams',
      image: '',
  },
  {
      id: 4,
      title: "Dogfight",
      artist: 'James Bay',
      image: '',
  },
  {
      id: 5,
      title: "BIRDS OF A FEATHER",
      artist: 'Billie Eilish',
      image: '',
  },
];

export default function HomeScreen() {
  const { session } = useAuth();
  const colorScheme = useColorScheme() ?? 'light'; // Default value dark

  useEffect(() => {
    setTimeout(() => {
      if(!session){
        router.replace('/(auth)/login')
      }
    }, 1000)
  }, [session])

  return (
    <View style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} style={styles.scroll}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <ThemedText type="title" style={styles.appName}>SoundGate</ThemedText>
            <TouchableOpacity onPress={signOut} style={styles.signOut}>
              <ThemedText style={styles.signOutText}>Sign out</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.content}>
            {/* Greeting */}
            <ThemedText type="title" style={styles.greeting}>Good day!</ThemedText>
    
            {/* Main Action */}
            <TouchableOpacity style={styles.mainButton} onPress={() => router.push('/(tabs)/explore')}>
            <ThemedText style={styles.buttonText}>Start discovering</ThemedText>
            </TouchableOpacity>
    
            {/* Suggestions */}
            <ThemedText style={styles.sectionTitle}>Here’s something you might like</ThemedText>
    
            <View style={styles.albumList}>
            {recommendations.map(item => (
                <View key={item.id} style={styles.albumRow}>

                    <View>
                        <ThemedText style={styles.albumTitle}>{item.title}</ThemedText>
                        <ThemedText style={styles.albumSubtitle}>{item.artist}</ThemedText>
                    </View>
                </View>
            ))}
            </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  signOut: {
    backgroundColor: 'lightblue',
    padding: 12,
    color: 'white',
    borderRadius: 12,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  signOutText: {
    fontWeight: 700
  },
  safeArea: {
      flex: 1,
      backgroundColor: '#111921',
      width: '100%'
  },
  scroll: {
      flex: 1,
      backgroundColor: '#111921',
  },
  container: {
      flex: 1,
      flexGrow: 1,
      width: '100%',
      paddingBottom: 40,
      backgroundColor: '#111921',
  },
  header: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      paddingTop: 90,
      paddingBottom: 15,
      paddingLeft: 20,
      marginTop: 0,
      marginBottom: 32,
      backgroundColor: '#0A0E12',
  },
  headerContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 0,
    width: '100%'
  },
  logo: {
      width: 36,
      height: 36,
      marginRight: 12,
  },
  appName: {
      color: 'white',
      fontSize: 34,
      fontWeight: '600',
      fontFamily: '',
  },
  content: {
      paddingHorizontal: 20,
      alignItems: 'center',
  },
  greeting: {
      color: 'white',
      fontSize: 36,
      fontWeight: 'bold',
      marginBottom: 20,
      marginTop: 20,
  },
  mainButton: {
      backgroundColor: '#4185B7',
      paddingVertical: 14,
      borderRadius: 12,
      marginBottom: 30,
      marginTop: 50,
      alignItems: 'center',
      width: '100%',
  },
  buttonText: {
      color: 'white',
      fontSize: 16,
  },
  sectionTitle: {
      color: 'white',
      fontSize: 18,
      fontWeight: '500',
      marginBottom: 16,
      marginTop: 50,
  },
  albumList: {
      gap: 16,
  },
  albumRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
  },
  albumImage: {
      width: 64,
      height: 64,
      borderRadius: 10,
  },
  albumTitle: {
      color: 'white',
      fontSize: 18,
      fontWeight: '700',
  },
  albumSubtitle: {
      color: '#ccc',
      fontSize: 14,
  },
  logoutButton: {
      backgroundColor: '#ff4d4d',
      marginTop: 40,
      paddingVertical: 14,
      borderRadius: 12,
      alignItems: 'center',
  },
});
