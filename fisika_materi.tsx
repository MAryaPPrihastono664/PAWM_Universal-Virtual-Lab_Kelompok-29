import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function MateriScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      
      {/* HEADER GAMBAR / JUDUL */}
      <View style={styles.header}>
        <Ionicons name="school-outline" size={60} color="white" />
        <Text style={styles.headerTitle}>Teori Dasar</Text>
        <Text style={styles.headerSubtitle}>Bandul Sederhana (Simple Pendulum)</Text>
      </View>

      <View style={styles.content}>
        
        {/* 1. PENGERTIAN */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Apa itu Bandul?</Text>
          <Text style={styles.paragraph}>
            Bandul sederhana adalah sistem mekanis yang terdiri dari sebuah massa titik (beban) yang digantung pada tali ringan yang tidak dapat mulur. 
            Jika bandul ditarik ke samping dari posisi setimbangnya (sudut θ) dan dilepaskan, gaya gravitasi akan menariknya kembali ke titik setimbang, menciptakan gerakan bolak-balik (osilasi).
          </Text>
        </View>

        {/* 2. RUMUS FISIKA (Ditambahkan) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rumus Periode (T)</Text>
          <View style={styles.formulaBox}>
            <Text style={styles.formulaLabel}>Persamaan Periode Ayunan:</Text>
            <Text style={styles.formula}>T = 2π √(L / g)</Text>
            <View style={styles.variableList}>
              <Text style={styles.variable}>• <Text style={{fontWeight:'bold'}}>T</Text> : Periode (detik)</Text>
              <Text style={styles.variable}>• <Text style={{fontWeight:'bold'}}>L</Text> : Panjang Tali (meter)</Text>
              <Text style={styles.variable}>• <Text style={{fontWeight:'bold'}}>g</Text> : Gravitasi (m/s²)</Text>
              <Text style={styles.variable}>• <Text style={{fontWeight:'bold'}}>π</Text> : Konstanta (3.14)</Text>
            </View>
          </View>
        </View>

        {/* 3. FAKTA PENTING (Ditambahkan) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Faktor yang Mempengaruhi</Text>
          <View style={styles.factCard}>
            <Ionicons name="checkmark-circle" size={24} color="#34C759" />
            <View style={styles.factTextContainer}>
              <Text style={styles.factTitle}>Panjang Tali (L)</Text>
              <Text style={styles.factDesc}>Semakin panjang tali, semakin lama waktu yang dibutuhkan untuk satu ayunan (Periode makin besar).</Text>
            </View>
          </View>
          
          <View style={styles.factCard}>
            <Ionicons name="close-circle" size={24} color="#FF3B30" />
            <View style={styles.factTextContainer}>
              <Text style={styles.factTitle}>Massa Beban (m)</Text>
              <Text style={styles.factDesc}>Massa TIDAK mempengaruhi periode ayunan. Bandul 10kg dan 1kg akan berayun dengan kecepatan sama jika panjang talinya sama.</Text>
            </View>
          </View>
        </View>

        {/* 4. APLIKASI DALAM KEHIDUPAN (Dari file lama) */}
        <Text style={styles.sectionTitle}>Penerapan Sehari-hari</Text>
        
        <View style={styles.gridContainer}>
          <View style={styles.card}>
            <Text style={styles.cardIcon}>🕰️</Text>
            <Text style={styles.cardTitle}>Jam Bandul</Text>
            <Text style={styles.cardText}>
              Menggunakan keteraturan periode ayunan untuk menghitung detik demi detik secara presisi.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardIcon}>🏗️</Text>
            <Text style={styles.cardTitle}>Seismograf</Text>
            <Text style={styles.cardText}>
              Alat pendeteksi gempa bumi yang menggunakan prinsip kelembaman bandul terhadap getaran tanah.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardIcon}>🎢</Text>
            <Text style={styles.cardTitle}>Wahana Hiburan</Text>
            <Text style={styles.cardText}>
              Kora-kora atau ayunan raksasa menggunakan prinsip kekekalan energi mekanik pada bandul.
            </Text>
          </View>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F7' },
  
  header: {
    backgroundColor: '#007AFF',
    padding: 30,
    paddingTop: 60,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
  },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: 'white', marginTop: 10 },
  headerSubtitle: { fontSize: 16, color: '#E0E0E0', marginTop: 5 },

  content: { paddingHorizontal: 20 },
  
  section: { marginBottom: 25 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#1C1C1E', marginBottom: 15 },
  paragraph: { fontSize: 16, lineHeight: 24, color: '#3A3A3C', textAlign: 'justify' },

  // Style untuk Rumus
  formulaBox: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  formulaLabel: { fontSize: 14, color: '#666', marginBottom: 10 },
  formula: { fontSize: 28, fontWeight: 'bold', color: '#007AFF', marginBottom: 15, fontStyle: 'italic' },
  variableList: { width: '100%', paddingLeft: 10 },
  variable: { fontSize: 15, color: '#444', marginBottom: 5 },

  // Style untuk Fakta
  factCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  factTextContainer: { marginLeft: 15, flex: 1 },
  factTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  factDesc: { fontSize: 13, color: '#666', marginTop: 2 },

  // Style untuk Grid Aplikasi
  gridContainer: { gap: 15 },
  card: { backgroundColor: 'white', padding: 15, borderRadius: 12, elevation: 2 },
  cardIcon: { fontSize: 30, marginBottom: 5 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5, color: '#333' },
  cardText: { color: '#666', lineHeight: 20, fontSize: 14 }
});