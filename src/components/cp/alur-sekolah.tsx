import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useHistory } from '@docusaurus/router'; // Menggunakan useHistory untuk Docusaurus v2/v3

const App = () => {
    const history = useHistory();
    const svgRef = useRef(null); // Referensi ke elemen SVG
    const containerRef = useRef(null); // Referensi ke div container SVG

    // State untuk transformasi viewBox SVG
    const [scale, setScale] = useState(1);
    const [translateX, setTranslateX] = useState(0);
    const [translateY, setTranslateY] = useState(0);

    // State untuk fungsionalitas geser (pan)
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [startTranslateX, setStartTranslateX] = useState(0);
    const [startTranslateY, setStartTranslateY] = useState(0);

    // State untuk pinch-to-zoom
    const [initialPinchDistance, setInitialPinchDistance] = useState(0);
    const [initialPinchScale, setInitialPinchScale] = useState(1);

    // State untuk tombol reset
    const [showResetButton, setShowResetButton] = useState(false);

    // Konstanta untuk ukuran viewBox asli dari alur anak sekolah.svg
    const originalViewBoxWidth = 540;
    const originalViewBoxHeight = 960;
    const panSensitivity = 10; // Sensitivitas geser tinggi

    // Fungsi untuk memperbarui viewBox SVG
    const updateViewBox = useCallback(() => {
        const currentViewBoxWidth = originalViewBoxWidth / scale;
        const currentViewBoxHeight = originalViewBoxHeight / scale;
        const currentViewBoxX = -translateX;
        const currentViewBoxY = -translateY;

        if (svgRef.current) {
            svgRef.current.setAttribute(
                'viewBox',
                `${currentViewBoxX} ${currentViewBoxY} ${currentViewBoxWidth} ${currentViewBoxHeight}`
            );
        }

        // Tampilkan tombol reset jika tidak pada skala atau posisi default
        setShowResetButton(scale !== 1 || translateX !== 0 || translateY !== 0);
    }, [scale, translateX, translateY]);

    useEffect(() => {
        updateViewBox();
    }, [updateViewBox]);

    // --- Pan (Geser) Logic ---
    const handleMouseDown = (e) => {
        if (scale === 1) return; // Nonaktifkan geser pada skala awal
        setIsDragging(true);
        setStartX(e.clientX);
        setStartY(e.clientY);
        setStartTranslateX(translateX);
        setStartTranslateY(translateY);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const deltaX = (e.clientX - startX) * panSensitivity / scale;
        const deltaY = (e.clientY - startY) * panSensitivity / scale;
        setTranslateX(startTranslateX - deltaX);
        setTranslateY(startTranslateY - deltaY);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // --- Touch Pan & Pinch-to-Zoom Logic ---
    const lastTapTime = useRef(0);
    const lastTapTarget = useRef(null);

    const handleTouchStart = (e) => {
        if (e.touches.length === 1) {
            // Single touch for pan and double-tap
            setIsDragging(true);
            setStartX(e.touches[0].clientX);
            setStartY(e.touches[0].clientY);
            setStartTranslateX(translateX);
            setStartTranslateY(translateY);

            // Double-tap logic
            const currentTime = new Date().getTime();
            const tapLength = currentTime - lastTapTime.current;
            if (tapLength < 300 && tapLength > 0 && lastTapTarget.current === e.target) {
                // Double tap detected
                handleDoubleClick(e); // Trigger zoom to element
                lastTapTime.current = 0; // Reset to prevent triple tap
            } else {
                lastTapTime.current = currentTime;
                lastTapTarget.current = e.target;
            }
        } else if (e.touches.length === 2) {
            // Two touches for pinch-to-zoom
            setIsDragging(false); // Disable single-touch pan
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            const distance = Math.sqrt(
                Math.pow(touch2.clientX - touch1.clientX, 2) +
                Math.pow(touch2.clientY - touch1.clientY, 2)
            );
            setInitialPinchDistance(distance);
            setInitialPinchScale(scale);

            // Calculate pinch midpoint in SVG coordinates
            // const rect = svgRef.current.getBoundingClientRect();
            // const svgX = (e.touches[0].clientX + e.touches[1].clientX) / 2 - rect.left;
            // const svgY = (e.touches[0].clientY + e.touches[1].clientY) / 2 - rect.top;

            // Convert screen coordinates to SVG viewBox coordinates
            // const viewBoxX = -translateX;
            // const viewBoxY = -translateY;
            // const viewBoxWidth = originalViewBoxWidth / scale;
            // const viewBoxHeight = originalViewBoxHeight / scale;
        }
    };

    const handleTouchMove = (e) => {
        if (e.touches.length === 1 && isDragging && scale !== 1) {
            // Single touch pan
            const deltaX = (e.touches[0].clientX - startX) * panSensitivity / scale;
            const deltaY = (e.touches[0].clientY - startY) * panSensitivity / scale;
            setTranslateX(startTranslateX - deltaX);
            setTranslateY(startTranslateY - deltaY);
        } else if (e.touches.length === 2 && initialPinchDistance > 0) {
            // Pinch-to-zoom
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            const currentDistance = Math.sqrt(
                Math.pow(touch2.clientX - touch1.clientX, 2) +
                Math.pow(touch2.clientY - touch1.clientY, 2)
            );

            const newScale = initialPinchScale * (currentDistance / initialPinchDistance);
            
            // Limit zoom level
            const clampedNewScale = Math.max(1, Math.min(newScale, 5)); // Zoom min 1x, max 5x

            // Adjust pan to zoom around midpoint
            const rect = svgRef.current.getBoundingClientRect();
            const currentPinchMidpointScreenX = (touch1.clientX + touch2.clientX) / 2 - rect.left;
            const currentPinchMidpointScreenY = (touch1.clientY + touch2.clientY) / 2 - rect.top;

            const oldViewBoxX = -translateX; // Use current translateX for old viewBox
            const oldViewBoxY = -translateY; // Use current translateY for old viewBox
            const oldViewBoxWidth = originalViewBoxWidth / scale; // Use current scale
            const oldViewBoxHeight = originalViewBoxHeight / scale; // Use current scale

            const oldSvgCoordX = oldViewBoxX + (currentPinchMidpointScreenX / rect.width) * oldViewBoxWidth;
            const oldSvgCoordY = oldViewBoxY + (currentPinchMidpointScreenY / rect.height) * oldViewBoxHeight;

            const newViewBoxWidth = originalViewBoxWidth / clampedNewScale;
            const newViewBoxHeight = originalViewBoxHeight / clampedNewScale;

            const newTranslateX = -(oldSvgCoordX - (currentPinchMidpointScreenX / rect.width) * newViewBoxWidth);
            const newTranslateY = -(oldSvgCoordY - (currentPinchMidpointScreenY / rect.height) * newViewBoxHeight);
            
            setScale(clampedNewScale);
            setTranslateX(newTranslateX);
            setTranslateY(newTranslateY);
        }
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
        setInitialPinchDistance(0); // Reset pinch state
    };

    // --- Zoom to Element Logic (Double-Click / Double-Tap) ---
    const handleDoubleClick = (e) => {
        // Mencegah navigasi Docusaurus jika ada event click/double-click pada elemen SVG
        e.preventDefault();
        e.stopPropagation();

        // Target elemen <g> yang merepresentasikan kotak proses atau oval, bukan garis/panah
        const targetElement = e.target.closest('g[id]:not(#arrows-and-lines):not(#dashed-area-skrining)');

        if (targetElement && svgRef.current) {
            const svgRect = svgRef.current.getBoundingClientRect();
            const elementRect = targetElement.getBoundingClientRect();

            // Hitung posisi elemen dalam koordinat SVG
            // Perlu mengonversi koordinat layar ke koordinat viewBox SVG
            const currentViewBoxX = -translateX;
            const currentViewBoxY = -translateY;
            const currentViewBoxWidth = originalViewBoxWidth / scale;
            const currentViewBoxHeight = originalViewBoxHeight / scale;

            const elementSvgX = currentViewBoxX + (elementRect.left - svgRect.left) / svgRect.width * currentViewBoxWidth;
            const elementSvgY = currentViewBoxY + (elementRect.top - svgRect.top) / svgRect.height * currentViewBoxHeight;
            const elementSvgWidth = elementRect.width / svgRect.width * currentViewBoxWidth;
            const elementSvgHeight = elementRect.height / svgRect.height * currentViewBoxHeight;

            // Hitung skala baru (misalnya, 2x dari skala saat ini, atau skala yang membuat elemen mengisi 80% viewport)
            const zoomFactor = 2; // Perbesar 2 kali dari ukuran saat ini
            const newScale = Math.min(5, scale * zoomFactor); // Batasi zoom maksimum 5x

            // Hitung posisi tengah elemen
            const centerX = elementSvgX + elementSvgWidth / 2;
            const centerY = elementSvgY + elementSvgHeight / 2;

            // Hitung translasi baru untuk memusatkan elemen
            // Perlu memperhitungkan skala baru
            const newTranslateX = -(centerX - (originalViewBoxWidth / 2) / newScale);
            const newTranslateY = -(centerY - (originalViewBoxHeight / 2) / newScale);

            setScale(newScale);
            setTranslateX(newTranslateX);
            setTranslateY(newTranslateY);
        }
    };

    // --- Reset View Button ---
    const resetView = () => {
        setScale(1);
        setTranslateX(0);
        setTranslateY(0);
    };

    // Fungsi untuk navigasi ke halaman Cek Kesehatan Mandiri
    const goToCekKesehatanPage = (e) => {
        // Hanya navigasi jika bukan bagian dari double-tap/double-click
        const currentTime = new Date().getTime();
        if (currentTime - lastTapTime.current < 300) {
             return;
        }

        e.preventDefault();
        e.stopPropagation();

        // Ganti '/docs/cek-kesehatan-mandiri-anak-sekolah' dengan path URL yang Anda inginkan di Docusaurus
        history.push('/docs/cek-kesehatan-mandiri-anak-sekolah');
    };

    // Generic click handler for other nodes
    const handleNodeClick = (e) => {
        // Prevent double-click from triggering single click logic
        const currentTime = new Date().getTime();
        if (currentTime - lastTapTime.current < 300) {
            return;
        }

        e.preventDefault();
        e.stopPropagation();
        const nodeId = e.currentTarget.id;
        console.log(`Node clicked: ${nodeId}`);
        // Example: You can add specific navigation logic here based on nodeId
        // if (nodeId === 'skrining_hiv') {
        //     history.push('/docs/skrining-hiv-info');
        // }
    };

    return (
        <div style={{
            fontFamily: 'Arial, sans-serif',
            display: 'flex',
            flexDirection: 'column', // Mengatur tata letak kolom untuk tombol
            justifyContent: 'center',
            alignItems: 'center',
            // minHeight: '100vh',
            backgroundColor: '#f0f0f0',
            margin: 0,
            // padding: '20px',
            boxSizing: 'border-box',
            width: '100%',
        }}>
            {showResetButton && (
                <button
                    onClick={resetView}
                    style={{
                        padding: '10px 20px',
                        fontSize: '0.9rem',
                        backgroundColor: '#00796b',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
                        transition: 'background-color 0.3s ease',
                        marginBottom: '10px', // Jarak antara tombol dan SVG
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#004d40'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#00796b'}
                >
                    Reset Tampilan
                </button>
            )}
            <div
                ref={containerRef}
                style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    backgroundColor: 'white',
                    overflow: 'hidden',
                    paddingBottom: '177.77%', // Rasio aspek 960/540
                    position: 'relative',
                    touchAction: 'none', // Mencegah default browser pan/zoom
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp} // Hentikan geser jika mouse keluar area
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <svg
                    ref={svgRef}
                    width="100%"
                    height="100%"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    overflow="hidden"
                    viewBox={`0 0 ${originalViewBoxWidth} ${originalViewBoxHeight}`} // ViewBox awal
                    style={{
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                    }}
                >
                    {/* Background rectangle */}
                    <rect x="0" y="0" width="540" height="960" fill="#FFFFFF"/>

                    {/* Start/End Oval: Anak Usia Sekolah dan Remaja */}
                    <g id="anak_usia_sekolah_remaja" onDoubleClick={handleDoubleClick}>
                        <ellipse cx="359.5" cy="71" rx="76" ry="21.5" stroke="#000" strokeWidth=".7" strokeMiterlimit="8" fill="#FFF" fillRule="evenodd"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(306 73)">Anak Usia Sekolah dan Remaja</text>
                    </g>

                    {/* Process: Kunjungan rumah oleh Kader Posyandu */}
                    <g id="kunjungan_kader_posyandu" onDoubleClick={handleDoubleClick}>
                        <rect x="73.5" y="206.5" width="149" height="101" stroke="#000" strokeWidth=".7" strokeMiterlimit="8" fill="#F7F7C2"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(98.1 235)">Kunjungan rumah oleh Kader</text>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(130.6 245)">Posyandu</text>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(82.6 255)">• Edukasi</text>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(82.6 264)">• Pemantauan kepatuhan</text>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(92 274)">pengobatan</text>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(82.6 283)">• Sweeping</text>
                    </g>

                    {/* Input Data: Cek Kesehatan Secara Mandiri (Clickable) */}
                    <g id="cek_kesehatan_mandiri" className='clickable-icon' onClick={goToCekKesehatanPage} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <rect x="306.5" y="132.5" width="106" height="33" stroke="#000" strokeWidth=".7" strokeMiterlimit="8" fill="#F7F7C2"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(315.1 146)">Cek Kesehatan secara</text>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(315.1 156)">mandiri</text>
                    </g>

                    {/* Process: Tatalaksana sesuai Alur Klinis */}
                    <g id="tatalaksana_alur_klinis" onDoubleClick={handleDoubleClick}>
                        <rect x="280.5" y="904.5" width="194" height="37" stroke="#000" strokeWidth=".7" strokeMiterlimit="8" fill="#8EE2FC"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(290 920)">Tata laksana sesuai Alur Klinis</text>
                    </g>

                    {/* Decision Diamond: Dapat ditangani di FKTP */}
                    <g id="dapat_ditangani_fktp" onDoubleClick={handleDoubleClick}>
                        <polygon points="84.5,561 150,601.5 215.5,561 150,520.5" stroke="#000" strokeWidth=".7" strokeMiterlimit="8" fill="#FFF" fillRule="evenodd"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(122.3 558)">Dapat ditangani</text>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(137.2 568)">di FKTP</text>
                    </g>

                    {/* Process: Rujuk ke FKTL */}
                    <g id="rujuk_fktl" onDoubleClick={handleDoubleClick}>
                        <rect x="84" y="657" width="130" height="25" fill="#F2F2F2" fillRule="evenodd"/>
                        <rect x="86.5" y="658.5" width="129" height="25" stroke="#000" strokeWidth=".6" strokeMiterlimit="8" fill="none"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(125.3 672)">Rujuk ke FKTL</text>
                    </g>

                    {/* Process: Tatalaksana di FKTL */}
                    <g id="tatalaksana_fktl" onDoubleClick={handleDoubleClick}>
                        <rect x="84" y="708" width="130" height="27" fill="#F2F2F2" fillRule="evenodd"/>
                        <rect x="86.5" y="709.5" width="129" height="26" stroke="#000" strokeWidth=".6" strokeMiterlimit="8" fill="none"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(93.8 724)">Tatalaksana di FKTL</text>
                    </g>

                    {/* Process: Kondisi Stabil */}
                    <g id="kondisi_stabil" onDoubleClick={handleDoubleClick}>
                        <rect x="84" y="761" width="130" height="26" fill="#F2F2F2" fillRule="evenodd"/>
                        <rect x="86.5" y="762.5" width="129" height="26" stroke="#000" strokeWidth=".6" strokeMiterlimit="8" fill="none"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(93.8 776)">Kondisi Stabil</text>
                    </g>

                    {/* Process: Rujuk Balik ke FKTP */}
                    <g id="rujuk_balik_fktp" onDoubleClick={handleDoubleClick}>
                        <rect x="84" y="813" width="130" height="25" fill="#F2F2F2" fillRule="evenodd"/>
                        <rect x="86.5" y="814.5" width="129" height="25" stroke="#000" strokeWidth=".6" strokeMiterlimit="8" fill="none"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(93.8 828)">Rujuk Balik ke FKTP</text>
                    </g>

                    {/* Decision Diamond: Terdapat Keluhan Kesehatan */}
                    <g id="keluhan_kesehatan" onDoubleClick={handleDoubleClick}>
                        <polygon points="292.5,258.5 359.5,292.5 426.5,258.5 359.5,224.5" stroke="#000" strokeWidth=".7" strokeMiterlimit="8" fill="#FFF" fillRule="evenodd"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(309.6 260)">Terdapat Keluhan Kesehatan</text>
                    </g>

                    {/* Output Display: Pemantauan Hasil Pengobatan */}
                    <g id="pemantauan_hasil_pengobatan" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <rect x="51" y="422" width="64" height="32" fill="#B0FEE6"/>
                        <rect x="115" y="422" width="63" height="32" fill="#FFD9FF"/>
                        <rect x="178" y="422" width="65" height="32" fill="#8EE2FC"/>
                        <rect x="52.5" y="421.5" width="192" height="31" stroke="#000" strokeWidth=".6" strokeMiterlimit="8" fill="none"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(61.2 439)">Pemantauan Hasil Pengobatan</text>
                    </g>
                    <path stroke="#FFF" strokeWidth=".6" strokeLinejoin="round" strokeMiterlimit="10" fill="none" d="M116.5 457.5h2v-34h-2zm63 0h2v-34h-2z"/>

                    {/* Dashed Area: Skrining */}
                    <g id="dashed-area-skrining">
                        <rect x="262.5" y="397.5" width="193" height="325" stroke="#172C51" strokeWidth=".6" strokeMiterlimit="8" strokeDasharray="2.25008 1.68756" fill="none"/>
                    </g>

                    {/* Process: Pemantauan Status Gizi (clickable) */}
                    <g id="pemantauan_status_gizi" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <rect x="269" y="403" width="59" height="21" fill="#B0FEE6"/>
                        <rect x="328" y="403" width="57" height="21" fill="#FFD9FF"/>
                        <rect x="385" y="403" width="59" height="21" fill="#8EE2FC"/>
                        <rect x="270.5" y="402.5" width="175" height="21" stroke="#000" strokeWidth=".6" strokeMiterlimit="8" fill="none"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(279.4 415)">Pemantauan Status Gizi *</text>
                    </g>

                    {/* Process: Skrining HIV (clickable) */}
                    <g id="skrining_hiv" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <rect x="272" y="528" width="89" height="20" fill="#FFD9FF"/>
                        <rect x="361" y="528" width="87" height="20" fill="#8EE2FC"/>
                        <rect x="273.5" y="529.5" width="175" height="18" stroke="#000" strokeWidth=".6" strokeMiterlimit="8" fill="none"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(282.7 540)">Skrining HIV</text>
                    </g>

                    {/* Process: Skrining Kesehatan Jiwa (clickable) */}
                    <g id="skrining_kesehatan_jiwa" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <rect x="274" y="550" width="87" height="20" fill="#FFD9FF"/>
                        <rect x="361" y="550" width="88" height="20" fill="#8EE2FC"/>
                        <rect x="275.5" y="551.5" width="175" height="18" stroke="#000" strokeWidth=".6" strokeMiterlimit="8" fill="none"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(284.2 562)">Skrining Kesehatan Jiwa *</text>
                    </g>

                    {/* Process: Skrining Talasemia (clickable) */}
                    <g id="skrining_talasemia" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <rect x="272" y="574" width="89" height="21" fill="#FFD9FF"/>
                        <rect x="361" y="575" width="87" height="21" fill="#8EE2FC"/>
                        <rect x="273.5" y="576.5" width="175" height="18" stroke="#000" strokeWidth=".6" strokeMiterlimit="8" fill="none"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(282.7 587)">Skrining Talasemia</text>
                    </g>

                    {/* Process: Skrining Kesehatan Indra (clickable) */}
                    <g id="skrining_kesehatan_indra" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <rect x="272" y="643" width="89" height="21" fill="#FFD9FF"/>
                        <rect x="361" y="643" width="87" height="21" fill="#8EE2FC"/>
                        <rect x="273.5" y="645.5" width="175" height="18" stroke="#000" strokeWidth=".6" strokeMiterlimit="8" fill="none"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(282.7 656)">Skrining Kesehatan Indra *</text>
                    </g>

                    {/* Process: Skrining Kebugaran (clickable) */}
                    <g id="skrining_kebugaran" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <rect x="272.5" y="670.5" width="176" height="20" stroke="#000" strokeWidth=".7" strokeMiterlimit="8" fill="#8EE2FC"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(282 682)">Skrining Kebugaran *</text>
                    </g>

                    {/* Process: Skrining Tuberkulosis (clickable) */}
                    <g id="skrining_tuberkulosis" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <rect x="272" y="596" width="89" height="21" fill="#FFD9FF"/>
                        <rect x="361" y="597" width="87" height="21" fill="#8EE2FC"/>
                        <rect x="273.5" y="598.5" width="175" height="18" stroke="#000" strokeWidth=".6" strokeMiterlimit="8" fill="none"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(282.5 609)">Skrining Tuberkulosis</text>
                    </g>

                    {/* Process: Skrining Anemia (clickable) */}
                    <g id="skrining_anemia" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <rect x="272" y="618" width="88" height="21" fill="#FFD9FF"/>
                        <rect x="360" y="619" width="87" height="21" fill="#8EE2FC"/>
                        <rect x="273.5" y="620.5" width="175" height="18" stroke="#000" strokeWidth=".6" strokeMiterlimit="8" fill="none"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(282.3 631)">Skrining Anemia *</text>
                    </g>

                    {/* Process: Skrining Faktor Risiko PTM (clickable) */}
                    <g id="skrining_faktor_risiko_ptm" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <rect x="270" y="427" width="59" height="21" fill="#B0FEE6"/>
                        <rect x="329" y="427" width="57" height="21" fill="#FFD9FF"/>
                        <rect x="386" y="427" width="59" height="21" fill="#8EE2FC"/>
                        <rect x="270.5" y="426.5" width="176" height="21" stroke="#000" strokeWidth=".6" strokeMiterlimit="8" fill="none"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(280 439)">Skrining Faktor Risiko PTM *</text>
                    </g>

                    {/* Process: Skrining Gigi dan Mulut (clickable) */}
                    <g id="skrining_gigi_mulut" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <rect x="270" y="452" width="59" height="20" fill="#B0FEE6"/>
                        <rect x="329" y="452" width="57" height="20" fill="#FFD9FF"/>
                        <rect x="386" y="452" width="59" height="20" fill="#8EE2FC"/>
                        <rect x="270.5" y="452.5" width="176" height="21" stroke="#000" strokeWidth=".6" strokeMiterlimit="8" fill="none"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(280 464)">Skrining Gigi dan Mulut *</text>
                    </g>

                    {/* Process: Skrining Malaria (Endemis) (clickable) */}
                    <g id="skrining_malaria" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <rect x="270" y="476" width="59" height="20" fill="#B0FEE6"/>
                        <rect x="329" y="476" width="58" height="20" fill="#FFD9FF"/>
                        <rect x="387" y="476" width="58" height="20" fill="#8EE2FC"/>
                        <rect x="271.5" y="476.5" width="175" height="21" stroke="#000" strokeWidth=".6" strokeMiterlimit="8" fill="none"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(280.4 488)">Skrining Malaria (Endemis)</text>
                    </g>

                    {/* Process: Skrining Risiko Merokok (clickable) */}
                    <g id="skrining_risiko_merokok" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <rect x="271" y="501" width="59" height="21" fill="#B0FEE6"/>
                        <rect x="330" y="501" width="57" height="21" fill="#FFD9FF"/>
                        <rect x="387" y="501" width="59" height="21" fill="#8EE2FC"/>
                        <rect x="272.5" y="500.5" width="175" height="21" stroke="#000" strokeWidth=".6" strokeMiterlimit="8" fill="none"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(281.3 513)">Skrining Faktor Risiko / Perilaku Merokok *</text>
                    </g>

                    {/* Process: Imunisasi Rutin Usia Sekolah (clickable) */}
                    <g id="imunisasi_rutin_usia_sekolah" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <rect x="273.5" y="696.5" width="175" height="20" stroke="#000" strokeWidth=".7" strokeMiterlimit="8" fill="#8EE2FC"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(282.1 708)">Imunisasi Rutin Usia Sekolah *</text>
                    </g>

                    {/* Panah dan Garis */}
                    <g id="arrows-and-lines">
                        <path fillRule="evenodd" d="M147.4 703h2.2v-23h-2.2zm-5.4-.7 6.5 4.7 6.5-4.7"/>
                        <path fillRule="evenodd" d="M147.4 757.2h2.2V735h-2.2Zm-5.4-.8 6.5 4.6 6.5-4.6"/>
                        <path fillRule="evenodd" d="M149.6 809.2h-2.2V787h2.2Zm5.4-.8-6.5 4.6-6.5-4.6"/>
                        <path d="m359.4 92.5-.3 32.9h1l.3-32.9Zm-3.8 31.5 3.9 8 4-8Z"/>
                        <path d="m222.5 257 63.3.9v1l-63.3-.9Zm62-2.7 8 4.2-8 3.8Z"/>
                        <path d="m360 165.5.3 52.3h-1l-.3-52.3Zm3.8 50.9-4 8-4-8Z"/>
                        <path d="m359.2 292.5-.2 98.3h1l.2-98.3Zm-3.7 97 4 8 4-8Z"/>
                        <path d="M426.5 258h84.1v665.7h-29.2v-1h28.7l-.5.5V258.5l.5.5h-83.6Zm56.3 669.2-8-4 8-4Z"/>
                        <path d="m262.6 559-40.5 1.4v1l40.5-1.4Zm-39.2-2.1-7.9 4.2 8.1 3.7Z"/>
                        <path d="m151 601.5.7 50.2h-1l-.7-50.2Zm4.2 48.8-4 8-4-7.9Z"/>
                        <path d="M151 839.5v84.2h123.8v-1H151.5l.5.5v-83.7Zm122.4 87.7 8-4-8-4Z"/>
                        <path d="M84.5 562H32l.5-.5v361.6l-.5-.5h242v1H31.5V561h53Zm188.3 357.1 8 4-8 4Z"/>
                        <path d="m150 520.5-1.8-61.3h1l1.9 61.3Zm-5.3-59.9 3.8-8.1 4.2 7.9Z"/>
                        <path d="M149 420.5V314.2h-1v106.3Zm3.6-105-4-8-4 8Z"/>
                    </g>
                    {/* Text labels for "Tidak" and "Ya" */}
                    <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(364 319)">Tidak</text>
                    <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(157.3 621)">Tidak</text>
                    <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(450 250)">Ya</text>
                    <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(56 555)">Ya</text>
                </svg>
            </div>
        </div>
    );
};

export default App;
