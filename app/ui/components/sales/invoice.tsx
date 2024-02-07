'use client'
import { IInvoiceViewPDF } from '@/app/services/interfaces/invoiceView.types'
import {TableInvoice} from '../../tables/tableInvoice'
import styles from './sales.module.css' 
import {  Suspense, useEffect, useState } from 'react'
import { Invoice } from '@/app/services/interfaces/invoice'
import { BoletaContentPDF } from '../pdfInvoices/PdfBoleta'
 
interface IProps {
  //creo que esto lo hago aqui xd 
  //addInvoiceViewPDF?:({invoiceViewPDF}:{invoiceViewPDF: IInvoiceViewPDF})=>Promise<null[]>
  Invoices?:Invoice[]
  query?: string,
  currentPage?: number,
}
export function Invoice({query,currentPage, Invoices}:IProps) {
  const [invoice, setInvoice] = useState<Invoice>()
  useEffect(() => {
    
    setInvoice(invoice)
  }, [invoice])
  const handleClickClose=()=>{
    setInvoice(undefined)
  }
  return (
    <div>
       {
        invoice? 
        <div className={styles.viewPdf} >
          <div>
            <span onClick={handleClickClose}>X</span>
          </div>        
        
            <BoletaContentPDF invoice={invoice}/> 
     
        </div>
        :''
       }
 
       
        <TableInvoice
          // invoice={setInvoice} 
          query={query}
          currentPage={currentPage} 
          invoice={setInvoice}
          Invoices={Invoices}
          />
 
      
    </div>
  )
}