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

    // Constants for the original viewBox dimensions from alur bumil.svg
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
        const targetElement = e.target.closest('g[id]:not(#flow_lines_and_arrows):not(#dashed_area_1):not(#dashed_area_2)');

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

        // Replace '/docs/cek-kesehatan-mandiri-ibu-hamil' with your desired Docusaurus URL path
        history.push('/docs/cek-kesehatan-mandiri-ibu-hamil');
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
        // if (nodeId === 'skrining_hiv_sifilis_hepatitis_b') {
        //     history.push('/docs/skrining-hiv-sifilis-hepatitis-b-info');
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
                    <rect x="0" y="0" width="540" height="960" fill="#FFFFFF"/>

                    {/* Start/End Oval: Ibu Hamil, Bersalin dan Nifas */}
                    <g id="ibu_hamil_bersalin_nifas" onDoubleClick={handleDoubleClick}>
                        <path fill="none" stroke="#000" strokeLinejoin="round" strokeMiterlimit="10" d="M157.5 22c0-9.7 38.7-17.5 86.5-17.5s86.5 7.8 86.5 17.5-38.7 17.5-86.5 17.5-86.5-7.8-86.5-17.5Z"/>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontSize="10" fontWeight="400" transform="translate(201.5 17)">Ibu Hamil,</text>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontSize="10" fontWeight="400" transform="translate(249.2 17)">Bersalin</text>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontSize="10" fontWeight="400" transform="translate(227.3 28)">dan</text>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontSize="10" fontWeight="400" transform="translate(246.7 28)">Nifas</text>
                    </g>

                    {/* Process: Kunjungan rumah oleh Kader Posyandu */}
                    <g id="kunjungan_rumah_kader_posyandu" onDoubleClick={handleDoubleClick}>
                        <path fill="#F7F7C2" stroke="#000" strokeMiterlimit="8" d="M29.5 59.5h126v98h-126z"/>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontWeight="400" fontSize="10" transform="translate(36.4 75)">Kunjungan rumah</text>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontWeight="400" fontSize="10" transform="translate(36.4 87)">oleh</text>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontWeight="400" fontSize="10" transform="translate(57.9 87)">kader</text>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontWeight="400" fontSize="10" transform="translate(85.5 87)">Posyandu</text>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontWeight="400" fontSize="10" transform="translate(36.4 99)">- Edukasi</text>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontWeight="400" fontSize="10" transform="translate(36.4 111)">- Pemantauan</text>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontWeight="400" fontSize="10" transform="translate(101.7 111)">Kepatuhan</text>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontWeight="400" fontSize="10" transform="translate(42.4 123)">Pengobatan</text>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontWeight="400" fontSize="10" transform="translate(36.4 135)">- Sweeping</text>
                    </g>

                    {/* Input Data: Cek Kesehatan Mandiri (Clickable) */}
                    <g id="cek_kesehatan_mandiri" className='clickable-icon' onClick={goToCekKesehatanPage} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <path fill="#F7F7C2" fillRule="evenodd" stroke="#000" strokeMiterlimit="8" d="M230.5 113.5h92v33h-92Z"/>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontSize="10" fontWeight="400" transform="translate(235.2 130)">Cek Kesehatan</text>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontSize="10" fontWeight="400" transform="translate(235.2 140)">Secara</text>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontSize="10" fontWeight="400" transform="translate(269.5 140)">Mandiri</text>
                    </g>

                    {/* Process: ANC Terpadu (Clickable) */}
                    <g id="anc_terpadu" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <path fill="#FFD9FF" d="M257 297h106v26H257z"/>
                        <path fill="#8EE2FC" d="M363 297h106v26H363z"/>
                        <path fill="none" stroke="#FFF" strokeLinejoin="round" strokeMiterlimit="10" d="M363.5 297.5h1v27h-1z"/>
                        <path fill="none" stroke="#000" strokeMiterlimit="8" d="M257.5 298.5h211v26h-211z"/>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontSize="10" fontWeight="400" transform="translate(268.5 314)">ANC Terpadu</text>
                    </g>

                    {/* Process: Skrining Kesehatan Jiwa (Clickable) */}
                    <g id="skrining_kesehatan_jiwa" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <path fill="#FFD9FF" d="M257 326h105v26H257z"/>
                        <path fill="#8EE2FC" d="M362 326h106v26H362z"/>
                        <path fill="none" stroke="#FFF" strokeLinejoin="round" strokeMiterlimit="10" d="M362.5 325.5h1v28h-1z"/>
                        <path fill="none" stroke="#000" strokeMiterlimit="8" d="M257.5 327.5h211v23h-211z"/>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontSize="10" fontWeight="400" transform="translate(268.5 342)">Skrining Kesehatan Jiwa</text>
                    </g>

                    {/* Process: Skrining Anemia (Clickable) */}
                    <g id="skrining_anemia" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <path fill="#FFD9FF" d="M257 355h106v26H257z"/>
                        <path fill="#8EE2FC" d="M363 355h106v26H363z"/>
                        <path fill="none" stroke="#FFF" strokeLinejoin="round" strokeMiterlimit="10" d="M363.5 355.5h1v28h-1z"/>
                        <path fill="none" stroke="#000" strokeMiterlimit="8" d="M257.5 356.5h211v24h-211z"/>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontSize="10" fontWeight="400" transform="translate(268.5 372)">Skrining Anemia</text>
                    </g>

                    {/* Process: Skrining HIV, Sifilis, Hepatitis B (Clickable) */}
                    <g id="skrining_hiv_sifilis_hepatitis_b" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <path fill="#FFD9FF" d="M257 386h106v26H257z"/>
                        <path fill="#8EE2FC" d="M363 386h105v26H363z"/>
                        <path fill="none" stroke="#FFF" strokeLinejoin="round" strokeMiterlimit="10" d="M363.5 385.5h1v28h-1z"/>
                        <path fill="none" stroke="#000" strokeMiterlimit="8" d="M257.5 387.5h211v23h-211z"/>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontSize="10" fontWeight="400" transform="translate(268.5 402)">Skrining HIV, Sifilis, Hepatitis B</text>
                    </g>

                    {/* Process: Skrining Pre-eklampsia (Clickable) */}
                    <g id="skrining_pre_eklampsia" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <path fill="#8EE2FC" stroke="#000" strokeMiterlimit="8" d="M257.5 417.5h212v25h-212z"/>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontSize="10" fontWeight="400" transform="translate(268.5 433)">Skrining Pre-eklampsia</text>
                    </g>

                    {/* Process: Skrining Tuberkulosis (Clickable) */}
                    <g id="skrining_tuberkulosis" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <path fill="#B0FEE6" d="M257 206h71v26h-71z"/>
                        <path fill="#FFD9FF" d="M328 206h70v26h-70z"/>
                        <path fill="#8EE2FC" d="M398 206h70v26h-70z"/>
                        <path fill="none" stroke="#FFF" strokeLinejoin="round" strokeMiterlimit="10" d="M328.5 205.5h70v29h-70z"/>
                        <path fill="none" stroke="#000" strokeMiterlimit="8" d="M257.5 206.5h211v26h-211z"/>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontSize="10" fontWeight="400" transform="translate(268.5 223)">Skrining Tuberkulosis</text>
                    </g>

                    {/* Process: Skrining Malaria (Daerah Endemis) (Clickable) */}
                    <g id="skrining_malaria_daerah_endemis" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <path fill="#B0FEE6" d="M257 236h70v26h-70z"/>
                        <path fill="#FFD9FF" d="M327 236h71v26h-71z"/>
                        <path fill="#8EE2FC" d="M398 236h70v26h-70z"/>
                        <path fill="none" stroke="#FFF" strokeLinejoin="round" strokeMiterlimit="10" d="M327.5 235.5h71v29h-71z"/>
                        <path fill="none" stroke="#000" strokeMiterlimit="8" d="M257.5 237.5h211v24h-211z"/>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontSize="10" fontWeight="400" transform="translate(268.5 252)">Skrining Malaria (Daerah Endemis)</text>
                    </g>

                    {/* Process: Skrining Gigi dan Mulut (Clickable) */}
                    <g id="skrining_gigi_dan_mulut" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <path fill="#B0FEE6" d="M257 267h71v26h-71z"/>
                        <path fill="#FFD9FF" d="M328 267h70v26h-70z"/>
                        <path fill="#8EE2FC" d="M398 267h71v26h-71z"/>
                        <path fill="none" stroke="#FFF" strokeLinejoin="round" strokeMiterlimit="10" d="M328.5 266.5h70v28h-70z"/>
                        <path fill="none" stroke="#000" strokeMiterlimit="8" d="M257.5 267.5h211v24h-211z"/>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontSize="10" fontWeight="400" transform="translate(268.5 283)">Skrining Gigi dan Mulut</text>
                    </g>

                    {/* Decision: Terdapat Keluhan Kesehatan */}
                    <g id="keputusan_keluhan_kesehatan" onDoubleClick={handleDoubleClick}>
                        <path fill="none" stroke="#000" strokeLinejoin="round" strokeMiterlimit="10" d="m74.5 257 51-31.5 51 31.5-51 31.5Z"/>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontSize="10" fontWeight="400" transform="translate(106.7 246)">Terdapat</text>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontSize="10" fontWeight="400" transform="translate(106.2 258)">Keluhan</text>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontSize="10" fontWeight="400" transform="translate(106.3 270)">Kesehatan</text>
                    </g>

                    {/* Decision: Terdapat Tanda Persalinan */}
                    <g id="keputusan_tanda_persalinan" onDoubleClick={handleDoubleClick}>
                        <path fill="none" stroke="#000" strokeLinejoin="round" strokeMiterlimit="10" d="m56.5 486.5 69-30 69 30-69 30Z"/>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontSize="10" fontWeight="400" transform="translate(104.5 478)">Terdapat</text>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontSize="10" fontWeight="400" transform="translate(104.5 490)">Tanda</text>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontSize="10" fontWeight="400" transform="translate(103.9 502)">Persalinan</text>
                    </g>

                    {/* Process: Persalinan Normal (Clickable) */}
                    <g id="persalinan_normal" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <path fill="#8EE2FC" stroke="#000" strokeMiterlimit="8" d="M255.5 482.5h212v24h-212z"/>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontSize="10" fontWeight="400" transform="translate(267.4 498)">Persalinan Normal</text>
                    </g>

                    {/* Process: Pelayanan Pasca Persalinan (Clickable) */}
                    <g id="pelayanan_pasca_persalinan" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <path fill="#B0FEE6" d="M256 513h71v26h-71z"/>
                        <path fill="#FFD9FF" d="M327 513h70v26h-70z"/>
                        <path fill="#8EE2FC" d="M397 513h71v26h-71z"/>
                        <path fill="none" stroke="#FFF" strokeLinejoin="round" strokeMiterlimit="10" d="M327.5 512.5h70v29h-70z"/>
                        <path fill="none" stroke="#000" strokeMiterlimit="8" d="M256.5 514.5h211v23h-211z"/>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontSize="10" fontWeight="400" transform="translate(267.4 530)">Pelayanan Pasca Persalinan</text>
                    </g>

                    {/* Process: Tatalaksana sesuai standar */}
                    <g id="tatalaksana_sesuai_standar" onDoubleClick={handleDoubleClick}>
                        <path fill="#8EE2FC" stroke="#000" strokeMiterlimit="8" d="M168.5 882.5h212v24h-212z"/>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontSize="10" fontWeight="400" transform="translate(179.9 898)">Tatalaksana sesuai standar</text>
                    </g>

                    {/* Process: Pemantauan Hasil Pengobatan (Clickable) */}
                    <g id="pemantauan_hasil_pengobatan" className='clickable-icon' onClick={handleNodeClick} onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
                        <path fillRule="evenodd" stroke="#000" strokeMiterlimit="8" d="M158.5 929.5h214v25h-214Z"/>
                        <path fill="#B0FEE6" fillRule="evenodd" d="M159 930h71v24h-71Z"/>
                        <path fill="#FFD9FF" fillRule="evenodd" d="M230 930h70v24h-70Z"/>
                        <path fill="#8EE2FC" fillRule="evenodd" d="M300 930h71v24h-71Z"/>
                        <path fill="none" stroke="#FFF" strokeLinejoin="round" strokeMiterlimit="10" d="M230.5 929.5v25m70-25v25"/>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontSize="10" fontWeight="400" transform="translate(172 944)">Pemantauan Hasil Pengobatan</text>
                    </g>

                    {/* Decision: Dapat Ditangani Di FKTP */}
                    <g id="keputusan_ditangani_fktp" onDoubleClick={handleDoubleClick}>
                        <path fill="#FFF" fillRule="evenodd" stroke="#000" strokeMiterlimit="8" d="m283.5 628.5 63-32 63 32-63 32Z"/>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontSize="10" fontWeight="400" transform="translate(332.5 619)">Dapat</text>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontSize="10" fontWeight="400" transform="translate(324.7 631)">Ditangani</text>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontSize="10" fontWeight="400" transform="translate(327 643)">Di FKTP</text>
                    </g>

                    {/* Process: Rujuk ke FKTL */}
                    <g id="rujuk_ke_fktl" onDoubleClick={handleDoubleClick}>
                        <path fill="#F2F2F2" stroke="#000" strokeMiterlimit="8" d="M404.5 678.5h76v32h-76z"/>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontSize="10" fontWeight="400" transform="translate(408.6 699)">Rujuk ke FKTL</text>
                    </g>

                    {/* Process: Tatalaksana Di FKTL */}
                    <g id="tatalaksana_di_fktl" onDoubleClick={handleDoubleClick}>
                        <path fill="#F2F2F2" stroke="#000" strokeMiterlimit="8" d="M404.5 745.5h76v32h-76z"/>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontSize="10" fontWeight="400" transform="translate(408.6 761)">Tatalaksana</text>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontSize="10" fontWeight="400" transform="translate(408.6 773)">Di FKTL</text>
                    </g>

                    {/* Process: Kondisi Stabil */}
                    <g id="kondisi_stabil" onDoubleClick={handleDoubleClick}>
                        <path fill="#F2F2F2" fillRule="evenodd" stroke="#000" strokeMiterlimit="8" d="M404.5 812.5h76v33h-76Z"/>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontSize="10" fontWeight="400" transform="translate(408.6 833)">Kondisi Stabil</text>
                    </g>

                    {/* Process: Rujuk Balik Ke FKTP */}
                    <g id="rujuk_balik_ke_fktp" onDoubleClick={handleDoubleClick}>
                        <path fill="#F2F2F2" fillRule="evenodd" stroke="#000" strokeMiterlimit="8" d="M404.5 879.5h76v33h-76Z"/>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontSize="10" fontWeight="400" transform="translate(408.6 893)">Rujuk Balik</text>
                        <text fontFamily="Arial,Arial_MSFontService,sans-serif" fontSize="10" fontWeight="400" transform="translate(408.6 905)">Ke FKTP</text>
                    </g>

                    {/* Dashed Area 1 (Skrining) */}
                    <g id="dashed_area_1">
                        <path fill="none" stroke="#172C51" strokeDasharray="3.99034 2.99276" strokeMiterlimit="8" d="M250.5 199.5h224v251h-224z"/>
                    </g>

                    {/* Dashed Area 2 (Pelayanan Pasca Persalinan) */}
                    <g id="dashed_area_2">
                        <path fill="none" stroke="#172C51" strokeDasharray="3.99034 2.99276" strokeMiterlimit="8" d="M249.5 475.5h224v71h-224z"/>
                    </g>

                    {/* Text labels for "Tidak" and "Ya" */}
                    <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontSize="13" fontWeight="400" transform="translate(189.4 251)">Tidak</text>
                    <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontSize="16" fontWeight="400" transform="translate(134.6 386)">Ya</text>
                    <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontSize="13" fontWeight="400" transform="translate(128 650)">Tidak</text>
                    <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontWeight="400" fontSize="13" transform="translate(387.6 662)">Tidak</text>
                    <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontSize="16" fontWeight="400" transform="translate(204.9 478)">Ya</text>
                    <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontSize="16" fontWeight="400" transform="translate(246 794)">Ya</text>
                    <text fontFamily="Aptos,Aptos_MSFontService,sans-serif" fontSize="16" fontWeight="400" transform="translate(454.4 623)">Hasil</text>

                    {/* Flow lines and arrows */}
                    <g id="flow_lines_and_arrows">
                        <path d="M243 39.5v38.4h26.4l-.5-.5v31.3h1V76.9h-26.4l.5.5V39.5Zm22.4 67.8 4 8 4-8Z"/>
                        <path d="M92 157.5v34.6h33.6l-.5-.5v27.5h1v-28H92.5l.5.5v-34.1Zm29.6 60.2 4 8 4-8Z"/>
                        <path d="M269.8 146.5v40.2H125.5l.5-.5v33h-1v-33.5h144.3l-.5.5v-39.7Zm-140.3 71.4-4 8-4-8Zm47 39.1h37.6v68.4l-.5-.5h30.5v1h-31v-68.4l.5.5h-37.1Zm66.3 64.4 8 4-8 4Z"/>
                        <path d="M126.4 288.5v84.7h-.9l.5-.5v77.5h-1v-78h1l-.6.5v-84.2Zm3.1 160.3-4 8-4-8Z"/>
                        <path d="M475.2 325h24l-.5-.5V628l.5-.5h-83v1h83.5V324h-24.5Zm-57.7 299-8 4 8 4ZM346 660.5v9.5h96.8l-.5-.5v2.4h1V669h-96.8l.5.5v-9Zm92.8 10 4 8 4-8ZM194.5 486h28v24.5l-.4-.5H243v1h-21.4v-24.5l.5.5h-27.6Zm47.1 20.5 8 4-8 4Zm-116.6 10v378.4h37.2v-1h-36.7l.5.5V516.5Zm35.9 381.9 8-4-8-4ZM283 628h-42v248.6h1V628.5l-.5.5H283Zm-45.5 247.3 4 8 4-8Z"/>
                        <path d="M163.1 941.4H3V108h17.8v1H3.5l.5-.5v832.4l-.5-.5h159.6ZM19.5 104.5l8 4-8 4Z"/>
                        <path d="M443 710.5v27.7h-1v-27.7Zm3.5 26.4-4 8-4-8Zm-3.5 40.6V806h-1v-28.5Zm3.5 27.2-4 8-4-8Zm-3.5 42.8v26.8h-1v-26.8Zm3.5 25.5-4 8-4-8Zm-3.9 39h-2.5v28l.5-.4h-56.4v1H441v-28.1l-.5.5h2Zm-57.1 24-8 4 8 4Zm-144.3-30.5-.1 18.4h1l.1-18.4Zm-3.6 17 3.9 8 4-8Z"/>
                    </g>
                </svg>
            </div>
        </div>
    );
};

export default App;
