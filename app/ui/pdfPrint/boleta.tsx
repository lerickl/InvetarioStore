'use client'
import { IDataInvoice } from '@/app/services/interfaces/dataInvoice'
import { IInvoiceViewPDF } from '@/app/services/interfaces/invoiceView.types'
import { Page, Text, View, Document, StyleSheet,  } from '@react-pdf/renderer'
import {  useEffect, useState } from 'react'
import { FormatMoneda } from '../formatToMoneda/fornatMoneda'
const styles = StyleSheet.create({
  page: {
    fontSize: 8,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',   
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'center',
    margin: 10,
    padding: 10,
    flexGrow: 1,
    width: '100%',
  },
  text:{
    fontSize: 12,
    fontWeight: 'bold',

  },
  dataBoleta: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  DataBoletaPaid:{
    marginTop: 10, 
  },
  contentTable:{
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    margin: 10,
    padding: 10,
    flexGrow: 1, 
    width: '100%',
  },
  table: {  
    border: '1px solid #000',
    flexDirection: 'column',
    width: '100%',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableColHeadCantidad: {
  
    border: '1px solid #000',
    flexDirection: 'column',
    width: '20',
    height:'100%',
  },
  tableColHeadNombre: {
  
    border: '1px solid #000',
    flexDirection: 'column',
    width: '60',
  },
  tableColHeadPrecio: {
  
    border: '1px solid #000',
    flexDirection: 'column',
    width: '40',
  },
  tableColHeadSubtotal: {
  
    border: '1px solid #000',
    flexDirection: 'column',
    width: '40',
  },
  tableColBodyCantidad: {
  
    flexDirection: 'column',
    width: '20',
  },
  tableColBodyNombre: {
  
    flexDirection: 'column',
    width: '60',
  },
  tableColBodyPrecio: {
  
    flexDirection: 'column',
    width: '40',
  },
  tableColBodySubtotal: {
  
    flexDirection: 'column',
    width: '40',
  },
  tableColBody: {
    flexDirection: 'column',
  },
  tableCell: {
    margin: 5,
    fontSize: 6,
    overflow: 'hidden',
  },
  contentTotal:{
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    margin: 10,
    padding: 10,
    flexGrow: 1, 
    width: '100%',
  },
  tableColHeadPaidWith: {
  
    border: '1px solid #000',
    flexDirection: 'column',
    width: '50%',
  },
  tableColBodyPaidWith: {
   
    flexDirection: 'column',
    width: '50%',
  },
  marginBoleta:{
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
    height: 30,
    display: 'flex',
    textAlign: 'center',
  }
});
interface Props  {
  dataInvoiceView: IInvoiceViewPDF
} 
export const BoletaPDF = ({dataInvoiceView}:Props)=> {
  console.log('dataInvoiceView',dataInvoiceView)
  // const [dataInvoice, setDataInvoice] = useState('')
  const [dataInvoice, setDataInvoice] = useState<IDataInvoice[]>([])
  const [Total, setTotal] = useState(0)
  const [payWith, setPayWith] = useState(0)
  const [change, setChange] = useState(0)
 useEffect(() => {
  if(dataInvoiceView){
    const Invoice: IDataInvoice[] = dataInvoiceView.products!.map((product) => {
      return {
        id: product.id,
        id_product: product.id_product,
        name_product: product.name_product,
        quantity: product.quantity,
        price: product.quantity,
        subtotal: product.subtotal
      };
    }); 
    const Total = Invoice.reduce((total, data) => total + Number(data.subtotal)!, 0);
    setDataInvoice(Invoice)
    setTotal(Total)
    setPayWith(Number(dataInvoiceView.paywith)!)
    const change= Number(dataInvoiceView.paywith)! - Total
    setChange(Number(change)!)
    console.log('dataInvoice',Invoice)
  }
 }, [dataInvoiceView])
  
return(
  <Document  >
    <Page size="B8" style={styles.page}>
      <View style={styles.marginBoleta}>
          <Text>_______________________________</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>Dulce como tu </Text> 
        <Text>jr leguia 813- cajamarca peru</Text> 
        <Text>Fecha: 12/12/2020</Text>
        
      </View>
      <View style={styles.contentTable}> 
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeadCantidad}>
              <Text style={styles.tableCell}>Qty</Text>
            </View>
            <View style={styles.tableColHeadNombre}>
              <Text style={styles.tableCell}>Nombre</Text>
            </View>
            <View style={styles.tableColHeadPrecio}>
              <Text style={styles.tableCell}>Precio</Text>
            </View>
            <View style={styles.tableColHeadSubtotal}>
              <Text style={styles.tableCell}>Subtotal</Text>
            </View>
          </View>
    
          {
            dataInvoice.map((data,index)=>(
              <View style={styles.tableRow} key={index}>
                <View style={styles.tableColBodyCantidad}>
                  <Text style={styles.tableCell}>{data.quantity}</Text>
                </View>
                <View style={styles.tableColBodyNombre}>
                  <Text style={styles.tableCell}>{data.name_product}</Text>
                </View>
                <View style={styles.tableColBodyPrecio}>
                  <Text style={styles.tableCell}><FormatMoneda format={data.price!}/></Text>
                </View>
                <View style={styles.tableColBodySubtotal}>
                  <Text style={styles.tableCell}><FormatMoneda format={Number(data.subtotal)!}/></Text>
                </View>
              </View>
            ))
          }
          
        </View>
      </View>
 
       <View style={styles.contentTotal}>
          <Text>Total: {Total}</Text>
       </View>
       <View style={styles.contentTable}>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeadPaidWith}>
                <Text style={styles.tableCell}>Cancela con</Text>
              </View>
              <View style={styles.tableColHeadPaidWith}>
                <Text style={styles.tableCell}>Cambio</Text>
              </View>
       
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColBodyPaidWith}>
                <Text style={styles.tableCell}><FormatMoneda format={payWith}/></Text>
              </View>
              <View style={styles.tableColBodyPaidWith}>
                <Text style={styles.tableCell}><FormatMoneda format={change}/></Text>
              </View>
       
            </View>
          </View>
         
        
       </View>
       <View style={styles.marginBoleta}>
        <Text>_______________________________</Text>
      </View>

      
    </Page>
  </Document>
)
}


 