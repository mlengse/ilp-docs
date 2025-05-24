import React from 'react';
import { useHistory } from '@docusaurus/router'; // Mengimpor useHistory untuk navigasi

const App = () => {
    const history = useHistory(); // Mendapatkan objek history dari React Router Docusaurus

    // Fungsi untuk navigasi ke halaman Cek Kesehatan Mandiri
    const goToCekKesehatanPage = () => {
        // Ganti '/docs/cek-kesehatan-mandiri' dengan path URL yang Anda inginkan di Docusaurus
        // Pastikan path ini sesuai dengan rute halaman yang Anda buat di Docusaurus
        history.push('/docs/cek-kesehatan-mandiri');
    };

    return (
        <div style={{
            fontFamily: 'Arial, sans-serif',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            // minHeight: '100vh',
            backgroundColor: '#f0f0f0',
            margin: 0,
            // padding: '20px',
            boxSizing: 'border-box',
            width: '100%',
        }}>
            <div style={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                backgroundColor: 'white',
                overflow: 'hidden',
                paddingBottom: '177.77%', // Rasio aspek 960/540
                position: 'relative',
            }}>
                <svg
                    width="100%"
                    height="auto"
                    xmlns="http://www.w3.org/2000/svg"
                    overflow="hidden"
                    viewBox="0 0 540 960"
                    style={{
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                    }}
                >
                    {/* Decision Diamond: Terdapat Tanda Persalinan */}
                    <g id="decision-persalinan">
                        <polygon points="56.5 486.5, 125.5 456.5, 194.5 486.5, 125.5 516.5" stroke="#000" strokeLinejoin="round" strokeMiterlimit="10" fill="none"/>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontWeight="400" fontSize="10" transform="translate(104.5 478)">Terdapat</text>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontWeight="400" fontSize="10" transform="translate(104.5 490)">Tanda</text>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontWeight="400" fontSize="10" transform="translate(103.9 502)">Persalinan</text>
                    </g>

                    {/* Decision Diamond: Terdapat Keluhan Kesehatan */}
                    <g id="decision-keluhan-kesehatan">
                        <polygon points="74.5 257, 125.5 225.5, 176.5 257, 125.5 288.5" stroke="#000" strokeLinejoin="round" strokeMiterlimit="10" fill="none"/>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontWeight="400" fontSize="10" transform="translate(106.7 246)">Terdapat</text>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontWeight="400" fontSize="10" transform="translate(106.2 258)">Keluhan</text>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontWeight="400" fontSize="10" transform="translate(106.3 270)">Kesehatan</text>
                    </g>

                    {/* Output Display: Pemantauan Hasil Pengobatan */}
                    <g id="output-pemantauan-pengobatan">
                        <rect x="158.5" y="929.5" width="214" height="25" stroke="#000" strokeMiterlimit="8" fill="none"/>
                        <rect x="159" y="930" width="71" height="24" fill="#B0FEE6"/>
                        <rect x="230" y="930" width="70" height="24" fill="#FFD9FF"/>
                        <rect x="300" y="930" width="71" height="24" fill="#8EE2FC"/>
                        <line x1="230.5" y1="929.5" x2="230.5" y2="954.5" stroke="#FFF" strokeLinejoin="round" strokeMiterlimit="10" fill="none"/>
                        <line x1="300.5" y1="929.5" x2="300.5" y2="954.5" stroke="#FFF" strokeLinejoin="round" strokeMiterlimit="10" fill="none"/>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontWeight="400" fontSize="10" transform="translate(172 944)">Pemantauan Hasil Pengobatan</text>
                    </g>

                    {/* Decision Diamond: Dapat Ditangani Di FKTP */}
                    <g id="decision-dapat-ditangani-fktp">
                        <polygon points="283.5,628.5 346.5,596.5 409.5,628.5 346.5,660.5" stroke="#000" strokeMiterlimit="8" fill="#FFF"/>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontWeight="400" fontSize="10" transform="translate(332.5 619)">Dapat</text>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontWeight="400" fontSize="10" transform="translate(324.7 631)">Ditangani</text>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontWeight="400" fontSize="10" transform="translate(327 643)">Di FKTP</text>
                    </g>

                    {/* Process: Tatalaksana sesuai standar */}
                    <g id="process-tatalaksana-standar">
                        <rect x="168.5" y="882.5" width="212" height="24" stroke="#000" strokeMiterlimit="8" fill="#8EE2FC"/>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontWeight="400" fontSize="10" transform="translate(179.9 898)">Tatalaksana sesuai standar</text>
                    </g>

                    {/* Output Display: Pelayanan Pasca Persalinan */}
                    <g id="output-pelayanan-pasca-persalinan">
                        <rect x="256.5" y="514.5" width="211" height="23" stroke="#000" strokeMiterlimit="8" fill="none"/>
                        <rect x="256" y="513" width="71" height="26" fill="#B0FEE6"/>
                        <rect x="327" y="513" width="70" height="26" fill="#FFD9FF"/>
                        <rect x="397" y="513" width="71" height="26" fill="#8EE2FC"/>
                        <line x1="327.5" y1="512.5" x2="327.5" y2="541.5" stroke="#FFF" strokeLinejoin="round" strokeMiterlimit="10" fill="none"/>
                        <line x1="397.5" y1="512.5" x2="397.5" y2="541.5" stroke="#FFF" strokeLinejoin="round" strokeMiterlimit="10" fill="none"/>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontWeight="400" fontSize="10" transform="translate(267.4 530)">Pelayanan Pasca Persalinan</text>
                    </g>

                    {/* Process: Persalinan Normal */}
                    <g id="process-persalinan-normal">
                        <rect x="255.5" y="482.5" width="212" height="24" stroke="#000" strokeMiterlimit="8" fill="#8EE2FC"/>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontWeight="400" fontSize="10" transform="translate(267.4 498)">Persalinan Normal</text>
                    </g>

                    {/* Dashed Area: Persalinan */}
                    <g id="dashed-area-persalinan">
                        <rect x="249.5" y="475.5" width="224" height="71" stroke="#172C51" strokeMiterlimit="8" strokeDasharray="3.99034 2.99276" fill="none"/>
                    </g>

                    {/* Process: Kunjungan rumah oleh kader Posyandu */}
                    <g id="process-kunjungan-rumah">
                        <rect x="29.5" y="59.5" width="126" height="98" stroke="#000" strokeMiterlimit="8" fill="#F7F7C2"/>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontWeight="400" fontSize="10" transform="translate(36.4 75)">Kunjungan rumah</text>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontWeight="400" fontSize="10" transform="translate(36.4 87)">oleh</text>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontWeight="400" fontSize="10" transform="translate(57.9 87)">kader</text>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontWeight="400" fontSize="10" transform="translate(85.5 87)">Posyandu</text>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontWeight="400" fontSize="10" transform="translate(36.4 99)">-</text>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontWeight="400" fontSize="10" transform="translate(42.5 99)">Edukasi</text>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontWeight="400" fontSize="10" transform="translate(36.4 111)">-</text>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontWeight="400" fontSize="10" transform="translate(42.5 111)">Pemantauan</text>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontWeight="400" fontSize="10" transform="translate(101.7 111)">Kepatuhan</text>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontWeight="400" fontSize="10" transform="translate(42.4 123)">Pengobatan</text>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontWeight="400" fontSize="10" transform="translate(36.4 135)">-</text>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontWeight="400" fontSize="10" transform="translate(42.5 135)">Sweeping</text>
                    </g>

                    {/* Input Data: Cek Kesehatan Secara Mandiri (Clickable untuk Docusaurus) */}
                    <g id="input-cek-kesehatan-mandiri" onClick={goToCekKesehatanPage} className='clickable-icon'>
                        <rect x="230.5" y="113.5" width="92" height="33" stroke="#000" strokeMiterlimit="8" fill="#F7F7C2"/>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontWeight="400" fontSize="10" transform="translate(235.2 130)">Cek Kesehatan</text>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontWeight="400" fontSize="10" transform="translate(235.2 140)">Secara</text>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontWeight="400" fontSize="10" transform="translate(269.5 140)">Mandiri</text>
                    </g>

                    {/* Start/End Oval: Ibu Hamil, Bersalin dan Nifas */}
                    <g id="start-end-ibu-hamil">
                        <ellipse cx="244" cy="22" rx="86.5" ry="17.5" stroke="#000" strokeLinejoin="round" strokeMiterlimit="10" fill="none"/>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontWeight="400" fontSize="10" transform="translate(201.5 17)">Ibu Hamil,</text>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontWeight="400" fontSize="10" transform="translate(249.2 17)">Bersalin</text>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontWeight="400" fontSize="10" transform="translate(227.3 28)">dan</text>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontWeight="400" fontSize="10" transform="translate(246.7 28)">Nifas</text>
                    </g>

                    {/* Dashed Area: Skrining */}
                    <g id="dashed-area-skrining">
                        <rect x="250.5" y="199.5" width="224" height="251" stroke="#172C51" strokeMiterlimit="8" strokeDasharray="3.99034 2.99276" fill="none"/>
                    </g>

                    {/* Process: Skrining Pre-eklampsia */}
                    <g id="process-skrining-preeklampsia">
                        <rect x="257.5" y="417.5" width="212" height="25" stroke="#000" strokeMiterlimit="8" fill="#8EE2FC"/>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontWeight="400" fontSize="10" transform="translate(268.5 433)">Skrining Pre</text>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontWeight="400" fontSize="10" transform="translate(322.7 433)">-</text>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontWeight="400" fontSize="10" transform="translate(326 433)">eklampsia</text>
                    </g>

                    {/* Process: Skrining Tuberkulosis */}
                    <g id="process-skrining-tuberkulosis">
                        <rect x="257.5" y="206.5" width="211" height="26" stroke="#000" strokeMiterlimit="8" fill="none"/>
                        <rect x="257" y="206" width="71" height="26" fill="#B0FEE6"/>
                        <rect x="328" y="206" width="70" height="26" fill="#FFD9FF"/>
                        <rect x="398" y="206" width="70" height="26" fill="#8EE2FC"/>
                        <line x1="328.5" y1="205.5" x2="328.5" y2="234.5" stroke="#FFF" strokeLinejoin="round" strokeMiterlimit="10" fill="none"/>
                        <line x1="398.5" y1="205.5" x2="398.5" y2="234.5" stroke="#FFF" strokeLinejoin="round" strokeMiterlimit="10" fill="none"/>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontWeight="400" fontSize="10" transform="translate(268.5 223)">Skrining Tuberkulosis</text>
                    </g>

                    {/* Process: Skrining Malaria (Daerah Endemis) */}
                    <g id="process-skrining-malaria">
                        <rect x="257.5" y="237.5" width="211" height="24" stroke="#000" strokeMiterlimit="8" fill="none"/>
                        <rect x="257" y="236" width="70" height="26" fill="#B0FEE6"/>
                        <rect x="327" y="236" width="71" height="26" fill="#FFD9FF"/>
                        <rect x="398" y="236" width="70" height="26" fill="#8EE2FC"/>
                        <line x1="327.5" y1="235.5" x2="327.5" y2="264.5" stroke="#FFF" strokeLinejoin="round" strokeMiterlimit="10" fill="none"/>
                        <line x1="398.5" y1="235.5" x2="398.5" y2="264.5" stroke="#FFF" strokeLinejoin="round" strokeMiterlimit="10" fill="none"/>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontWeight="400" fontSize="10" transform="translate(268.5 252)">Skrining Malaria (Daerah Endemis)</text>
                    </g>

                    {/* Process: Skrining Gigi dan Mulut */}
                    <g id="process-skrining-gigi-mulut">
                        <rect x="257.5" y="267.5" width="211" height="24" stroke="#000" strokeMiterlimit="8" fill="none"/>
                        <rect x="257" y="267" width="71" height="26" fill="#B0FEE6"/>
                        <rect x="328" y="267" width="70" height="26" fill="#FFD9FF"/>
                        <rect x="398" y="267" width="71" height="26" fill="#8EE2FC"/>
                        <line x1="328.5" y1="266.5" x2="328.5" y2="294.5" stroke="#FFF" strokeLinejoin="round" strokeMiterlimit="10" fill="none"/>
                        <line x1="398.5" y1="266.5" x2="398.5" y2="294.5" stroke="#FFF" strokeLinejoin="round" strokeMiterlimit="10" fill="none"/>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontWeight="400" fontSize="10" transform="translate(268.5 283)">Skrining Gigi dan Mulut</text>
                    </g>

                    {/* Process: Skrining HIV, Sifilis, Hepatitis B */}
                    <g id="process-skrining-hiv-sifilis-hepatitis">
                        <rect x="257.5" y="387.5" width="211" height="23" stroke="#000" strokeMiterlimit="8" fill="none"/>
                        <rect x="257" y="386" width="106" height="26" fill="#FFD9FF"/>
                        <rect x="363" y="386" width="105" height="26" fill="#8EE2FC"/>
                        <line x1="363.5" y1="385.5" x2="363.5" y2="413.5" stroke="#FFF" strokeLinejoin="round" strokeMiterlimit="10" fill="none"/>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontWeight="400" fontSize="10" transform="translate(268.5 402)">Skrining HIV, Sifilis, Hepatitis B</text>
                    </g>

                    {/* Process: ANC Terpadu */}
                    <g id="process-anc-terpadu">
                        <rect x="257.5" y="298.5" width="211" height="26" stroke="#000" strokeMiterlimit="8" fill="none"/>
                        <rect x="257" y="297" width="106" height="26" fill="#FFD9FF"/>
                        <rect x="363" y="297" width="106" height="26" fill="#8EE2FC"/>
                        <line x1="363.5" y1="297.5" x2="363.5" y2="324.5" stroke="#FFF" strokeLinejoin="round" strokeMiterlimit="10" fill="none"/>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontWeight="400" fontSize="10" transform="translate(268.5 314)">ANC Terpadu</text>
                    </g>

                    {/* Process: Skrining Kesehatan Jiwa */}
                    <g id="process-skrining-kesehatan-jiwa">
                        <rect x="257.5" y="327.5" width="211" height="23" stroke="#000" strokeMiterlimit="8" fill="none"/>
                        <rect x="257" y="326" width="105" height="26" fill="#FFD9FF"/>
                        <rect x="362" y="326" width="106" height="26" fill="#8EE2FC"/>
                        <line x1="362.5" y1="325.5" x2="362.5" y2="353.5" stroke="#FFF" strokeLinejoin="round" strokeMiterlimit="10" fill="none"/>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontWeight="400" fontSize="10" transform="translate(268.5 342)">Skrining Kesehatan Jiwa</text>
                    </g>

                    {/* Process: Skrining Anemia */}
                    <g id="process-skrining-anemia">
                        <rect x="257.5" y="356.5" width="211" height="24" stroke="#000" strokeMiterlimit="8" fill="none"/>
                        <rect x="257" y="355" width="106" height="26" fill="#FFD9FF"/>
                        <rect x="363" y="355" width="106" height="26" fill="#8EE2FC"/>
                        <line x1="363.5" y1="355.5" x2="363.5" y2="383.5" stroke="#FFF" strokeLinejoin="round" strokeMiterlimit="10" fill="none"/>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontWeight="400" fontSize="10" transform="translate(268.5 372)">Skrining Anemia</text>
                    </g>

                    {/* Side Process: Rujuk ke FKTL */}
                    <g id="side-process-rujuk-fktl">
                        <rect x="404.5" y="678.5" width="76" height="32" stroke="#000" strokeMiterlimit="8" fill="#F2F2F2"/>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontWeight="400" fontSize="10" transform="translate(408.6 699)">Rujuk</text>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontWeight="400" fontSize="10" transform="translate(436.8 699)">ke</text>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontWeight="400" fontSize="10" transform="translate(450 699)">FKTL</text>
                    </g>

                    {/* Side Process: Tatalaksana Di FKTL */}
                    <g id="side-process-tatalaksana-fktl">
                        <rect x="404.5" y="745.5" width="76" height="32" stroke="#000" strokeMiterlimit="8" fill="#F2F2F2"/>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontWeight="400" fontSize="10" transform="translate(408.6 761)">Tatalaksana</text>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontWeight="400" fontSize="10" transform="translate(408.6 773)">Di FKTL</text>
                    </g>

                    {/* Side Process: Kondisi Stabil */}
                    <g id="side-process-kondisi-stabil">
                        <rect x="404.5" y="812.5" width="76" height="33" stroke="#000" strokeMiterlimit="8" fill="#F2F2F2"/>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontWeight="400" fontSize="10" transform="translate(408.6 833)">Kondisi Stabil</text>
                    </g>

                    {/* Side Process: Rujuk Balik Ke FKTP */}
                    <g id="side-process-rujuk-balik-fktp">
                        <rect x="404.5" y="879.5" width="76" height="33" stroke="#000" strokeMiterlimit="8" fill="#F2F2F2"/>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontWeight="400" fontSize="10" transform="translate(408.6 893)">Rujuk Balik</text>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontWeight="400" fontSize="10" transform="translate(408.6 905)">Ke FKTP</text>
                    </g>

                    {/* Complex Lines and Arrows - converted where possible, otherwise kept as path */}
                    <g id="complex-lines-arrows">
                        {/* Line from Ibu Hamil oval to Cek Kesehatan Mandiri */}
                        <path d="M243 39.5v38.4h26.4l-.5-.5v31.3h1V76.9h-26.4l.5.5V39.5Zm22.4 67.8 4 8 4-8Z" stroke="#000" fill="none"/>
                        {/* Line from Cek Kesehatan Mandiri to Terdapat Keluhan Kesehatan */}
                        <path d="M269.8 146.5v40.2H125.5l.5-.5v33h-1v-33.5h144.3l-.5.5v-39.7Zm-140.3 71.4-4 8-4-8Zm47 39.1h37.6v68.4l-.5-.5h30.5v1h-31v-68.4l.5.5h-37.1Zm66.3 64.4 8 4-8 4Z" stroke="#000" fill="none"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="13" transform="translate(189.4 251)">Tidak</text>

                        {/* Line from Terdapat Keluhan Kesehatan to dashed area */}
                        <path d="M126.4 288.5v84.7h-.9l.5-.5v77.5h-1v-78h1l-.6.5v-84.2Zm3.1 160.3-4 8-4-8Z" stroke="#000" fill="none"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="16" transform="translate(134.6 386)">Ya</text>

                        {/* Line from Dapat Ditangani Di FKTP to Rujuk ke FKTL (vertical part) */}
                        <path d="M475.2 325h24l-.5-.5V628l.5-.5h-83v1h83.5V324h-24.5Zm-57.7 299-8 4 8 4ZM346 660.5v9.5h96.8l-.5-.5v2.4h1V669h-96.8l.5.5v-9Zm92.8 10 4 8 4-8Z" stroke="#000" fill="none"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="13" transform="translate(387.6 662)">Tidak</text>

                        {/* Line from Persalinan Normal to Pelayanan Pasca Persalinan */}
                        <path d="M194.5 486h28v24.5l-.4-.5H243v1h-21.4v-24.5l.5.5h-27.6Zm47.1 20.5 8 4-8 4Zm-116.6 10v378.4h37.2v-1h-36.7l.5.5V516.5Zm35.9 381.9 8-4-8-4ZM283 628h-42v248.6h1V628.5l-.5.5H283Zm-45.5 247.3 4 8 4-8Z" stroke="#000" fill="none"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="16" transform="translate(204.9 478)">Ya</text>

                        <path
                           d="m 92.0001,157.5 v 34.6176 h 33.5532 l -0.5,-0.5 v 27.4509 h 1 V 191.1176 H 92.5001 l 0.5,0.5 V 157.5 Z m 29.5532,60.2352 4,8 4,-8 z"
                           stroke="#000"
                           id="path40" />

                        {/* Line from Tatalaksana sesuai standar to Pemantauan Hasil Pengobatan */}
                        <path d="M443 710.5v27.7h-1v-27.7Zm3.5 26.4-4 8-4-8Zm-3.5 40.6V806h-1v-28.5Zm3.5 27.2-4 8-4-8Zm-3.5 42.8v26.8h-1v-26.8Zm3.5 25.5-4 8-4-8Zm-3.9 39h-2.5v28l.5-.4h-56.4v1H441v-28.1l-.5.5h2Zm-57.1 24-8 4 8 4Zm-144.3-30.5-.1 18.4h1l.1-18.4Zm-3.6 17 3.9 8 4-8Z" stroke="#000" fill="none"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="13" transform="translate(128 650)">Tidak</text>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="16" transform="translate(246 794)">Ya</text>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="16" transform="translate(454.4 623)">Hasi</text>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="16" transform="translate(485.9 623)">l</text>

                    </g>
                    {/* Long vertical line on the left */}
                    <path d="M163.1 941.4H3V108h17.8v1H3.5l.5-.5v832.4l-.5-.5h159.6ZM19.5 104.5l8 4-8 4Z" stroke="#000" fill="none"/>
                </svg>
            </div>
        </div>
    );
};

export default App;
