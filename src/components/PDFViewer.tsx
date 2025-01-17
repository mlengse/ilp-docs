import React from 'react'
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// const DefaultLayoutPluginProps = {}


export const PDFViewer = ({ fileUrl }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin(
    // props?: DefaultLayoutPluginProps
  );

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <div style={{height:window.innerHeight*3/4}}>
        <Viewer fileUrl={ fileUrl } plugins={[defaultLayoutPluginInstance]} />
      </div>    
    </Worker>
  ) 
};