import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from './firebaseConfig';

export default function LoginScreen() {
  const router = useRouter();
  
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = async () => {
    // ... (Logika auth sama seperti sebelumnya, tidak perlu diubah) ...
    if (!email || !password) {
      Alert.alert("Error", "Email dan Password harus diisi!");
      return;
    }
    setLoading(true);
    try {
      if (isRegistering) {
        if (!name) {
            Alert.alert("Error", "Nama Lengkap wajib diisi!");
            setLoading(false);
            return;
        }
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await updateProfile(user, { displayName: name });
        Alert.alert("Berhasil", "Akun berhasil dibuat! Selamat datang, " + name);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.replace('/');
    } catch (error: any) {
      let errorMessage = error.message;
      if (errorMessage.includes('auth/invalid-email')) errorMessage = "Format email salah.";
      if (errorMessage.includes('auth/user-not-found')) errorMessage = "User tidak ditemukan.";
      if (errorMessage.includes('auth/wrong-password')) errorMessage = "Password salah.";
      if (errorMessage.includes('auth/email-already-in-use')) errorMessage = "Email sudah terdaftar.";
      if (errorMessage.includes('auth/weak-password')) errorMessage = "Password terlalu lemah (min 6 karakter).";
      if (errorMessage.includes('auth/invalid-credential')) errorMessage = "Email atau Password salah.";
      Alert.alert("Gagal", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.replace('/')} style={styles.backBtn}>
        {/* Pastikan icon juga punya warna fix, bukan default */}
        <Ionicons name="arrow-back" size={24} color="#1c2e4a" />
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.title}>
            {isRegistering ? "Buat Akun Baru" : "Selamat Datang"}
        </Text>
        <Text style={styles.subtitle}>Virtual Lab Fisika & Kimia</Text>

        {/* PERBAIKAN DI SINI: Tambahkan placeholderTextColor */}
        {isRegistering && (
          <TextInput
            style={styles.input}
            placeholder="Nama Lengkap"
            placeholderTextColor="#888" 
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity 
            style={[styles.btnPrimary, { opacity: loading ? 0.7 : 1 }]} 
            onPress={handleAuth}
            disabled={loading}
        >
          {loading ? (
             <ActivityIndicator color="white" />
          ) : (
             <Text style={styles.btnText}>
                {isRegistering ? "Daftar Sekarang" : "Masuk"}
             </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
          <Text style={styles.linkText}>
            {isRegistering 
              ? "Sudah punya akun? Login di sini" 
              : "Belum punya akun? Daftar di sini"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f0f2f5' },
  backBtn: { position: 'absolute', top: 50, left: 20, zIndex: 10 },
  card: { backgroundColor: 'white', padding: 30, borderRadius: 15, elevation: 5 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#1c2e4a', textAlign: 'center', marginBottom: 5 },
  subtitle: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 30 },
  
  // PERBAIKAN: Tambahkan color: '#000' agar teks ketikan selalu hitam
  input: { 
      backgroundColor: '#f9f9f9', 
      borderWidth: 1,   
      borderColor: '#ddd', 
      padding: 15, 
      borderRadius: 10, 
      marginBottom: 15, 
      fontSize: 16,
      color: '#000' // <--- PENTING: Paksa warna teks jadi hitam
  },
  
  btnPrimary: { backgroundColor: '#007AFF', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10, height: 50, justifyContent: 'center' },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  linkText: { marginTop: 20, color: '#007AFF', textAlign: 'center', fontWeight: '600' }
});