import * as React from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const PdfViewer = ({ fileUrl }) => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    return (
      <Worker  workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <div
                style={{
                    height: '150vw',
                    width: '100%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}
            >
                <Viewer fileUrl={ fileUrl } plugins={[defaultLayoutPluginInstance]} />
            </div>
      </Worker>
    );
};

export default PdfViewer;