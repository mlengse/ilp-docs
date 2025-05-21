import React from 'react';

function App() {
  return (
    // Kontainer utama dengan gaya CSS biasa
    <div style={{
      // minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      // padding: '20px',
      // backgroundColor: '#f0f2f5', // Warna latar belakang yang lembut
      fontFamily: 'Inter, sans-serif' // Menggunakan font Inter
    }}>
      {/* Kontainer kartu dengan gaya CSS biasa */}
      <div style={{
        backgroundColor: '#ffffff', // Latar belakang kontainer putih
        borderRadius: '12px',      // Sudut membulat
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', // Bayangan lembut
        padding: '30px',
        textAlign: 'center',
        maxWidth: '960px', // Lebar maksimum kontainer, disesuaikan dengan SVG
        width: '100%',     // Lebar penuh dalam batas maxWidth
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Judul dengan gaya CSS biasa
        <h1 style={{
          fontSize: '1.8rem', // Ukuran font yang lebih besar
          fontWeight: '700',   // Tebal
          color: '#333',
          marginBottom: '20px'
        }}>Tampilan Grafis SVG Anda</h1> */}
        {/* Paragraf deskripsi dengan gaya CSS biasa */}
        {/* <p style={{
          color: '#666',
          marginBottom: '25px',
          fontSize: '1rem'
        }}>Berikut adalah representasi visual dari data SVG yang Anda berikan.</p> */}

        {/* Kode SVG yang Anda berikan */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          width="960"
          height="540"
          viewBox="0 0 960 540"
          style={{
            maxWidth: '100%',    // Memastikan SVG responsif
            height: 'auto',      // Mempertahankan rasio aspek
            borderRadius: '8px', // Sudut membulat untuk SVG
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)' // Bayangan kecil untuk SVG
          }}
        >
          <defs>
            <clipPath id="clip_0">
              <path transform="matrix(.1,0,0,-.1,0,540)" d="M9279.6 5083.2H9466.799V5270.3996H9279.6Z" clipRule="evenodd"/>
            </clipPath>
          </defs>
          <g>
            {/* Latar belakang putih */}
            {/* <path transform="matrix(.1,0,0,-.1,0,540)" d="M0 0H9600V5400H0Z" fill="#ffffff" fillRule="evenodd"/> */}

            {/* Blok Kotak Warna - Baris Paling Atas */}
            <g id="blok_atas_warna">
              <path transform="matrix(.1,0,0,-.1,0,540)" d="M4282.5 106.07H4987.199V370.328H4282.5Z" fill="#b0fee6" fillRule="evenodd"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" d="M4987.2 106.07H5691.8996V370.328H4987.2Z" fill="#ffd9ff" fillRule="evenodd"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" d="M5691.9 106.07H6396.603V370.328H5691.9Z" fill="#8ee2fc" fillRule="evenodd"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="10" strokeLinecap="butt" strokeLinejoin="round" fill="none" stroke="#ffffff" d="M4987.2 375.328V91.0703"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="10" strokeLinecap="butt" strokeLinejoin="round" fill="none" stroke="#ffffff" d="M5691.9 375.328V91.0703"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="10" strokeLinecap="butt" strokeLinejoin="round" fill="none" stroke="#ffffff" d="M4282.5 375.328V91.0703"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="10" strokeLinecap="butt" strokeLinejoin="round" fill="none" stroke="#ffffff" d="M6396.6 375.328V91.0703"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="10" strokeLinecap="butt" strokeLinejoin="round" fill="none" stroke="#ffffff" d="M4277.5 370.328H6401.6"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="round" fill="none" stroke="#ffffff" d="M4277.5 106.07H6401.6"/>
            </g>

            {/* Kotak Biru Muda - Tengah Atas */}
            <g id="kotak_biru_tengah_atas">
              <path transform="matrix(.1,0,0,-.1,0,540)" d="M4276.8 444H6399.5998V686.398H4276.8Z" fill="#8ee2fc" fillRule="evenodd"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="10" strokeLinecap="butt" strokeMiterlimit="8" strokeLinejoin="miter" fill="none" stroke="#000000" d="M4276.8 444H6399.5998V686.398H4276.8Z"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="10" strokeLinecap="butt" strokeMiterlimit="8" strokeLinejoin="miter" fill="none" stroke="#000000" d="M4276.8 124.801H6391.1999V367.199H4276.8Z"/>
            </g>

            {/* Blok Kotak Warna - Baris Bawah dari Tengah Atas */}
            <g id="blok_tengah_atas_warna">
              <path transform="matrix(.1,0,0,-.1,0,540)" d="M4290.8 885.32H4995.499V1149.578H4290.8Z" fill="#b0fee6" fillRule="evenodd"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" d="M4995.5 885.32H5700.199V1149.578H4995.5Z" fill="#ffd9ff" fillRule="evenodd"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" d="M5700.2 885.32H6404.8996V1149.578H5700.2Z" fill="#8ee2fc" fillRule="evenodd"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="10" strokeLinecap="butt" strokeLinejoin="round" fill="none" stroke="#ffffff" d="M4995.5 1154.6V870.32"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="10" strokeLinecap="butt" strokeLinejoin="round" fill="none" stroke="#ffffff" d="M5700.2 1154.6V870.32"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="10" strokeLinecap="butt" strokeLinejoin="round" fill="none" stroke="#ffffff" d="M4290.8 1154.6V870.32"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="10" strokeLinecap="butt" strokeLinejoin="round" fill="none" stroke="#ffffff" d="M6404.9 1154.6V870.32"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="10" strokeLinecap="butt" strokeLinejoin="round" fill="none" stroke="#ffffff" d="M4285.8 1149.6H6409.9"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="round" fill="none" stroke="#ffffff" d="M4285.8 885.32H6409.9"/>
            </g>

            {/* Kotak Biru Muda - Tengah */}
            <g id="kotak_biru_tengah">
              <path transform="matrix(.1,0,0,-.1,0,540)" d="M4280.4 1219.2H6402V1461.6019H4280.4Z" fill="#8ee2fc" fillRule="evenodd"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="10" strokeLinecap="butt" strokeMiterlimit="8" strokeLinejoin="miter" fill="none" stroke="#000000" d="M4280.4 1219.2H6402V1461.6019H4280.4Z"/>
            </g>

            {/* Blok Kotak Warna - Baris Tengah */}
            <g id="blok_tengah_warna">
              <path transform="matrix(.1,0,0,-.1,0,540)" d="M4281.5 2011.7H5341.5V2269.352H4281.5Z" fill="#ffd9ff" fillRule="evenodd"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" d="M5341.5 2011.7H6401.5V2269.352H5341.5Z" fill="#8ee2fc" fillRule="evenodd"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="10" strokeLinecap="butt" strokeLinejoin="round" fill="none" stroke="#ffffff" d="M5341.5 2274.3V1996.7"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="10" strokeLinecap="butt" strokeLinejoin="round" fill="none" stroke="#ffffff" d="M4281.5 2274.3V1996.7"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="10" strokeLinecap="butt" strokeLinejoin="round" fill="none" stroke="#ffffff" d="M6401.5 2274.3V1996.7"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="10" strokeLinecap="butt" strokeLinejoin="round" fill="none" stroke="#ffffff" d="M4276.5 2269.3H6406.5"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="round" fill="none" stroke="#ffffff" d="M4276.5 2011.7H6406.5"/>
            </g>

            {/* Blok Kotak Warna - Baris Bawah dari Tengah */}
            <g id="blok_bawah_tengah_warna">
              <path transform="matrix(.1,0,0,-.1,0,540)" d="M4282.9 2317.6H5342.9V2575.248H4282.9Z" fill="#ffd9ff" fillRule="evenodd"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" d="M5342.9 2317.6H6402.9V2575.248H5342.9Z" fill="#8ee2fc" fillRule="evenodd"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="10" strokeLinecap="butt" strokeLinejoin="round" fill="none" stroke="#ffffff" d="M5342.9 2580.2V2302.6"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="10" strokeLinecap="butt" strokeLinejoin="round" fill="none" stroke="#ffffff" d="M4282.9 2580.2V2302.6"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="10" strokeLinecap="butt" strokeLinejoin="round" fill="none" stroke="#ffffff" d="M6402.8 2580.2V2302.6"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="10" strokeLinecap="butt" strokeLinejoin="round" fill="none" stroke="#ffffff" d="M4277.9 2575.2H6407.8"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="round" fill="none" stroke="#ffffff" d="M4277.9 2317.6H6407.8"/>
            </g>

            {/* Blok Kotak Warna - Baris Paling Bawah */}
            <g id="blok_paling_bawah_warna">
              <path transform="matrix(.1,0,0,-.1,0,540)" d="M4285.2 2900.3H5345.2V3157.948H4285.2Z" fill="#ffd9ff" fillRule="evenodd"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" d="M5345.2 2900.3H6405.2V3157.948H5345.2Z" fill="#8ee2fc" fillRule="evenodd"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="10" strokeLinecap="butt" strokeLinejoin="round" fill="none" stroke="#ffffff" d="M5345.2 3163V2885.3"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="10" strokeLinecap="butt" strokeLinejoin="round" fill="none" stroke="#ffffff" d="M4285.2 3163V2885.3"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="10" strokeLinecap="butt" strokeLinejoin="round" fill="none" stroke="#ffffff" d="M6405.2 3163V2885.3"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="10" strokeLinecap="butt" strokeLinejoin="round" fill="none" stroke="#ffffff" d="M4280.2 3158H6410.2"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="round" fill="none" stroke="#ffffff" d="M4280.2 2900.3H6410.2"/>
            </g>

            {/* Blok Kotak Warna - Baris Bawah 1 dari Bawah */}
            <g id="blok_bawah_1_warna">
              <path transform="matrix(.1,0,0,-.1,0,540)" d="M4288.7 3199.5H4993.3996V3463.762H4288.7Z" fill="#b0fee6" fillRule="evenodd"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" d="M4993.4 3199.5H5698.103V3463.762H4993.4Z" fill="#ffd9ff" fillRule="evenodd"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" d="M5698.1 3199.5H6402.799V3463.762H5698.1Z" fill="#8ee2fc" fillRule="evenodd"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="10" strokeLinecap="butt" strokeLinejoin="round" fill="none" stroke="#ffffff" d="M4993.4 3468.7V3184.5"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="10" strokeLinecap="butt" strokeLinejoin="round" fill="none" stroke="#ffffff" d="M5698.1 3468.7V3184.5"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="10" strokeLinecap="butt" strokeLinejoin="round" fill="none" stroke="#ffffff" d="M4288.7 3468.7V3184.5"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="10" strokeLinecap="butt" strokeLinejoin="round" fill="none" stroke="#ffffff" d="M6402.8 3468.7V3184.5"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="10" strokeLinecap="butt" strokeLinejoin="round" fill="none" stroke="#ffffff" d="M4283.7 3463.7H6407.8"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="round" fill="none" stroke="#ffffff" d="M4283.7 3199.5H6407.8"/>
            </g>

            {/* Blok Kotak Warna - Baris Bawah 2 dari Bawah */}
            <g id="blok_bawah_2_warna">
              <path transform="matrix(.1,0,0,-.1,0,540)" d="M4284 3507.3H4988.699V3771.558H4284Z" fill="#b0fee6" fillRule="evenodd"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" d="M4988.7 3507.3H5693.3996V3771.558H4988.7Z" fill="#ffd9ff" fillRule="evenodd"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" d="M5693.4 3507.3H6398.0988V3771.558H5693.4Z" fill="#8ee2fc" fillRule="evenodd"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="10" strokeLinecap="butt" strokeLinejoin="round" fill="none" stroke="#ffffff" d="M4988.7 3776.5V3492.3"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="10" strokeLinecap="butt" strokeLinejoin="round" fill="none" stroke="#ffffff" d="M5693.4 3776.5V3492.3"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="10" strokeLinecap="butt" strokeLinejoin="round" fill="none" stroke="#ffffff" d="M4284 3776.5V3492.3"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="10" strokeLinecap="butt" strokeLinejoin="round" fill="none" stroke="#ffffff" d="M6398.1 3776.5V3492.3"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="10" strokeLinecap="butt" strokeLinejoin="round" fill="none" stroke="#ffffff" d="M4279 3771.5H6403.1"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="round" fill="none" stroke="#ffffff" d="M4279 3507.3H6403.1"/>
            </g>

            {/* Blok Kotak Warna - Baris Paling Bawah dari Bawah */}
            <g id="blok_bawah_3_warna">
              <path transform="matrix(.1,0,0,-.1,0,540)" d="M4288.2 3806.1H4992.8996V4070.3582H4288.2Z" fill="#b0fee6" fillRule="evenodd"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" d="M4992.9 3806.1H5697.603V4070.3582H4992.9Z" fill="#ffd9ff" fillRule="evenodd"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" d="M5697.6 3806.1H6402.299V4070.3582H5697.6Z" fill="#8ee2fc" fillRule="evenodd"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="10" strokeLinecap="butt" strokeLinejoin="round" fill="none" stroke="#ffffff" d="M4992.9 4075.3V3791.1"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="10" strokeLinecap="butt" strokeLinejoin="round" fill="none" stroke="#ffffff" d="M5697.6 4075.3V3791.1"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="10" strokeLinecap="butt" strokeLinejoin="round" fill="none" stroke="#ffffff" d="M4288.2 4075.3V3791.1"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="10" strokeLinecap="butt" strokeLinejoin="round" fill="none" stroke="#ffffff" d="M6402.3 4075.3V3791.1"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="10" strokeLinecap="butt" strokeLinejoin="round" fill="none" stroke="#ffffff" d="M4283.2 4070.3H6407.3"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="round" fill="none" stroke="#ffffff" d="M4283.2 3806.1H6407.3"/>
            </g>

            {/* Oval Utama (Putih) */}
            <g id="oval_utama">
              <path transform="matrix(.1,0,0,-.1,0,540)" d="M1843.2 4467C1843.2 4564.8 2230.6 4644 2708.4 4644 3186.2 4644 3573.6 4564.8 3573.6 4467 3573.6 4369.2 3186.2 4290 2708.4 4290 2230.6 4290 1843.2 4369.2 1843.2 4467" fill="#ffffff" fillRule="evenodd"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="10" strokeLinecap="butt" strokeMiterlimit="8" strokeLinejoin="miter" fill="none" stroke="#000000" d="M1843.2 4467C1843.2 4564.8 2230.6 4644 2708.4 4644 3186.2 4644 3573.6 4564.8 3573.6 4467 3573.6 4369.2 3186.2 4290 2708.4 4290 2230.6 4290 1843.2 4369.2 1843.2 4467Z"/>
            </g>

            {/* Kotak Kuning Besar */}
            <g id="kotak_kuning_besar">
              <path transform="matrix(.1,0,0,-.1,0,540)" d="M322.801 2377.2H1591.201V3360.001H322.801Z" fill="#f7f7c2" fillRule="evenodd"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="10" strokeLinecap="butt" strokeMiterlimit="8" strokeLinejoin="miter" fill="none" stroke="#000000" d="M322.801 2377.2H1591.201V3360.001H322.801Z"/>
            </g>

            {/* Kotak Kuning Kecil */}
            <g id="kotak_kuning_kecil">
              <path transform="matrix(.1,0,0,-.1,0,540)" d="M2248.8 3577.2H3167.999V3906.001H2248.8Z" fill="#f7f7c2" fillRule="evenodd"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="10" strokeLinecap="butt" strokeMiterlimit="8" strokeLinejoin="miter" fill="none" stroke="#000000" d="M2248.8 3577.2H3167.999V3906.001H2248.8Z"/>
            </g>

            {/* Garis-garis kecil di dalam kotak kuning kecil */}
            <path transform="matrix(.1,0,0,-.1,0,540)" d="M2336.5 3753.7H3080.5V3747.7H2336.5Z" fillRule="evenodd"/>
            <path transform="matrix(.1,0,0,-.1,0,540)" d="M2346.1 3633.7H3070.897V3627.7H2346.1Z" fillRule="evenodd"/>

            {/* Belah Ketupat Putih - Tengah Kanan */}
            <g id="belah_ketupat_putih_tengah_kanan">
              <path transform="matrix(.1,0,0,-.1,0,540)" d="M6838.8 2877 7468.8 3193.2 8098.8 2877 7468.8 2560.8Z" fill="#ffffff" fillRule="evenodd"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="10" strokeLinecap="butt" strokeMiterlimit="8" strokeLinejoin="miter" fill="none" stroke="#000000" d="M6838.8 2877 7468.8 3193.2 8098.8 2877 7468.8 2560.8Z"/>
            </g>

            {/* Kotak Abu-abu (4 buah) */}
            <g id="kotak_abu_atas">
              <path transform="matrix(.1,0,0,-.1,0,540)" d="M8475.6 2718H9235.197V3045.602H8475.6Z" fill="#f2f2f2" fillRule="evenodd"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="10" strokeLinecap="butt" strokeMiterlimit="8" strokeLinejoin="miter" fill="none" stroke="#000000" d="M8475.6 2718H9235.197V3045.602H8475.6Z"/>
            </g>
            <g id="kotak_abu_tengah_atas">
              <path transform="matrix(.1,0,0,-.1,0,540)" d="M8475.6 2046H9235.197V2373.602H8475.6Z" fill="#f2f2f2" fillRule="evenodd"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="10" strokeLinecap="butt" strokeMiterlimit="8" strokeLinejoin="miter" fill="none" stroke="#000000" d="M8475.6 2046H9235.197V2373.602H8475.6Z"/>
            </g>
            <g id="kotak_abu_tengah_bawah">
              <path transform="matrix(.1,0,0,-.1,0,540)" d="M8475.6 1374H9235.197V1702.801H8475.6Z" fill="#f2f2f2" fillRule="evenodd"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="10" strokeLinecap="butt" strokeMiterlimit="8" strokeLinejoin="miter" fill="none" stroke="#000000" d="M8475.6 1374H9235.197V1702.801H8475.6Z"/>
            </g>
            <g id="kotak_abu_bawah">
              <path transform="matrix(.1,0,0,-.1,0,540)" d="M8475.6 703.199H9235.197V1032H8475.6Z" fill="#f2f2f2" fillRule="evenodd"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="10" strokeLinecap="butt" strokeMiterlimit="8" strokeLinejoin="miter" fill="none" stroke="#000000" d="M8475.6 703.199H9235.197V1032H8475.6Z"/>
            </g>

            {/* Garis panah di kotak abu-abu */}
            <path transform="matrix(.1,0,0,-.1,0,540)" d="M8849.8 2424.4H8859.8V2718.002H8849.8ZM8824.8 2434.4 8854.8 2374.4 8884.8 2434.4"/>
            <path transform="matrix(.1,0,0,-.1,0,540)" d="M8849.8 1753.3H8859.8V2045.999H8849.8ZM8824.8 1763.3 8854.8 1703.3 8884.8 1763.3"/>
            <path transform="matrix(.1,0,0,-.1,0,540)" d="M8859.8 1081.3H8849.8V1373.999H8859.8ZM8884.8 1091.3 8854.8 1031.3 8824.8 1091.3"/>

            {/* Belah Ketupat Putih - Atas Kiri */}
            <g id="belah_ketupat_putih_atas_kiri">
              <path transform="matrix(.1,0,0,-.1,0,540)" d="M2014.8 1182.6 2706.6 1480.8 3398.4 1182.6 2706.6 884.398Z" fill="#ffffff" fillRule="evenodd"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="10" strokeLinecap="butt" strokeMiterlimit="8" strokeLinejoin="miter" fill="none" stroke="#000000" d="M2014.8 1182.6 2706.6 1480.8 3398.4 1182.6 2706.6 884.398Z"/>
            </g>

            {/* Belah Ketupat Putih - Bawah Kiri */}
            <g id="belah_ketupat_putih_bawah_kiri">
              <path transform="matrix(.1,0,0,-.1,0,540)" d="M2011.2 2877 2703 3193.2 3394.8 2877 2703 2560.8Z" fill="#ffffff" fillRule="evenodd"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="10" strokeLinecap="butt" strokeMiterlimit="8" strokeLinejoin="miter" fill="none" stroke="#000000" d="M2011.2 2877 2703 3193.2 3394.8 2877 2703 2560.8Z"/>
            </g>

            {/* Garis-garis di dalam kotak-kotak berwarna */}
            <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="10" strokeLinecap="butt" strokeMiterlimit="8" strokeLinejoin="miter" fill="none" stroke="#000000" d="M4282.8 2916H6397.1999V3151.199H4282.8Z"/>
            <path transform="matrix(.1,0,0,-.1,0,540)" d="M4354.5 2985.6H5013.301V2980.7994H4354.5Z" fillRule="evenodd"/>

            {/* Garis-garis di dalam kotak-kotak berwarna (lanjutan) */}
            <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="10" strokeLinecap="butt" strokeMiterlimit="8" strokeLinejoin="miter" fill="none" stroke="#000000" d="M4282.8 3825.6H6397.1999V4060.799H4282.8Z"/>
            <path transform="matrix(.1,0,0,-.1,0,540)" d="M4355.1 3895.1H5300.698V3890.2994H4355.1Z" fillRule="evenodd"/>
            <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="10" strokeLinecap="butt" strokeMiterlimit="8" strokeLinejoin="miter" fill="none" stroke="#000000" d="M4279.2 3524.4H6393.6V3759.603H4279.2Z"/>
            <path transform="matrix(.1,0,0,-.1,0,540)" d="M4351 3594H6005.8V3589.1993H4351Z" fillRule="evenodd"/>
            <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="10" strokeLinecap="butt" strokeMiterlimit="8" strokeLinejoin="miter" fill="none" stroke="#000000" d="M4282.8 3222H6397.1999V3458.398H4282.8Z"/>
            <path transform="matrix(.1,0,0,-.1,0,540)" d="M4355.1 3292.1H5459.1V3287.2994H4355.1Z" fillRule="evenodd"/>
            <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="10" strokeLinecap="butt" strokeMiterlimit="8" strokeLinejoin="miter" fill="none" stroke="#000000" d="M4286.4 2330.4H6400.8V2566.802H4286.4Z"/>
            <path transform="matrix(.1,0,0,-.1,0,540)" d="M4358.8 2400.6H5125.6008V2394.6H4358.8Z" fillRule="evenodd"/>
            <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="10" strokeLinecap="butt" strokeMiterlimit="8" strokeLinejoin="miter" fill="none" stroke="#000000" d="M4285.2 2024.4H6399.6V2260.802H4285.2Z"/>
            <path transform="matrix(.1,0,0,-.1,0,540)" d="M4357.4 2094.7H5718.2V2089.8992H4357.4Z" fillRule="evenodd"/>
            <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="10" strokeLinecap="butt" strokeMiterlimit="8" strokeLinejoin="miter" fill="none" stroke="#000000" d="M4285.2 904.801H6399.6V1140H4285.2Z"/>
            <path transform="matrix(.1,0,0,-.1,0,540)" d="M4357.7 974.309H5730.5V969.51217H4357.7Z" fillRule="evenodd"/>

            {/* Garis Putus-putus */}
            <g id="garis_putus_1">
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="10" strokeLinecap="butt" strokeDasharray="40,30" strokeMiterlimit="8" strokeLinejoin="miter" fill="none" stroke="#172c51" d="M4216.8 1632H6462V4136.4H4216.8Z"/>
            </g>
            <g id="garis_putus_2">
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="10" strokeLinecap="butt" strokeDasharray="40,30" strokeMiterlimit="8" strokeLinejoin="miter" fill="none" stroke="#172c51" d="M4213.2 819.602H6458.4006V1536H4213.2Z"/>
            </g>

            {/* Garis Panah Kecil */}
            <path transform="matrix(.1,0,0,-.1,0,540)" d="M3398.4 1188.2 4164.1 1183.6 4164 1173.6 3398.4 1178.2ZM4154.2 1208.7 4214 1178.3 4153.8 1148.7"/>
            <path transform="matrix(.1,0,0,-.1,0,540)" d="M2701 884.398V559.621H4226.7V569.621H2706L2711 564.621V884.398ZM4216.7 534.621 4276.7 564.621 4216.7 594.621"/>
            <path transform="matrix(.1,0,0,-.1,0,540)" d="M6462 2887.4 6788.8 2886.4 6788.7 2876.4 6462 2877.4ZM6778.9 2911.4 6838.8 2881.2 6778.7 2851.4"/>
            <path transform="matrix(.1,0,0,-.1,0,540)" d="M8098.9 2871.7 8425.6 2875.6 8425.5 2885.6 8098.7 2881.7ZM8415.9 2850.5 8475.6 2881.2 8415.2 2910.5"/>
            <path transform="matrix(.1,0,0,-.1,0,540)" d="M8859.7 703.199V240.66H6441.2V250.66H8854.7L8849.7 245.66V703.199ZM6451.2 215.66 6391.2 245.66 6451.2 275.66"/>
            <path transform="matrix(.1,0,0,-.1,0,540)" d="M2703.4 3956.3H2713.4V4289.999H2703.4ZM2678.4 3966.3 2708.4 3906.3 2738.4 3966.3"/>
            <path transform="matrix(.1,0,0,-.1,0,540)" d="M2702.9 3577.3 2698.1 3243.6 2708.1 3243.4 2712.9 3577.1ZM2673.3 3253.9 2702.4 3193.5 2733.3 3253.1"/>
            <path transform="matrix(.1,0,0,-.1,0,540)" d="M2707.4 2560.8 2710.4 1531H2700.4L2697.4 2560.8ZM2735.4 1541.1 2705.6 1481 2675.4 1540.9"/>
            <path transform="matrix(.1,0,0,-.1,0,540)" d="M1591.3 2864.4 1960.8 2871.6 1960.6 2881.6 1591.1 2874.4ZM1951.3 2846.4 2010.7 2877.6 1950.1 2906.4"/>
            <path transform="matrix(.1,0,0,-.1,0,540)" d="M4277.3 240.078H952.602V2327.2H962.602V245.078L957.602 250.078H4277.3ZM927.602 2317.2 957.602 2377.2 987.602 2317.2"/>
            <path transform="matrix(.1,0,0,-.1,0,540)" d="M7473.7 2560.8V560.309H6449.6V570.309H7468.7L7463.7 565.309V2560.8ZM6459.6 535.309 6399.6 565.309 6459.6 595.309"/>
            <path transform="matrix(.1,0,0,-.1,0,540)" d="M3394.8 2871.6 4166.7 2878.2 4166.6 2888.2 3394.8 2881.6ZM4156.9 2853.1 4216.7 2883.6 4156.4 2913.1"/>
            <path transform="matrix(.1,0,0,-.1,0,540)" d="M5346.2 1219.3 5346.9 1190.6 5336.9 1190.3 5336.2 1219.1ZM5371.6 1201.2 5343.1 1140.5 5311.7 1199.7"/>

            {/* Kotak Abu-abu (Paling Kanan) */}
            <g id="blok_kanan_atas">
              <path transform="matrix(.1,0,0,-.1,0,540)" d="M6013.2 4531.2H9447.6V4693.2H6013.2Z" fill="#f2f2f2" fillRule="evenodd"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="10" strokeLinecap="butt" strokeMiterlimit="8" strokeLinejoin="miter" fill="none" stroke="#000000" d="M6013.2 4531.2H9447.6V4693.2H6013.2Z"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" d="M6013.2 4255.2H9447.6V4537.2H6013.2Z" fill="#ffffff" fillRule="evenodd"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="10" strokeLinecap="butt" strokeMiterlimit="8" strokeLinejoin="miter" fill="none" stroke="#000000" d="M6013.2 4255.2H9447.6V4537.2H6013.2Z"/>
            </g>

            {/* Lingkaran-lingkaran Kecil Berwarna */}
            <g id="lingkaran_kuning">
              <path transform="matrix(.1,0,0,-.1,0,540)" d="M6078 4377C6078 4411.1 6104.6 4438.8 6137.4 4438.8 6170.2 4438.8 6196.8 4411.1 6196.8 4377 6196.8 4342.9 6170.2 4315.2 6137.4 4315.2 6104.6 4315.2 6078 4342.9 6078 4377" fill="#f7f7c2" fillRule="evenodd"/>
            </g>
            <g id="lingkaran_hijau_muda">
              <path transform="matrix(.1,0,0,-.1,0,540)" d="M6764.4 4374C6764.4 4407.8 6791 4435.2 6823.8 4435.2 6856.6 4435.2 6883.2 4407.8 6883.2 4374 6883.2 4340.2 6856.6 4312.8 6823.8 4312.8 6791 4312.8 6764.4 4340.2 6764.4 4374" fill="#b0fee6" fillRule="evenodd"/>
            </g>
            <g id="lingkaran_merah_jambu">
              <path transform="matrix(.1,0,0,-.1,0,540)" d="M7470 4372.2C7470 4406.3 7496.6 4434 7529.4 4434 7562.2 4434 7588.8 4406.3 7588.8 4372.2 7588.8 4338.1 7562.2 4310.4 7529.4 4310.4 7496.6 4310.4 7470 4338.1 7470 4372.2" fill="#ffd9ff" fillRule="evenodd"/>
            </g>
            <g id="lingkaran_biru_muda">
              <path transform="matrix(.1,0,0,-.1,0,540)" d="M8002.8 4369.8C8002.8 4403.9 8029.4 4431.6 8062.2 4431.6 8095 4431.6 8121.6 4403.9 8121.6 4369.8 8121.6 4335.7 8095 4308 8062.2 4308 8029.4 4308 8002.8 4335.7 8002.8 4369.8" fill="#8ee2fc" fillRule="evenodd"/>
            </g>
            <g id="lingkaran_abu">
              <path transform="matrix(.1,0,0,-.1,0,540)" d="M9010.8 4377C9010.8 4411.1 9037.4 4438.8 9070.2 4438.8 9103 4438.8 9129.6 4411.1 9129.6 4377 9129.6 4342.9 9103 4315.2 9070.2 4315.2 9037.4 4315.2 9010.8 4342.9 9010.8 4377" fill="#f2f2f2" fillRule="evenodd"/>
            </g>


            {/* Lingkaran dengan stroke hitam */}
            <g id="lingkaran_hitam_stroke">
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="2.5" strokeLinecap="butt" strokeMiterlimit="8" strokeLinejoin="miter" fill="none" stroke="#000000" d="M9235.2 5173.2C9235.2 5252.7 9297.3 5317.2 9373.8 5317.2 9450.3 5317.2 9512.4 5252.7 9512.4 5173.2 9512.4 5093.7 9450.3 5029.2 9373.8 5029.2 9297.3 5029.2 9235.2 5093.7 9235.2 5173.2Z"/>
            </g>
            <g clipPath="url(#clip_0)">
            </g>

            {/* Kotak dengan stroke hitam (2 buah) */}
            <g id="kotak_hitam_stroke_1">
              <path transform="matrix(.1,0,0,-.1,0,540)" strokeWidth="10" strokeLinecap="butt" strokeMiterlimit="8" strokeLinejoin="miter" fill="none" stroke="#000000" d="M4282.8 2625.6H6397.1999V2861.998H4282.8Z"/>
            </g>
            <g id="kotak_hitam_stroke_2">
              <path transform="matrix(.1,0,0,-.1,0,540)" d="M4354.5 2691.1H4714.5V2695.897H4354.5Z" fillRule="evenodd"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" d="M4714.5 2691.1H4742.1018V2695.897H4714.5Z" fillRule="evenodd"/>
              <path transform="matrix(.1,0,0,-.1,0,540)" d="M4742.1 2695.9H5511.299V2691.103H4742.1Z" fillRule="evenodd"/>
            </g>

          </g>
        </svg>
      </div>
    </div>
  );
}

export default App;
