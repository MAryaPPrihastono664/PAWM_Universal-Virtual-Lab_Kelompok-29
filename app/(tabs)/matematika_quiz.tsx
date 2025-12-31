import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// FIREBASE IMPORTS 
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebaseConfig';

//  DATA SOAL MATEMATIKA (Transformasi Geometri) 
const questions = [
  { 
    id: 1, 
    question: "Transformasi yang memindahkan setiap titik pada bidang dengan jarak dan arah tertentu disebut...", 
    options: ["Refleksi", "Rotasi", "Translasi", "Dilatasi"], 
    answer: 2 
  },
  { 
    id: 2, 
    question: "Jika titik A(2, 3) ditranslasikan oleh T(3, 4), maka bayangan titik A adalah...", 
    options: ["A'(5, 7)", "A'(6, 12)", "A'(1, 1)", "A'(5, 3)"], 
    answer: 0 
  },
  { 
    id: 3, 
    question: "Pencerminan (Refleksi) terhadap Sumbu X akan mengubah koordinat (x, y) menjadi...", 
    options: ["(-x, y)", "(x, -y)", "(-x, -y)", "(y, x)"], 
    answer: 1 
  },
  { 
    id: 4, 
    question: "Bayangan titik P(-3, 5) jika dicerminkan terhadap Sumbu Y adalah...", 
    options: ["P'(-3, -5)", "P'(3, -5)", "P'(3, 5)", "P'(5, -3)"], 
    answer: 2 
  },
  { 
    id: 5, 
    question: "Transformasi manakah yang dapat mengubah UKURAN suatu bangun datar?", 
    options: ["Translasi", "Rotasi", "Refleksi", "Dilatasi"], 
    answer: 3 
  },
  { 
    id: 6, 
    question: "Titik B(4, 2) didilatasi dengan pusat (0,0) dan faktor skala k = 3. Koordinat bayangannya adalah...", 
    options: ["(7, 5)", "(12, 6)", "(4/3, 2/3)", "(1, -1)"], 
    answer: 1 
  },
  { 
    id: 7, 
    question: "Rotasi sebesar 90° berlawanan arah jarum jam dengan pusat (0,0) mengubah titik (x, y) menjadi...", 
    options: ["(y, x)", "(-y, x)", "(x, -y)", "(-x, -y)"], 
    answer: 1 
  },
  { 
    id: 8, 
    question: "Jika titik K(5, 5) dirotasikan 180° terhadap pusat (0,0), hasilnya adalah...", 
    options: ["(-5, -5)", "(-5, 5)", "(5, -5)", "(0, 0)"], 
    answer: 0 
  },
  { 
    id: 9, 
    question: "Refleksi terhadap garis y = x akan menukar posisi koordinat menjadi...", 
    options: ["(x, -y)", "(-x, y)", "(y, x)", "(-y, -x)"], 
    answer: 2 
  },
  { 
    id: 10, 
    question: "Manakah sifat yang BENAR mengenai Translasi, Refleksi, dan Rotasi (Isometri)?", 
    options: ["Mengubah bentuk bangun", "Mengubah ukuran bangun", "Tidak mengubah bentuk maupun ukuran", "Mengubah luas daerah"], 
    answer: 2 
  }
];

export default function MatematikaQuizScreen() {
  const router = useRouter();
  
  // State Quiz
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  // State Database
  const [previousBest, setPreviousBest] = useState<number | null>(null);
  const [isNewRecord, setIsNewRecord] = useState(false);
  const [loadingDb, setLoadingDb] = useState(false);

  // Fungsi Penyimpan Skor Quiz Matematika ke Firebase 
  const saveScoreToFirebase = async (finalScore: number) => {
    const user = auth.currentUser;
    if (!user) return; 

    setLoadingDb(true);
    try {
      const scoreRef = doc(db, "scores", user.uid);
      const docSnap = await getDoc(scoreRef);

      let currentBest = 0;
      
      if (docSnap.exists()) {
        // Ambil nilai khusus field 'matematika'
        currentBest = docSnap.data().matematika || 0;
      }

      setPreviousBest(currentBest);

      if (finalScore > currentBest) {
        setIsNewRecord(true);
        // Simpan ke field 'matematika'
        await setDoc(scoreRef, { matematika: finalScore }, { merge: true });
        console.log("Rekor Matematika baru disimpan!");
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

  // --- TAMPILAN HASIL ---
  if (showScore) {
    return (
      <View style={styles.container}>
        <View style={styles.scoreCard}>
          <Ionicons name={score >= 70 ? "trophy" : "alert-circle"} size={80} color={score >= 70 ? "#FFD700" : "#FF3B30"} />
          <Text style={styles.scoreTitle}>Kuis Matematika Selesai!</Text>
          <Text style={styles.scoreText}>Nilai Kamu:</Text>
          <Text style={styles.scoreValue}>{score} / 100</Text>
          
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
            {score === 100 ? "Luar Biasa! Pemahaman sempurna." : 
             score >= 70 ? "Kerja bagus! Terus berlatih." : 
             "Jangan patah semangat, pelajari rumusnya lagi!"}
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

  // Tampilan Soal
  return (
    <View style={styles.container}>
      {/* Header */}
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

        {/* Opsi Jawaban */}
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
  scoreCard: { backgroundColor: 'white', margin: 30, padding: 30, borderRadius: 20, alignItems: 'center', elevation: 5, justifyContent: 'center' },
  scoreTitle: { fontSize: 24, fontWeight: 'bold', color: '#333', marginTop: 15 },
  scoreText: { fontSize: 16, color: '#666', marginTop: 5 },
  scoreValue: { fontSize: 48, fontWeight: 'bold', color: '#007AFF', marginVertical: 5 },
  feedback: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 20 },
  btnPrimary: { backgroundColor: '#007AFF', padding: 15, borderRadius: 10, width: '100%', alignItems: 'center', marginBottom: 10 },
  btnSecondary: { backgroundColor: 'white', padding: 15, borderRadius: 10, width: '100%', alignItems: 'center', borderWidth: 1, borderColor: '#007AFF' },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  bestContainer: { alignItems: 'center', marginBottom: 20, padding: 10, backgroundColor: '#f0f8ff', borderRadius: 10, width: '100%' },
  bestText: { fontSize: 16, color: '#555', fontWeight: '600' },
  newRecordBadge: { marginTop: 5, backgroundColor: '#34C759', paddingHorizontal: 10, paddingVertical: 3, borderRadius: 10 },
  newRecordText: { color: 'white', fontWeight: 'bold', fontSize: 12 },
  guestText: { fontSize: 12, color: '#999', marginTop: 5, fontStyle: 'italic' }
});