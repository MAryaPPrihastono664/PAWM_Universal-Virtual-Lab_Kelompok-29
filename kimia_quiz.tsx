import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// --- FIREBASE IMPORTS ---
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebaseConfig';

const questions = [
  {
    id: 1,
    question: "Apa tujuan utama dari proses titrasi?",
    options: ["Mengukur suhu larutan", "Menentukan konsentrasi larutan yang tidak diketahui", "Mencampur dua warna", "Membuat larutan menjadi padat"],
    answer: 1
  },
  {
    id: 2,
    question: "Indikator fenolftalein (PP) akan berubah warna menjadi apa dalam suasana basa?",
    options: ["Bening", "Merah Muda (Pink)", "Biru", "Kuning"],
    answer: 1
  },
  {
    id: 3,
    question: "Larutan standar yang sudah diketahui konsentrasinya dan dimasukkan ke dalam buret disebut...",
    options: ["Titrat", "Titran", "Indikator", "Katalis"],
    answer: 1
  },
  {
    id: 4,
    question: "Titik di mana jumlah mol asam tepat habis bereaksi dengan jumlah mol basa disebut...",
    options: ["Titik Didih", "Titik Beku", "Titik Ekuivalen", "Titik Kritis"],
    answer: 2
  },
  {
    id: 5,
    question: "Rumus pengenceran atau titrasi yang umum digunakan adalah...",
    options: ["F = m.a", "V = I.R", "M1.V1 = M2.V2", "E = mc^2"],
    answer: 2
  },
  {
    id: 6,
    question: "Alat gelas panjang yang memiliki skala dan keran untuk meneteskan cairan disebut...",
    options: ["Pipet Volume", "Buret", "Gelas Ukur", "Erlenmeyer"],
    answer: 1
  },
  {
    id: 7,
    question: "Jika 25 ml HCl dinetralkan oleh 25 ml NaOH 0.1 M, berapakah konsentrasi HCl?",
    options: ["0.1 M", "0.2 M", "0.5 M", "1.0 M"],
    answer: 0
  },
  {
    id: 8,
    question: "Mengapa erlenmeyer digunakan sebagai wadah penampung, bukan gelas beker?",
    options: ["Lebih murah", "Agar cairan tidak mudah tumpah saat digoyangkan", "Lebih transparan", "Lebih tahan panas"],
    answer: 1
  },
  {
    id: 9,
    question: "Warna indikator PP pada larutan Asam adalah...",
    options: ["Merah", "Ungu", "Tidak Berwarna (Bening)", "Hijau"],
    answer: 2
  },
  {
    id: 10,
    question: "Kondisi di mana kita menghentikan titrasi karena indikator sudah berubah warna disebut...",
    options: ["Titik Awal", "Titik Akhir Titrasi", "Titik Balik", "Titik Jenuh"],
    answer: 1
  }
];

export default function KimiaQuizScreen() {
  const router = useRouter();
  
  // State Quiz
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  // State Database (High Score)
  const [previousBest, setPreviousBest] = useState<number | null>(null);
  const [isNewRecord, setIsNewRecord] = useState(false);
  const [loadingDb, setLoadingDb] = useState(false);

  // --- FUNGSI SIMPAN SKOR KE FIREBASE (KIMIA) ---
  const saveScoreToFirebase = async (finalScore: number) => {
    const user = auth.currentUser;
    if (!user) return; // Tamu tidak simpan data

    setLoadingDb(true);
    try {
      const scoreRef = doc(db, "scores", user.uid);
      const docSnap = await getDoc(scoreRef);

      let currentBest = 0;
      
      if (docSnap.exists()) {
        // Ambil nilai khusus field 'kimia'
        currentBest = docSnap.data().kimia || 0;
      }

      setPreviousBest(currentBest);

      // Cek Rekor Baru
      if (finalScore > currentBest) {
        setIsNewRecord(true);
        // Simpan ke field 'kimia', merge true agar field 'fisika' aman
        await setDoc(scoreRef, { kimia: finalScore }, { merge: true });
        console.log("Rekor Kimia baru disimpan!");
      }

    } catch (error) {
      console.error("Gagal menyimpan skor:", error);
    } finally {
      setLoadingDb(false);
    }
  };

  const handleAnswer = (selectedOptionIndex: number) => {
    const isCorrect = selectedOptionIndex === questions[currentQuestionIndex].answer;
    let newScore = score;
    
    if (isCorrect) {
      newScore = score + 10;
      setScore(newScore);
    }

    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestionIndex(nextQuestion);
    } else {
      // Kuis Selesai
      setShowScore(true);
      saveScoreToFirebase(newScore);
    }
  };

  const resetQuiz = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setShowScore(false);
    setPreviousBest(null);
    setIsNewRecord(false);
  };

  // --- TAMPILAN HASIL SKOR ---
  if (showScore) {
    return (
      <View style={styles.container}>
        <View style={styles.scoreCard}>
          <Ionicons name={score >= 70 ? "trophy" : "alert-circle"} size={80} color={score >= 70 ? "#FFD700" : "#FF3B30"} />
          <Text style={styles.scoreTitle}>Kuis Kimia Selesai!</Text>
          <Text style={styles.scoreText}>Nilai Kamu:</Text>
          <Text style={styles.scoreValue}>{score} / 100</Text>
          
          {/* TAMPILAN PREVIOUS BEST */}
          <View style={styles.bestContainer}>
            {loadingDb ? (
              <ActivityIndicator size="small" color="#007AFF" />
            ) : (
              <>
                <Text style={styles.bestText}>
                  Previous Best: {previousBest !== null ? previousBest : "-"}
                </Text>
                {isNewRecord && (
                  <View style={styles.newRecordBadge}>
                    <Text style={styles.newRecordText}>🎉 New Record! 🎉</Text>
                  </View>
                )}
              </>
            )}
            {!auth.currentUser && (
              <Text style={styles.guestText}>(Login untuk simpan skor)</Text>
            )}
          </View>
          
          <Text style={styles.feedback}>
            {score === 100 ? "Sempurna! Kamu hebat!" : 
             score >= 70 ? "Bagus! Tingkatkan lagi." : 
             "Jangan menyerah, coba baca materi lagi!"}
          </Text>

          <TouchableOpacity style={styles.btnPrimary} onPress={resetQuiz}>
            <Text style={styles.btnText}>Ulangi Kuis</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.btnSecondary} onPress={() => router.replace('/')}>
            <Text style={[styles.btnText, {color: '#007AFF'}]}>Kembali ke Menu</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // --- TAMPILAN SOAL ---
  return (
    <View style={styles.container}>
      {/* Header Progress */}
      <View style={styles.header}>
        <Text style={styles.questionCount}>Soal {currentQuestionIndex + 1} / {questions.length}</Text>
        <Text style={styles.scorePreview}>Skor: {score}</Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBarBg}>
        <View style={[styles.progressBarFill, { width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }]} />
      </View>

      {/* Pertanyaan */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.questionCard}>
          <Text style={styles.questionText}>{questions[currentQuestionIndex].question}</Text>
        </View>

        {/* Pilihan Jawaban */}
        <View style={styles.optionsContainer}>
          {questions[currentQuestionIndex].options.map((option, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.optionButton} 
              onPress={() => handleAnswer(index)}
            >
              <View style={styles.optionCircle}>
                <Text style={styles.optionLetter}>{String.fromCharCode(65 + index)}</Text>
              </View>
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f9', paddingTop: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 10 },
  questionCount: { fontSize: 16, fontWeight: 'bold', color: '#666' },
  scorePreview: { fontSize: 16, fontWeight: 'bold', color: '#007AFF' },
  
  progressBarBg: { height: 6, backgroundColor: '#E0E0E0', marginHorizontal: 20, borderRadius: 3, marginBottom: 20 },
  progressBarFill: { height: '100%', backgroundColor: '#34C759', borderRadius: 3 },

  content: { paddingHorizontal: 20, paddingBottom: 40 },
  
  questionCard: { backgroundColor: 'white', padding: 25, borderRadius: 15, marginBottom: 20, elevation: 3 },
  questionText: { fontSize: 18, fontWeight: 'bold', color: '#333', lineHeight: 26, textAlign: 'center' },

  optionsContainer: { gap: 12 },
  optionButton: { 
    backgroundColor: 'white', 
    padding: 15, 
    borderRadius: 12, 
    flexDirection: 'row', 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 1
  },
  optionCircle: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  optionLetter: { fontWeight: 'bold', color: '#666' },
  optionText: { fontSize: 16, color: '#444', flex: 1 },

  // Styles untuk Hasil Skor
  scoreCard: { 
    backgroundColor: 'white', margin: 30, padding: 40, borderRadius: 20, alignItems: 'center', elevation: 5,
    justifyContent: 'center'
  },
  scoreTitle: { fontSize: 24, fontWeight: 'bold', color: '#333', marginTop: 20 },
  scoreText: { fontSize: 16, color: '#666', marginTop: 10 },
  scoreValue: { fontSize: 48, fontWeight: 'bold', color: '#007AFF', marginVertical: 10 },
  feedback: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 30 },
  
  btnPrimary: { backgroundColor: '#007AFF', padding: 15, borderRadius: 10, width: '100%', alignItems: 'center', marginBottom: 10 },
  btnSecondary: { backgroundColor: 'white', padding: 15, borderRadius: 10, width: '100%', alignItems: 'center', borderWidth: 1, borderColor: '#007AFF' },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },

  // New Record Styles
  bestContainer: { alignItems: 'center', marginBottom: 20, padding: 10, backgroundColor: '#f0f8ff', borderRadius: 10, width: '100%' },
  bestText: { fontSize: 16, color: '#555', fontWeight: '600' },
  newRecordBadge: { marginTop: 5, backgroundColor: '#34C759', paddingHorizontal: 10, paddingVertical: 3, borderRadius: 10 },
  newRecordText: { color: 'white', fontWeight: 'bold', fontSize: 12 },
  guestText: { fontSize: 12, color: '#999', marginTop: 5, fontStyle: 'italic' }
});