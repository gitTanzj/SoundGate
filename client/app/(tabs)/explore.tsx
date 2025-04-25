import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, PanResponder, useColorScheme } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import axiosInstance from '@/lib/axiosInstance';
import { getApiUrl } from '@/lib/functions';
const sound = require('../../assets/images/sound.png');

const recommendations = [
  { id: 1, title: 'APT.', artist: 'ROSÉ, Bruno Mars' },
  { id: 2, title: 'Lose Control', artist: 'Teddy Swims' },
  { id: 3, title: 'Close To You', artist: 'Gracie Abrams' },
  { id: 4, title: 'Dogfight', artist: 'James Bay' },
  { id: 5, title: 'BIRDS OF A FEATHER', artist: 'Billie Eilish' },
];

export default function exploreScreen() {
  const [currentSong, setCurrentSong] = useState<{ song: string, artist: string } | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const position = useRef(new Animated.Value(0)).current;

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dx) > 10,
      onPanResponderMove: Animated.event([null, { dx: position }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx < -120 && currentIndex < recommendations.length - 1) {
          // Swipe left
          Animated.timing(position, {
            toValue: -500,
            duration: 200,
            useNativeDriver: true,
          }).start(() => {
            setCurrentIndex((prev) => prev + 1);
            position.setValue(500);
            Animated.spring(position, {
              toValue: 0,
              useNativeDriver: true,
            }).start();
          });
        } else if (gesture.dx > 120 && currentIndex < recommendations.length - 1) {
          // Swipe right
          Animated.timing(position, {
            toValue: 500,
            duration: 200,
            useNativeDriver: true,
          }).start(() => {
            setCurrentIndex((prev) => prev - 1);
            position.setValue(-500);
            console.log('right gesture.dx', gesture.dx)
            Animated.spring(position, {
              toValue: 0,
              useNativeDriver: true,
            }).start();
          });
        } else {
          // Return to center
          Animated.spring(position, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    axiosInstance.get(`${getApiUrl()}/api/music/matches`) 
    .then(async (response) => {
      if(response.status === 200) {
        const song = response.data.song;
        console.log(song.parts[0].text);
        setCurrentSong(await JSON.parse(song.parts[0].text));
      }
    })
    .catch((error) => {
      console.log(error.response.data);
    })
  }, [])

  return (
    <View style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
          <View style={styles.headerContent}>
            <ThemedText type="title" style={styles.appName}>SoundGate</ThemedText>
          </View>
      </View>
      <View style={styles.contentContainer}>
        <Animated.View style={[styles.musicContainer, { transform: [{ translateX: position }] }]}{...panResponder.panHandlers}>
          <TouchableOpacity style={styles.musicContainer} onPress={togglePlayPause} activeOpacity={0.9}>
            {/* Waveform Display */}
            <View style={styles.imageContainer}>
              <Image source={sound} style={styles.image} resizeMode="contain" />
            </View>

            {/* Play Button */}
            <View style={styles.playButton}>
              <Ionicons name={isPlaying ? 'pause' : 'play'} size={32} color="black" />
            </View>
          </TouchableOpacity>
        </Animated.View>
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
    paddingTop: 60,
    gap: 30,
    alignItems: 'center',
  }
});
