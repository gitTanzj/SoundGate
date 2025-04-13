import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, useColorScheme } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText'

export default function homeScreen() {
    const colorScheme = useColorScheme() ?? 'light'; // Default value dark

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
          <ScrollView contentContainerStyle={styles.container} style={styles.scroll}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.headerContent}>
                <ThemedText type="title" style={styles.appName}>SoundGate</ThemedText>
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
                    <Image source={item.image} style={styles.albumImage} />
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