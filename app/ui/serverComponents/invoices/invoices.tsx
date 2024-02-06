import {getAllInvoices, AddInvoice, fetchInvoiceTotalPages } from '../../../services/invoicesService'
import { DataInvoice, IInvoice } from '@/app/services/interfaces/invoice'
import {  addAllDataInvoices } from '@/app/services/dataInvoices'
import { UpdateStockProduct} from '@/app/services/productServices'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import {ICustomer} from '@/app/services/interfaces/customer'
export const AllInvoices = async()=>{
  'use server'
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
  console.log(invoiceView)
  let total = invoiceView.products.reduce((acc, item) => acc + item.subTotal!, 0)
  let customer:ICustomer = {
    name:invoiceView.name,     
    dni:invoiceView.dni,
    direccion:invoiceView.direccion, 
    paywith:invoiceView.paywith
  }
  let customerResponse = await addCustomer(customer)
  console.log('customerResponse'+customerResponse.id)
  const idcustomer:string  = customerResponse?.id!

  const invoiceInsert:IInvoice = {
    customer_id:idcustomer,
    amount:total,
    status:'paid',
  }
  //addinvoice
  let invoiceResponse = await AddInvoice(invoiceInsert)
  console.log('invoiceResponse'+invoiceResponse.id)
  const idInvoice:string = invoiceResponse?.id!
  //update stock products 
  const response = invoiceView.products.map(async(product)=>{ 
    await UpdateStockProduct({productDataInvoice: product})
  })
  try{
    const updateresponse=await Promise.all(response)
    console.log('updateresponse'+updateresponse)
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
  console.log('insertAwait'+insertAwait)
  
  revalidatePath('/dashboard/sales')
  redirect('/dashboard/sales')
}

export const SearchInvoiceTotalPages 
= async({query}:{query:string})=>{
  'use server'
  const response = await fetchInvoiceTotalPages(query)
  return response
}

 