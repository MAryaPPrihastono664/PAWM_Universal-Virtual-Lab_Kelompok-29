import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
        {/* Main Header*/}
        <View style={styles.header}>
          <Text style={styles.title}>Virtual Lab Universal</Text>
          <Text style={styles.subtitle}>Fisika, Kimia & Matematika</Text>
        </View>

        {/*  1. Section Fisika */}
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


        {/* 2. Section Kimia */}
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

        {/*  3. Section Matematika  */}
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>📐 MATEMATIKA (Geometri)</Text>
        </View>

        <View style={styles.row}>
            <TouchableOpacity style={styles.btnMenu} onPress={() => router.push('/matematika_materi')}>
                <Ionicons name="book" size={28} color="#009688" />
                <Text style={styles.btnLabel}>Materi</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.btnMenu} onPress={() => router.push('/matematika_simulasi')}>
                <Ionicons name="shapes" size={28} color="#3F51B5" />
                <Text style={styles.btnLabel}>Simulasi</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnMenu} onPress={() => router.push('/matematika_quiz')}>
                <Ionicons name="school" size={28} color="#673AB7" />
                <Text style={styles.btnLabel}>Kuis</Text>
            </TouchableOpacity>
        </View>

        {/* LOGIN BUTTON */}
        <TouchableOpacity style={styles.loginBtn} onPress={() => router.push('/login')}>
            <Text style={{color:'white', fontWeight:'bold'}}>Login / Ganti Akun</Text>
        </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f2f5' },
  
  // Header Style
  header: { 
    backgroundColor: '#1c2e4a', 
    padding: 30, 
    paddingTop: 60, 
    alignItems: 'center', 
    marginBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5
  },
  title: { fontSize: 24, fontWeight: 'bold', color: 'white' },
  subtitle: { color: '#ccc', fontSize: 14, marginTop: 5 },
  
  // Section Headers
  sectionHeader: { paddingHorizontal: 20, marginBottom: 10, marginTop: 10 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#444', letterSpacing: 0.5 },
  
  // Grid Menu
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 20 },
  btnMenu: { 
    backgroundColor: 'white', 
    width: '31%', // Agar pas 3 kolom
    paddingVertical: 15, 
    borderRadius: 12, 
    alignItems: 'center',
    elevation: 2, 
    shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 3 
  },
  btnLabel: { marginTop: 8, fontSize: 12, fontWeight: '600', color: '#555' },

  // Footer Button
  loginBtn: { margin: 20, backgroundColor: '#333', padding: 15, borderRadius: 10, alignItems: 'center' }
});