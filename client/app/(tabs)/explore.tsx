import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, useColorScheme } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
const sound = require('../../assets/images/sound.png');
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function exploreScreen() {
  const image = sound;

  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const recommendations = [
    {
        id: 1,
        title: 'APT.',
        artist: 'ROSÉ, Bruno Mars',
    },
    {
        id: 2,
        title: 'Lose Control',
        artist: 'Teddy Swims',
    },
    {
        id: 3,
        title: 'Close To You',
        artist: 'Gracie Abrams',
    },
    {
        id: 4,
        title: "Dogfight",
        artist: 'James Bay',
    },
    {
        id: 5,
        title: "BIRDS OF A FEATHER",
        artist: 'Billie Eilish',
    },
  ];
  return (
    <View style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
          <View style={styles.headerContent}>
            <ThemedText type="title" style={styles.appName}>SoundGate</ThemedText>
          </View>
      </View>
      <View style={styles.contentContainer}>
        <TouchableOpacity style={styles.musicContainer} onPress={togglePlayPause} activeOpacity={0.9}>
          {/* Waveform Display */}
          <View style={styles.imageContainer}>
            <Image source={image} style={styles.image} resizeMode="contain" />
          </View>

          {/* Play Button */}
          <View style={styles.playButton}>
            <Ionicons name={isPlaying ? 'pause' : 'play'} size={32} color="black" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    width: '100%'
  },
  contentContainer: {
      flex: 1,
      flexGrow: 1,
      width: '100%',
      paddingBottom: 40,
      backgroundColor: '#131B22',
      paddingTop: 130,
  },
  header: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      paddingTop: 90,
      paddingBottom: 15,
      paddingLeft: 20,
      marginTop: 0,
  
      backgroundColor: '#0A0E12',
  },
  headerContent: {
      margin: 0,
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
  imageContainer: {
    backgroundColor: '#247BA0',
    padding: 10,
    borderRadius: 10,
    width: '95%',
    maxWidth: 350,
  },
  image: {
    maxWidth: '100%',
    maxHeight: '100%',
    alignItems: 'center',
  },
  playButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  musicContainer: {
    backgroundColor: '#14475a',
    padding: 20,
    paddingTop: 80,
    gap: 30,
    alignItems: 'center',
  }
});
