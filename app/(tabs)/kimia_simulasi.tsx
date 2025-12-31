import { useState } from 'react';
import { Alert, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

const { width } = Dimensions.get('window');

export default function KimiaSimulasi() {
  // STATE
  const [volumeBuret, setVolumeBuret] = useState(50); // Awal 50ml
  const [volumeDitets, setVolumeDitets] = useState(0); // Berapa ml yang sudah menetes
  const [color, setColor] = useState('#E0F7FA'); // Warna cairan (Bening)
  const [isFinished, setIsFinished] = useState(false);

  // Target Titrasi (Misteri) - Random antara 20 - 30 ml
  const [targetVolume] = useState(25); 

  const handleDrip = (amount: number) => {
    if (volumeBuret <= 0 || isFinished) return;

    const newVolume = volumeDitets + amount;
    setVolumeDitets(newVolume);
    setVolumeBuret(volumeBuret - amount);

    // Cek Perubahan Warna (Indikator PP)
    if (newVolume >= targetVolume) {
      if (newVolume > targetVolume + 5) {
         setColor('#FF1493'); // Merah Tua (Kelebihan Basa / Overshot)
         Alert.alert("Titrasi Selesai", "Warna terlalu merah! Anda kelebihan meneteskan basa.");
         setIsFinished(true);
      } else {
         setColor('#FFC0CB'); // Pink Muda (Sempurna)
      }
    }
  };

  const reset = () => {
    setVolumeBuret(50);
    setVolumeDitets(0);
    setColor('#E0F7FA');
    setIsFinished(false);
  };

  // Tinggi Visual Cairan (Scaling visual)
  const buretHeight = (volumeBuret / 50) * 150; 

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Simulasi Titrasi Asam-Basa</Text>
      <Text style={styles.subTitle}>HCl + NaOH (Indikator PP)</Text>

      {/* AREA VISUAL */}
      <View style={styles.labArea}>
        <Svg height="350" width={width} style={{alignSelf: 'center'}}>
           
           {/* Tiang Statif */}
           <Rect x={width/2 - 60} y="20" width="10" height="300" fill="#555" />
           <Rect x={width/2 - 60} y="320" width="100" height="10" fill="#555" />
           
           {/* Penjepit Buret */}
           <Rect x={width/2 - 60} y="50" width="60" height="5" fill="#555" />

           {/* BURET (Atas) */}
           {/* Tabung Kaca */}
           <Rect x={width/2 - 10} y="20" width="20" height="160" stroke="#333" strokeWidth="2" fill="none" />
           {/* Cairan Buret (NaOH) */}
           <Rect 
             x={width/2 - 9} 
             y={20 + (150 - buretHeight)} // Turun sesuai volume berkurang
             width="18" 
             height={buretHeight} 
             fill="#81D4FA" // Biru muda cairan basa
           />
           {/* Keran */}
           <Path d={`M${width/2} 180 L${width/2} 195`} stroke="#333" strokeWidth="2" />
           <Rect x={width/2 - 5} y="185" width="10" height="5" fill="black" />

           {/* ERLENMEYER (Bawah) */}
           {/* Cairan Erlenmeyer (Berubah Warna) */}
           <Path 
             d={`M${width/2 - 25} 250 L${width/2 + 25} 250 L${width/2 + 40} 300 L${width/2 - 40} 300 Z`}
             fill={color}
             stroke="none"
           />
           {/* Gelas Kaca */}
           <Path 
             d={`M${width/2 - 10} 195 L${width/2 + 10} 195 L${width/2 + 40} 300 L${width/2 - 40} 300 Z`}
             stroke="#333" strokeWidth="2" fill="none"
           />
        </Svg>
      </View>

      {/* DATA DISPLAY */}
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>Volume NaOH Terpakai: <Text style={{fontWeight:'bold'}}>{volumeDitets.toFixed(1)} ml</Text></Text>
        <Text style={styles.infoText}>Sisa di Buret: {volumeBuret.toFixed(1)} ml</Text>
        <Text style={[styles.statusText, {color: color === '#FFC0CB' ? 'green' : '#666'}]}>
            {color === '#E0F7FA' ? 'Larutan Bening (Asam)' : 
             color === '#FFC0CB' ? 'MERAH MUDA SEULAS (Titik Akhir)!' : 'Merah Tua (Basa Berlebih)'}
        </Text>
      </View>

      {/* KONTROL */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.btnDrop} onPress={() => handleDrip(1)} disabled={isFinished}>
            <Text style={styles.btnText}>Tetes 1 ml</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnDrop} onPress={() => handleDrip(0.1)} disabled={isFinished}>
            <Text style={styles.btnText}>Tetes 0.1 ml</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnReset} onPress={reset}>
            <Text style={styles.btnText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 20 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', color: '#1c2e4a' },
  subTitle: { fontSize: 14, textAlign: 'center', color: '#666', marginBottom: 10 },
  labArea: { alignItems: 'center', justifyContent: 'center', height: 350, backgroundColor: '#fafafa' },
  
  infoBox: { padding: 15, alignItems: 'center', backgroundColor: '#eef2ff', marginHorizontal: 20, borderRadius: 10 },
  infoText: { fontSize: 16, marginBottom: 5 },
  statusText: { fontSize: 16, fontWeight: 'bold', marginTop: 5 },

  controls: { flexDirection: 'row', justifyContent: 'center', gap: 10, marginTop: 20 },
  btnDrop: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8, flex: 1, marginHorizontal: 5, alignItems: 'center' },
  btnReset: { backgroundColor: '#FF3B30', padding: 15, borderRadius: 8, flex: 1, marginHorizontal: 5, alignItems: 'center' },
  btnText: { color: 'white', fontWeight: 'bold' }
});