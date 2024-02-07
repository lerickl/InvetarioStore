'use client'
 
import { PDFViewer } from "@react-pdf/renderer" 
import { BoletaPDF } from "../../pdfPrint/boleta" 
import  styles  from './pdfBoleta.module.css'
import React, {  useEffect, useState } from "react"
import {  IInvoiceViewPDF } from "@/app/services/interfaces/invoiceView.types"
import { Invoice } from "@/app/services/interfaces/invoice" 
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
    console.log('invoiceViewPDF',invoiceViewPDF)
  }, [invoiceViewPDF])
  return(
    // <BoletaPDF dataInvoice={DataInvoice}/> 
     
      <>
      {
        invoiceViewPDF? <PDFViewer className={styles.PDFViewer} >
    
        <BoletaPDF dataInvoiceView={invoiceViewPDF!} />
        
        </PDFViewer> :'Loading...'
      }
      </>
  )
}
 