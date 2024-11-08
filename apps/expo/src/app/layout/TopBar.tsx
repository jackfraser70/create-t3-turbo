// apps/expo/src/app/layout/TopBar.tsx
import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TopBar() {
  const [isFocused, setIsFocused] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const closeMenu = () => setMenuVisible(false);

  return (
    <View style={styles.topBar}>
      <TextInput
        style={[styles.searchInput, isFocused && styles.searchInputFocused]}
        placeholder="Search"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
        <Ionicons name="chatbox-ellipses-outline" size={32} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
        <Ionicons name="menu" size={32} color="white" />
      </TouchableOpacity>

      {menuVisible && (
        <Pressable onPress={closeMenu} style={styles.menuContainer}>
          <View style={styles.menu}>
            <TouchableOpacity onPress={() => console.log('Profile clicked')}>
              <Text style={styles.menuItem}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('Logout clicked')}>
              <Text style={styles.menuItem}>Logout</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#e91e63',
    position: 'relative', // Ensure the top bar is relative
  },
  searchInput: {
    width: '25%',
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    transition: 'width 0.3s',
  },
  searchInputFocused: {
    width: '50%',
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  menu: {
    marginTop: 50,
    marginRight: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  menuItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
