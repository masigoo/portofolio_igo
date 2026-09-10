# Update Log — v2 (interaction & polish pass)

Semua perubahan di bawah ini murni HTML/CSS/JS vanilla, nggak nambah dependency baru. Tinggal buka `index.html` seperti biasa.

## ✅ Sudah ditambahkan

**Micro-interaction & 3D feel**
- 3D tilt on hover di project card, tool card, dan certificate card (`applyTilt` di script.js)
- Custom cursor dot + outline follower (khusus desktop / mouse, otomatis nonaktif di touchscreen dan saat `prefers-reduced-motion`)
- Magnetic effect di tombol "Get in touch"
- Parallax halus di grid-backdrop hero, ngikutin posisi mouse

**Interaktivitas section**
- Filter tab di **Tools & Software**: All / Programming / Hardware & CAD / Dev Tools
- Filter tab di **Projects**: All / Robotics / IoT / Circuit & Sensing
- Modal sertifikat sekarang punya tombol prev/next (juga bisa pakai tombol panah kiri/kanan keyboard) + counter posisi, dan menyatukan semua sertifikat (termasuk sertifikat magang) jadi satu carousel

**Wow-factor / polish**
- Loading screen singkat (logo + progress bar) sebelum hero muncul
- Noise/grain texture halus di seluruh background
- Scrollbar Firefox ikut tema (`scrollbar-color`), scrollbar Chrome sudah dari versi sebelumnya
- Favicon custom (SVG inline, nggak perlu file tambahan)
- Meta Open Graph & Twitter Card biar preview bagus saat di-share ke LinkedIn/WhatsApp

**Konten**
- Baris status baru "CURRENTLY BUILDING: …" di hero (edit langsung di `index.html`, cari `id="building-text"`)
- Tombol "Download CV" di hero

## ⚠️ Yang masih perlu kamu lengkapi manual

1. **CV PDF** — taruh file di `assets/CV-Dafigo-Akbar-Rahmatullah.pdf` (nama file harus persis sama), atau ganti path-nya di `index.html` kalau mau nama lain.
2. **og:url** di `<head>` (`index.html` baris ~18) masih placeholder `https://masigoo.github.io/portofolio_igo/` — ganti ke domain asli setelah kamu deploy, supaya preview link share-nya benar.
3. **"Currently building"** teksnya masih placeholder — update sesuai apa yang lagi kamu kerjakan.
4. Foto `assets/img/proj-light.jpg` untuk project "Automatic Light Switch" belum ada di folder assets (fallback placeholder otomatis muncul kalau file belum di-upload) — sama seperti item lain yang punya fallback `onerror`.

## 💡 Belum dikerjakan (butuh konten/aset nyata dari kamu)

- Testimoni/rekomendasi dari supervisor magang — kirim teks testimonialnya kalau mau saya bikinkan section-nya
- Video demo AGV/robot — kalau ada rekaman pendek, saya bisa embed jadi galeri/lightbox di project card
- Sound toggle — sengaja di-skip (opsional banget dan sering bikin lebih ribet daripada wow)
