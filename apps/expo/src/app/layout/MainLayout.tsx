import type { ReactNode } from 'react';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import LeftToolbar from './LeftToolbar';
import RightToolbar from './RightToolbar';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <LeftToolbar />

        {children}

        <RightToolbar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
});
