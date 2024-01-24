import { useState } from 'react'
import {IInvoice} from '../../services/interfaces/invoice'
import {IProduct } from '../../services/interfaces/product'
import { IDataInvoice } from '@/app/services/interfaces/dataInvoice'

export function useAddDataInvoice( ) {
  const [invoice, setInvoice] = useState<Array<IDataInvoice>>([])
  const addProduct = (product:IProduct) => {
    if(invoice.find((item)=> item.id_product === product.id))
    {
      return invoice.map((item)=>{
        if(item.id_product === product.id){
           item.quantity = item.quantity! + 1
           item.subTotal = Number(item.quantity!) * Number(item.price!)
            setInvoice([...invoice])
          }
        }
      )
     
    }
    const newDataInvoice: IDataInvoice = {
      id_product: product.id,
      name_product: product.name,
      price: product.price,
      barcode: product.barcode,
      quantity: 1,
      subTotal: Number(product.price)
    }
    setInvoice(invoice.concat(newDataInvoice)) 
     
  }
  
  return {invoice, addProduct}
}