# Virtual Lab Universal (Mobile & Web)

Aplikasi pembelajaran interaktif yang menyediakan simulasi laboratorium virtual untuk mata pelajaran Fisika, Kimia, dan Matematika. Dibangun menggunakan React Native (Expo) untuk mendukung akses lintas platform (Android, iOS, dan Web). Dibangun oleh
- 18223016 Muhammad Daffa Al Ghifari
- 18223068 Muhammad Arya Putra Prihastono


## Fitur Utama

* **Fisika:** Simulasi Bandul Sederhana (Simple Pendulum) dengan pengaturan panjang tali, massa, dan sudut.
* **Kimia:** Simulasi Titrasi Asam-Basa dengan indikator perubahan warna visual.
* **Matematika:** Visualisasi Transformasi Geometri (Refleksi, Translasi).
* **Autentikasi:** Login dan Registrasi pengguna yang aman menggunakan Firebase Auth.
* **Kuis & Skor:** Evaluasi pemahaman siswa dengan penyimpanan skor ke Firestore Database.
* **Responsif:** Tampilan UI yang menyesuaikan layar Mobile dan Web.

## Teknologi yang Digunakan

* **Framework:** React Native (Expo Router)
* **Bahasa:** TypeScript
* **Backend:** Firebase (Authentication & Firestore)
* **Grafis:** react-native-svg (untuk visualisasi simulasi)
* **UI Components:** react-native-safe-area-context, expo-vector-icons



## Cara Menjalankan Aplikasi (Local Development)

Ikuti langkah-langkah berikut untuk menjalankan kode sumber ini di komputer Anda.

### 1. Prasyarat (Prerequisites)

Pastikan Anda telah menginstal software berikut:
* Node.js (Versi LTS direkomendasikan).
* Git.
* Aplikasi Expo Go di HP Anda (tersedia di Play Store / App Store) untuk testing fisik.

### 2. Instalasi

Clone repositori ini dan masuk ke direktori proyek:

```bash
git clone https://github.com/MAryaPPrihastono664/PAWM_Universal-Virtual-Lab_Kelompok-29
cd https://github.com/MAryaPPrihastono664/PAWM_Universal-Virtual-Lab_Kelompok-29
```

### 3. Mulai Setelah Masuk Direktori yang Sesuai 

1. Install dependencies 

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```
