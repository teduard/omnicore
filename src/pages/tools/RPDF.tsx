// import React, { useEffect, useState, type ReactElement, type ReactNode } from "react";
 import { DatabaseProvider } from "../../db/hooks/DatabaseContext.tsx";
// import {useDatabase} from "./db/hooks/useDatabase.tsx"

import { type DocumentProps } from '@react-pdf/renderer';
// import { Page, Text, View, Document, StyleSheet, pdf  } from '@react-pdf/renderer';
// import { PDFViewer } from '@react-pdf/renderer';
// import { saveAs } from 'file-saver';
// import { Badge } from "@cloudscape-design/components";


// //Create styles
// const styles = StyleSheet.create({
//   page: {
//     flexDirection: 'row',
//     backgroundColor: '#99a099'
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1
//   }
// });

// const MyDocument = () => (
//   <Document>
//     <Page size="A4" style={styles.page}>
//       <View style={styles.section}>
//         <Text>Section #1</Text>
//       </View>
//       <View style={styles.section}>
//         <Text>Section #2</Text>
//       </View>
//       <View style={styles.section}>
//         <Badge color="severity-low">Food</Badge>
//       </View>
//     </Page>
//   </Document>
// );

interface IDownloadButton {
  content:React.ReactElement<DocumentProps>
}

// const DownloadButton = (props:IDownloadButton) => {
//   const downloadPdf = async () => {
//     const fileName = 'test.pdf';

//     logger.debug("props.content", props.content);

//     const blob = await pdf(props.content).toBlob();
//     saveAs(blob, fileName);
//   };

//   return <button onClick={downloadPdf}>Download PDF</button>;
// };

// // function Content() {
// //   return <>
// //     {/* <PDFViewer>
// //       <MyDocument />
// //     </PDFViewer> */}
// //     <DownloadButton content={<MyDocument/>}/>
// //   </>
// // }

// function RPDF(props:IDownloadButton) {
   
//    return (
//     <DatabaseProvider>
//       <DownloadButton content={<MyDocument/>}/>
//       <br/>
//       <DownloadButton content={props.content}/>
//     </DatabaseProvider>
//   );
// }

function RPDF(props:IDownloadButton) {
   
   return (
    <DatabaseProvider>
     {props.content}
    </DatabaseProvider>
  );
}

export default RPDF