import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function MatematikaMateriScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* HEADER */}
      <View style={styles.header}>
        <Ionicons name="shapes" size={60} color="white" />
        <Text style={styles.headerTitle}>Transformasi Geometri</Text>
        <Text style={styles.headerSubtitle}>Matematika Wajib</Text>
      </View>

      <View style={styles.content}>
        
        {/* 1. DEFINISI */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Apa itu Transformasi Geometri?</Text>
          <Text style={styles.paragraph}>
            Transformasi geometri adalah perubahan posisi (perpindahan) atau ukuran dari suatu titik, garis, atau bangun datar pada bidang geometri. 
            Secara umum, posisi awal dinotasikan dengan <Text style={styles.bold}>(x, y)</Text> dan posisi akhir (bayangan) dinotasikan dengan <Text style={styles.bold}>(x', y')</Text>.
          </Text>
        </View>

        {/* 2. TRANSLASI */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconBox, {backgroundColor: '#4CAF50'}]}>
               <Ionicons name="arrow-forward" size={24} color="white" />
            </View>
            <Text style={styles.cardTitle}>1. Translasi (Pergeseran)</Text>
          </View>
          <Text style={styles.cardDesc}>
            Memindahkan semua titik pada bangun sejauh jarak dan arah yang sama. Tidak mengubah bentuk atau ukuran.
          </Text>
          
          <View style={styles.formulaBox}>
            <Text style={styles.formulaLabel}>Rumus:</Text>
            <Text style={styles.formula}>P(x, y) + T(a, b) → P'(x+a, y+b)</Text>
          </View>

          <View style={styles.exampleBox}>
            <Text style={styles.exampleTitle}>Contoh:</Text>
            <Text style={styles.exampleText}>Titik A(2, 3) digeser oleh T(4, 1).</Text>
            <Text style={styles.exampleResult}>Jawab: A'(2+4, 3+1) = A'(6, 4)</Text>
          </View>
        </View>

        {/* 3. REFLEKSI */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconBox, {backgroundColor: '#2196F3'}]}>
               <Ionicons name="swap-horizontal" size={24} color="white" />
            </View>
            <Text style={styles.cardTitle}>2. Refleksi (Pencerminan)</Text>
          </View>
          <Text style={styles.cardDesc}>
            Memindahkan titik dengan sifat seperti cermin. Jarak titik ke cermin sama dengan jarak bayangan ke cermin.
          </Text>
          
          <View style={styles.table}>
            <View style={styles.tableRowHeader}>
              <Text style={styles.th}>Cermin Terhadap</Text>
              <Text style={styles.th}>Hasil Bayangan (x', y')</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.td}>Sumbu X</Text>
              <Text style={styles.tdMath}>(x, -y)</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.td}>Sumbu Y</Text>
              <Text style={styles.tdMath}>(-x, y)</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.td}>Titik Pusat (0,0)</Text>
              <Text style={styles.tdMath}>(-x, -y)</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.td}>Garis y = x</Text>
              <Text style={styles.tdMath}>(y, x)</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.td}>Garis y = -x</Text>
              <Text style={styles.tdMath}>(-y, -x)</Text>
            </View>
             <View style={styles.tableRow}>
              <Text style={styles.td}>Titik (h, k)</Text>
              <Text style={styles.tdMath}>(2h - x, 2k - y)</Text>
            </View>
          </View>
        </View>

        {/* 4. ROTASI */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconBox, {backgroundColor: '#FF9800'}]}>
               <Ionicons name="refresh" size={24} color="white" />
            </View>
            <Text style={styles.cardTitle}>3. Rotasi (Perputaran)</Text>
          </View>
          <Text style={styles.cardDesc}>
            Memutar titik sejauh sudut θ terhadap titik pusat tertentu. (Positif = Berlawanan Arah Jarum Jam).
          </Text>
          
          <View style={styles.formulaBox}>
            <Text style={styles.formulaLabel}>Rotasi Pusat (0,0):</Text>
            <Text style={styles.formula}>x' = x.cosθ - y.sinθ</Text>
            <Text style={styles.formula}>y' = x.sinθ + y.cosθ</Text>
          </View>

          <Text style={styles.exampleTitle}>Rumus Cepat (Pusat 0,0):</Text>
          <View style={styles.listContainer}>
             <Text style={styles.listItem}>• 90° : (-y, x)</Text>
             <Text style={styles.listItem}>• 180° : (-x, -y)</Text>
             <Text style={styles.listItem}>• 270° : (y, -x)</Text>
          </View>
        </View>

        {/* 5. DILATASI */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconBox, {backgroundColor: '#9C27B0'}]}>
               <Ionicons name="resize" size={24} color="white" />
            </View>
            <Text style={styles.cardTitle}>4. Dilatasi (Perkalian)</Text>
          </View>
          <Text style={styles.cardDesc}>
            Mengubah ukuran bangun (memperbesar/memperkecil) berdasarkan faktor skala (k).
          </Text>
          
          <View style={styles.formulaBox}>
            <Text style={styles.formulaLabel}>Pusat (0,0) faktor k:</Text>
            <Text style={styles.formula}>P(x, y) → P'(kx, ky)</Text>
          </View>

           <View style={styles.exampleBox}>
            <Text style={styles.exampleTitle}>Contoh:</Text>
            <Text style={styles.exampleText}>Titik B(4, 2) didilatasi pusat (0,0) skala 2.</Text>
            <Text style={styles.exampleResult}>Jawab: B'(4.2, 2.2) = B'(8, 4)</Text>
          </View>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  
  // Header Style
  header: { 
    backgroundColor: '#3F51B5', 
    padding: 30, 
    paddingTop: 60, 
    alignItems: 'center', 
    borderBottomLeftRadius: 25, 
    borderBottomRightRadius: 25,
    marginBottom: 20,
    elevation: 5
  },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: 'white', marginTop: 10 },
  headerSubtitle: { fontSize: 16, color: '#C5CAE9', marginTop: 2 },

  content: { paddingHorizontal: 20 },
  
  // Section Intro
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  paragraph: { fontSize: 15, lineHeight: 24, color: '#555', textAlign: 'justify' },
  bold: { fontWeight: 'bold', color: '#3F51B5' },

  // Card Style
  card: { 
    backgroundColor: 'white', 
    borderRadius: 15, 
    padding: 20, 
    marginBottom: 20, 
    elevation: 3, 
    shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5 
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  iconBox: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  cardDesc: { fontSize: 14, color: '#666', lineHeight: 22, marginBottom: 15 },

  // Formula Styles
  formulaBox: { backgroundColor: '#F0F4C3', padding: 15, borderRadius: 10, marginBottom: 15, borderLeftWidth: 4, borderLeftColor: '#CDDC39' },
  formulaLabel: { fontSize: 12, color: '#555', marginBottom: 5, fontWeight: 'bold' },
  formula: { fontSize: 18, fontWeight: 'bold', color: '#333', fontFamily: 'monospace' },

  // Example Styles
  exampleBox: { backgroundColor: '#E3F2FD', padding: 15, borderRadius: 10 },
  exampleTitle: { fontSize: 14, fontWeight: 'bold', color: '#1565C0', marginBottom: 5 },
  exampleText: { fontSize: 14, color: '#333', marginBottom: 2 },
  exampleResult: { fontSize: 15, fontWeight: 'bold', color: '#0D47A1', marginTop: 5 },

  // Table Styles
  table: { borderWidth: 1, borderColor: '#eee', borderRadius: 8, overflow: 'hidden' },
  tableRowHeader: { flexDirection: 'row', backgroundColor: '#f0f0f0', padding: 10 },
  tableRow: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#eee', padding: 10 },
  th: { flex: 1, fontWeight: 'bold', fontSize: 12, color: '#333' },
  td: { flex: 1, fontSize: 13, color: '#555' },
  tdMath: { flex: 1, fontSize: 13, fontWeight: 'bold', color: '#E91E63', fontFamily: 'monospace' },

  // List Styles
  listContainer: { paddingLeft: 10, marginTop: 5 },
  listItem: { fontSize: 15, marginBottom: 5, color: '#444', fontFamily: 'monospace' }
});