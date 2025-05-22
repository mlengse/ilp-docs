import React, { useState, useRef, useCallback } from 'react';

const App = () => {
  // State untuk mengelola transformasi SVG (zoom dan pan)
  const [scale, setScale] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);

  // State untuk mengelola status panning
  const [isPanning, setIsPanning] = useState(false);
  // Menyimpan posisi mouse/sentuh awal saat panning dimulai
  const [initialPanClientX, setInitialPanClientX] = useState(0);
  const [initialPanClientY, setInitialPanClientY] = useState(0);
  // Menyimpan nilai translate awal saat panning dimulai
  const [initialPanTranslateX, setInitialPanTranslateX] = useState(0);
  const [initialPanTranslateY, setInitialPanTranslateY] = useState(0);

  // State untuk mendeteksi double-tap/double-click
  const [lastTapTime, setLastTapTime] = useState(0);
  const doubleTapThreshold = 300; // Milliseconds for double-tap detection

  // State untuk mengelola pinch-to-zoom di perangkat sentuh
  const [initialPinchDistance, setInitialPinchDistance] = useState(0);
  const [initialPinchCenter, setInitialPinchCenter] = useState({ x: 0, y: 0 });

  // Faktor sensitivitas panning
  // Meningkatkan nilai ini untuk membuat panning terasa lebih cepat.
  // Nilai yang lebih tinggi akan membuat pergerakan geser lebih jauh untuk gerakan mouse/jari yang sama.
  const panSensitivity = 10; 

  // Ref untuk mengakses elemen SVG DOM
  const svgRef = useRef(null);

  // Fungsi untuk mendapatkan koordinat mouse/sentuh relatif terhadap SVG
  const getSvgCoordinates = useCallback((clientX, clientY) => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const svg = svgRef.current;
    const CTM = svg.getScreenCTM(); // Current Transformation Matrix
    if (!CTM) return { x: 0, y: 0 };
    return {
      x: (clientX - CTM.e) / CTM.a,
      y: (clientY - CTM.f) / CTM.d,
    };
  }, []);

  // Fungsi untuk mereset zoom dan pan ke tampilan awal
  // Dipindahkan ke atas agar dapat diakses oleh zoomToFitElement
  const resetView = useCallback(() => {
    setScale(1);
    setTranslateX(0);
    setTranslateY(0);
  }, []);

  // Fungsi untuk melakukan zoom pada titik tertentu
  const zoomAtPoint = useCallback((pointX, pointY, newScale) => {
    // Batasi zoom agar tidak terlalu kecil atau terlalu besar
    const clampedNewScale = Math.max(0.1, Math.min(5, newScale));

    // Hitung pergeseran agar zoom berpusat pada titik yang diberikan
    const newTranslateX = pointX - (pointX - translateX) * (clampedNewScale / scale);
    const newTranslateY = pointY - (pointY - translateY) * (clampedNewScale / scale);

    setScale(clampedNewScale);
    setTranslateX(newTranslateX);
    setTranslateY(newTranslateY);
  }, [scale, translateX, translateY]);

  // Fungsi untuk melakukan zoom agar elemen tertentu memenuhi layar
  const zoomToFitElement = useCallback((clickedElement) => {
    if (!svgRef.current || !clickedElement || typeof clickedElement.getBBox !== 'function') {
      console.warn("Invalid element or svgRef for zoomToFitElement.");
      return;
    }

    let targetGroup = clickedElement;

    // Traverse up the DOM tree to find the relevant group to zoom to.
    // We want to zoom to a <g> element that represents a logical process/box.
    // If a line/polygon is clicked, we try to find its parent group.
    // If the parent group is 'complex-lines-arrows' (which is just a collection of lines/arrows),
    // we should probably not zoom to it, or reset the view.
    while (targetGroup && targetGroup !== svgRef.current) {
      if (targetGroup.tagName === 'g') {
        // If it's a group, check if it contains a rect or ellipse (indicating a box/process)
        // AND it's not the 'complex-lines-arrows' group.
        if ((targetGroup.querySelector('rect') || targetGroup.querySelector('ellipse')) && targetGroup.id !== 'complex-lines-arrows') {
          break; // Found a suitable group
        }
        // If it's the 'complex-lines-arrows' group, or a group without a rect/ellipse,
        // continue searching up the tree.
        if (targetGroup.id === 'complex-lines-arrows') {
          // If we hit the complex-lines-arrows group, and the original click was on a line/polygon within it,
          // then we should not zoom to this group.
          break;
        }
      }
      targetGroup = targetGroup.parentNode;
    }

    // If no suitable group was found, or we ended up at the root SVG or 'complex-lines-arrows' group
    // and the original click was on a line/polygon within it, reset the view.
    // The condition `targetGroup.id === 'complex-lines-arrows'` specifically handles clicks on lines/polygons
    // that are part of the general line/arrow group, preventing zooming into just lines.
    if (!targetGroup || targetGroup === svgRef.current || targetGroup.id === 'complex-lines-arrows' ||
        ((clickedElement.tagName === 'line' || clickedElement.tagName === 'polygon') && targetGroup.tagName !== 'g')) {
      resetView();
      return;
    }

    const svg = svgRef.current;
    const svgViewBox = svg.viewBox.baseVal;

    const elementBBox = targetGroup.getBBox(); // Use the bounding box of the identified group

    const paddingFactor = 0.8;
    const scaleX = svgViewBox.width / elementBBox.width * paddingFactor;
    const scaleY = svgViewBox.height / elementBBox.height * paddingFactor;
    const newScale = Math.min(scaleX, scaleY);

    const clampedNewScale = Math.max(0.1, Math.min(5, newScale));

    const elementCenterX = elementBBox.x + elementBBox.width / 2;
    const elementCenterY = elementBBox.y + elementBBox.height / 2;

    const newTranslateX = (svgViewBox.width / 2) - (elementCenterX * clampedNewScale);
    const newTranslateY = (svgViewBox.height / 2) - (elementCenterY * clampedNewScale);

    setScale(clampedNewScale);
    setTranslateX(newTranslateX);
    setTranslateY(newTranslateY);
  }, [scale, translateX, translateY, resetView]);

  // --- Penanganan Event Mouse (untuk Desktop) ---

  const handleMouseDown = useCallback((e) => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTapTime;

    if (tapLength < doubleTapThreshold && tapLength > 0) {
      // Double click terdeteksi
      zoomToFitElement(e.target); // Zoom ke elemen yang diklik
      setLastTapTime(0); // Reset waktu tap terakhir
    } else {
      // Klik tunggal atau mulai panning
      setIsPanning(true);
      setInitialPanTranslateX(translateX); // Simpan nilai translate saat ini
      setInitialPanTranslateY(translateY);
      setInitialPanClientX(e.clientX); // Simpan posisi mouse awal
      setInitialPanClientY(e.clientY);
      setLastTapTime(currentTime);
    }
  }, [lastTapTime, translateX, translateY, zoomToFitElement]);

  const handleMouseMove = useCallback((e) => {
    if (!isPanning) return;

    // Hitung perubahan posisi mouse dari awal drag
    const dx = e.clientX - initialPanClientX;
    const dy = e.clientY - initialPanClientY;

    // Perbarui translasi berdasarkan perubahan posisi mouse dan skala
    // Menggunakan panSensitivity untuk membuat panning lebih cepat
    setTranslateX(initialPanTranslateX + (dx * panSensitivity) / scale);
    setTranslateY(initialPanTranslateY + (dy * panSensitivity) / scale);
  }, [isPanning, initialPanClientX, initialPanClientY, initialPanTranslateX, initialPanTranslateY, scale, panSensitivity]);

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsPanning(false); // Hentikan panning jika mouse keluar dari area SVG
  }, []);

  // --- Penanganan Event Sentuh (untuk Mobile) ---

  const handleTouchStart = useCallback((e) => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTapTime;

    if (e.touches.length === 1) {
      if (tapLength < doubleTapThreshold && tapLength > 0) {
        // Double tap terdeteksi
        zoomToFitElement(e.target); // Zoom ke elemen yang disentuh
        setLastTapTime(0); // Reset waktu tap terakhir
      } else {
        // Tap tunggal atau mulai panning
        setIsPanning(true);
        setInitialPanTranslateX(translateX); // Simpan nilai translate saat ini
        setInitialPanTranslateY(translateY);
        setInitialPanClientX(e.touches[0].clientX); // Simpan posisi sentuh awal
        setInitialPanClientY(e.touches[0].clientY);
        setLastTapTime(currentTime);
      }
    } else if (e.touches.length === 2) {
      // Pinch-to-zoom dengan dua jari
      setIsPanning(false); // Pastikan panning tidak aktif selama pinch
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];

      const dist = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2)
      );
      setInitialPinchDistance(dist);

      const centerX = (touch1.clientX + touch2.clientX) / 2;
      const centerY = (touch1.clientY + touch2.clientY) / 2;
      setInitialPinchCenter(getSvgCoordinates(centerX, centerY));
      setLastTapTime(0); // Reset waktu tap terakhir untuk mencegah double-tap tidak disengaja
    }
  }, [lastTapTime, translateX, translateY, zoomToFitElement, getSvgCoordinates]);

  const handleTouchMove = useCallback((e) => {
    if (isPanning && e.touches.length === 1) {
      // Panning dengan satu jari
      // Hitung perubahan posisi sentuh dari awal drag
      const dx = e.touches[0].clientX - initialPanClientX;
      const dy = e.touches[0].clientY - initialPanClientY;

      // Perbarui translasi berdasarkan perubahan posisi sentuh dan skala
      setTranslateX(initialPanTranslateX + (dx * panSensitivity) / scale);
      setTranslateY(initialPanTranslateY + (dy * panSensitivity) / scale);
    } else if (e.touches.length === 2 && initialPinchDistance > 0) {
      // Pinch-to-zoom
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];

      const currentDist = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2)
      );

      const zoomFactor = currentDist / initialPinchDistance;
      let newScale = scale * zoomFactor;

      zoomAtPoint(initialPinchCenter.x, initialPinchCenter.y, newScale);
      setInitialPinchDistance(currentDist); // Perbarui jarak awal untuk gerakan berkelanjutan
    }
  }, [isPanning, initialPanClientX, initialPanClientY, initialPanTranslateX, initialPanTranslateY, scale, panSensitivity, initialPinchDistance, initialPinchCenter, zoomAtPoint]);

  const handleTouchEnd = useCallback(() => {
    setIsPanning(false);
    setInitialPinchDistance(0); // Reset jarak pinch
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 font-sans text-gray-800">
      <style>
        {`
        .reset-button {
          margin-top: 0.75rem; /* mt-3 */
          padding: 0.5rem 1rem; /* px-4 py-2 */
          background-color: #3b82f6; /* bg-blue-500 */
          color: white; /* text-white */
          border-radius: 0.375rem; /* rounded-md */
          transition: background-color 0.2s ease-in-out, transform 0.2s ease-in-out; /* transition-colors duration-200 */
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); /* shadow-md */
          border: none;
          cursor: pointer;
        }

        .reset-button:hover {
          background-color: #2563eb; /* hover:bg-blue-600 */
          transform: translateY(-1px); /* subtle lift on hover */
        }

        .reset-button:active {
          background-color: #1d4ed8; /* active:bg-blue-700 */
          transform: translateY(0);
        }
        `}
      </style>
      <h3 className="text-4xl font-bold mb-8 text-indigo-700">Diagram Alur Proses</h3>
      <div className="bg-white p-2 rounded-lg shadow-md mb-4 text-center">
        <button
          onClick={resetView}
          className="reset-button" // Menggunakan kelas CSS kustom
        >
          Reset Tampilan
        </button>
      </div>

      <div
        className="w-full max-w-4xl h-auto rounded-lg shadow-xl bg-white overflow-hidden border border-gray-300"
        style={{
          cursor: isPanning ? 'grabbing' : 'grab', // Mengubah kursor saat panning
          touchAction: 'none', // Mencegah browser melakukan tindakan default pada sentuhan
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="960" // Lebar asli SVG
          height="540" // Tinggi asli SVG
          viewBox="0 0 960 540"
          id="svg86"
          ref={svgRef} // Menghubungkan ref ke elemen SVG
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            display: 'block',
            width: '100%', // Membuat SVG responsif terhadap lebar kontainer
            height: 'auto', // Menjaga rasio aspek
          }}
        >
          {/* Group untuk menerapkan transformasi zoom dan pan */}
          <g transform={`translate(${translateX}, ${translateY}) scale(${scale})`}>
            {/* Semua elemen SVG yang ada dipindahkan ke dalam grup ini */}
            <defs id="defs86">
              <linearGradient id="a">
                <stop style={{ stopColor: '#000', stopOpacity: 1 }} offset="0" id="stop86" />
              </linearGradient>
              <linearGradient xlinkHref="#a" id="b" x1="427.7" y1="235.7" x2="642.5" y2="235.7" gradientUnits="userSpaceOnUse" gradientTransform="matrix(.98846 0 0 .84258 4.9 39.5)" />
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#000" />
              </marker>
            </defs>
            <rect x="0" y="0" width="960" height="540" fill="#fff" id="background" />

            <g id="process-1">
              <rect x="428.5" y="224.2" width="106" height="25.8" fill="#ffd9ff" id="rect2" />
              <rect x="534.5" y="224.2" width="106" height="25.8" fill="#8ee2fc" id="rect3" />
              <line x1="534.5" y1="223.7" x2="534.5" y2="251.5" stroke="#fff" strokeLinejoin="round" fill="none" id="line5" />
              <text x="440" y="240.2" fontFamily="Arial, sans-serif" fontSize="10" fill="#000">ANC Terpadu</text>
            </g>
            <g id="process-2">
              <rect x="428" y="253" width="106" height="25.7" fill="#ffd9ff" id="rect8" />
              <rect x="534" y="253" width="106" height="25.7" fill="#8ee2fc" id="rect9" />
              <line x1="534" y1="252.5" x2="534" y2="280.2" stroke="#fff" strokeLinejoin="round" fill="none" id="line9" />
              <text x="440" y="268.5" fontFamily="Arial, sans-serif" fontSize="10" fill="#000">Skrining Kesehatan Jiwa</text>
            </g>
            <g id="header-section">
              <rect x="601.3" y="70.7" width="343.5" height="16.2" fill="#f2f2f2" stroke="#000" strokeMiterlimit="8" id="rect16" />
              <text x="773.05" y="78.8" fontFamily="Arial, sans-serif" fontSize="10" fill="#000" textAnchor="middle" dominantBaseline="middle">Lokasi Unit Layanan</text>
              <rect x="601.3" y="86.3" width="343.5" height="28.2" fill="#fff" stroke="#000" strokeMiterlimit="8" id="rect17" />
              <circle cx="613.8" cy="102.3" r="6" fill="#f7f7c2" id="circle17" />
              <text x="630" y="105" fontFamily="Arial, sans-serif" fontSize="10" fill="#000">Keluarga</text>
              <circle cx="682.4" cy="102.6" r="6" fill="#b0fee6" id="circle18" />
              <text x="690" y="105" fontFamily="Arial, sans-serif" fontSize="10" fill="#000">Posyandu</text>
              <circle cx="753" cy="102.8" r="6" fill="#ffd9ff" id="circle19" />
              <text x="760" y="105" fontFamily="Arial, sans-serif" fontSize="10" fill="#000">Pustu</text>
              <circle cx="806.3" cy="103" r="6" fill="#8ee2fc" id="circle20" />
              <text x="815" y="105" fontFamily="Arial, sans-serif" fontSize="10" fill="#000">Puskesmas/FKTP</text>
              <circle cx="907" cy="102.3" r="6" fill="#f2f2f2" id="circle21" />
              <text x="915" y="105" fontFamily="Arial, sans-serif" fontSize="10" fill="#000">FKTL</text>
            </g>
            <g id="process-3">
              <rect x="428.3" y="282.5" width="106" height="25.7" fill="#ffd9ff" id="rect22" />
              <rect x="534.3" y="282.5" width="106" height="25.7" fill="#8ee2fc" id="rect23" />
              <line x1="534.3" y1="282" x2="534.3" y2="309.7" stroke="#fff" strokeLinejoin="round" fill="none" id="line23" />
              <text x="440" y="298" fontFamily="Arial, sans-serif" fontSize="10" fill="#000">Skrining Anemia</text>
            </g>
            <g id="output-display">
              <rect x="426.4" y="502.1" width="213.4" height="24.4" stroke="#000" strokeMiterlimit="8" style={{ strokeWidth: '1.01' }} id="rect35" />
              <rect x="427.4" y="502.4" width="70.4" height="24" fill="#b0fee6" id="rect28" />
              <rect x="497.8" y="502.4" width="70.5" height="24" fill="#ffd9ff" id="rect29" />
              <rect x="568.3" y="502.4" width="70.5" height="24" fill="#8ee2fc" id="rect30" />
              <line x1="497.8" y1="501.9" x2="497.8" y2="526.4" stroke="#fff" strokeLinejoin="round" fill="none" id="line30" />
              <line x1="568.3" y1="501.9" x2="568.3" y2="526.4" stroke="#fff" strokeLinejoin="round" fill="none" id="line31" />
              <text x="440" y="516.1" fontFamily="Arial, sans-serif" fontSize="10" fill="#000">Pemantauan Hasil Pengobatan</text>
            </g>
            <g id="start-end-oval">
              <ellipse cx="270.8" cy="93.3" rx="86.5" ry="17.7" fill="#fff" stroke="#000" strokeMiterlimit="8" id="ellipse35" />
              <text x="270.8" y="90" fontFamily="Arial, sans-serif" fontSize="10" fill="#000" textAnchor="middle" dominantBaseline="middle">Ibu Hamil, Bersalin</text>
              <text x="270.8" y="100" fontFamily="Arial, sans-serif" fontSize="10" fill="#000" textAnchor="middle" dominantBaseline="middle">dan Nifas</text>
            </g>
            <g id="side-process-1">
              <rect x="32.3" y="204" width="126.7" height="98.3" fill="#f7f7c2" stroke="#000" strokeMiterlimit="8" id="rect36" />
              <text x="40" y="220" fontFamily="Arial, sans-serif" fontSize="10" fill="#000">Kunjungan rumah</text>
              <text x="40" y="232" fontFamily="Arial, sans-serif" fontSize="10" fill="#000"> oleh kader Posyandu</text>
              <text x="40" y="244" fontFamily="Arial, sans-serif" fontSize="10" fill="#000">- Edukasi</text>
              <text x="40" y="256" fontFamily="Arial, sans-serif" fontSize="10" fill="#000">- Pemantauan Kepatuhan</text>
              <text x="46" y="268" fontFamily="Arial, sans-serif" fontSize="10" fill="#000">Pengobatan</text>
              <text x="40" y="280" fontFamily="Arial, sans-serif" fontSize="10" fill="#000">- Sweeping</text>
            </g>
            <g id="input-data-1">
              <rect x="224.9" y="149.4" width="91.9" height="32.9" fill="#f7f7c2" stroke="#000" strokeMiterlimit="8" id="rect37" />
              <text x="230" y="165" fontFamily="Arial, sans-serif" fontSize="10" fill="#000">Cek Kesehatan</text>
              <text x="230" y="175" fontFamily="Arial, sans-serif" fontSize="10" fill="#000">Secara Mandiri</text>
            </g>
            <g id="decision-1">
              <polygon points="683.9,252.3 746.9,220.7 809.9,252.3 746.9,283.9" fill="#fff" stroke="#000" strokeMiterlimit="8" id="polygon38" />
              <text x="746.9" y="242.3" fontFamily="Arial, sans-serif" fontSize="10" fill="#000" textAnchor="middle" dominantBaseline="middle">Dapat</text>
              <text x="746.9" y="254.3" fontFamily="Arial, sans-serif" fontSize="10" fill="#000" textAnchor="middle" dominantBaseline="middle">Ditangani</text>
              <text x="746.9" y="266.3" fontFamily="Arial, sans-serif" fontSize="10" fill="#000" textAnchor="middle" dominantBaseline="middle">Di FKTP</text>
            </g>
            <g id="side-process-2">
              <rect x="847.6" y="235.4" width="76" height="32.8" fill="#f2f2f2" stroke="#000" strokeMiterlimit="8" id="rect38_a" />
              <text x="852" y="256.2" fontFamily="Arial, sans-serif" fontSize="10" fill="#000">Rujuk ke FKTL</text>
              <rect x="847.6" y="302.6" width="76" height="32.8" fill="#f2f2f2" stroke="#000" strokeMiterlimit="8" id="rect39" />
              <text x="852" y="318.4" fontFamily="Arial, sans-serif" fontSize="10" fill="#000">Tatalaksana</text>
              <text x="852" y="330.4" fontFamily="Arial, sans-serif" fontSize="10" fill="#000">Di FKTL</text>
              <rect x="847.6" y="369.7" width="76" height="32.9" fill="#f2f2f2" stroke="#000" strokeMiterlimit="8" id="rect40" />
              <text x="852" y="390.5" fontFamily="Arial, sans-serif" fontSize="10" fill="#000">Kondisi Stabil</text>
              <rect x="847.6" y="436.8" width="76" height="32.9" fill="#f2f2f2" stroke="#000" strokeMiterlimit="8" id="rect41" />
              <text x="852" y="450.6" fontFamily="Arial, sans-serif" fontSize="10" fill="#000">Rujuk Balik</text>
              <text x="852" y="462.6" fontFamily="Arial, sans-serif" fontSize="10" fill="#000">Ke FKTP</text>
              <path d="M885 297.6h1v-29.4h-1Zm-2.5-1 3 6 3-6m-3.5 68.1h1v-29.3h-1Zm-2.5-1 3 6 3-6m-2.5 68.2h-1v-29.3h1Zm2.5-1-3 6-3-6" id="path41" />
            </g>
            <g id="process-4">
              <rect x="428.3" y="344.5" width="212.1" height="24.3" fill="#8ee2fc" id="rect42" />
              <text x="440" y="359.2" fontFamily="Arial, sans-serif" fontSize="10" fill="#000">Skrining Pre-eklampsia</text>
            </g>
            <g id="decision-2">
              <polygon points="201.5,421.7 270.7,391.9 339.8,421.7 270.7,451.6" fill="#fff" stroke="#000" strokeMiterlimit="8" id="polygon42" />
              <text x="270.7" y="411.7" fontFamily="Arial, sans-serif" fontSize="10" fill="#000" textAnchor="middle" dominantBaseline="middle">Terdapat</text>
              <text x="270.7" y="423.7" fontFamily="Arial, sans-serif" fontSize="10" fill="#000" textAnchor="middle" dominantBaseline="middle">Tanda</text>
              <text x="270.7" y="435.7" fontFamily="Arial, sans-serif" fontSize="10" fill="#000" textAnchor="middle" dominantBaseline="middle">Persalinan</text>
            </g>
            <g id="decision-3">
              <polygon points="201.1,252.3 270.3,220.7 339.5,252.3 270.3,283.9" fill="#fff" stroke="#000" strokeMiterlimit="8" id="polygon43" />
              <text x="270.3" y="242.3" fontFamily="Arial, sans-serif" fontSize="10" fill="#000" textAnchor="middle" dominantBaseline="middle">Terdapat</text>
              <text x="270.3" y="254.3" fontFamily="Arial, sans-serif" fontSize="10" fill="#000" textAnchor="middle" dominantBaseline="middle">Keluhan</text>
              <text x="270.3" y="266.3" fontFamily="Arial, sans-serif" fontSize="10" fill="#000">Kesehatan</text>
            </g>
            <g id="process-5">
              <rect x="428.8" y="133" width="70.5" height="26.4" fill="#b0fee6" id="rect43" />
              <rect x="499.3" y="133" width="70.5" height="26.4" fill="#ffd9ff" id="rect44" />
              <rect x="569.8" y="133" width="70.4" height="26.4" fill="#8ee2fc" id="rect45" />
              <line x1="499.3" y1="132.5" x2="499.3" y2="160.9" stroke="#fff" strokeLinejoin="round" fill="none" id="line45" />
              <line x1="569.8" y1="132.5" x2="569.8" y2="160.9" stroke="#fff" strokeLinejoin="round" fill="none" id="line46" />
              <text x="440" y="149" fontFamily="Arial, sans-serif" fontSize="10" fill="#000">Skrining Tuberkulosis</text>
            </g>
            <g id="process-6">
              <rect x="428.4" y="162.8" width="70.5" height="26.5" fill="#b0fee6" id="rect51" />
              <rect x="498.9" y="162.8" width="70.4" height="26.5" fill="#ffd9ff" id="rect52" />
              <rect x="569.3" y="162.8" width="70.5" height="26.5" fill="#8ee2fc" id="rect53" />
              <line x1="498.9" y1="162.3" x2="498.9" y2="190.8" stroke="#fff" strokeLinejoin="round" fill="none" id="line53" />
              <line x1="569.3" y1="162.3" x2="569.3" y2="190.8" stroke="#fff" strokeLinejoin="round" fill="none" id="line54" />
              <text x="440" y="178.6" fontFamily="Arial, sans-serif" fontSize="10" fill="#000">Skrining Malaria (Daerah Endemis)</text>
            </g>
            <g id="process-7">
              <rect x="428.9" y="193.6" width="70.4" height="26.4" fill="#b0fee6" id="rect59" />
              <rect x="499.3" y="193.6" width="70.5" height="26.4" fill="#ffd9ff" id="rect60" />
              <rect x="569.8" y="193.6" width="70.5" height="26.4" fill="#8ee2fc" id="rect61" />
              <line x1="499.3" y1="193.1" x2="499.3" y2="221.5" stroke="#fff" strokeLinejoin="round" fill="none" id="line61" />
              <line x1="569.8" y1="193.1" x2="569.8" y2="221.5" stroke="#fff" strokeLinejoin="round" fill="none" id="line62" />
              <text x="440" y="208.8" fontFamily="Arial, sans-serif" fontSize="10" fill="#000">Skrining Gigi dan Mulut</text>
            </g>
            <g id="process-8">
              <rect x="428.2" y="313.1" width="106" height="25.7" fill="#ffd9ff" id="rect67" />
              <rect x="534.1" y="313.1" width="106" height="25.7" fill="#8ee2fc" id="rect68" />
              <line x1="534.1" y1="312.6" x2="534.1" y2="340.3" stroke="#fff" strokeLinejoin="round" fill="none" id="line68" />
              <text x="440" y="328.6" fontFamily="Arial, sans-serif" fontSize="10" fill="#000">Skrining HIV, Sifilis, Hepatitis B</text>
            </g>
            <g id="dashed-area-1">
              <rect x="421.7" y="126.4" width="224.5" height="250.4" stroke="#172c51" strokeDasharray="4,3" strokeMiterlimit="8" fill="none" id="rect73" />
            </g>
            <g id="process-9">
              <rect x="428" y="393.8" width="212.2" height="24.2" fill="#8ee2fc" id="rect74" />
              <text x="440" y="408.5" fontFamily="Arial, sans-serif" fontSize="10" fill="#000">Persalinan Normal</text>
            </g>
            <g id="output-display-2">
              <rect x="429" y="425" width="70.4" height="26.5" fill="#b0fee6" id="rect75" />
              <rect x="499.6" y="425" width="70.4" height="26.5" fill="#ffd9ff" id="rect76" />
              <rect x="570" y="425" width="70.5" height="26.5" fill="#8ee2fc" id="rect77" />
              <line x1="499.6" y1="424.5" x2="499.6" y2="453" stroke="#fff" strokeLinejoin="round" fill="none" id="line77" />
              <line x1="570" y1="424.5" x2="570" y2="453" stroke="#fff" strokeLinejoin="round" fill="none" id="line78" />
              <text x="440" y="440.7" fontFamily="Arial, sans-serif" fontSize="10" fill="#000">Pelayanan Pasca Persalinan</text>
            </g>
            <g id="dashed-area-2">
              <rect x="421.3" y="386.4" width="224.5" height="71.6" stroke="#172c51" strokeDasharray="4,3" strokeMiterlimit="8" fill="none" id="rect83" />
            </g>
            <g id="process-10" style={{ display: 'inline' }}>
              <rect x="427.70001" y="471.39999" width="212.3" height="24.200001" fill="#8ee2fc" id="rect84" />
              <text x="439.70001" y="486.09999" fontFamily="Arial, sans-serif" fontSize="10" fill="#000000" id="text85" >Tatalaksana sesuai standar</text>
            </g>
            <g id="complex-lines-arrows">
              <line x1="270.8" y1="111" x2="270.85" y2="149.4" stroke="#000" fill="none" id="arrow-oval-to-input-line" />
              <polygon points="270.85 149.4, 267.85 143.4, 273.85 143.4" fill="#000" stroke="#000" id="arrow-oval-to-input-head" />

              <line x1="270.85" y1="182.3" x2="270.3" y2="220.7" stroke="#000" fill="none" id="arrow-input-to-decision3-line" />
              <polygon points="270.3 220.7, 267.3 214.7, 273.3 214.7" fill="#000" stroke="#000" id="arrow-input-to-decision3-head" />

              <line x1="159" y1="253.15" x2="201.1" y2="252.3" stroke="#000" fill="none" id="arrow-side-process1-to-decision3-line" />
              <polygon points="201.1 252.3, 191.1 248.8, 191.1 255.8" fill="#000" stroke="#000" id="arrow-side-process1-to-decision3-head" />

              <path d="M270.3 283.9 L270.7 391.9" stroke="#000" fill="none" id="arrow-decision3-to-decision2-line" />
              <text x="273.3" y="330.4" fontFamily="Arial, sans-serif" fontSize="10" fill="#000">Ya</text>
              <polygon points="270.7 391.9, 267.2 381.9, 274.2 381.9" fill="#000" stroke="#000" id="arrow-decision3-to-decision2-head" />

              <line x1="339.8" y1="421.7" x2="421.3" y2="422.2" stroke="#000" fill="none" id="arrow-decision2-to-dashed-area2-line" />
              <text x="370.3" y="420" fontFamily="Arial, sans-serif" fontSize="10" fill="#000">Ya</text>
              <polygon points="421.3 422.2, 411.3 418.7, 411.3 425.7" fill="#000" stroke="#000" id="arrow-decision2-to-dashed-area2-head" />

              <path d="M270.7 451.6 V483.5 H427.70001" stroke="#000" fill="none" id="arrow-decision2-to-process10-line" />
              <text x="273" y="470.4" fontFamily="Arial, sans-serif" fontSize="10" fill="#000">Tidak</text>
              <polygon points="427.70001 483.5, 420.70001 480, 420.70001 487" fill="#000" stroke="#000" id="arrow-decision2-to-process10-head" />

              <line x1="646.2" y1="251.6" x2="683.9" y2="252.3" stroke="#000" fill="none" id="arrow-dashed-area1-to-decision1-line" />
              <text x="648.2" y="250" fontFamily="Arial, sans-serif" fontSize="10" fill="#000">Hasil</text>
              <polygon points="683.9 252.3, 673.9 248.8, 673.9 255.8" fill="#000" stroke="#000" id="arrow-dashed-area1-to-decision1-head" />

              <line x1="809.9" y1="252.3" x2="847.6" y2="251.8" stroke="#000" fill="none" id="arrow-decision1-to-rect38-line" />
              <text x="809.9" y="250" fontFamily="Arial, sans-serif" fontSize="10" fill="#000">Tidak</text>
              <polygon points="847.6 251.8, 837.6 248.3, 837.6 255.3" fill="#000" stroke="#000" id="arrow-decision1-to-rect38-head" />

              <path d="M885.6 469.7 V514.3 H639.8" stroke="#000" fill="none" id="arrow-rect41-to-output-display-line" />
              <path d="M639.8 514.3 L649.8 510.8 L649.8 517.8 Z" fill="#000" stroke="#000" id="arrow-rect41-to-output-display-head" />

              {/* Connector to Kunjungan Rumah */}
              <path d="M427.7 516H95.3V307.3h1v208.2l-.5-.5h332Z" id="connector-to-kunjungan-rumah" />
              <path d="M92.7 308.3l3-6 3 6" id="arrowhead-kunjungan-rumah" />

              {/* Connector to Tatalaksana FKTL */}
              <path d="M747.4 284v200H645v-1h101.9l-.5.5V283.9Z" id="connector-to-tatalaksana-fktl" />
              <text x="750" y="390" fontFamily="Arial, sans-serif" fontSize="10" fill="#000">Ya</text>
              <path d="M646 486.4l-6-3 6-3" id="arrowhead-tatalaksana-fktl" />

              {/* Line Keluhan to ANC */}
              <path d="M339.5 252.8l77.2-.6v-1l-77.2.6Z" id="line-keluhan-to-anc" />
              <text x="355" y="250" fontFamily="Arial, sans-serif" fontSize="10" fill="#000">Tidak</text>
              <path d="M415.7 254.7 421.7 251.7 415.7 248.7" id="arrowhead-keluhan-to-anc" />

              {/* Line Persalinan to Pelayanan */}
              <path d="M534.6 418v3h-1v-3Z" id="line-persalinan-to-pelayanan" />
              <path d="M537.2 419.9l-2.9 6-3.1-5.9" id="arrowhead-persalinan-to-pelayanan" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default App;
