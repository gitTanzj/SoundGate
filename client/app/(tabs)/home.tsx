import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';


export default function homeScreen() {
    const colorScheme = useColorScheme() ?? 'light'; // Default value dark

    return (
        <View style={[styles.container, {backgroundColor: Colors[colorScheme].contentBackground }]}>
            <View style={[styles.container, {backgroundColor: Colors[colorScheme].navbar }]}>
                <Text style={[styles.navText, { color: Colors[colorScheme].text }]}>SoundGate</Text>
            </View>
            <View style={styles.content}>
                <Text style={[styles.text, { color: Colors[colorScheme].text }]}>Good day!</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#131922',
    },
    navbar: {
        padding: 15,
        alignItems: 'center',
    },
    navText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
    },
})