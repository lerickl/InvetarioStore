'use client'
import styles from './tables.module.css'
import { FormatMoneda } from '../formatToMoneda/fornatMoneda'
 
import React, { Dispatch, SetStateAction, useState } from 'react'
import { Invoice } from '@/app/services/interfaces/invoice'
import { ButtonRipple } from '../buttons/buttonRipple'
import {FormatoFechaHora} from '@/.lib/utils'
import { ButtonDelete } from '../buttons/buttonDelete'
 
interface IProps {
   
  query?: string,
  currentPage?: number,
  invoice?: Dispatch<SetStateAction<Invoice | undefined>>
  Invoices?:Invoice[]
  cancelInvoice?: (id: string) => Promise<null>
}
export  function TableInvoice({ query ,invoice,Invoices, cancelInvoice}:IProps){
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
                <td className={styles.contentAction}>
                  <ButtonRipple  onClick={()=>{getInvoice(invoice.id!)}} >Ver PDF</ButtonRipple>
                  <ButtonDelete id={invoice.id!} accion={cancelInvoice!}>
                    ¿Estas seguro que deseas anular la factura con un monto de  <FormatMoneda format={invoice.amount}/> realizado el {invoice.date} de la lista de facturas?
                  </ButtonDelete>
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