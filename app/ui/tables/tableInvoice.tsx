'use client'
import styles from './tables.module.css'
import { FormatMoneda } from '../formatToMoneda/fornatMoneda'
 
import React, { Dispatch, SetStateAction, useState } from 'react'
 import {   Invoice } from '@/app/services/interfaces/invoice'
import { ButtonRipple } from '../buttons/buttonRipple'
 
interface IProps {
   
  query?: string,
  currentPage?: number,
  invoice?: Dispatch<SetStateAction<Invoice | undefined>>
  Invoices?:Invoice[]

}
export  function TableInvoice({ query ,invoice,Invoices}:IProps){
  // const invoices =  allInvoices!()
  const [invoices, setInvoices] = useState<Invoice[]>(Invoices!)
  const getInvoice=(id: string)=>{
    const Getinvoice = invoices?.find(invoice=>invoice.id===id) as Invoice     
    invoice!(Getinvoice)
     
  }
  return(
    <section className={styles.sectionTables}>
      <h2>Ventas</h2> 
        <div className={styles.itemsTable}>
        <table className={styles.itemTable}>
          <thead>
            <tr>
              <th>Numero</th>
              <th>Monto</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
          {
            invoices?.map((invoice,index)=>(
              <tr key={index}>
                <td className={styles.tdCodigo}>{invoice.id}</td>
                <td><FormatMoneda format={invoice.amount}/></td>
                <td>{invoice.date}</td>
                <td>
                  <span className={`${invoice.status==='paid'?styles.spanStatusPaid:styles.spanStatusPending}`}>
                    {invoice.status==='paid'?'Pagado':'Pendiente'}
                  </span>
                </td>
                <td>
                  <ButtonRipple  onClick={()=>{getInvoice(invoice.id!)}} >Ver PDF</ButtonRipple>
              
                </td>
              </tr>
            ))
          }
          </tbody>
        </table>
      </div>
    </section>
  )
}