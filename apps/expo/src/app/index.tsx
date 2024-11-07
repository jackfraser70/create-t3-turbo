import { SafeAreaView } from 'react-native-safe-area-context';

import Outline from './outline';
import { AppProvider } from './contexts/AppContext';

export default function Index() {
  return (
    <AppProvider>
      <SafeAreaView className="bg-background" style={{ flex: 1 }}>
        <Outline />
      </SafeAreaView>
    </AppProvider>
  );
}
