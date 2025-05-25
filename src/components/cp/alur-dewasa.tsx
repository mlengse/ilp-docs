import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useHistory } from '@docusaurus/router'; // Menggunakan useHistory untuk Docusaurus v2/v3

const App = () => {
    const history = useHistory();
    const svgRef = useRef(null); // Reference to the SVG element
    const containerRef = useRef(null); // Reference to the SVG container div

    // State for SVG viewBox transformations
    const [scale, setScale] = useState(1);
    const [translateX, setTranslateX] = useState(0);
    const [translateY, setTranslateY] = useState(0);

    // State for pan functionality
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [startTranslateX, setStartTranslateX] = useState(0);
    const [startTranslateY, setStartTranslateY] = useState(0);

    // State for pinch-to-zoom
    const [initialPinchDistance, setInitialPinchDistance] = useState(0);
    const [initialPinchScale, setInitialPinchScale] = useState(1);

    // State for reset button visibility
    const [showResetButton, setShowResetButton] = useState(false);

    // Constants for the original viewBox dimensions from Alur dewasa.svg
    const originalViewBoxWidth = 540;
    const originalViewBoxHeight = 960;
    const panSensitivity = 1; // Adjusted pan sensitivity for smoother mobile drag

    // Function to update the SVG viewBox
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

        // Show reset button if not at default scale or position
        setShowResetButton(scale !== 1 || translateX !== 0 || translateY !== 0);
    }, [scale, translateX, translateY]);

    useEffect(() => {
        updateViewBox();
    }, [updateViewBox]);

    // --- Pan (Drag) Logic ---
    const handleMouseDown = (e) => {
        if (scale === 1) return; // Disable pan at initial scale
        setIsDragging(true);
        setStartX(e.clientX);
        setStartY(e.clientY);
        setStartTranslateX(translateX);
        setStartTranslateY(translateY);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        // Adjust delta calculation for more natural drag on desktop
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
        }
    };

    const handleTouchMove = (e) => {
        if (e.touches.length === 1 && isDragging && scale !== 1) {
            // Single touch pan - Invert delta for mobile for more natural feel
            const deltaX = (e.touches[0].clientX - startX) * panSensitivity / scale;
            const deltaY = (e.touches[0].clientY - startY) * panSensitivity / scale;
            setTranslateX(startTranslateX - deltaX); // Keep this as is for standard pan
            setTranslateY(startTranslateY - deltaY); // Keep this as is for standard pan
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
        // Prevent Docusaurus navigation if there's a click/double-click event on the SVG element
        e.preventDefault();
        e.stopPropagation();

        // Target the <g> element representing a process box or oval, not lines/arrows
        const targetElement = e.target.closest('g[id]:not(#flow_lines_and_arrows):not(#dashed_area_main)');

        if (targetElement && svgRef.current) {
            const svgRect = svgRef.current.getBoundingClientRect();
            const elementRect = targetElement.getBoundingClientRect();

            // Calculate element position in SVG coordinates
            // Need to convert screen coordinates to SVG viewBox coordinates
            const currentViewBoxX = -translateX;
            const currentViewBoxY = -translateY;
            const currentViewBoxWidth = originalViewBoxWidth / scale;
            const currentViewBoxHeight = originalViewBoxHeight / scale;

            const elementSvgX = currentViewBoxX + (elementRect.left - svgRect.left) / svgRect.width * currentViewBoxWidth;
            const elementSvgY = currentViewBoxY + (elementRect.top - svgRect.top) / svgRect.height * currentViewBoxHeight;
            const elementSvgWidth = elementRect.width / svgRect.width * currentViewBoxWidth;
            const elementSvgHeight = elementRect.height / svgRect.height * currentViewBoxHeight;

            // Calculate new scale (e.g., 2x current scale, or scale that fills 80% of viewport)
            const zoomFactor = 2; // Zoom in 2 times from current size
            const newScale = Math.min(5, scale * zoomFactor); // Limit max zoom to 5x

            // Calculate element center position
            const centerX = elementSvgX + elementSvgWidth / 2;
            const centerY = elementSvgY + elementSvgHeight / 2;

            // Calculate new translation to center the element
            // Need to account for the new scale
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

    // Function to navigate to the Self-Check Health page
    const goToCekKesehatanPage = (e) => {
        // Only navigate if not part of a double-tap/double-click
        const currentTime = new Date().getTime();
        if (currentTime - lastTapTime.current < 300) {
             return;
        }

        e.preventDefault();
        e.stopPropagation();

        // Replace '/docs/cek-kesehatan-mandiri-dewasa' with your desired Docusaurus URL path
        history.push('/docs/cek-kesehatan-mandiri-dewasa');
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
        // if (nodeId === 'skrining_hipertensi') {
        //     history.push('/docs/skrining-hipertensi-info');
        // }
    };

    return (
        <div style={{
            fontFamily: 'Arial, sans-serif',
            display: 'flex',
            flexDirection: 'column', // Arrange elements in a column for the button
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#f0f0f0',
            margin: 0,
            padding: '20px',
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
                        marginBottom: '10px', // Space between button and SVG
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
                    paddingBottom: '177.77%', // Aspect ratio 960/540
                    position: 'relative',
                    touchAction: 'none', // Prevent default browser pan/zoom
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp} // Stop pan if mouse leaves area
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
                    viewBox={`0 0 ${originalViewBoxWidth} ${originalViewBoxHeight}`} // Initial viewBox
                    style={{
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                    }}
                >
                    {/* Background rectangle */}
                    <path fill="#FFF" d="M0 0h540v960H0z"/>

                    {/* Start/End Oval: Usia Dewasa dan lanjut usia */}
                    <g id="usia_dewasa_dan_lanjut_usia" onDoubleClick={handleDoubleClick}>
                        <path fill="#FFF" fillRule="evenodd" stroke="#000" strokeMiterlimit="8" strokeWidth=".6667" d="M283.5 71.0001c0 11.8745 34.026 21.5 76 21.5s76-9.6255 76-21.5c0-11.8746-34.026-21.5-76-21.5s-76 9.6254-76 21.5Z"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontSize="8" fontWeight="400" transform="translate(310.467 73)">Usia Dewasa dan lanjut usia</text>
                    </g>

                    {/* Process: Kunjungan rumah oleh Kader Posyandu */}
                    <g id="kunjungan_rumah_kader_posyandu" onDoubleClick={handleDoubleClick}>
                        <rect x="73.5" y="206.5" width="149" height="101" fill="#F7F7C2" stroke="#000" strokeMiterlimit="8" strokeWidth=".6667"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontSize="8" fontWeight="400" transform="translate(98.1448 235)">Kunjungan rumah oleh Kader</text>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontSize="8" fontWeight="400" transform="translate(130.645 245)">Posyandu</text>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontSize="8" fontWeight="400" transform="translate(82.6448 255)">• Edukasi</text>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontSize="8" fontWeight="400" transform="translate(82.6448 264)">• Pemantauan kepatuhan</text>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontSize="8" fontWeight="400" transform="translate(91.9782 274)">pengobatan</text>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontSize="8" fontWeight="400" transform="translate(82.6448 283)">• Sweeping</text>
                    </g>

                    {/* Input Data: Cek Kesehatan secara mandiri (Clickable) */}
                    <g id="cek_kesehatan_mandiri" className='clickable-icon' onClick={goToCekKesehatanPage} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <rect x="306.5" y="132.5" width="106" height="33" fill="#F7F7C2" stroke="#000" strokeMiterlimit="8" strokeWidth=".6667"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontSize="8" fontWeight="400" transform="translate(315.114 146)">Cek Kesehatan secara</text>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontSize="8" fontWeight="400" transform="translate(315.114 156)">mandiri</text>
                    </g>

                    {/* Process: Tata laksana sesuai Alur Klinis (PPTK/PPK) */}
                    <g id="tatalaksana_alur_klinis" onDoubleClick={handleDoubleClick}>
                        <rect x="280.5" y="904.5" width="194" height="37" fill="#8EE2FC" stroke="#000" strokeMiterlimit="8" strokeWidth=".6667"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontSize="8" fontWeight="400" transform="translate(290.075 925)">Tata laksana sesuai Alur Klinis (PPTK/PPK)</text>
                    </g>

                    {/* Decision: Dapat ditangani di FKTP */}
                    <g id="dapat_ditangani_fktp" onDoubleClick={handleDoubleClick}>
                        <polygon points="84.5001,561 150,601.5 215.5,561 150,520.5" fill="#FFF" fillRule="evenodd" stroke="#000" strokeMiterlimit="8" strokeWidth=".6667"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontSize="8" fontWeight="400" transform="translate(122.265 558)">Dapat ditangani</text>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontSize="8" fontWeight="400" transform="translate(137.185 568)">di FKTP</text>
                    </g>

                    {/* Process: Rujuk ke FKTL */}
                    <g id="rujuk_ke_fktl" onDoubleClick={handleDoubleClick}>
                        <rect x="84" y="657" width="130" height="25" fill="#F2F2F2" fillRule="evenodd"/>
                        <rect x="86.5001" y="658.5" width="129" height="25" fill="none" stroke="#000" strokeMiterlimit="8" strokeWidth=".5625"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontSize="8" fontWeight="400" transform="translate(125.327 672)">Rujuk ke FKTL</text>
                    </g>

                    {/* Process: Tatalaksana di FKTL */}
                    <g id="tatalaksana_di_fktl" onDoubleClick={handleDoubleClick}>
                        <rect x="84" y="708" width="130" height="27" fill="#F2F2F2" fillRule="evenodd"/>
                        <rect x="86.5001" y="709.5" width="129" height="26" fill="none" stroke="#000" strokeMiterlimit="8" strokeWidth=".5625"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontSize="8" fontWeight="400" transform="translate(93.7857 724)">Tatalaksana di FKTL</text>
                    </g>

                    {/* Process: Kondisi Stabil */}
                    <g id="kondisi_stabil" onDoubleClick={handleDoubleClick}>
                        <rect x="84" y="761" width="130" height="26" fill="#F2F2F2" fillRule="evenodd"/>
                        <rect x="86.5001" y="762.5" width="129" height="26" fill="none" stroke="#000" strokeMiterlimit="8" strokeWidth=".5625"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontSize="8" fontWeight="400" transform="translate(93.7857 776)">Kondisi Stabil</text>
                    </g>

                    {/* Process: Rujuk Balik ke FKTP */}
                    <g id="rujuk_balik_ke_fktp" onDoubleClick={handleDoubleClick}>
                        <rect x="84" y="813" width="130" height="25" fill="#F2F2F2" fillRule="evenodd"/>
                        <rect x="86.5001" y="814.5" width="129" height="25" fill="none" stroke="#000" strokeMiterlimit="8" strokeWidth=".5625"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontSize="8" fontWeight="400" transform="translate(93.7857 828)">Rujuk Balik ke FKTP</text>
                    </g>

                    {/* Decision: Terdapat Keluhan Kesehatan */}
                    <g id="keputusan_keluhan_kesehatan" onDoubleClick={handleDoubleClick}>
                        <polygon points="292.5,258.5 359.5,292.5 426.5,258.5 359.5,224.5" fill="#FFF" fillRule="evenodd" stroke="#000" strokeMiterlimit="8" strokeWidth=".6667"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontSize="8" fontWeight="400" transform="translate(309.57 260)">Terdapat Keluhan Kesehatan</text>
                    </g>

                    {/* Process: Pemantauan Hasil Pengobatan (Clickable) */}
                    <g id="pemantauan_hasil_pengobatan" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <rect x="51" y="422" width="64" height="32" fill="#B0FEE6"/>
                        <rect x="115" y="422" width="63" height="32" fill="#FFD9FF"/>
                        <rect x="178" y="422" width="65" height="32" fill="#8EE2FC"/>
                        <rect x="116.5" y="423.5" width="2" height="34" fill="none" stroke="#FFF" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".5625"/>
                        <rect x="179.5" y="423.5" width="2" height="34" fill="none" stroke="#FFF" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".5625"/>
                        <rect x="52.5001" y="421.5" width="192" height="31" fill="none" stroke="#000" strokeMiterlimit="8" strokeWidth=".5625"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontSize="8" fontWeight="400" transform="translate(61.1707 439)">Pemantauan Hasil Pengobatan</text>
                    </g>

                    {/* Process: Skrining Obesitas (Clickable) */}
                    <g id="skrining_obesitas" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <rect x="269" y="320" width="59" height="21" fill="#B0FEE6"/>
                        <rect x="328" y="320" width="57" height="21" fill="#FFD9FF"/>
                        <rect x="385" y="320" width="59" height="21" fill="#8EE2FC"/>
                        <rect x="329.5" y="321.5" width="1" height="22" fill="none" stroke="#FFF" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".5625"/>
                        <rect x="386.5" y="321.5" width="2" height="22" fill="none" stroke="#FFF" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".5625"/>
                        <rect x="270.5" y="319.5" width="175" height="21" fill="none" stroke="#000" strokeMiterlimit="8" strokeWidth=".5625"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontSize="8" fontWeight="400" transform="translate(279.409 332)">Skrining Obesitas</text>
                    </g>

                    {/* Process: Skrining Talasemia (Clickable) */}
                    <g id="skrining_talasemia" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <rect x="268" y="690" width="88" height="20" fill="#FFD9FF"/>
                        <rect x="356" y="690" width="87" height="20" fill="#8EE2FC"/>
                        <rect x="357.5" y="691.5" width="1" height="21" fill="none" stroke="#FFF" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".5625"/>
                        <rect x="269.5" y="691.5" width="175" height="18" fill="none" stroke="#000" strokeMiterlimit="8" strokeWidth=".5625"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontSize="8" fontWeight="400" transform="translate(278.109 702)">Skrining Talasemia</text>
                    </g>

                    {/* Process: Skrining Kebugaran (Clickable) */}
                    <g id="skrining_kebugaran" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <rect x="270.5" y="786.5" width="176" height="19" fill="#8EE2FC" stroke="#000" strokeMiterlimit="8" strokeWidth=".6667"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontSize="8" fontWeight="400" transform="translate(279.962 798)">Skrining Kebugaran</text>
                    </g>

                    {/* Process: Skrining Hipertensi (Clickable) */}
                    <g id="skrining_hipertensi" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <rect x="270" y="344" width="59" height="21" fill="#B0FEE6"/>
                        <rect x="329" y="344" width="57" height="21" fill="#FFD9FF"/>
                        <rect x="386" y="344" width="59" height="21" fill="#8EE2FC"/>
                        <rect x="329.5" y="345.5" width="2" height="22" fill="none" stroke="#FFF" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".5625"/>
                        <rect x="387.5" y="345.5" width="1" height="22" fill="none" stroke="#FFF" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".5625"/>
                        <rect x="270.5" y="343.5" width="176" height="21" fill="none" stroke="#000" strokeMiterlimit="8" strokeWidth=".5625"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontSize="8" fontWeight="400" transform="translate(280.034 356)">Skrining Hipertensi</text>
                    </g>

                    {/* Process: Skrining Diabetes Mellitus (Clickable) */}
                    <g id="skrining_diabetes_mellitus" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <rect x="270" y="370" width="59" height="21" fill="#B0FEE6"/>
                        <rect x="329" y="370" width="57" height="21" fill="#FFD9FF"/>
                        <rect x="386" y="370" width="59" height="21" fill="#8EE2FC"/>
                        <rect x="329.5" y="371.5" width="2" height="23" fill="none" stroke="#FFF" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".5625"/>
                        <rect x="387.5" y="371.5" width="1" height="23" fill="none" stroke="#FFF" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".5625"/>
                        <rect x="270.5" y="369.5" width="176" height="21" fill="none" stroke="#000" strokeMiterlimit="8" strokeWidth=".5625"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontSize="8" fontWeight="400" transform="translate(280.035 382)">Skrining Diabetes Mellitus</text>
                    </g>

                    {/* Process: Skrining Malaria (Endemis) (Clickable) */}
                    <g id="skrining_malaria_endemis" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <rect x="270" y="394" width="59" height="20" fill="#B0FEE6"/>
                        <rect x="329" y="394" width="58" height="20" fill="#FFD9FF"/>
                        <rect x="387" y="394" width="58" height="20" fill="#8EE2FC"/>
                        <rect x="330.5" y="395.5" width="1" height="22" fill="none" stroke="#FFF" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".5625"/>
                        <rect x="387.5" y="395.5" width="2" height="22" fill="none" stroke="#FFF" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".5625"/>
                        <rect x="271.5" y="393.5" width="175" height="21" fill="none" stroke="#000" strokeMiterlimit="8" strokeWidth=".5625"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontSize="8" fontWeight="400" transform="translate(280.416 405)">Skrining Malaria (Endemis)</text>
                    </g>

                    {/* Process: Skrining Indra Penglihatan (Clickable) */}
                    <g id="skrining_indra_penglihatan" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <rect x="271" y="418" width="59" height="21" fill="#B0FEE6"/>
                        <rect x="330" y="418" width="57" height="21" fill="#FFD9FF"/>
                        <rect x="387" y="418" width="59" height="21" fill="#8EE2FC"/>
                        <rect x="331.5" y="420.5" width="1" height="22" fill="none" stroke="#FFF" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".5625"/>
                        <rect x="388.5" y="420.5" width="2" height="22" fill="none" stroke="#FFF" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".5625"/>
                        <rect x="272.5" y="417.5" width="175" height="21" fill="none" stroke="#000" strokeMiterlimit="8" strokeWidth=".5625"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontSize="8" fontWeight="400" transform="translate(281.25 430)">Skrining Indra Penglihatan</text>
                    </g>

                    {/* Process: Skrining Kanker Kolorektal (Clickable) */}
                    <g id="skrining_kanker_kolorektal" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <rect x="270.5" y="761.5" width="175" height="20" fill="#8EE2FC" stroke="#000" strokeMiterlimit="8" strokeWidth=".6667"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontSize="8" fontWeight="400" transform="translate(279.36 773)">Skrining Kanker Kolorektal</text>
                    </g>

                    {/* Process: Skrining Faktor Risiko Penyakit Jantung (Clickable) */}
                    <g id="skrining_faktor_risiko_penyakit_jantung" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <rect x="270.5" y="736.5" width="175" height="19" fill="#8EE2FC" stroke="#000" strokeMiterlimit="8" strokeWidth=".6667"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontSize="8" fontWeight="400" transform="translate(279.6 748)">Skrining Faktor Risiko Penyakit Jantung</text>
                    </g>

                    {/* Process: Skrining Faktor Risiko Stroke (Clickable) */}
                    <g id="skrining_faktor_risiko_stroke" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <rect x="270.5" y="713.5" width="175" height="19" fill="#8EE2FC" stroke="#000" strokeMiterlimit="8" strokeWidth=".6667"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontSize="8" fontWeight="400" transform="translate(279.6 725)">Skrining Faktor Risiko Stroke</text>
                    </g>

                    {/* Process: Skrining Kanker Paru (Clickable) */}
                    <g id="skrining_kanker_paru" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <rect x="268" y="669" width="88" height="19" fill="#FFD9FF"/>
                        <rect x="356" y="669" width="87" height="19" fill="#8EE2FC"/>
                        <rect x="357.5" y="670.5" width="1" height="20" fill="none" stroke="#FFF" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".5625"/>
                        <rect x="269.5" y="670.5" width="175" height="18" fill="none" stroke="#000" strokeMiterlimit="8" strokeWidth=".5625"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontSize="8" fontWeight="400" transform="translate(278.109 681)">Skrining Kanker Paru</text>
                    </g>

                    {/* Process: Skrining Kanker Leher Rahim (Clickable) */}
                    <g id="skrining_kanker_leher_rahim" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <rect x="268" y="645" width="88" height="19" fill="#FFD9FF"/>
                        <rect x="356" y="645" width="87" height="19" fill="#8EE2FC"/>
                        <rect x="357.5" y="646.5" width="1" height="20" fill="none" stroke="#FFF" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".5625"/>
                        <rect x="269.5" y="646.5" width="175" height="18" fill="none" stroke="#000" strokeMiterlimit="8" strokeWidth=".5625"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontSize="8" fontWeight="400" transform="translate(278.109 657)">Skrining Kanker Leher Rahim</text>
                    </g>

                    {/* Process: Skrining Kanker Payudara (Clickable) */}
                    <g id="skrining_kanker_payudara" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <rect x="268" y="622" width="88" height="20" fill="#FFD9FF"/>
                        <rect x="356" y="622" width="87" height="20" fill="#8EE2FC"/>
                        <rect x="357.5" y="623.5" width="1" height="21" fill="none" stroke="#FFF" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".5625"/>
                        <rect x="269.5" y="623.5" width="175" height="18" fill="none" stroke="#000" strokeMiterlimit="8" strokeWidth=".5625"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontSize="8" fontWeight="400" transform="translate(278.109 634)">Skrining Kanker Payudara</text>
                    </g>

                    {/* Process: Skrining Kesehatan Jiwa Dewasa (Clickable) */}
                    <g id="skrining_kesehatan_jiwa_dewasa" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <rect x="268" y="600" width="88" height="19" fill="#FFD9FF"/>
                        <rect x="356" y="600" width="87" height="19" fill="#8EE2FC"/>
                        <rect x="357.5" y="601.5" width="1" height="21" fill="none" stroke="#FFF" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".5625"/>
                        <rect x="269.5" y="600.5" width="175" height="18" fill="none" stroke="#000" strokeMiterlimit="8" strokeWidth=".5625"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontSize="8" fontWeight="400" transform="translate(278.109 612)">Skrining Kesehatan Jiwa</text>
                    </g>

                    {/* Process: Skrining PPOK (Clickable) */}
                    <g id="skrining_ppok" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <rect x="270" y="443" width="59" height="21" fill="#B0FEE6"/>
                        <rect x="329" y="443" width="57" height="21" fill="#FFD9FF"/>
                        <rect x="386" y="443" width="59" height="21" fill="#8EE2FC"/>
                        <rect x="330.5" y="444.5" width="1" height="22" fill="none" stroke="#FFF" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".5625"/>
                        <rect x="387.5" y="444.5" width="2" height="22" fill="none" stroke="#FFF" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".5625"/>
                        <rect x="271.5" y="442.5" width="175" height="21" fill="none" stroke="#000" strokeMiterlimit="8" strokeWidth=".5625"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontSize="8" fontWeight="400" transform="translate(280.337 455)">Skrining PPOK</text>
                    </g>

                    {/* Process: Skrining Tuberkulosis Dewasa (Clickable) */}
                    <g id="skrining_tuberkulosis_dewasa" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <rect x="270" y="466" width="59" height="21" fill="#B0FEE6"/>
                        <rect x="329" y="466" width="57" height="21" fill="#FFD9FF"/>
                        <rect x="386" y="466" width="59" height="21" fill="#8EE2FC"/>
                        <rect x="330.5" y="467.5" width="1" height="22" fill="none" stroke="#FFF" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".5625"/>
                        <rect x="387.5" y="467.5" width="2" height="22" fill="none" stroke="#FFF" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".5625"/>
                        <rect x="271.5" y="465.5" width="175" height="21" fill="none" stroke="#000" strokeMiterlimit="8" strokeWidth=".5625"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontSize="8" fontWeight="400" transform="translate(280.337 478)">Skrining Tuberkulosis</text>
                    </g>

                    {/* Process: Skrining Layak Hamil (Clickable) */}
                    <g id="skrining_layak_hamil" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <rect x="270" y="489" width="59" height="20" fill="#B0FEE6"/>
                        <rect x="329" y="489" width="57" height="20" fill="#FFD9FF"/>
                        <rect x="386" y="489" width="59" height="20" fill="#8EE2FC"/>
                        <rect x="330.5" y="490.5" width="1" height="22" fill="none" stroke="#FFF" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".5625"/>
                        <rect x="387.5" y="490.5" width="2" height="22" fill="none" stroke="#FFF" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".5625"/>
                        <rect x="271.5" y="488.5" width="175" height="21" fill="none" stroke="#000" strokeMiterlimit="8" strokeWidth=".5625"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontSize="8" fontWeight="400" transform="translate(280.337 500)">Skrining Layak Hamil</text>
                    </g>

                    {/* Process: Skrining Geriatri (Clickable) */}
                    <g id="skrining_geriatri" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <rect x="268" y="518" width="59" height="21" fill="#B0FEE6"/>
                        <rect x="327" y="518" width="57" height="21" fill="#FFD9FF"/>
                        <rect x="384" y="518" width="59" height="21" fill="#8EE2FC"/>
                        <rect x="327.5" y="519.5" width="2" height="22" fill="none" stroke="#FFF" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".5625"/>
                        <rect x="385.5" y="519.5" width="1" height="22" fill="none" stroke="#FFF" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".5625"/>
                        <rect x="269.5" y="517.5" width="175" height="21" fill="none" stroke="#000" strokeMiterlimit="8" strokeWidth=".5625"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontSize="8" fontWeight="400" transform="translate(278.109 530)">Skrining Geriatri</text>
                    </g>

                    {/* Process: Skrining Imunisasi Tetanus bagi WUS (Clickable) */}
                    <g id="skrining_imunisasi_tetanus_wus" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <rect x="268" y="541" width="59" height="20" fill="#B0FEE6"/>
                        <rect x="327" y="541" width="57" height="20" fill="#FFD9FF"/>
                        <rect x="384" y="541" width="59" height="21" fill="#8EE2FC"/>
                        <rect x="327.5" y="542.5" width="2" height="22" fill="none" stroke="#FFF" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".5625"/>
                        <rect x="385.5" y="542.5" width="1" height="22" fill="none" stroke="#FFF" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".5625"/>
                        <rect x="269.5" y="541.5" width="175" height="21" fill="none" stroke="#000" strokeMiterlimit="8" strokeWidth=".5625"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontSize="8" fontWeight="400" transform="translate(278.109 553)">Skrining Imunisasi Tetanus bagi WUS</text>
                    </g>

                    {/* Process: Imunisasi Covid 19 Program (Clickable) */}
                    <g id="imunisasi_covid_19_program" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <rect x="268" y="571" width="59" height="21" fill="#B0FEE6"/>
                        <rect x="327" y="571" width="57" height="21" fill="#FFD9FF"/>
                        <rect x="384" y="571" width="59" height="21" fill="#8EE2FC"/>
                        <rect x="327.5" y="572.5" width="2" height="22" fill="none" stroke="#FFF" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".5625"/>
                        <rect x="385.5" y="572.5" width="1" height="22" fill="none" stroke="#FFF" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth=".5625"/>
                        <rect x="269.5" y="570.5" width="175" height="21" fill="none" stroke="#000" strokeMiterlimit="8" strokeWidth=".5625"/>
                        <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontSize="8" fontWeight="400" transform="translate(278.109 583)">Imunisasi Covid 19 Program *</text>
                    </g>

                    {/* Dashed Area Main (Skrining) */}
                    <g id="dashed_area_main">
                        <rect x="262.5" y="314.5" width="193" height="497" fill="none" stroke="#172C51" strokeDasharray="2.25008 1.68756" strokeMiterlimit="8" strokeWidth=".5625"/>
                    </g>

                    {/* Text labels for "Tidak" and "Ya" */}
                    <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontSize="8" fontWeight="400" transform="translate(363.937 303)">Tidak</text>
                    <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontSize="8" fontWeight="400" transform="translate(157.293 621)">Tidak</text>
                    <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontSize="8" fontWeight="400" transform="translate(450.088 250)">Ya</text>
                    <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontSize="8" fontWeight="400" transform="translate(55.9309 555)">Ya</text>

                    {/* Flow lines and arrows */}
                    <g id="flow_lines_and_arrows">
                        <path fillRule="evenodd" d="M147.418 705.072h2.164V682h-2.164Zm-5.418-.786 6.5 4.714 6.5-4.714"/>
                        <path fillRule="evenodd" d="M147.418 757.207h2.164V735h-2.164Zm-5.418-.758 6.5 4.551 6.5-4.551"/>
                        <path fillRule="evenodd" d="M149.582 809.207h-2.164V787h2.164Zm5.418-.76L148.5 813l-6.5-4.553"/>
                        <path d="m359.393 92.4951-.327 32.8668 1 .01.327-32.8668Zm-3.8135 31.4987 3.9202 8.0394 4.0794-7.9598Z"/>
                        <path d="m222.507 257 63.322.866-.014 1-63.322-.866Zm62.037-2.652 7.944 4.109-8.054 3.89Z"/>
                        <path d="m360 165.497.293 52.253-1 .006-.293-52.253Zm3.785 50.9-3.955 8.023-4.045-7.978Z"/>
                        <path d="m359.187 292.4958-.1304 15.3437 1 .0085.1304-15.3438Zm-3.619 13.9807 3.932 8.0337 4.0678-7.9657Z"/>
                        <path d="M426.5 258h84.148v665.679h-29.202v-1h28.702l-.5.5V258.5l.5.5H426.5Zm56.28 669.179-8-4 8-4Z"/>
                        <path d="m262.581 563.418-40.432-1.217.03-1 40.433 1.217Zm-39.205 2.321L215.5 561.5l8.117-3.757Z"/>
                        <path d="m151 601.493.681 50.185-1 .013-.681-50.184Zm4.163 48.804-3.892 8.054-4.108-7.945Z"/>
                        <path d="M151 839.5v84.169h123.772v-1H151.5l.5.5V839.5Zm122.439 87.669 8-4-8-4Z"/>
                        <path d="M84.5001 562H31.9692l.5-.5v361.607l-.5-.5H274.123v1H31.4692V561h53.0309ZM272.789 919.107l8 4-8 4Z"/>
                        <path d="m150.072 520.528-1.869-61.349 1-.031 1.868 61.349Zm-5.327-59.91 3.755-8.118 4.242 7.875Z"/>
                        <path d="m149 420.5433.0657-106.3763-1-.001L148 420.5427Zm3.5649-105.0413-3.995-8.002-4.005 7.997Z"/>
                    </g>
                </svg>
            </div>
        </div>
    );
};

export default App;
