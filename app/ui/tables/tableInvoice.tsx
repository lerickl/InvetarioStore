import styles from './tables.module.css'
import {AllInvoices} from '../serverComponents/invoices/invoices'
import { FormatMoneda } from '../formatToMoneda/fornatMoneda'
 
export async function TableInvoice(){
  const invoices = await AllInvoices()
  return(
    <section className={styles.sectionTables}>
        <div className={styles.itemsTable}>
        <table className={styles.itemTable}>
          <thead>
            <tr>
              <th>Numero</th>
              <th>Monto</th>
              <th>Fecha</th>
              <th>Estado</th>
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
                  </span></td>
              </tr>
            ))
          }
          </tbody>
        </table>
      </div>
    </section>
  )
}