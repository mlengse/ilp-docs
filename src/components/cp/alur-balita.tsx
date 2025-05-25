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

    // Konstanta untuk ukuran viewBox asli dari alur balita.svg
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
            const rect = svgRef.current.getBoundingClientRect();
            const svgX = (e.touches[0].clientX + e.touches[1].clientX) / 2 - rect.left;
            const svgY = (e.touches[0].clientY + e.touches[1].clientY) / 2 - rect.top;

            // Convert screen coordinates to SVG viewBox coordinates
            const viewBoxX = -translateX;
            const viewBoxY = -translateY;
            const viewBoxWidth = originalViewBoxWidth / scale;
            const viewBoxHeight = originalViewBoxHeight / scale;
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

    // Fungsi untuk navigasi ke halaman Cek Kesehatan Mandiri (jika ada di alur balita)
    const goToCekKesehatanPage = (e) => {
        // Hanya navigasi jika bukan bagian dari double-tap/double-click
        const currentTime = new Date().getTime();
        if (currentTime - lastTapTime.current < 300) {
             return;
        }

        e.preventDefault();
        e.stopPropagation();

        // Ganti '/docs/cek-kesehatan-mandiri-balita' dengan path URL yang Anda inginkan di Docusaurus
        // Sesuaikan jika ada halaman spesifik untuk alur balita
        history.push('/docs/cek-kesehatan-mandiri-balita');
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
        // if (nodeId === 'process-skrining-preeklampsia') {
        //     history.push('/docs/skrining-preeklampsia-info');
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

                    {/* Start/End Oval: Bayi dan Anak Pra Sekolah */}
                    <g id="start-end-bayi-anak" onDoubleClick={handleDoubleClick}>
                        <path d="M283.5 71.0001C283.5 82.8746 317.526 92.5001 359.5 92.5001 401.474 92.5001 435.5 82.8746 435.5 71.0001 435.5 59.1255 401.474 49.5001 359.5 49.5001 317.526 49.5001 283.5 59.1255 283.5 71.0001Z" stroke="#000000" strokeWidth="0.666667" strokeMiterlimit="8" fill="#FFFFFF" fillRule="evenodd"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(359.5 73)" textAnchor="middle">Bayi dan Anak Pra Sekolah</text>
                    </g>

                    {/* Process: Kunjungan rumah oleh Kader Posyandu */}
                    <g id="process-kunjungan-rumah" onDoubleClick={handleDoubleClick}>
                        <rect x="0" y="0" width="149" height="101" stroke="#000000" strokeWidth="0.666667" strokeMiterlimit="8" fill="#F7F7C2" transform="matrix(-1 1.22465e-16 1.22465e-16 1 222.5 206.5)"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(150 235)" textAnchor="middle">Kunjungan rumah oleh Kader</text>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(150 245)" textAnchor="middle">Posyandu</text>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(150 255)" textAnchor="middle">• Edukasi</text>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(150 264)" textAnchor="middle">• Pemantauan kepatuhan</text>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(150 274)" textAnchor="middle">pengobatan</text>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(150 283)" textAnchor="middle">• Sweeping</text>
                    </g>

                    {/* Input Data: Cek Kesehatan Secara Mandiri (Clickable) */}
                    <g id="input-cek-kesehatan-mandiri" className='clickable-icon' onClick={goToCekKesehatanPage} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <rect x="0" y="0" width="106" height="33" stroke="#000000" strokeWidth="0.666667" strokeMiterlimit="8" fill="#F7F7C2" transform="matrix(-1 1.22465e-16 1.22465e-16 1 412.5 132.5)"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(359.5 146)" textAnchor="middle">Cek Kesehatan Secara</text>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(359.5 156)" textAnchor="middle">mandiri</text>
                    </g>

                    {/* Process: Tatalaksana sesuai Alur Klinis dengan Pendekatan MTBS */}
                    <g id="process-tatalaksana-alur-klinis" onDoubleClick={handleDoubleClick}>
                        <rect x="0" y="0" width="194" height="37" stroke="#000000" strokeWidth="0.666667" strokeMiterlimit="8" fill="#8EE2FC" transform="matrix(-1 1.22465e-16 1.22465e-16 1 474.5 904.5)"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(384.5 920)" textAnchor="middle">Tatalaksana sesuai Alur Klinis</text>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(384.5 930)" textAnchor="middle">dengan Pendekatan MTBS *</text>
                    </g>

                    {/* Decision Diamond: Dapat ditangani di FKTP */}
                    <g id="decision-dapat-ditangani-fktp" onDoubleClick={handleDoubleClick}>
                        <path d="M84.5001 561 150 601.5 215.5 561 150 520.5Z" stroke="#000000" strokeWidth="0.666667" strokeMiterlimit="8" fill="#FFFFFF" fillRule="evenodd"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(150 558)" textAnchor="middle">Dapat ditangani</text>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(150 568)" textAnchor="middle">di FKTP</text>
                    </g>

                    {/* Process: Rujuk ke FKTL */}
                    <g id="process-rujuk-fktl" onDoubleClick={handleDoubleClick}>
                        <rect x="84" y="657" width="130" height="25" fill="#F2F2F2" fillRule="evenodd"/>
                        <rect x="84" y="657" width="130" height="25" stroke="#000000" strokeWidth="0.666667" strokeMiterlimit="8" fill="none"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(149 672)" textAnchor="middle">Rujuk ke FKTL</text>
                    </g>

                    {/* Process: Tatalaksana di FKTL */}
                    <g id="process-tatalaksana-fktl" onDoubleClick={handleDoubleClick}>
                        <rect x="84" y="708" width="130" height="27" fill="#F2F2F2" fillRule="evenodd"/>
                        <rect x="84" y="708" width="130" height="27" stroke="#000000" strokeWidth="0.666667" strokeMiterlimit="8" fill="none"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(149 724)" textAnchor="middle">Tatalaksana di FKTL</text>
                    </g>

                    {/* Process: Kondisi Stabil */}
                    <g id="process-kondisi-stabil" onDoubleClick={handleDoubleClick}>
                        <rect x="84" y="761" width="130" height="26" fill="#F2F2F2" fillRule="evenodd"/>
                        <rect x="84" y="761" width="130" height="26" stroke="#000000" strokeWidth="0.666667" strokeMiterlimit="8" fill="none"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(149 776)" textAnchor="middle">Kondisi Stabil</text>
                    </g>

                    {/* Process: Rujuk Balik ke FKTP */}
                    <g id="process-rujuk-balik-fktp" onDoubleClick={handleDoubleClick}>
                        <rect x="84" y="813" width="130" height="25" fill="#F2F2F2" fillRule="evenodd"/>
                        <rect x="84" y="813" width="130" height="25" stroke="#000000" strokeWidth="0.666667" strokeMiterlimit="8" fill="none"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(149 828)" textAnchor="middle">Rujuk Balik ke FKTP</text>
                    </g>

                    {/* Decision Diamond: Terdapat Keluhan Kesehatan (kanan) */}
                    <g id="decision-keluhan-kesehatan-kanan" onDoubleClick={handleDoubleClick}>
                        <path d="M292.5 258.5 359.5 292.5 426.5 258.5 359.5 224.5Z" stroke="#000000" strokeWidth="0.666667" strokeMiterlimit="8" fill="#FFFFFF" fillRule="evenodd"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(359.5 260)" textAnchor="middle">Terdapat Keluhan Kesehatan</text>
                    </g>

                    {/* Dashed Area: Skrining */}
                    <g id="dashed-area-skrining">
                        <rect x="0" y="0" width="193" height="410" stroke="#172C51" strokeWidth="0.56252" strokeMiterlimit="8" strokeDasharray="2.25008 1.68756" fill="none" transform="matrix(1 0 0 -1 262.5 766.5)"/>
                    </g>

                    {/* Process: Pemantauan Pertumbuhan */}
                    <g id="process-pemantauan-pertumbuhan" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <rect x="0" y="0" width="59" height="21" fill="#B0FEE6" transform="matrix(1 0 0 -1 269 383)"/>
                        <rect x="0" y="0" width="57" height="21" fill="#FFD9FF" transform="matrix(1 0 0 -1 328 383)"/>
                        <rect x="0" y="0" width="59" height="21" fill="#8EE2FC" transform="matrix(1 0 0 -1 385 383)"/>
                        <line x1="329.5" y1="385.5" x2="329.5" y2="363.5" stroke="#FFFFFF" strokeWidth="0.56252" strokeLinejoin="round" strokeMiterlimit="10" fill="none"/>
                        <line x1="386.5" y1="385.5" x2="386.5" y2="363.5" stroke="#FFFFFF" strokeWidth="0.56252" strokeLinejoin="round" strokeMiterlimit="10" fill="none"/>
                        <rect x="270.5" y="361.5" width="175" height="21" stroke="#000000" strokeWidth="0.56252" strokeMiterlimit="8" fill="none"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(358 374)" textAnchor="middle">Pemantauan Pertumbuhan</text>
                    </g>

                    {/* Process: Skrining HIV */}
                    <g id="process-skrining-hiv" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <rect x="0" y="0" width="88" height="20" fill="#FFD9FF" transform="matrix(1 0 0 -1 269 530)"/>
                        <rect x="0" y="0" width="87" height="20" fill="#8EE2FC" transform="matrix(1 0 0 -1 357 530)"/>
                        <line x1="358.5" y1="532.5" x2="358.5" y2="511.5" stroke="#FFFFFF" strokeWidth="0.56252" strokeLinejoin="round" strokeMiterlimit="10" fill="none"/>
                        <rect x="270.5" y="511.5" width="175" height="18" stroke="#000000" strokeWidth="0.56252" strokeMiterlimit="8" fill="none"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(358 522)" textAnchor="middle">Skrining HIV</text>
                    </g>

                    {/* Process: Skrining Hepatitis B */}
                    <g id="process-skrining-hepatitis-b" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <rect x="0" y="0" width="86" height="20" fill="#FFD9FF" transform="matrix(1 0 0 -1 271 552)"/>
                        <rect x="0" y="0" width="89" height="20" fill="#8EE2FC" transform="matrix(1 0 0 -1 357 552)"/>
                        <line x1="358.5" y1="554.5" x2="358.5" y2="533.5" stroke="#FFFFFF" strokeWidth="0.56252" strokeLinejoin="round" strokeMiterlimit="10" fill="none"/>
                        <line x1="271.5" y1="554.5" x2="271.5" y2="533.5" stroke="#FFFFFF" strokeWidth="0.56252" strokeLinejoin="round" strokeMiterlimit="10" fill="none"/>
                        <line x1="447.5" y1="554.5" x2="447.5" y2="533.5" stroke="#FFFFFF" strokeWidth="0.56252" strokeLinejoin="round" strokeMiterlimit="10" fill="none"/>
                        <rect x="0" y="0" width="177" height="1" stroke="#FFFFFF" strokeWidth="0.56252" strokeLinejoin="round" strokeMiterlimit="10" fill="none" transform="matrix(1 0 0 -1 270.5 534.5)"/>
                        <rect x="0" y="0" width="177" height="1" stroke="#FFFFFF" strokeWidth="1.68745" strokeLinejoin="round" strokeMiterlimit="10" fill="none" transform="matrix(1 0 0 -1 269 553)"/>
                        <rect x="271.5" y="533.5" width="176" height="18" stroke="#000000" strokeWidth="0.56252" strokeMiterlimit="8" fill="none"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(359.5 544)" textAnchor="middle">Skrining Hepatitis B</text>
                    </g>

                    {/* Process: Skrining Talasemia */}
                    <g id="process-skrining-talasemia" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <rect x="0" y="0" width="88" height="21" fill="#FFD9FF" transform="matrix(1 0 0 -1 269 577)"/>
                        <rect x="0" y="0" width="87" height="21" fill="#8EE2FC" transform="matrix(1 0 0 -1 357 578)"/>
                        <line x1="358.5" y1="579.5" x2="358.5" y2="558.5" stroke="#FFFFFF" strokeWidth="0.56252" strokeLinejoin="round" strokeMiterlimit="10" fill="none"/>
                        <rect x="270.5" y="558.5" width="175" height="18" stroke="#000000" strokeWidth="0.56252" strokeMiterlimit="8" fill="none"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(358 569)" textAnchor="middle">Skrining Talasemia</text>
                    </g>

                    {/* Process: Skrining Penyimpangan Perilaku dan Emosi */}
                    <g id="process-skrining-perilaku-emosi" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <rect x="0" y="0" width="88" height="20" fill="#FFD9FF" transform="matrix(1 0 0 -1 269 646)"/>
                        <rect x="0" y="0" width="87" height="20" fill="#8EE2FC" transform="matrix(1 0 0 -1 357 646)"/>
                        <line x1="358.5" y1="647.5" x2="358.5" y2="627.5" stroke="#FFFFFF" strokeWidth="0.56252" strokeLinejoin="round" strokeMiterlimit="10" fill="none"/>
                        <rect x="270.5" y="627.5" width="175" height="18" stroke="#000000" strokeWidth="0.56252" strokeMiterlimit="8" fill="none"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="5" transform="translate(358 637)" textAnchor="middle">Skrining Penyimpangan Perilaku dan Emosi</text>
                    </g>

                    {/* Process: Tes Daya Dengar */}
                    <g id="process-tes-daya-dengar" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <rect x="0" y="0" width="88" height="21" fill="#FFD9FF" transform="matrix(1 0 0 -1 269 668)"/>
                        <rect x="0" y="0" width="87" height="21" fill="#8EE2FC" transform="matrix(1 0 0 -1 357 668)"/>
                        <line x1="358.5" y1="668.5" x2="358.5" y2="649.5" stroke="#FFFFFF" strokeWidth="0.56252" strokeLinejoin="round" strokeMiterlimit="10" fill="none"/>
                        <rect x="270.5" y="649.5" width="175" height="18" stroke="#000000" strokeWidth="0.56252" strokeMiterlimit="8" fill="none"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(358 660)" textAnchor="middle">Tes Daya Dengar</text>
                    </g>

                    {/* Process: Tes Daya Lihat */}
                    <g id="process-tes-daya-lihat" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <rect x="0" y="0" width="86" height="19" fill="#FFD9FF" transform="matrix(1 0 0 -1 271 690)"/>
                        <rect x="0" y="0" width="89" height="19" fill="#8EE2FC" transform="matrix(1 0 0 -1 357 690)"/>
                        <line x1="358.5" y1="692.5" x2="358.5" y2="671.5" stroke="#FFFFFF" strokeWidth="0.56252" strokeLinejoin="round" strokeMiterlimit="10" fill="none"/>
                        <rect x="270.5" y="671.5" width="175" height="18" stroke="#000000" strokeWidth="0.56252" strokeMiterlimit="8" fill="none"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(358 682)" textAnchor="middle">Tes Daya Lihat</text>
                    </g>

                    {/* Process: Skrining Penyakit Jantung Bawaan */}
                    <g id="process-skrining-jantung-bawaan" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <rect x="271" y="695" width="175" height="20" fill="#8EE2FC"/>
                        <rect x="0" y="0" width="176" height="19" stroke="#000000" strokeWidth="0.56252" strokeMiterlimit="8" fill="none" transform="matrix(1 0 0 -1 271.5 715.5)"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="7" transform="translate(359.5 707)" textAnchor="middle">Skrining Penyakit Jantung Bawaan</text>
                    </g>

                    {/* Process: Skrining Gigi dan Mulut */}
                    <g id="process-skrining-gigi-mulut" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <rect x="0" y="0" width="175" height="19" fill="#8EE2FC" transform="matrix(1 0 0 -1 271 737)"/>
                        <rect x="271.5" y="718.5" width="176" height="20" stroke="#000000" strokeWidth="0.56252" strokeMiterlimit="8" fill="none"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(359.5 730)" textAnchor="middle">Skrining Gigi dan Mulut</text>
                    </g>

                    {/* Process: Skrining Hipotiroid Kongenital */}
                    <g id="process-skrining-hipotiroid" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <rect x="272.5" y="741.5" width="175" height="20" stroke="#000000" strokeWidth="0.666667" strokeMiterlimit="8" fill="#8EE2FC"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="7" transform="translate(360 753)" textAnchor="middle">Skrining Hipotiroid Kongenital</text>
                    </g>

                    {/* Process: Skrining Autisme */}
                    <g id="process-skrining-autisme" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <rect x="0" y="0" width="88" height="21" fill="#FFD9FF" transform="matrix(1 0 0 -1 269 599)"/>
                        <rect x="0" y="0" width="87" height="21" fill="#8EE2FC" transform="matrix(1 0 0 -1 357 600)"/>
                        <line x1="358.5" y1="601.5" x2="358.5" y2="580.5" stroke="#FFFFFF" strokeWidth="0.56252" strokeLinejoin="round" strokeMiterlimit="10" fill="none"/>
                        <rect x="270.5" y="580.5" width="175" height="18" stroke="#000000" strokeWidth="0.56252" strokeMiterlimit="8" fill="none"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(358 591)" textAnchor="middle">Skrining Autisme</text>
                    </g>

                    {/* Process: Skrining GPPH */}
                    <g id="process-skrining-gpph" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <rect x="0" y="0" width="88" height="21" fill="#FFD9FF" transform="matrix(1 0 0 -1 269 621)"/>
                        <rect x="0" y="0" width="87" height="21" fill="#8EE2FC" transform="matrix(1 0 0 -1 357 622)"/>
                        <line x1="358.5" y1="623.5" x2="358.5" y2="602.5" stroke="#FFFFFF" strokeWidth="0.56252" strokeLinejoin="round" strokeMiterlimit="10" fill="none"/>
                        <rect x="269.5" y="602.5" width="176" height="18" stroke="#000000" strokeWidth="0.56252" strokeMiterlimit="8" fill="none"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(357.5 613)" textAnchor="middle">Skrining GPPH</text>
                    </g>

                    {/* Process: Pemantauan Perkembangan */}
                    <g id="process-pemantauan-perkembangan" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <rect x="0" y="0" width="59" height="21" fill="#B0FEE6" transform="matrix(1 0 0 -1 270 407)"/>
                        <rect x="0" y="0" width="57" height="21" fill="#FFD9FF" transform="matrix(1 0 0 -1 329 407)"/>
                        <rect x="0" y="0" width="59" height="21" fill="#8EE2FC" transform="matrix(1 0 0 -1 386 407)"/>
                        <line x1="329.5" y1="409.5" x2="329.5" y2="388.5" stroke="#FFFFFF" strokeWidth="0.56252" strokeLinejoin="round" strokeMiterlimit="10" fill="none"/>
                        <line x1="387.5" y1="409.5" x2="387.5" y2="388.5" stroke="#FFFFFF" strokeWidth="0.56252" strokeLinejoin="round" strokeMiterlimit="10" fill="none"/>
                        <rect x="270.5" y="385.5" width="176" height="21" stroke="#000000" strokeWidth="0.56252" strokeMiterlimit="8" fill="none"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(358.5 398)" textAnchor="middle">Pemantauan Perkembangan</text>
                    </g>

                    {/* Process: Skrining Tuberkulosis */}
                    <g id="process-skrining-tuberkulosis" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <rect x="0" y="0" width="59" height="21" fill="#B0FEE6" transform="matrix(1 0 0 -1 270 433)"/>
                        <rect x="0" y="0" width="57" height="21" fill="#FFD9FF" transform="matrix(1 0 0 -1 329 433)"/>
                        <rect x="0" y="0" width="59" height="21" fill="#8EE2FC" transform="matrix(1 0 0 -1 386 433)"/>
                        <line x1="329.5" y1="435.5" x2="329.5" y2="414.5" stroke="#FFFFFF" strokeWidth="0.56252" strokeLinejoin="round" strokeMiterlimit="10" fill="none"/>
                        <line x1="387.5" y1="435.5" x2="387.5" y2="414.5" stroke="#FFFFFF" strokeWidth="0.56252" strokeLinejoin="round" strokeMiterlimit="10" fill="none"/>
                        <rect x="270.5" y="411.5" width="176" height="21" stroke="#000000" strokeWidth="0.56252" strokeMiterlimit="8" fill="none"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(358.5 424)" textAnchor="middle">Skrining Tuberkulosis</text>
                    </g>

                    {/* Process: Skrining Malaria (Endemis) */}
                    <g id="process-skrining-malaria" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <rect x="0" y="0" width="59" height="21" fill="#B0FEE6" transform="matrix(1 0 0 -1 270 457)"/>
                        <rect x="0" y="0" width="58" height="21" fill="#FFD9FF" transform="matrix(1 0 0 -1 329 457)"/>
                        <rect x="0" y="0" width="58" height="21" fill="#8EE2FC" transform="matrix(1 0 0 -1 387 457)"/>
                        <line x1="330.5" y1="459.5" x2="330.5" y2="438.5" stroke="#FFFFFF" strokeWidth="0.56252" strokeLinejoin="round" strokeMiterlimit="10" fill="none"/>
                        <line x1="387.5" y1="459.5" x2="387.5" y2="438.5" stroke="#FFFFFF" strokeWidth="0.56252" strokeLinejoin="round" strokeMiterlimit="10" fill="none"/>
                        <rect x="271.5" y="435.5" width="175" height="21" stroke="#000000" strokeWidth="0.56252" strokeMiterlimit="8" fill="none"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(359.5 448)" textAnchor="middle">Skrining Malaria (Endemis)</text>
                    </g>

                    {/* Process: Vitamin A dan Obat Cacing */}
                    <g id="process-vitamin-a-obat-cacing" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <rect x="0" y="0" width="59" height="21" fill="#B0FEE6" transform="matrix(1 0 0 -1 271 505)"/>
                        <rect x="0" y="0" width="57" height="21" fill="#FFD9FF" transform="matrix(1 0 0 -1 330 505)"/>
                        <rect x="0" y="0" width="59" height="21" fill="#8EE2FC" transform="matrix(1 0 0 -1 387 505)"/>
                        <line x1="331.5" y1="507.5" x2="331.5" y2="486.5" stroke="#FFFFFF" strokeWidth="0.56252" strokeLinejoin="round" strokeMiterlimit="10" fill="none"/>
                        <line x1="388.5" y1="507.5" x2="388.5" y2="486.5" stroke="#FFFFFF" strokeWidth="0.56252" strokeLinejoin="round" strokeMiterlimit="10" fill="none"/>
                        <rect x="272.5" y="483.5" width="175" height="21" stroke="#000000" strokeWidth="0.56252" strokeMiterlimit="8" fill="none"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(359.5 496)" textAnchor="middle">Vitamin A dan Obat Cacing</text>
                    </g>

                    {/* Process: Imunisasi Rutin */}
                    <g id="process-imunisasi-rutin" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <rect x="0" y="0" width="59" height="20" fill="#B0FEE6" transform="matrix(1 0 0 -1 271 481)"/>
                        <rect x="0" y="0" width="57" height="20" fill="#FFD9FF" transform="matrix(1 0 0 -1 330 481)"/>
                        <rect x="0" y="0" width="59" height="20" fill="#8EE2FC" transform="matrix(1 0 0 -1 387 481)"/>
                        <line x1="331.5" y1="483.5" x2="331.5" y2="462.5" stroke="#FFFFFF" strokeWidth="0.56252" strokeLinejoin="round" strokeMiterlimit="10" fill="none"/>
                        <line x1="388.5" y1="483.5" x2="388.5" y2="462.5" stroke="#FFFFFF" strokeWidth="0.56252" strokeLinejoin="round" strokeMiterlimit="10" fill="none"/>
                        <rect x="272.5" y="460.5" width="175" height="21" stroke="#000000" strokeWidth="0.56252" strokeMiterlimit="8" fill="none"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(359.5 472)" textAnchor="middle">Imunisasi Rutin</text>
                    </g>

                    {/* Output Display: Pemantauan Hasil Pengobatan */}
                    <g id="output-pemantauan-hasil-pengobatan" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <rect x="0" y="0" width="64" height="32" fill="#B0FEE6" transform="matrix(1 0 0 -1 51 454)"/>
                        <rect x="0" y="0" width="63" height="32" fill="#FFD9FF" transform="matrix(1 0 0 -1 115 454)"/>
                        <rect x="0" y="0" width="65" height="32" fill="#8EE2FC" transform="matrix(1 0 0 -1 178 454)"/>
                        <line x1="116.5" y1="457.5" x2="116.5" y2="421.5" stroke="#FFFFFF" strokeWidth="0.56252" strokeLinejoin="round" strokeMiterlimit="10" fill="none"/>
                        <line x1="179.5" y1="457.5" x2="179.5" y2="421.5" stroke="#FFFFFF" strokeWidth="0.56252" strokeLinejoin="round" strokeMiterlimit="10" fill="none"/>
                        <rect x="52.5001" y="421.5" width="192" height="31" stroke="#000000" strokeWidth="0.56252" strokeMiterlimit="8" fill="none"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(150 439)" textAnchor="middle">Pemantauan Hasil Pengobatan</text>
                    </g>

                    {/* Panah dan Garis (Dikembalikan ke versi asli dari SVG) */}
                    <g id="arrows-and-lines">
                        <path d="M0.499975-0.00497382 0.826938 32.8618-0.173012 32.8718-0.499975 0.00497382ZM4.3135 31.4937 0.393281 39.5331-3.6861 31.5733Z" transform="matrix(-1 0 0 1 359.893 92.5001)"/>
                        <path d="M222.507 257 285.829 257.866 285.815 258.866 222.493 258ZM284.544 254.348 292.488 258.457 284.434 262.347Z"/>
                        <path d="M360 165.497 360.293 217.75 359.293 217.756 359 165.503ZM363.785 216.397 359.83 224.42 355.785 216.442Z"/>
                        <path d="M0.499998-0.00145532 0.66768 57.6085-0.332316 57.6115-0.499998 0.00145532ZM4.16378 56.265 0.187087 64.2766-3.83618 56.2883Z" transform="matrix(-1 0 0 1 359.687 292.5)"/>
                        <path d="M426.5 258 510.648 258 510.648 923.679 481.446 923.679 481.446 922.679 510.148 922.679 509.648 923.179 509.648 258.5 510.148 259 426.5 259ZM482.78 927.179 474.78 923.179 482.78 919.179Z"/>
                        <path d="M1.11459e-06-0.5 40.4298-0.49991 40.4298 0.50009-1.11459e-06 0.5ZM39.0965-3.99991 47.0965 0.000104987 39.0965 4.00009Z" transform="matrix(-1 0 0 1 262.597 561.5)"/>
                        <path d="M151 601.493 151.681 651.678 150.681 651.691 150 601.507ZM155.163 650.297 151.271 658.351 147.163 650.406Z"/>
                        <path d="M0-0.5 84.169-0.5 84.169 123.272 83.169 123.272 83.169 0 83.669 0.5 0 0.5ZM87.669 121.939 83.669 129.939 79.669 121.939Z" transform="matrix(1.83697e-16 1 1 -1.83697e-16 151.5 839.5)"/>
                        <path d="M84.5001 562 31.9692 562 32.4692 561.5 32.4692 923.107 31.9692 922.607 274.123 922.607 274.123 923.607 31.4692 923.607 31.4692 561 84.5001 561ZM272.789 919.107 280.789 923.107 272.789 927.107Z"/>
                        <path d="M150.072 520.528 148.203 459.179 149.203 459.148 151.071 520.497ZM144.745 460.618 148.5 452.5 152.742 460.375Z"/>
                        <path d="M0.5-0.000308803 0.565699 106.376-0.434301 106.377-0.5 0.000308803ZM4.06487 105.041 0.0698163 113.043-3.93512 105.046Z" transform="matrix(1 0 0 -1 148.5 420.543)"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(363.937 319)">Tidak</text>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(157.293 621)">Tidak</text>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(450.088 250)">Ya</text>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="8" transform="translate(55.9309 555)">Ya</text>
                        <path d="M147.418 705.072 149.582 705.072 149.582 682 147.418 682ZM142 704.286 148.5 709 155 704.286" fillRule="evenodd"/>
                        <path d="M147.418 757.207 149.582 757.207 149.582 735 147.418 735ZM142 756.449 148.5 761 155 756.449" fillRule="evenodd"/>
                        <path d="M149.582 809.207 147.418 809.207 147.418 787 149.582 787ZM155 808.447 148.5 813 142 808.447" fillRule="evenodd"/>
                    </g>
                </svg>
            </div>
        </div>
    );
};

export default App;
