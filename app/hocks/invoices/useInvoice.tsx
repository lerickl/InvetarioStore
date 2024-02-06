import { useState } from 'react'
import {IInvoice} from '../../services/interfaces/invoice'
import {IProduct } from '../../services/interfaces/product'
import { IDataInvoice } from '@/app/services/interfaces/dataInvoice'

export function useAddDataInvoice( ) {
  const [invoice, setInvoice] = useState<Array<IDataInvoice>>([])
  const addProduct = (product:IProduct) => {
    if(invoice.find((item)=> item.id === product.id))
    {
      return invoice.map((item)=>{
        if(item.id === product.id){
           item.quantity = item.quantity! + 1
           item.subtotal = (Number(item.quantity!) * Number(item.price!)).toString()
           setInvoice([...invoice])
          }
        }
      )
     
    }
    const newDataInvoice: IDataInvoice = {
      id: product.id,
      id_product: product.id_product,
      name_product: product.name,
      price: product.price,
      barcode: product.barcode,
      quantity: 1,
      subtotal: (product.price)?.toString(),
    }
    setInvoice(invoice.concat(newDataInvoice)) 
     
  }
  
  return {invoice, addProduct}
}