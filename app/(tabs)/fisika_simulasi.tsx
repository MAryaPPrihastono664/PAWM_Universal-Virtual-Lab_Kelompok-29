import Slider from '@react-native-community/slider';
import { useEffect, useRef, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';

// Mengambil lebar layar HP
const { width } = Dimensions.get('window');

export default function HomeScreen() {
  // STATE (Variabel Tampilan)
  const [length, setLength] = useState(150); // Panjang tali (L)
  const [mass, setMass] = useState(10);      // Massa (m)
  const [initialAngle, setInitialAngle] = useState(45); // Sudut awal
  
  // Hasil pengukuran
  const [swingCount, setSwingCount] = useState(0);
  const [period, setPeriod] = useState(0);
  const [frequency, setFrequency] = useState(0);
  
  // Animasi
  const [currentAngle, setCurrentAngle] = useState((45 * Math.PI) / 180);
  const [isRunning, setIsRunning] = useState(false);

  // REFS (Variabel Fisika di Belakang Layar)
  const physics = useRef({
    angle: (45 * Math.PI) / 180,
    velocity: 0,
    acceleration: 0,
    gravity: 0.981,
    damping: 0.9995,
    previousSign: 1,
    lastPeriodTime: 0,
    swingCountInternal: 0
  });

  const requestRef = useRef<number>(0); 

  // LOGIKA FISIKA
  const animate = () => {
    const p = physics.current;

    // Rumus Fisika Pendulum
    p.acceleration = (-1 * p.gravity / length) * Math.sin(p.angle);
    p.velocity += p.acceleration;
    p.angle += p.velocity;
    p.velocity *= p.damping;

    setCurrentAngle(p.angle);

    const currentSign = Math.sign(p.angle);
    
    // Deteksi Periode (Saat melewati titik 0)
    if (p.previousSign < 0 && currentSign > 0) {
        const now = Date.now();
        if (p.swingCountInternal > 0) {
            const T = (now - p.lastPeriodTime) / 1000;
            setPeriod(parseFloat(T.toFixed(3)));
            setFrequency(parseFloat((1/T).toFixed(3)));
        }
        p.lastPeriodTime = now;
        p.swingCountInternal += 1;
        setSwingCount(p.swingCountInternal);
    }
    p.previousSign = currentSign;

    if (isRunning) {
        requestRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    if (isRunning) {
      physics.current.lastPeriodTime = Date.now();
      requestRef.current = requestAnimationFrame(animate);
    } else {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isRunning, length]);

  const resetSimulation = () => {
    setIsRunning(false);
    const rad = (initialAngle * Math.PI) / 180;
    setCurrentAngle(rad);
    
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

  const handleAngleChange = (val: number) => {
    setInitialAngle(val);
    if (!isRunning) {
        const rad = (val * Math.PI) / 180;
        setCurrentAngle(rad);
        physics.current.angle = rad;
    }
  };

  // Posisi Visual
  const centerX = width / 2;
  const originY = 20;
  const bobX = centerX + length * Math.sin(currentAngle);
  const bobY = originY + length * Math.cos(currentAngle);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* HEADER JUDUL */}
      <View style={styles.header}>
        <Text style={styles.title}>Simulasi Pendulum</Text>
      </View>

      {/* CANVAS AREA */}
      <View style={styles.canvasContainer}>
        <Svg height="300" width={width} style={styles.svg}>
            {/* Tali */}
            <Line
                x1={centerX} y1={originY}
                x2={bobX} y2={bobY}
                stroke="#333" strokeWidth="2"
            />
            {/* Atap */}
            <Line x1={centerX - 30} y1={originY} x2={centerX + 30} y2={originY} stroke="black" strokeWidth="4" />
            
            {/* Bola */}
            <Circle
                cx={bobX} cy={bobY}
                r={mass} 
                fill="#007AFF" stroke="#0056b3" strokeWidth="2"
            />
        </Svg>
      </View>

      {/* HASIL DATA */}
      <View style={styles.resultBox}>
        <View style={styles.resultItem}>
            <Text style={styles.resultLabel}>Ayunan</Text>
            <Text style={styles.resultValue}>{swingCount}</Text>
        </View>
        <View style={styles.resultItem}>
            <Text style={styles.resultLabel}>Periode (s)</Text>
            <Text style={styles.resultValue}>{period}</Text>
        </View>
        <View style={styles.resultItem}>
            <Text style={styles.resultLabel}>Frekuensi (Hz)</Text>
            <Text style={styles.resultValue}>{frequency}</Text>
        </View>
      </View>

      {/* KONTROL */}
      <View style={styles.controls}>
        <Text style={styles.label}>Panjang Tali: {length} px</Text>
        <Slider
            style={styles.slider}
            minimumValue={50} maximumValue={250} step={1}
            value={length} onValueChange={setLength}
            minimumTrackTintColor="#007AFF" thumbTintColor="#007AFF"
        />

        <Text style={styles.label}>Massa Beban: {mass} kg</Text>
        <Slider
            style={styles.slider}
            minimumValue={5} maximumValue={30} step={1}
            value={mass} onValueChange={setMass}
            minimumTrackTintColor="#007AFF" thumbTintColor="#007AFF"
        />

        <Text style={styles.label}>Sudut Awal: {initialAngle}°</Text>
        <Slider
            style={styles.slider}
            minimumValue={10} maximumValue={90} step={1}
            value={initialAngle} onValueChange={handleAngleChange}
            disabled={isRunning}
            minimumTrackTintColor={isRunning ? "#ccc" : "#007AFF"}
        />
      </View>

      {/* TOMBOL */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
            style={[styles.button, isRunning ? styles.btnStop : styles.btnStart]} 
            onPress={() => setIsRunning(!isRunning)}>
            <Text style={styles.btnText}>{isRunning ? "STOP" : "MULAI"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.btnReset]} onPress={resetSimulation}>
            <Text style={styles.btnText}>RESET</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#fff', paddingBottom: 40 },
  header: { padding: 20, paddingTop: 60, backgroundColor: '#f4f4f9', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  canvasContainer: { height: 300, backgroundColor: '#fafafa', borderBottomWidth: 1, borderColor: '#ddd' },
  svg: { width: '100%', height: '100%' },
  
  resultBox: { flexDirection: 'row', justifyContent: 'space-around', padding: 15, backgroundColor: '#eef2ff', margin: 15, borderRadius: 10 },
  resultItem: { alignItems: 'center' },
  resultLabel: { fontSize: 12, color: '#666' },
  resultValue: { fontSize: 18, fontWeight: 'bold', color: '#007AFF' },

  controls: { paddingHorizontal: 20 },
  label: { marginTop: 10, fontSize: 14, fontWeight: '600', color: '#444' },
  slider: { width: '100%', height: 40 },

  buttonContainer: { flexDirection: 'row', padding: 20, gap: 10 },
  button: { flex: 1, padding: 15, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  btnStart: { backgroundColor: '#28a745' },
  btnStop: { backgroundColor: '#dc3545' },
  btnReset: { backgroundColor: '#6c757d' },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});