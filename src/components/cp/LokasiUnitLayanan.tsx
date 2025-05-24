import React from 'react';

/**
 * Komponen React yang menampilkan diagram Lokasi Unit Layanan
 * menggunakan elemen SVG untuk mempertahankan struktur dan responsivitas.
 *
 * Komponen ini mereplikasi struktur visual dari SVG asli.
 *
 * @param {object} props - Properti komponen.
 * @param {string} [props.width='100%'] - Lebar SVG. Defaultnya 100% dari parent.
 * @param {string} [props.height='auto'] - Tinggi SVG. Defaultnya 'auto' untuk menjaga rasio aspek.
 * @param {string} [props.className] - Kelas CSS tambahan untuk elemen SVG utama.
 * @returns {JSX.Element} Elemen React yang menampilkan diagram SVG.
 */
const LokasiUnitLayanan = ({ width = '100%', height = 'auto', ...props }) => {
  return (
    // Elemen SVG utama.
    // Atribut viewBox sangat penting untuk responsivitas,
    // memastikan konten SVG menyesuaikan skala dalam area yang tersedia.
    <svg
      width={width}
      height={height}
      viewBox="0 0 91.1 11.9"
      xmlns="http://www.w3.org/2000/svg"
      {...props} // Meneruskan properti tambahan seperti className, style, dll.
    >
      {/* Grup utama untuk transformasi skala dan posisi */}
      <g transform="translate(-159 -18.6) scale(.26458)">
        {/* Latar Belakang untuk teks "Lokasi Unit Layanan" */}
        <path fill="#f2f2f2" stroke="#000" strokeMiterlimit="8" d="M601.3 70.7h343.5v16.2H601.3z"/>
        {/* Teks "Lokasi Unit Layanan" */}
        <text x="773" y="78.8" fontFamily="Arial, sans-serif" fontSize="10" textAnchor="middle" dominantBaseline="middle">Lokasi Unit Layanan</text>

        {/* Latar Belakang untuk area legenda di bawah */}
        <path fill="#fff" stroke="#000" strokeMiterlimit="8" d="M601.3 86.3h343.5v28.2H601.3z"/>

        {/* Item Legenda: Keluarga */}
        <circle cx="613.8" cy="102.3" r="6" fill="#f7f7c2"/>
        <text x="630" y="105" fontFamily="Arial, sans-serif" fontSize="10">Keluarga</text>

        {/* Item Legenda: Posyandu */}
        <circle cx="682.4" cy="102.6" r="6" fill="#b0fee6"/>
        <text x="690" y="105" fontFamily="Arial, sans-serif" fontSize="10">Posyandu</text>

        {/* Item Legenda: Pustu */}
        <circle cx="753" cy="102.8" r="6" fill="#ffd9ff"/>
        <text x="760" y="105" fontFamily="Arial, sans-serif" fontSize="10">Pustu</text>

        {/* Item Legenda: Puskesmas/FKTP */}
        <circle cx="806.3" cy="103" r="6" fill="#8ee2fc"/>
        <text x="815" y="105" fontFamily="Arial, sans-serif" fontSize="10">Puskesmas/FKTP</text>

        {/* Item Legenda: FKTL */}
        <circle cx="907" cy="102.3" r="6" fill="#f2f2f2"/>
        <text x="915" y="105" fontFamily="Arial, sans-serif" fontSize="10">FKTL</text>
      </g>
    </svg>
  );
};

export default LokasiUnitLayanan;
