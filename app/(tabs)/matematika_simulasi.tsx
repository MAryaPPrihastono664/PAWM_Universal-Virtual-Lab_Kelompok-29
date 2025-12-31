import { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Svg, { Circle, G, Line, Polygon, Text as SvgText } from 'react-native-svg';

const { width } = Dimensions.get('window');
const HEIGHT = 450; 
const CENTER_X = width / 2;
const CENTER_Y = HEIGHT / 2;
const GRID_SIZE = 40; 

type ReflectionMode = 'none' | 'x' | 'y' | 'point';

export default function MatematikaSimulasi() {
  //  State 
  const [shapeType, setShapeType] = useState('triangle');
  const [transX, setTransX] = useState('0'); 
  const [transY, setTransY] = useState('0');
  
  // Refleksi State
  const [refMode, setRefMode] = useState<ReflectionMode>('none');
  const [refPointX, setRefPointX] = useState('0'); // User input a
  const [refPointY, setRefPointY] = useState('0'); // User input b

  const [rotation, setRotation] = useState(0); 
  const [scale, setScale] = useState(1);       

  // Definisi Bentuk
  const shapes = {
    triangle: [{ x: 0, y: -60 }, { x: -50, y: 40 }, { x: 50, y: 40 }],
    square: [{ x: -50, y: -50 }, { x: 50, y: -50 }, { x: 50, y: 50 }, { x: -50, y: 50 }],
    rect: [{ x: -70, y: -40 }, { x: 70, y: -40 }, { x: 70, y: 40 }, { x: -70, y: 40 }],
    circle: { cx: 0, cy: 0, r: 40, marker: {x: 0, y: -40} } 
  };

  // Logika Transformasi
  // Parameter 'applyReflection' menentukan apakah kita ingin hasil akhir atau posisi 'sebelum' cermin
  const getTransformedPoint = (x: number, y: number, applyReflection: boolean) => {
    let nx = x;
    let ny = y;

    // 1. Dilatasi
    nx *= scale;
    ny *= scale;

    // 2. Rotasi
    const rad = (rotation * Math.PI) / 180;
    const rx = nx * Math.cos(rad) - ny * Math.sin(rad);
    const ry = nx * Math.sin(rad) + ny * Math.cos(rad);
    nx = rx; ny = ry;

    // 3. Translasi
    const dx = parseFloat(transX) || 0;
    const dy = parseFloat(transY) || 0;
    nx += dx;
    ny += dy;

    // 4. Refleksi (Hanya jika applyReflection = true)
    if (applyReflection) {
      if (refMode === 'x') {
        ny = -ny; 
      } else if (refMode === 'y') {
        nx = -nx; 
      } else if (refMode === 'point') {
        const a = parseFloat(refPointX) || 0;
        const b = parseFloat(refPointY) || 0;
        nx = 2 * a - nx;
        ny = 2 * b - ny;
      }
    }

    return { x: nx, y: ny };
  };

  const mathToSvg = (y: number) => -y;
  const formatCoord = (x: number, y: number) => `(${Math.round(x)}, ${Math.round(-y)})`; 

  // Render Umum (Untuk Poligon/Lingkaran) 
  const renderShapeInstance = (isGhost: boolean) => {
    // Tentukan Warna & Style berdasarkan apakah ini "Ghost" (Sebelum Refleksi) atau "Final"
    const fillColor = isGhost ? "rgba(150, 150, 150, 0.1)" : (refMode === 'none' ? "rgba(0, 122, 255, 0.3)" : "rgba(233, 30, 99, 0.3)");
    const strokeColor = isGhost ? "#999" : (refMode === 'none' ? "#007AFF" : "#E91E63");
    const strokeWidth = isGhost ? "1" : "2";
    const dashArray = isGhost ? "5, 5" : "0";

    if (shapeType === 'circle') {
      const { cx, cy, r, marker } = shapes.circle;
      const center = getTransformedPoint(cx, cy, !isGhost); // !isGhost berarti applyReflection = true jika ini BUKAN ghost
      const mark = getTransformedPoint(marker.x, marker.y, !isGhost);
      const newRadius = r * scale; 

      return (
        <G>
          <Circle 
            cx={CENTER_X + center.x} cy={CENTER_Y + mathToSvg(center.y)} r={Math.abs(newRadius)}
            fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} strokeDasharray={dashArray}
          />
          {/* Marker Rotasi*/}
          {!isGhost && (
            <G>
              <Line
                x1={CENTER_X + center.x} y1={CENTER_Y + mathToSvg(center.y)}
                x2={CENTER_X + mark.x} y2={CENTER_Y + mathToSvg(mark.y)}
                stroke={strokeColor} strokeWidth="2" strokeDasharray="5,5"
              />
              <Circle cx={CENTER_X + mark.x} cy={CENTER_Y + mathToSvg(mark.y)} r="4" fill={strokeColor} />
              <SvgText x={CENTER_X + mark.x + 10} y={CENTER_Y + mathToSvg(mark.y) - 10} fill="#333" fontSize="11" fontWeight="bold">
                {formatCoord(mark.x, mathToSvg(mark.y))} 
              </SvgText>
            </G>
          )}
        </G>
      );
    } else {
      // Poligon
      const points = shapes[shapeType as keyof typeof shapes] as {x:number, y:number}[];
      const transformedPoints = points.map(p => {
        const res = getTransformedPoint(p.x, p.y, !isGhost);
        return { x: res.x, y: mathToSvg(res.y) }; 
      });
      const pointsString = transformedPoints.map(p => `${CENTER_X + p.x},${CENTER_Y + p.y}`).join(' ');

      return (
        <G>
          <Polygon points={pointsString} fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} strokeDasharray={dashArray} />
          {/* Label Koordinat hanya untuk benda Final (Bukan Ghost) */}
          {!isGhost && transformedPoints.map((p, index) => (
            <G key={index}>
              <Circle cx={CENTER_X + p.x} cy={CENTER_Y + p.y} r="4" fill={strokeColor} />
              <SvgText x={CENTER_X + p.x + 10} y={CENTER_Y + p.y - 10} fill="#333" fontSize="10" fontWeight="bold">
                {formatCoord(p.x, p.y)}
              </SvgText>
            </G>
          ))}
        </G>
      );
    }
  };

  const renderShapes = () => {
    // Jika tidak ada refleksi, render 1 benda saja (Final)
    if (refMode === 'none') {
      return renderShapeInstance(false); // false = bukan ghost (applyReflection = true, meski efeknya sama)
    } 
    // Jika ada refleksi, render keduanya
    else {
      return (
        <G>
          {renderShapeInstance(true)}  {/* Ghost (Sebelum Refleksi) */}
          {renderShapeInstance(false)} {/* Final (Setelah Refleksi) */}
        </G>
      );
    }
  };

  const renderMirrorVisuals = () => {
    if (refMode === 'point') {
      const mx = parseFloat(refPointX) || 0;
      const my = parseFloat(refPointY) || 0; 
      const svgMy = mathToSvg(my);
      return (
        <G>
          <Circle cx={CENTER_X + mx} cy={CENTER_Y + svgMy} r="6" fill="#E91E63" />
          <SvgText x={CENTER_X + mx + 10} y={CENTER_Y + svgMy} fill="#E91E63" fontWeight="bold">Cermin ({mx}, {my})</SvgText>
        </G>
      );
    }
    return null;
  };

  const renderGrid = () => {
    const lines = [];
    for (let x = 0; x <= width; x += GRID_SIZE) lines.push(<Line key={`v${x}`} x1={x} y1={0} x2={x} y2={HEIGHT} stroke="#f0f0f0" />);
    for (let y = 0; y <= HEIGHT; y += GRID_SIZE) lines.push(<Line key={`h${y}`} x1={0} y1={y} x2={width} y2={y} stroke="#f0f0f0" />);
    return lines;
  };

  const reset = () => {
    setTransX('0'); setTransY('0');
    setRefMode('none'); setRefPointX('0'); setRefPointY('0');
    setRotation(0); setScale(1);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>Lab Transformasi Geometri</Text>
      <Text style={styles.subTitle}>Refleksi, Translasi, Rotasi & Dilatasi</Text>

      {/* Visual Area */}
      <View style={styles.labArea}>
        <Svg height={HEIGHT} width={width}>
            {renderGrid()}
            
            {/* Sumbu X & Y */}
            <Line x1={CENTER_X} y1="0" x2={CENTER_X} y2={HEIGHT} stroke={refMode === 'y' ? "#E91E63" : "#ccc"} strokeWidth={refMode === 'y' ? 3 : 2} />
            <Line x1="0" y1={CENTER_Y} x2={width} y2={CENTER_Y} stroke={refMode === 'x' ? "#E91E63" : "#ccc"} strokeWidth={refMode === 'x' ? 3 : 2} />
            
            <SvgText x={CENTER_X + 5} y="20" fill="#999">Y+</SvgText>
            <SvgText x={width - 25} y={CENTER_Y - 10} fill="#999">X+</SvgText>
            <Circle cx={CENTER_X} cy={CENTER_Y} r="4" fill="#333" />
            
            {renderMirrorVisuals()}
            {renderShapes()}
        </Svg>
      </View>

      {/* Kontrol Area */}
      <View style={styles.controlsContainer}>
        
        {/* 1. Bentuk */}
        <View style={styles.section}>
            <Text style={styles.sectionHeader}>1. Bentuk Objek</Text>
            <View style={styles.rowWrap}>
                {['triangle', 'square', 'rect', 'circle'].map((t) => (
                    <TouchableOpacity key={t} onPress={() => setShapeType(t)} style={[styles.btnParams, shapeType === t && styles.btnActive]}>
                        <Text style={[styles.btnText, shapeType === t && styles.textActive]}>{t}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>

        {/* 2. Translasi */}
        <View style={styles.section}>
            <Text style={styles.sectionHeader}>2. Translasi (Geser)</Text>
            <View style={styles.row}>
                <View style={styles.inputGroup}><Text>X:</Text><TextInput style={styles.input} keyboardType='numeric' value={transX} onChangeText={setTransX} /></View>
                <View style={styles.inputGroup}><Text>Y:</Text><TextInput style={styles.input} keyboardType='numeric' value={transY} onChangeText={setTransY} /></View>
            </View>
        </View>

        {/* 3. Refleksi */}
        <View style={styles.section}>
            <Text style={styles.sectionHeader}>3. Refleksi (Cermin)</Text>
            <View style={styles.rowWrap}>
                <TouchableOpacity onPress={() => setRefMode('none')} style={[styles.btnParams, refMode === 'none' && styles.btnActive]}>
                    <Text style={[styles.btnText, refMode === 'none' && styles.textActive]}>Tidak Ada</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setRefMode('x')} style={[styles.btnParams, refMode === 'x' && styles.btnActive]}>
                    <Text style={[styles.btnText, refMode === 'x' && styles.textActive]}>Sumbu X</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setRefMode('y')} style={[styles.btnParams, refMode === 'y' && styles.btnActive]}>
                    <Text style={[styles.btnText, refMode === 'y' && styles.textActive]}>Sumbu Y</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setRefMode('point')} style={[styles.btnParams, refMode === 'point' && styles.btnActive]}>
                    <Text style={[styles.btnText, refMode === 'point' && styles.textActive]}>Titik (a,b)</Text>
                </TouchableOpacity>
            </View>
            
            {/* Input Manual Refleksi */}
            {refMode === 'point' && (
                <View style={styles.mirrorInputBox}>
                    <Text style={styles.mirrorInputLabel}>Koordinat Titik Cermin:</Text>
                    <View style={styles.row}>
                        <View style={styles.inputGroup}>
                            <Text style={{fontWeight:'bold', color:'#E91E63'}}>a:</Text>
                            <TextInput style={[styles.input, {borderColor:'#E91E63'}]} keyboardType='numeric' value={refPointX} onChangeText={setRefPointX} />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={{fontWeight:'bold', color:'#E91E63'}}>b:</Text>
                            <TextInput style={[styles.input, {borderColor:'#E91E63'}]} keyboardType='numeric' value={refPointY} onChangeText={setRefPointY} />
                        </View>
                    </View>
                </View>
            )}
        </View>

        {/* 4. Rotasi & Dilatasi */}
        <View style={styles.section}>
            <Text style={styles.sectionHeader}>4. Rotasi & Dilatasi</Text>
            <View style={styles.row}>
                <View style={{alignItems:'center'}}>
                    <Text style={styles.labelSmall}>Rotasi: {rotation}°</Text>
                    <View style={styles.row}>
                        <TouchableOpacity style={styles.btnSmall} onPress={() => setRotation(r => r-15)}><Text>-</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.btnSmall} onPress={() => setRotation(r => r+15)}><Text>+</Text></TouchableOpacity>
                    </View>
                </View>
                <View style={{alignItems:'center'}}>
                    <Text style={styles.labelSmall}>Skala: {scale.toFixed(1)}x</Text>
                    <View style={styles.row}>
                        <TouchableOpacity style={styles.btnSmall} onPress={() => setScale(s => Math.max(0.5, s-0.5))}><Text>-</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.btnSmall} onPress={() => setScale(s => Math.min(3, s+0.5))}><Text>+</Text></TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>

        <TouchableOpacity style={styles.btnReset} onPress={reset}>
            <Text style={{color:'white', fontWeight:'bold'}}>Reset Semua</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginTop: 30, color: '#1c2e4a' },
  subTitle: { fontSize: 13, textAlign: 'center', color: '#666', marginBottom: 10 },
  labArea: { backgroundColor: '#fafafa', borderBottomWidth:1, borderColor:'#eee', alignItems:'center' },
  controlsContainer: { padding: 20, paddingBottom: 50 },
  section: { marginBottom: 20, borderBottomWidth:1, borderBottomColor:'#eee', paddingBottom:15 },
  sectionHeader: { fontWeight:'bold', marginBottom: 10, color:'#333', fontSize: 16 },
  row: { flexDirection:'row', gap: 15, alignItems:'center' },
  rowWrap: { flexDirection:'row', gap: 8, flexWrap:'wrap' },
  inputGroup: { flexDirection:'row', alignItems:'center', gap: 5 },
  input: { width: 60, height: 40, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, textAlign:'center', backgroundColor:'white' },
  btnParams: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20, borderWidth: 1, borderColor: '#ddd', backgroundColor: 'white' },
  btnActive: { backgroundColor: '#007AFF', borderColor: '#007AFF' },
  btnText: { fontSize: 12, color: '#555' },
  textActive: { color: 'white', fontWeight: 'bold' },
  btnSmall: { width: 40, height: 40, justifyContent:'center', alignItems:'center', backgroundColor: '#f0f0f0', borderRadius: 8 },
  labelSmall: { fontSize:12, marginBottom:5, color:'#666' },
  btnReset: { backgroundColor: '#FF3B30', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  
  // Style khusus input cermin
  mirrorInputBox: { marginTop: 10, backgroundColor: '#fce4ec', padding: 10, borderRadius: 8, width: '100%' },
  mirrorInputLabel: { fontSize: 12, fontWeight: 'bold', color: '#E91E63', marginBottom: 5 }
});