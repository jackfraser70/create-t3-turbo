import React from 'react';
import { View, StyleSheet } from 'react-native';
import ToolbarButton from './ToolbarButton';

export default function RightToolbar() {
  return (
    <View style={styles.toolbar}>
      <ToolbarButton icon="bell" />
      <ToolbarButton icon="user" />
      <ToolbarButton icon="settings" />
    </View>
  );
}

const styles = StyleSheet.create({
  toolbar: {
    width: 70,
    backgroundColor: '#FFFFFF',
    borderLeftWidth: 1,
    borderLeftColor: '#F8D7E4',
    padding: 10,
  },
});
