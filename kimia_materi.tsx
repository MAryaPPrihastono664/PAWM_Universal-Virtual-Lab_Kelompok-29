import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function KimiaMateriScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={[styles.header, {backgroundColor: '#9C27B0'}]}> 
        <Ionicons name="flask" size={60} color="white" />
        <Text style={styles.headerTitle}>Titrasi Asam Basa</Text>
        <Text style={styles.headerSubtitle}>Kimia Analisis Kuantitatif</Text>
      </View>

      <View style={styles.content}>
        
        {/* PENGERTIAN */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Apa itu Titrasi?</Text>
          <Text style={styles.paragraph}>
            Titrasi adalah metode laboratorium untuk menentukan konsentrasi suatu larutan (analit) menggunakan larutan lain yang konsentrasinya sudah diketahui (titran).
            Dalam titrasi asam-basa, prinsip utamanya adalah reaksi netralisasi.
          </Text>
        </View>

        {/* RUMUS */}
        <View style={styles.formulaBox}>
          <Text style={styles.formulaLabel}>Rumus Pengenceran / Netralisasi:</Text>
          <Text style={styles.formula}>Ma . Va . a = Mb . Vb . b</Text>
          <View>
             <Text style={styles.variable}>• Ma: Molaritas Asam</Text>
             <Text style={styles.variable}>• Va: Volume Asam</Text>
             <Text style={styles.variable}>• a: Valensi Asam (jumlah H+)</Text>
             <Text style={styles.variable}>• Mb, Vb, b: (Milik Basa)</Text>
          </View>
        </View>

        {/* ALAT */}
        <Text style={styles.sectionTitle}>Peralatan Utama</Text>
        <View style={styles.grid}>
            <View style={styles.card}><Text style={styles.emoji}>📏</Text><Text style={styles.cardT}>Buret</Text></View>
            <View style={styles.card}><Text style={styles.emoji}>🧪</Text><Text style={styles.cardT}>Erlenmeyer</Text></View>
            <View style={styles.card}><Text style={styles.emoji}>🏗️</Text><Text style={styles.cardT}>Statif & Klem</Text></View>
            <View style={styles.card}><Text style={styles.emoji}>💧</Text><Text style={styles.cardT}>Indikator</Text></View>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F7' },
  header: { padding: 30, paddingTop: 60, alignItems: 'center', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: 'white', marginTop: 10 },
  headerSubtitle: { fontSize: 16, color: '#E0E0E0' },
  content: { padding: 20 },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  paragraph: { fontSize: 16, lineHeight: 24, color: '#444', textAlign: 'justify' },
  formulaBox: { backgroundColor: 'white', padding: 20, borderRadius: 12, alignItems: 'center', marginBottom: 20, elevation: 2 },
  formula: { fontSize: 24, fontWeight: 'bold', color: '#9C27B0', marginVertical: 10 },
  variable: { fontSize: 14, color: '#555' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  card: { width: '47%', backgroundColor: 'white', padding: 15, borderRadius: 10, alignItems: 'center', elevation: 1 },
  emoji: { fontSize: 30 },
  cardT: { fontWeight: 'bold', marginTop: 5 }
});