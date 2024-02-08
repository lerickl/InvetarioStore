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
    margin: 2,
    padding: 10,
    flexGrow: 1,
    width: '100%',
  },
  text:{
    fontSize: 16,
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
    marginTop: 5, 
  },
  contentTable:{
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center', 
    padding: 5, 
    width: '100%',
  },
  table: {    
    flexDirection: 'column',
    width: '100%',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableRowHead: {
    flexDirection: 'row',

  },
  tableColHeadCantidad: {  
    flexDirection: 'column',
    width: '20',
    height:'100%',

  },
  tableColHeadNombre: {
    flexDirection: 'column',
    width: '100',
  },
  
  tableColHeadSubtotal: {
  
    flexDirection: 'column',
    width: '40',
  },
  tableColBodyCantidad: {
  
    flexDirection: 'column',
    width: '20',
  },
  tableColBodyNombre: {
  
    flexDirection: 'column',
    width: '100',
  }, 
  tableColBodySubtotal: {
  
    flexDirection: 'column',
    width: '40',
  },
  tableColBody: {
    flexDirection: 'column',
  },
  tableCell: {
    margin: 1,
    fontSize: 8,
    overflow: 'hidden',
  },
  tablecellHead: {
    margin: 1,
    fontSize: 8,
    fontWeight: 'bold',
    overflow: 'hidden',
  },
  tableCellbody: {
    margin: 1,
    fontSize: 10,
    overflow: 'hidden',
  },
  contentTotal:{
    display: 'flex',
    position: 'relative',
    flexDirection: 'row', 
    justifyContent: 'space-between',
    marginRight: 15,
    marginLeft: 15,
    padding: 10, 
    flexGrow: 1, 
    fontSize: 10,
    width: '100%',
    
  },
  contentQuantity:{
    display: 'flex',
    position: 'relative',
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
     
    padding: 10, 
    flexGrow: 1, 
    fontSize: 8,
    width: '100%',
  },
 
  tableColHeadPaidWith: {
  
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
  },
  marginBoletabody:{
    marginTop: 2,
    marginBottom: 2,
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
  const [countProducts, setCountProducts] = useState(0)
  const [loading , setLoading] = useState(true)
 useEffect(() => {
  if(dataInvoiceView){
    const Invoice: IDataInvoice[] = dataInvoiceView.products!.map((product) => {
      return {
        id: product.id,
        id_product: product.id_product,
        name_product: product.name_product,
        quantity: product.quantity, 
        subtotal: product.subtotal
      };
    }); 
    const Total = Invoice.reduce((total, data) => total + Number(data.subtotal)!, 0);
    const countProducts = Invoice.reduce((count, data) => count + Number(data.quantity)!, 0);
    setCountProducts(countProducts)
    setDataInvoice(Invoice)
    setTotal(Total)
    setPayWith(Number(dataInvoiceView.paywith)!)
    const change= Number(dataInvoiceView.paywith)! - Total
    setChange(Number(change)!)
    console.log('dataInvoice',Invoice)
  }
  setLoading(false)
 }, [dataInvoiceView])
 const options = {timeZone: 'America/Lima'}
 const date = new Date().toLocaleString('es-PE', options)
return(
  <>
  {loading ? <div>loading</div> :
    <Document  >
    <Page size="B8" style={styles.page}>
      <View style={styles.marginBoleta}>
          <Text>_______________________________</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>Dulce como tu </Text> 
        <Text>Jr leguia 813 - cajamarca peru</Text> 
        <Text>Fecha: {date.toString()}</Text>
      </View>
 
      <View style={styles.contentTable}> 
        <View style={styles.table}>
          <View style={styles.marginBoletabody}>
            <Text>__________________________________  </Text>
          </View>
          <View style={styles.tableRowHead}>
            <View style={styles.tableColHeadCantidad}>
              <Text style={styles.tablecellHead}>#</Text>
            </View>
            <View style={styles.tableColHeadNombre}>
              <Text style={styles.tablecellHead}>Nombre</Text>
            </View>
         
            <View style={styles.tableColHeadSubtotal}>
              <Text style={styles.tablecellHead}>Subtotal</Text>
            </View>
          </View>
          <View style={styles.marginBoletabody}>
            <Text>***************************************************</Text>
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
            
                <View style={styles.tableColBodySubtotal}>
                  <Text style={styles.tableCell}><FormatMoneda format={Number(data.subtotal)!}/></Text>
                </View>
              </View>
            ))
          }
          <View style={styles.contentQuantity}>
       
            <Text >{countProducts} </Text>
            <Text> Cantidad  </Text>

          </View>
              <View style={styles.marginBoletabody}>
                <Text>***************************************************</Text>
              </View>
        </View>
      </View>
  
       <View style={styles.contentTotal}>
       
          <Text >Total: </Text>
          <Text ><FormatMoneda format={Total}/></Text>
 
       </View>
   
       <View style={styles.contentTable}>
          <View style={styles.table}>
      
            <View style={styles.tableRow}>
              <View style={styles.tableColHeadPaidWith}>
                <Text style={styles.tablecellHead}>Cancela con</Text>
              </View>
              <View style={styles.tableColHeadPaidWith}>
                <Text style={styles.tablecellHead}>Cambio</Text>
              </View>
       
            </View>
            <View style={styles.marginBoletabody}>
              <Text>***************************************************</Text>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColBodyPaidWith}>
                <Text style={styles.tableCellbody}><FormatMoneda format={payWith}/></Text>
              </View>
              <View style={styles.tableColBodyPaidWith}>
                <Text style={styles.tableCellbody}><FormatMoneda format={change}/></Text>
              </View>
         
            </View>
            <View style={styles.marginBoletabody}>
              <Text>__________________________________</Text>
            </View>
          </View>
         
        
       </View>
     

      
    </Page>
  </Document>
  }
  </>
)
}


 