# KasRT - Aplikasi Keuangan & Iuran RT Digital 🇮🇩

**KasRT** adalah platform digital berbasis mobile untuk mempermudah pengelolaan iuran, pencatatan kas, dan transparansi keuangan di lingkungan Rukun Tetangga (RT). Proyek ini dibangun dengan fokus pada kecepatan pengembangan (*Rapid Development*) dan kemudahan penggunaan.

## 🛠 Tech Stack

  * **Framework:** React Native (via Expo SDK 50+)
  * **Language:** JavaScript (ES6+)
  * **UI Library:** React Native Paper
  * **Backend & Auth:** Supabase (PostgreSQL)
  * **Navigation:** React Navigation (Native Stack)

-----

## 📋 Prasyarat (Prerequisites)

Sebelum memulai, pastikan laptop kamu sudah terinstall:

1.  **Node.js (Wajib Versi LTS v20.x)**
      * ⚠️ *Jangan gunakan Node v22.x* karena sering bentrok dengan Expo.
      * Download di: [nodejs.org](https://nodejs.org/)
2.  **Git**
3.  **Aplikasi Expo Go** (Install di HP Android/iOS kamu dari Play Store/App Store).
4.  **VS Code** (Recommended Editor).

-----

## 🚀 Cara Install & Setup (Untuk Pertama Kali)

Ikuti langkah ini satu per satu agar tidak error.

### 1\. Clone Repository

```bash
git clone https://github.com/Zawnr/Kas-RT.git
cd KasRT
```

### 2\. Install Dependencies

Jalankan perintah ini untuk mengunduh semua library yang dibutuhkan:

```bash
npm install
```

*Catatan: Jika muncul error "Incompatible Peer Dependencies", abaikan dulu atau gunakan `npm install --legacy-peer-deps`.*

### 3\. Konfigurasi Database (Supabase)

Aplikasi ini membutuhkan backend Supabase. Minta **URL** dan **ANON KEY** kepada *Project Manager* (atau buat project baru).

1.  Buka file `src/services/supabase.js`.
2.  Ganti variabel berikut dengan kredensial asli:
    ```javascript
    const supabaseUrl = 'HTTPS://YOUR_PROJECT.SUPABASE.CO';
    const supabaseAnonKey = 'YOUR_LONG_ANON_KEY';
    ```

### 4\. Setup Tabel Database (SQL)

Jika kamu membuat project Supabase sendiri, jalankan script SQL ini di dashboard Supabase (Menu SQL Editor) untuk membuat tabel yang diperlukan:

```sql
-- Tabel Data RT
create table public.data_rt (
  id text primary key,
  nama_rt text not null,
  alamat_rt text not null,
  kota text not null,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Tabel Profil User
create table public.profiles (
  id uuid references auth.users not null primary key,
  email text,
  nama_lengkap text,
  role text check (role in ('PENGURUS', 'WARGA')),
  no_hp text,
  alamat_rumah text,
  rt_id text references public.data_rt(id),
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Aktifkan RLS (Security)
alter table public.data_rt enable row level security;
alter table public.profiles enable row level security;
create policy "Public Access" on public.data_rt for select using (true);
create policy "Public Access Profiles" on public.profiles for select using (true);
create policy "Insert RT Auth" on public.data_rt for insert with check (auth.role() = 'authenticated');
create policy "Insert Profile Self" on public.profiles for insert with check (auth.uid() = id);
```

-----

## ▶️ Cara Menjalankan Aplikasi

1.  Pastikan Laptop dan HP terhubung ke internet.
2.  Jalankan perintah ini di terminal VS Code:
    ```bash
    npx expo start -c --tunnel
    ```
    *(Opsi `-c` untuk membersihkan cache, `--tunnel` untuk menembus firewall jaringan/WiFi).*
3.  Tunggu hingga muncul **QR Code**.
4.  Scan QR Code menggunakan aplikasi **Expo Go** di HP.

-----

## ⚠️ Troubleshooting (Masalah Umum)

Jika kamu mengalami error, cek solusi berikut:

**1. Error "Incompatible React versions" (Merah)**
Expo meminta versi React yang spesifik. Pastikan di `package.json` tertulis persis seperti ini (tanpa tanda `^`):

```json
"dependencies": {
  "react": "19.1.1",
  "react-native": "0.77.0"
}
```

*Solusi:* Hapus folder `node_modules` dan `package-lock.json`, lalu `npm install` ulang.

**2. Error "Cannot find module 'babel-preset-expo'"**
Library babel belum terinstall. Jalankan:

```bash
npx expo install babel-preset-expo
```

**3. Layar Biru "Something went wrong"**
Biasanya karena struktur file salah. Pastikan file `package.json` memiliki baris:

```json
"main": "expo/AppEntry.js",
```

-----

## 📂 Struktur Folder

```text
KasRT/
├── App.js                  # Logic Navigasi Utama
├── app.json                # Konfigurasi Expo
├── src/
│   ├── components/         # Komponen UI (Button, Card, dll)
│   ├── constants/          # Warna & Tema (theme.js)
│   ├── screens/            # Halaman Aplikasi (Login, Dashboard, dll)
│   └── services/           # Koneksi API (supabase.js)
└── assets/                 # Gambar & Icon
```

-----

*@KasRT - 2025*