import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter, useSegments } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
import { ActivityIndicator, Alert, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

// Import Firebase
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "./firebaseConfig";

// 1. CONTEXT AUTH
const AuthContext = createContext<any>(null);

export function useAuth() {
  return useContext(AuthContext);
}

// 2. KOMPONEN NAVBAR GLOBAL
const GlobalHeader = ({ user }: any) => {
  const router = useRouter();
  const segments = useSegments(); 

  // Cek halaman login agar header tidak dobel
  const isLoginPage = segments[0] === 'login';
  if (isLoginPage) return null;

  // LOGIKA TAMPILAN USER (Firebase User Object)
  // Di Firebase, nama ada di properti 'displayName', email di 'email'
  const displayName = user?.displayName || user?.email || "User Belum Login";
  const userRole = user ? "Siswa" : "Tamu";
  
  const handleRightButton = async () => {
    if (user) {
      // LOGOUT FIREBASE
      try {
        await signOut(auth);
        Alert.alert("Sukses", "Anda telah keluar.");
        router.replace('/login');
      } catch (error: any) {
        Alert.alert("Error", error.message);
      }
    } else {
      router.push('/login');
    }
  };

  // TAMPILAN WEB
  if (Platform.OS === 'web') {
    return (
      <View style={styles.webHeader}>
        <View style={styles.webLeft}>
          <TouchableOpacity onPress={() => router.replace('/')} style={styles.logoBtn}>
            <Ionicons name="flask" size={24} color="white" />
            <Text style={styles.webTitle}>Virtual Lab Universal</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.webRight}>
          <TouchableOpacity onPress={() => router.replace('/')} style={styles.webMenuLink}>
            <Ionicons name="home" size={18} color="white" />
            <Text style={styles.webMenuText}>Beranda</Text>
          </TouchableOpacity>
          
          <View style={styles.webUserBox}>
            <Text style={styles.webUserName}>{displayName}</Text>
            <Text style={styles.webUserRole}>{userRole}</Text>
          </View>

          <TouchableOpacity 
            onPress={handleRightButton} 
            style={[styles.webLogoutBtn, { backgroundColor: user ? '#d32f2f' : '#28a745' }]}
          >
            <Ionicons name={user ? "log-out-outline" : "log-in-outline"} size={20} color="white" />
            <Text style={{color:'white', fontWeight:'bold', marginLeft:5}}>
              {user ? "Keluar" : "Masuk"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // TAMPILAN MOBILE
  return (
    <SafeAreaView edges={['top']} style={styles.mobileHeaderSafe}>
      <View style={styles.mobileHeaderContainer}>
        <TouchableOpacity onPress={() => router.replace('/')} style={styles.iconBtn}>
          <Ionicons name="home" size={24} color="white" />
        </TouchableOpacity>

        <View style={styles.mobileTitleContainer}>
          <Text style={styles.mobileAppName}>Virtual Lab</Text>
          <Text style={[styles.mobileUserName, { color: user ? 'white' : '#FFD700' }]}>
             {/* Ambil nama depan saja biar muat di HP */}
            {user ? displayName.split(' ')[0] : "Belum Login"} 
          </Text>
        </View>

        <TouchableOpacity onPress={handleRightButton} style={[styles.iconBtn, { backgroundColor: user ? 'rgba(255,59,48,0.2)' : 'rgba(40,167,69,0.2)' }]}>
          <Ionicons 
            name={user ? "log-out-outline" : "log-in-outline"} 
            size={24} 
            color={user ? "#FF3B30" : "#28a745"} 
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// 3. ROOT LAYOUT UTAMA
export default function RootLayout() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // LISTENER: Cek status login Firebase secara Realtime
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#1c2e4a'}}>
        <ActivityIndicator size="large" color="#fff"/>
      </View>
    );
  }

  return (
    <AuthContext.Provider value={{ user }}>
      <StatusBar barStyle="light-content" backgroundColor="#1c2e4a" />
      <Stack
        screenOptions={{
          header: () => <GlobalHeader user={user} />,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="login" options={{ headerShown: false }} /> 
      </Stack>
    </AuthContext.Provider>
  );
}

// 4. STYLE CSS
const styles = StyleSheet.create({
  // Web
  webHeader: {
    height: 70, backgroundColor: '#1c2e4a', flexDirection: 'row',
    alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 40,
    shadowColor: '#000', shadowOpacity: 0.1, elevation: 4,
  },
  webLeft: { flexDirection: 'row', alignItems: 'center' },
  logoBtn: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  webTitle: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  webRight: { flexDirection: 'row', alignItems: 'center', gap: 25 },
  webMenuLink: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  webMenuText: { color: '#ccc', fontWeight: '500' },
  webUserBox: { alignItems: 'flex-end' },
  webUserName: { color: 'white', fontWeight: 'bold', fontSize: 14 },
  webUserRole: { color: '#ccc', fontSize: 11 },
  webLogoutBtn: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 8 },

  // Mobile
  mobileHeaderSafe: { backgroundColor: '#1c2e4a' },
  mobileHeaderContainer: {
    height: 60, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', paddingHorizontal: 15,
  },
  mobileTitleContainer: { alignItems: 'center' },
  mobileAppName: { color: '#ccc', fontSize: 12 },
  mobileUserName: { fontWeight: 'bold', fontSize: 16 },
  iconBtn: { padding: 8, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 8 }
});