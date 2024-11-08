import React from 'react';
import { View, StyleSheet } from 'react-native';
import LeftToolbar from './LeftToolbar';
import Outline from './outline';

export default function MainLayout() {
  return (
    <View style={styles.container}>
      <LeftToolbar />
      <Outline />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
});
