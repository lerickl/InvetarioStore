import {getAllInvoices, AddInvoice, fetchInvoiceTotalPages, CancelInvoice } from '../../../services/invoicesService'
import { DataInvoice, IInvoice, Invoice } from '@/app/services/interfaces/invoice'
import {  addAllDataInvoices } from '@/app/services/dataInvoices'
import { UpdateStockProduct} from '@/app/services/productServices'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import {ICustomer} from '@/app/services/interfaces/customer'
export const AllInvoices = async()=>{
  'use server'
  revalidatePath('/dashboard/sales')
  const response = await getAllInvoices();
 
  return response
}

export const AddInvoiceAndDetails = async({AllDataInvoices}:{AllDataInvoices:Array<DataInvoice>})=>{
  'use server'
 
  const response = await addAllDataInvoices({AllDataInvoices})
  
  revalidatePath('/dashboard/sales')
  redirect('/dashboard/sales')
 
}
import { IInvoiceView } from '@/app/services/interfaces/invoiceView.types'
import { addCustomer } from '@/app/services/customerService' 
import { IDataInvoiceInsert } from '@/app/services/interfaces/dataInvoice'
export const AddInvoiceView = async({invoiceView}:{invoiceView:IInvoiceView}) => {
  'use server'
  revalidatePath('/dashboard/sales/create') 
  console.log('invoiceView'+JSON.stringify(invoiceView.products[0]))
  let total = invoiceView.products.reduce((acc, item) => acc + Number(item.subtotal)!, 0)
  let customer:ICustomer = {
    name:invoiceView.name,     
    dni:invoiceView.dni,
    direccion:invoiceView.direccion, 
    paywith:invoiceView.paywith
  }
 
  let customerResponse = await addCustomer(customer) 
  const idcustomer:string  = customerResponse?.id!
  const options = {timeZone: 'America/Lima'}
  const date = new Date().toLocaleString('es-PE', options)
 
  const invoiceInsert:Invoice = { 
    id:undefined,
    customer_id:idcustomer,
    amount:total,
    date: (date),
    status:'paid',
  }
 
  let invoiceResponse = await AddInvoice(invoiceInsert)
 
  const idInvoice:string = invoiceResponse?.id!
  //update stock products 
  const response = invoiceView.products.map(async(product)=>{ 
    await UpdateStockProduct({productDataInvoice: product})
  })

  try{
    const updateresponse=await Promise.all(response)
 
  }
  catch(e){
    console.log(e)
  }
 
  const alldatainvoice: IDataInvoiceInsert[] = invoiceView.products.map((product) => {
    const dataInvoice: IDataInvoiceInsert = {     
      id_invoice:idInvoice,
      id_product: product.id!,
      name_product: product.name_product!, 
      quantity: product.quantity!, 
      subtotal: (product.price!*product.quantity!).toString()
    }
    return dataInvoice
  })
 
  const insertAwait= await addAllDataInvoices({ AllDataInvoices: alldatainvoice });
 
  
  revalidatePath('/dashboard/sales')
  redirect('/dashboard/sales')
}























export const SearchInvoiceTotalPages 
= async({query}:{query:string})=>{
  'use server'
  const response = await fetchInvoiceTotalPages(query)
  return response
}








export const CancelInvoiceById= async(id:string)=>{
  'use server'
  await CancelInvoice(id)
  revalidatePath('/dashboard/sales') 
  redirect('/dashboard/sales')

}
 