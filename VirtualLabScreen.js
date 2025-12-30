import Slider from '@react-native-community/slider';
import { useEffect, useRef, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';

const { width } = Dimensions.get('window');

export default function VirtualLabScreen() {
  // --- STATE (Variabel Tampilan) ---
  // Default value diambil dari virtuallab.js
  const [length, setLength] = useState(150); // Panjang tali (L)
  const [mass, setMass] = useState(10);      // Massa (m)
  const [initialAngle, setInitialAngle] = useState(45); // Sudut awal slider
  
  // State untuk hasil pengukuran
  const [swingCount, setSwingCount] = useState(0);
  const [period, setPeriod] = useState(0);
  const [frequency, setFrequency] = useState(0);
  
  // State untuk animasi visual
  const [currentAngle, setCurrentAngle] = useState((45 * Math.PI) / 180);
  const [isRunning, setIsRunning] = useState(false);

  // --- REFS (Variabel Fisika di Belakang Layar) ---
  // Kita pakai useRef agar nilainya berubah tanpa render ulang UI berlebihan
  const physics = useRef({
    angle: (45 * Math.PI) / 180,
    velocity: 0,
    acceleration: 0,
    gravity: 0.981,
    damping: 0.9995,
    previousSign: 1,
    startTime: 0,
    lastPeriodTime: 0,
    swingCountInternal: 0
  });

  const requestRef = useRef(); // Untuk menyimpan ID requestAnimationFrame

  // --- LOGIKA FISIKA (Mirip virtuallab.js) ---
  const animate = () => {
    const p = physics.current; // Shortcut

    // Rumus Fisika Pendulum (Sama persis dengan virtuallab.js)
    // aAcceleration = (-1 * g / L) * sin(theta)
    p.acceleration = (-1 * p.gravity / length) * Math.sin(p.angle);
    p.velocity += p.acceleration;
    p.angle += p.velocity;
    p.velocity *= p.damping; // Redaman

    // Update Visual (trigger re-render)
    setCurrentAngle(p.angle);

    // Logika Hitung Ayunan & Periode
    const currentSign = Math.sign(p.angle);
    
    // Deteksi satu getaran penuh (kasar, saat melewati titik 0 dari arah tertentu)
    // Logika ini disederhanakan dari file asli agar lebih stabil di mobile
    if (p.previousSign < 0 && currentSign > 0) {
        const now = Date.now();
        if (p.swingCountInternal > 0) {
            const T = (now - p.lastPeriodTime) / 1000; // dalam detik
            setPeriod(T.toFixed(3));
            setFrequency((1/T).toFixed(3));
        }
        p.lastPeriodTime = now;
        p.swingCountInternal += 1;
        setSwingCount(p.swingCountInternal);
    }
    p.previousSign = currentSign;

    // Loop animasi
    if (isRunning) {
        requestRef.current = requestAnimationFrame(animate);
    }
  };

  // Efek saat tombol Start/Stop ditekan
  useEffect(() => {
    if (isRunning) {
      physics.current.lastPeriodTime = Date.now();
      requestRef.current = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(requestRef.current);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [isRunning, length]); // Re-run jika length berubah saat jalan

  // Fungsi Reset
  const resetSimulation = () => {
    setIsRunning(false);
    const rad = (initialAngle * Math.PI) / 180;
    setCurrentAngle(rad);
    
    // Reset fisika
    physics.current = {
        ...physics.current,
        angle: rad,
        velocity: 0,
        acceleration: 0,
        swingCountInternal: 0,
        previousSign: Math.sign(rad)
    };
    
    setSwingCount(0);
    setPeriod(0);
    setFrequency(0);
  };

  // Update sudut awal saat slider digeser (jika tidak sedang jalan)
  const handleAngleChange = (val) => {
    setInitialAngle(val);
    if (!isRunning) {
        const rad = (val * Math.PI) / 180;
        setCurrentAngle(rad);
        physics.current.angle = rad;
    }
  };

  // --- RENDER POSISI (Visualisasi) ---
  // Titik Pusat Canvas
  const centerX = width / 2;
  const originY = 20;
  
  // Hitung posisi bola (x,y) berdasarkan sudut dan panjang tali
  const bobX = centerX + length * Math.sin(currentAngle);
  const bobY = originY + length * Math.cos(currentAngle);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Simulasi Pendulum</Text>

      {/* AREA GAMBAR (CANVAS PENGGANTI) */}
      <View style={styles.canvasContainer}>
        <Svg height="300" width={width} style={styles.svg}>
            {/* Garis Tali */}
            <Line
                x1={centerX}
                y1={originY}
                x2={bobX}
                y2={bobY}
                stroke="#333"
                strokeWidth="2"
            />
            {/* Titik Gantung */}
            <Line x1={centerX - 20} y1={originY} x2={centerX + 20} y2={originY} stroke="black" strokeWidth="4" />
            
            {/* Bola Pendulum (Bob) */}
            <Circle
                cx={bobX}
                cy={bobY}
                r={mass} // Radius sesuai massa
                fill="#007AFF"
                stroke="#0056b3"
                strokeWidth="2"
            />
        </Svg>
      </View>

      {/* HASIL PENGUKURAN */}
      <View style={styles.resultBox}>
        <Text style={styles.resultText}>Ayunan: {swingCount}</Text>
        <Text style={styles.resultText}>Periode (T): {period} s</Text>
        <Text style={styles.resultText}>Frekuensi (f): {frequency} Hz</Text>
      </View>

      {/* KONTROL SLIDER */}
      <View style={styles.controls}>
        {/* Slider Panjang Tali */}
        <Text>Panjang Tali (L): {length} px</Text>
        <Slider
            style={styles.slider}
            minimumValue={50}
            maximumValue={250}
            step={1}
            value={length}
            onValueChange={setLength}
            minimumTrackTintColor="#007AFF"
            thumbTintColor="#007AFF"
        />

        {/* Slider Massa */}
        <Text>Massa Beban (m): {mass} kg</Text>
        <Slider
            style={styles.slider}
            minimumValue={5}
            maximumValue={30}
            step={1}
            value={mass}
            onValueChange={setMass}
            minimumTrackTintColor="#007AFF"
            thumbTintColor="#007AFF"
        />

        {/* Slider Sudut */}
        <Text>Sudut Awal: {initialAngle}°</Text>
        <Slider
            style={styles.slider}
            minimumValue={10}
            maximumValue={90}
            step={1}
            value={initialAngle}
            onValueChange={handleAngleChange}
            disabled={isRunning} // Kunci saat jalan
            minimumTrackTintColor={isRunning ? "#ccc" : "#007AFF"}
        />
      </View>

      {/* TOMBOL AKSI */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
            style={[styles.button, isRunning ? styles.btnStop : styles.btnStart]} 
            onPress={() => setIsRunning(!isRunning)}>
            <Text style={styles.btnText}>{isRunning ? "Stop Simulasi" : "Mulai Simulasi"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.btnReset]} onPress={resetSimulation}>
            <Text style={styles.btnText}>Reset</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f4f4f9',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  canvasContainer: {
    height: 300,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
    overflow: 'hidden', // Agar bola tidak keluar kotak
  },
  resultBox: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#e3f2fd',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  resultText: {
    fontWeight: '600',
    color: '#0056b3',
    fontSize: 12,
  },
  controls: {
    width: '100%',
    marginBottom: 20,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  btnStart: { backgroundColor: '#28a745' },
  btnStop: { backgroundColor: '#dc3545' },
  btnReset: { backgroundColor: '#6c757d' },
  btnText: { color: 'white', fontWeight: 'bold' }
});