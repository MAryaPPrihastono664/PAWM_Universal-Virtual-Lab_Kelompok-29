import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';

// Import file simulasi yang sudah kita buat
import VirtualLabScreen from './VirtualLabScreen';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      {/* StatusBar agar jam/baterai HP tetap terlihat rapi */}
      <StatusBar barStyle="dark-content" backgroundColor="#f4f4f9" />
      
      {/* Tampilkan Layar Virtual Lab */}
      <VirtualLabScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Memastikan aplikasi memenuhi layar penuh
    backgroundColor: '#f4f4f9',
  },
});