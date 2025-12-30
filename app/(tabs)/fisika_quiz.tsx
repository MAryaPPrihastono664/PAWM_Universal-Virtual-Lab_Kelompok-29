import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// --- FIREBASE IMPORTS ---
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebaseConfig'; // Pastikan path ini sesuai dengan file config Anda

// --- DATA SOAL (10 Pertanyaan) ---
const questions = [
  { id: 1, question: "Apa yang dimaksud dengan periode (T) pada bandul sederhana?", options: ["Jumlah ayunan dalam satu detik", "Waktu yang diperlukan untuk satu ayunan penuh", "Jarak terjauh dari titik setimbang", "Kecepatan benda saat di titik terbawah"], answer: 1 },
  { id: 2, question: "Manakah faktor yang MEMPENGARUHI periode bandul sederhana?", options: ["Massa beban (m)", "Sudut simpangan awal (theta)", "Panjang tali (L)", "Warna tali"], answer: 2 },
  { id: 3, question: "Jika panjang tali bandul DIPERPANJANG, maka periode ayunan akan...", options: ["Semakin besar (makin lambat)", "Semakin kecil (makin cepat)", "Tetap sama", "Berhenti berayun"], answer: 0 },
  { id: 4, question: "Apakah massa beban mempengaruhi periode ayunan bandul sederhana (dengan asumsi tali ringan)?", options: ["Ya, massa besar membuat ayunan lebih cepat", "Ya, massa besar membuat ayunan lebih lambat", "Tidak, massa tidak berpengaruh", "Hanya berpengaruh jika sudutnya 90 derajat"], answer: 2 },
  { id: 5, question: "Satuan Internasional (SI) untuk Frekuensi adalah...", options: ["Detik (s)", "Meter (m)", "Hertz (Hz)", "Newton (N)" ], answer: 2 },
  { id: 6, question: "Pada titik manakah energi kinetik bandul bernilai MAKSIMUM?", options: ["Di titik simpangan terjauh", "Di titik setimbang (paling bawah/tengah)", "Di tengah-tengah", "Energi kinetik selalu sama"], answer: 1 },
  { id: 7, question: "Apa rumus hubungan antara Frekuensi (f) dan Periode (T)?", options: ["f = T", "f = 1 / T", "f = T^2", "f = T / 2"], answer: 1 },
  { id: 8, question: "Jika gravitasi (g) di tempat bandul berada semakin BESAR (misal di kutub), maka periode ayunan akan...", options: ["Semakin kecil (ayunan makin cepat)", "Semakin besar (ayunan makin lambat)", "Tidak berubah", "Menjadi nol"], answer: 0 },
  { id: 9, question: "Apa yang terjadi jika sudut simpangan awal terlalu besar (misal > 20 derajat) pada bandul sederhana?", options: ["Tali akan putus", "Gerakan tidak lagi harmonik sederhana", "Bandul berputar 360 derajat", "Periode menjadi negatif"], answer: 1 },
  { id: 10, question: "Alat apa yang menerapkan prinsip kerja bandul untuk mengukur gempa bumi?", options: ["Termometer", "Barometer", "Seismograf", "Speedometer"], answer: 2 }
];

export default function QuizScreen() {
  const router = useRouter();
  
  // State Quiz
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  // State Database
  const [previousBest, setPreviousBest] = useState<number | null>(null);
  const [isNewRecord, setIsNewRecord] = useState(false);
  const [loadingDb, setLoadingDb] = useState(false);

  // --- FUNGSI SIMPAN SKOR KE FIREBASE ---
  const saveScoreToFirebase = async (finalScore: number) => {
    const user = auth.currentUser;
    if (!user) return; // Kalau user belum login (tamu), tidak usah simpan

    setLoadingDb(true);
    try {
      // Referensi Dokumen: scores -> USER_UID
      const scoreRef = doc(db, "scores", user.uid);
      const docSnap = await getDoc(scoreRef);

      let currentBest = 0;
      
      if (docSnap.exists()) {
        // Ambil nilai 'fisika' yang lama
        currentBest = docSnap.data().fisika || 0;
      }

      setPreviousBest(currentBest);

      // Cek apakah pecah rekor
      if (finalScore > currentBest) {
        setIsNewRecord(true);
        // Simpan nilai baru (merge: true agar tidak menimpa nilai kimia jika ada)
        await setDoc(scoreRef, { fisika: finalScore }, { merge: true });
        console.log("Rekor baru disimpan!");
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
      // Panggil fungsi simpan database
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
          <Text style={styles.scoreTitle}>Kuis Selesai!</Text>
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

  // --- TAMPILAN SOAL (Tidak Berubah) ---
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
  optionButton: { backgroundColor: 'white', padding: 15, borderRadius: 12, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#ddd', elevation: 1 },
  optionCircle: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  optionLetter: { fontWeight: 'bold', color: '#666' },
  optionText: { fontSize: 16, color: '#444', flex: 1 },

  // Styles untuk Hasil Skor
  scoreCard: { backgroundColor: 'white', margin: 30, padding: 30, borderRadius: 20, alignItems: 'center', elevation: 5, justifyContent: 'center' },
  scoreTitle: { fontSize: 24, fontWeight: 'bold', color: '#333', marginTop: 15 },
  scoreText: { fontSize: 16, color: '#666', marginTop: 5 },
  scoreValue: { fontSize: 48, fontWeight: 'bold', color: '#007AFF', marginVertical: 5 },
  feedback: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 20 },
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