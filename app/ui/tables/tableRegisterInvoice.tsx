import styles from './tables.module.css'
import {IDataInvoice} from '../../services/interfaces/dataInvoice'
import { BarcodeIcon,DeleteIcon } from '../assets/icons'
import { useState, useEffect } from 'react'
import CurrencyInput from 'react-currency-input-field'
 
import { Database } from '@/app/services/database.types'
 
import { FormatMoneda } from '../formatToMoneda/fornatMoneda'
interface Props {
  accion?: ({ AllDataInvoices }: {AllDataInvoices: Array<Database['public']['Tables']['DataInvoice']['Insert']>})=>Promise<void>,
  Invoice:Array<IDataInvoice>
}
export const TableInvoice = ({ Invoice, accion}:Props) => {

  const [invoice, setInvoice] = useState<Array<IDataInvoice>>(Invoice)
  const [total, setTotal] = useState(0)
  const [paidWith, setPaidWith] = useState(0)
  const [returnPaid, setReturnPaid] = useState(0)
  const handlerQuantityChange= (index:number,event:React.ChangeEvent<HTMLInputElement>) => {
    const updateInvoiceItem = [...invoice];
    const newQuantity = event.target.value
    updateInvoiceItem[index].quantity = Number(newQuantity)
    updateInvoiceItem[index].subTotal = Number(newQuantity) * Number(updateInvoiceItem[index].price)
    setInvoice(updateInvoiceItem)
  } 
  useEffect(() => {
    setReturnPaid(Number(paidWith)-total)
  }, [paidWith,total])
  useEffect(() => {
    setTotal(invoice.reduce((acc, item) => acc + item.subTotal!, 0))
  }, [invoice])
  useEffect(() => {
    setInvoice(Invoice)
  },[Invoice])  
  return(
    <div className={styles.TableInvoice}>
    <table>
      <thead>
        <tr>
          <th><BarcodeIcon/></th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Cantidad</th>
          <th>Subtotal</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        {
          invoice && invoice.map((product, index) => (
            <tr key={index}>
              <td>{product.barcode}</td>
              <td>{product.name_product}</td>
              <td><FormatMoneda format={product.price!} /></td>
              <td>
                <span>
                  <input 
                  value={product.quantity!}
                  className={styles.inputQuantityTable} 
                  title='inputQuantity'
                  type='number'
                  
                  onChange={(event)=>handlerQuantityChange(index,event)}
                  />
                </span>
              </td>
              <td><FormatMoneda format={product.subTotal!}/></td>
              <td><span className={styles.svgDelete}><DeleteIcon/></span></td>
            </tr>
          ))
        }
        
      </tbody>
    </table>
   <div className={styles.Allmounts}>
   <div className={styles.total}>
      <p>Paga con</p>      
      <CurrencyInput
      className={styles.inputQuantity} 
      prefix='S/.'
      decimalSeparator=","
      groupSeparator="."
 
      onValueChange={
        (value, name, values) => {console.log(value, name, values); setPaidWith(Number(value?.replace(",",".")))}}
      />
    </div>
    
    <div className={styles.total}>
      <p>Cambio </p>
      <p className={styles.totalP}><FormatMoneda format={returnPaid}/></p>
     
    </div>
    <div className={styles.total}>
      <p>Total</p>
      <p className={styles.totalP}><FormatMoneda format={total}/></p>
    </div>
   </div>
  </div>
  )

}

 