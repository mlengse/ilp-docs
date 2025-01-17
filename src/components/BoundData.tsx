import React from 'react';
import { Page, Text, View, Document, StyleSheet/**, PDFViewer */, BlobProvider } from '@react-pdf/renderer';
import Typography from '@mui/material/Typography';
// import BrowserOnly from '@docusaurus/BrowserOnly';
import {PDFViewer} from '@site/src/components/PdfViewer'

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});



export const BoundData = ({ judul, stringifiedData }) => {
  const rows = []
  function iterate(stringifiedData: string){
    Object.entries(JSON.parse(stringifiedData)).map( ([k, v]) => {
      if(typeof v !== 'object' && v){
        rows.push(
          <Text style={{marginBottom:20}}>
            {k} : {v.toString()}
          </Text>
        )
  
      } else {
        rows.push(
          <Text style={{marginBottom:20}}>
            {k} : 
          </Text>
        )
        iterate(JSON.stringify(v))
      }
    })
  }

  if(Object.keys(JSON.parse(stringifiedData)).length){
    iterate(stringifiedData)
    const Doc = <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={{fontSize: 24, textAlign:'center', marginBottom: 10}}>
            {judul}
          </Text>
          {rows}
        </View>
      </Page>
    </Document>

    // const blob = pdf(Doc).toBlob();

    return (
      <div>
        <Typography variant={'h4'}>Print Out</Typography>



        <BlobProvider document={Doc}>
          {({ blob, url, loading, error }) => {
            if(!loading && !error && blob){
              // var blobObj = new Blob([atob(blob.toString())], { type: "application/pdf" });
              // return <BrowserOnly>
                // {function() {
              return <PDFViewer fileUrl={url} />

                  // return <span>{URL.createObjectURL(url)}</span>
                  // return <iframe title="PDF" src={`https://mozilla.github.io/pdf.js/web/viewer.html?file=${url}`} width={"100%"} height={window.innerHeight}></iframe>
                  // return <iframe title="PDF" src={`https://mozilla.github.io/pdf.js/web/viewer.html?file=${URL.createObjectURL(blob)}`} width={"100%"} height={window.innerHeight}></iframe>
                  // return <iframe title="PDF" src={`https://mozilla.github.io/pdf.js/web/viewer.html?file=https%3A%2F%2Filp.jyg.my.id%2Fref%2FKMK-HK.01.07-MENKES-2015-2023-Juknis-ILP-signed.pdf`} width={"100%"} height={window.innerHeight}></iframe>
                // }}
              // </BrowserOnly>

            }
                  
            // Do whatever you need with blob here
            // return <div>There's something going on on the fly</div>;
          }}
        </BlobProvider>


        {/* <PDFViewer  style={{ width: '100%', height: '100vw' }} showToolbar={true}>
          {Doc}
        </PDFViewer> */}
  
  
      </div>
    );
  
  } 
  return null
};