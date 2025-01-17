import React from 'react';
import { Page, Text, View, Document, StyleSheet, BlobProvider } from '@react-pdf/renderer';
import Typography from '@mui/material/Typography';
import {PDFViewer} from '@site/src/components/PDFViewer'

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

    return (
      <div>
        <Typography variant={'h4'}>Print Out</Typography>

        <BlobProvider document={Doc}>
          {({ blob, url, loading, error }) => {
            if(!loading && !error && blob){
              return <PDFViewer fileUrl={url} />
            }
          }}
        </BlobProvider>
      </div>
    );
  
  } 
  return null
};