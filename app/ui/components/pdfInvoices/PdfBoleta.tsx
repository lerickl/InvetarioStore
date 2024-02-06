
import { PDFDownloadLink } from "@react-pdf/renderer"
import { PDFViewer } from "@react-pdf/renderer" 
import { BoletaPDF } from "../../pdfPrint/boleta"
import { renderToStream } from "@react-pdf/renderer"
import { IDataInvoice } from "@/app/services/interfaces/dataInvoice"
import  styles  from './pdfBoleta.module.css'
import React, { use, useEffect, useState } from "react"
import {  IInvoiceViewPDF } from "@/app/services/interfaces/invoiceView.types"
import { Invoice } from "@/app/services/interfaces/invoice"
import { getInvoiceById } from "@/app/services/invoicesService"
import { getAlldataInvoicesWithIdInvoice } from "@/app/services/dataInvoices"
import { getCustomerById } from "@/app/services/customerService"
 
interface Props extends React.HTMLAttributes<HTMLDivElement>{
  invoice?: Invoice
}  
export function BoletaContentPDF({invoice}:Props){
 
  const [invoiceViewPDF, setInvoiceViewPDF] =  useState<IInvoiceViewPDF>()
  useEffect(() => {
 
    const fetchDataInvoice= async()=>{
      const dataInvoice= await getAlldataInvoicesWithIdInvoice(invoice?.id!)
      console.log('dataInvoice subtotal',dataInvoice[0].subtotal)
      const customer = await getCustomerById(invoice?.customer_id!)
      console.log('customer',customer[0].id)
      setInvoiceViewPDF({
        name: customer[0].name as string,
        direccion: customer[0].direccion as string,
        dni: customer[0].dni as string,
        paywith: customer[0].paywith as string,
        products: dataInvoice 
      })
    }
    fetchDataInvoice()  
  }, [invoice])
  useEffect(() => {

  }, [invoiceViewPDF])
  return(
    // <BoletaPDF dataInvoice={DataInvoice}/>
    <div>
     
        <PDFViewer className={styles.PDFViewer} 
         >
      
          <BoletaPDF dataInvoiceView={invoiceViewPDF!} />
          
        </PDFViewer>
 
        
    </div>
    
    
  )
}
 