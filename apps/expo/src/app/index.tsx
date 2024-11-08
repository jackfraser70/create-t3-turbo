import { SafeAreaView } from 'react-native-safe-area-context';

import { AppProvider } from './contexts/AppContext';
import MainLayout from './layout/MainLayout';

export default function Index() {
  return (
    <AppProvider>
      <SafeAreaView className="bg-background" style={{ flex: 1 }}>
        <MainLayout />
      </SafeAreaView>
    </AppProvider>
  );
}
