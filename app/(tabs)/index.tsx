import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>Virtual Lab</Text>
          <Text style={styles.subtitle}>Fisika & Kimia</Text>
        </View>

        {/* --- SECTION FISIKA --- */}
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>⚛️ FISIKA (Bandul)</Text>
        </View>

        <View style={styles.row}>
            <TouchableOpacity style={styles.btnMenu} onPress={() => router.push('/fisika_materi')}>
                <Ionicons name="book" size={28} color="#007AFF" />
                <Text style={styles.btnLabel}>Materi</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.btnMenu} onPress={() => router.push('/fisika_simulasi')}>
                <Ionicons name="color-filter" size={28} color="#28a745" />
                <Text style={styles.btnLabel}>Simulasi</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnMenu} onPress={() => router.push('/fisika_quiz')}>
                <Ionicons name="school" size={28} color="#FF9500" />
                <Text style={styles.btnLabel}>Kuis</Text>
            </TouchableOpacity>
        </View>


        {/* --- SECTION KIMIA (BARU) --- */}
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🧪 KIMIA (Titrasi)</Text>
        </View>

        <View style={styles.row}>
            <TouchableOpacity style={styles.btnMenu} onPress={() => router.push('/kimia_materi')}>
                <Ionicons name="book" size={28} color="#9C27B0" />
                <Text style={styles.btnLabel}>Materi</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.btnMenu} onPress={() => router.push('/kimia_simulasi')}>
                <Ionicons name="flask" size={28} color="#E91E63" />
                <Text style={styles.btnLabel}>Simulasi</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnMenu} onPress={() => router.push('/kimia_quiz')}>
                <Ionicons name="school" size={28} color="#FF5722" />
                <Text style={styles.btnLabel}>Kuis</Text>
            </TouchableOpacity>
        </View>

        {/* LOGIN BUTTON */}
        <TouchableOpacity style={styles.loginBtn} onPress={() => router.push('/login')}>
            <Text style={{color:'white', fontWeight:'bold'}}>Login Akun</Text>
        </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f2f5' },
  header: { backgroundColor: '#1c2e4a', padding: 30, paddingTop: 60, alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: 'white' },
  subtitle: { color: '#ccc', fontSize: 16 },
  
  sectionHeader: { paddingHorizontal: 20, marginBottom: 10, marginTop: 10 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  
  row: { flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 10, marginBottom: 20 },
  btnMenu: { 
    backgroundColor: 'white', width: '30%', padding: 15, borderRadius: 15, alignItems: 'center',
    elevation: 3, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 3 
  },
  btnLabel: { marginTop: 5, fontSize: 12, fontWeight: '600', color: '#555' },

  loginBtn: { margin: 20, backgroundColor: '#333', padding: 15, borderRadius: 10, alignItems: 'center' }
});