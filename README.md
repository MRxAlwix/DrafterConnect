# DrafterConnect

DrafterConnect adalah platform web yang membantu para drafter, mahasiswa, dan profesional untuk terhubung, berbagi pengetahuan, dan mengelola tugas serta portofolio. Dibangun dengan React, Vite, TypeScript, dan Tailwind CSS.

## Fitur Utama

- **Autentikasi**: Login pengguna untuk akses fitur personal.
- **Dashboard**: Statistik, aktivitas terbaru, dan quick actions.
- **Forum Diskusi**: Tempat bertanya, berdiskusi, dan berbagi pengetahuan.
- **Materi**: Kumpulan materi pembelajaran yang dapat diakses pengguna.
- **Tugas**: Manajemen tugas, upload, dan penilaian tugas.
- **Pengumuman**: Informasi penting dan update terbaru dari admin.
- **Portofolio**: Pengguna dapat menampilkan hasil karya/proyek mereka.
- **Tema**: Dukungan tema gelap/terang.

## Struktur Folder

- `src/components/` - Komponen UI dan layout (Navbar, Sidebar, Card, dsb)
- `src/pages/` - Halaman utama (Dashboard, Forum, Materi, Tugas, Pengumuman, Portfolio)
- `src/stores/` - State management (authStore, themeStore)
- `src/lib/` - Integrasi Firebase & utilitas
- `src/types/` - Tipe TypeScript

## Teknologi

- React + TypeScript
- Vite
- Tailwind CSS
- Firebase (auth & firestore)

## Cara Menjalankan

1. Clone repo ini
2. Install dependencies:
   ```bash
   npm install
   ```
3. Jalankan aplikasi:
   ```bash
   npm run dev
   ```

## Kontribusi

Pull request dan issue sangat terbuka untuk pengembangan lebih lanjut.