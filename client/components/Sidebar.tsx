// components/Sidebar.js
import { View, Text, StyleSheet } from 'react-native';

export default function Sidebar({ visible }) {
  if (!visible) return null;

  return (
    <View style={styles.sidebar}>
      <Text style={styles.item}>Liked Songs</Text>
      <Text style={styles.item}>Account</Text>
      <Text style={styles.item}>Manage Profile</Text>
      <Text style={styles.item}>Invite Friends</Text>
      <Text style={styles.item}>Donate</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 200,
    backgroundColor: '#111',
    padding: 20,
    zIndex: 10,
  },
  item: {
    color: '#fff',
    marginBottom: 10,
  },
});
