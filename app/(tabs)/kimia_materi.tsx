import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function KimiaMateriScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* HEADER */}
      <View style={[styles.header, {backgroundColor: '#9C27B0'}]}> 
        <Ionicons name="flask" size={60} color="white" />
        <Text style={styles.headerTitle}>Titrasi Asam Basa</Text>
        <Text style={styles.headerSubtitle}>Kimia Analisis Kuantitatif</Text>
      </View>

      <View style={styles.content}>
        
        {/* 1. PENGERTIAN */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Apa itu Titrasi?</Text>
          <Text style={styles.paragraph}>
            Titrasi adalah metode laboratorium untuk menentukan konsentrasi suatu larutan (analit) menggunakan larutan lain yang konsentrasinya sudah diketahui (titran).
            Dalam titrasi asam-basa, prinsip utamanya adalah reaksi netralisasi antara ion H⁺ (asam) dan OH⁻ (basa).
          </Text>
        </View>

        {/* 2. RUMUS */}
        <View style={styles.formulaBox}>
          <Text style={styles.formulaLabel}>Rumus Pengenceran / Netralisasi:</Text>
          <Text style={styles.formula}>Ma . Va . a = Mb . Vb . b</Text>
          <View style={styles.variableContainer}>
             <Text style={styles.variable}>• <Text style={{fontWeight:'bold'}}>Ma, Mb</Text> : Molaritas Asam / Basa</Text>
             <Text style={styles.variable}>• <Text style={{fontWeight:'bold'}}>Va, Vb</Text> : Volume Asam / Basa</Text>
             <Text style={styles.variable}>• <Text style={{fontWeight:'bold'}}>a</Text> : Valensi Asam (Jumlah H⁺)</Text>
             <Text style={styles.variable}>• <Text style={{fontWeight:'bold'}}>b</Text> : Valensi Basa (Jumlah OH⁻)</Text>
          </View>
        </View>

        {/* 3. CONTOH KASUS (NEW SECTION) */}
        <Text style={styles.sectionTitle}>Contoh Soal & Pembahasan</Text>

        {/* KASUS 1: Konsentrasi Sama */}
        <View style={styles.exampleCard}>
          <View style={styles.exampleHeader}>
            <Text style={styles.exampleTitle}>Kasus 1: Asam & Basa Monoprotik</Text>
            <View style={styles.badge}><Text style={styles.badgeText}>Mudah</Text></View>
          </View>
          <Text style={styles.questionText}>
            Sebanyak 25 ml HCl dititrasi dengan NaOH 0.1 M. Titik akhir titrasi tercapai saat volume NaOH yang terpakai adalah 25 ml. Berapa konsentrasi HCl?
          </Text>
          
          <View style={styles.divider} />
          
          <Text style={styles.solutionTitle}>Diketahui:</Text>
          <Text style={styles.solutionText}>• HCl (Asam kuat, a=1)</Text>
          <Text style={styles.solutionText}>• Va = 25 ml, Mb = 0.1 M, Vb = 25 ml</Text>
          
          <Text style={styles.solutionTitle}>Jawab:</Text>
          <Text style={styles.mathText}>Ma . 25 . 1 = 0.1 . 25 . 1</Text>
          <Text style={styles.mathText}>25 Ma = 2.5</Text>
          <Text style={styles.resultText}>Ma = 0.1 M</Text>
        </View>

        {/* KASUS 2: Mencari Volume (Konsentrasi Beda) */}
        <View style={styles.exampleCard}>
          <View style={styles.exampleHeader}>
            <Text style={styles.exampleTitle}>Kasus 2: Mencari Volume</Text>
            <View style={[styles.badge, {backgroundColor:'#FF9500'}]}><Text style={styles.badgeText}>Sedang</Text></View>
          </View>
          <Text style={styles.questionText}>
            Berapa ml larutan NaOH 0.2 M yang diperlukan untuk menetralkan 50 ml larutan HCl 0.1 M?
          </Text>

          <View style={styles.divider} />

          <Text style={styles.solutionTitle}>Analisis:</Text>
          <Text style={styles.solutionText}>Karena konsentrasi basa (0.2 M) dua kali lebih pekat dari asam (0.1 M), secara logika volume basa yang dibutuhkan pasti lebih sedikit.</Text>
          
          <Text style={styles.solutionTitle}>Hitungan:</Text>
          <Text style={styles.mathText}>0.1 . 50 . 1 = 0.2 . Vb . 1</Text>
          <Text style={styles.mathText}>5 = 0.2 Vb</Text>
          <Text style={styles.mathText}>Vb = 5 / 0.2</Text>
          <Text style={styles.resultText}>Vb = 25 ml</Text>
        </View>

        {/* KASUS 3: Asam Poliprotik (H2SO4) */}
        <View style={styles.exampleCard}>
          <View style={styles.exampleHeader}>
            <Text style={styles.exampleTitle}>Kasus 3: Valensi Berbeda (H₂SO₄)</Text>
            <View style={[styles.badge, {backgroundColor:'#FF3B30'}]}><Text style={styles.badgeText}>Sulit</Text></View>
          </View>
          <Text style={styles.questionText}>
            10 ml Asam Sulfat (H₂SO₄) dititrasi dengan NaOH 0.1 M. Volume NaOH yang dibutuhkan adalah 20 ml. Berapa Molaritas H₂SO₄?
          </Text>

          <View style={styles.divider} />

          <Text style={styles.solutionTitle}>Penting!</Text>
          <Text style={styles.solutionText}>
            H₂SO₄ melepaskan <Text style={{fontWeight:'bold'}}>2 ion H⁺</Text>, maka nilai <Text style={{fontWeight:'bold'}}>a = 2</Text>.
          </Text>
          
          <Text style={styles.solutionTitle}>Jawab:</Text>
          <Text style={styles.mathText}>Ma . Va . a = Mb . Vb . b</Text>
          <Text style={styles.mathText}>Ma . 10 . 2 = 0.1 . 20 . 1</Text>
          <Text style={styles.mathText}>20 Ma = 2</Text>
          <Text style={styles.resultText}>Ma = 0.1 M</Text>
          <Text style={styles.solutionText}>(Hati-hati, jika lupa mengalikan valensi 2, hasilnya akan salah menjadi 0.2 M)</Text>
        </View>

        {/* 4. ALAT */}
        <Text style={styles.sectionTitle}>Peralatan Laboratorium</Text>
        <View style={styles.grid}>
            <View style={styles.card}><Text style={styles.emoji}>📏</Text><Text style={styles.cardT}>Buret</Text></View>
            <View style={styles.card}><Text style={styles.emoji}>🧪</Text><Text style={styles.cardT}>Erlenmeyer</Text></View>
            <View style={styles.card}><Text style={styles.emoji}>🏗️</Text><Text style={styles.cardT}>Statif</Text></View>
            <View style={styles.card}><Text style={styles.emoji}>💧</Text><Text style={styles.cardT}>Pipet</Text></View>
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
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 15, marginTop: 10 },
  paragraph: { fontSize: 16, lineHeight: 24, color: '#444', textAlign: 'justify' },
  
  // Style Rumus
  formulaBox: { backgroundColor: 'white', padding: 20, borderRadius: 12, alignItems: 'center', marginBottom: 20, elevation: 2 },
  formula: { fontSize: 22, fontWeight: 'bold', color: '#9C27B0', marginVertical: 10, letterSpacing: 1 },
  variableContainer: { alignSelf: 'flex-start', marginTop: 10 },
  variable: { fontSize: 14, color: '#555', marginBottom: 4 },
  
  // Style Contoh Soal
  exampleCard: { backgroundColor: 'white', padding: 20, borderRadius: 12, marginBottom: 20, elevation: 3, borderWidth: 1, borderColor: '#eee' },
  exampleHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  exampleTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  badge: { backgroundColor: '#4CAF50', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  badgeText: { color: 'white', fontSize: 10, fontWeight: 'bold' },
  questionText: { fontSize: 15, color: '#444', fontStyle: 'italic', marginBottom: 10, lineHeight: 22 },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 10 },
  solutionTitle: { fontSize: 14, fontWeight: 'bold', color: '#9C27B0', marginTop: 5 },
  solutionText: { fontSize: 14, color: '#666', marginBottom: 2 },
  mathText: { fontSize: 16, fontFamily: 'monospace', color: '#333', marginVertical: 2 },
  resultText: { fontSize: 18, fontWeight: 'bold', color: '#007AFF', marginTop: 5 },

  // Grid Alat
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  card: { width: '47%', backgroundColor: 'white', padding: 15, borderRadius: 10, alignItems: 'center', elevation: 1 },
  emoji: { fontSize: 30 },
  cardT: { fontWeight: 'bold', marginTop: 5, color: '#555' }
});