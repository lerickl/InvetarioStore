
import {supabaseClient} from './dataConection'
import { getAlldataInvoicesWithIdInvoice } from './dataInvoices'
import { Database } from './database.types'
 
export const getAllInvoices = async () => {
  type Invoice = Database['public']['Tables']['invoices']['Row']
  try{
    const { data, error } = await supabaseClient.from('invoices').select('*').order('date', {ascending: false})
    return data as Array<Invoice>
  }catch(e){
    throw new Error()
  }
}
export const getInvoiceById = async (id: string) => {
  type Invoice = Database['public']['Tables']['invoices']['Row']
  try{
    const { data, error } = await supabaseClient.from('invoices').select('*').eq('id', id)
    return data as Array<Invoice>
  }catch(e){
    throw new Error()
  }
}
export const getInvoicesCount = async () => {
  const { data:invoices, error } = await supabaseClient.from('invoices').select(`*`)
  try{
    return invoices?.length.toString()
  }catch(e){
    return error
  }
}
export const getinvoiceStatusPromise = async () => {
  
  const { data, error } = await supabaseClient.from('invoices').select('*')
  const { totalPaid, totalPending } = data!.reduce(
    (acc, invoice) => {
      if (invoice.status === 'paid') {
        acc.totalPaid += invoice.amount;
      } else if (invoice.status === 'pending') {
        acc.totalPending += invoice.amount;
      }
      return acc;
    },
    { totalPaid: 0, totalPending: 0 }
  );

 
  
  return {
    totalPaid,
    totalPending, 
  }
}

export const AddInvoice = async (invoice: Database['public']['Tables']['invoices']['Insert']) => {
 
  const { data, error } = await supabaseClient.from('invoices').insert(invoice).select()
  try{ 
   
    return data?.[0]
  }catch(e){
    throw new Error(error?.message)
  }
}


export const DeleteInvoice = async (id: string) => {
  const { data, error } = await supabaseClient.from('invoices').delete().match({id})
  try{ 
    return data
  }catch(e){
    throw new Error()
  }
}


export async function SearchInvoice(
  query: string,
  currentPage: number,
) {
  const itemsPerPage = Number(10)
  const offset = (currentPage - 1) * itemsPerPage
  try {
    const { data, error } = await supabaseClient.from('invoices').select('*').ilike('name', `%${query}%`).range(offset, offset + itemsPerPage - 1)
    return data as Array<Database['public']['Tables']['invoices']['Row']>
  } catch (err) {
    throw err
  }
}
export async function fetchInvoiceTotalPages(query: string) {
  const itemsPerPage = Number(10)
  try {
    const { data, error } = await supabaseClient.from('invoices').select('*').ilike('customer_id', `%${query}%`)
    const invoices = data as Array<Database['public']['Tables']['invoices']['Row']>
    const totalPages = Math.ceil(invoices.length / itemsPerPage)

    return totalPages
  } catch (err) {
    throw err
  }
}


export async function CancelInvoice(id: string) {
  const invoice = await getInvoiceById(id)
  const getAllDataInvoices = await getAlldataInvoicesWithIdInvoice(id)
  const updateStockProducts= getAllDataInvoices.map(async (product)=>{
    const { data, error } = await supabaseClient.from('products').select('*').eq('id', product.id_product)
    const productData = data as Array<Database['public']['Tables']['products']['Row']>
    const newStock = productData[0].stock! + product.quantity!
    const { data: updatedProduct, error: errorUpdate } = await supabaseClient.from('products').update({stock: newStock}).eq('id', product.id_product)
    return updatedProduct
  })
  try{
    const response = await Promise.all(updateStockProducts)
    const { data, error } = await supabaseClient.from('invoices').update({status: 'canceled'}).eq('id', id)
    return data
  }
  catch(e){
    throw new Error()
  } 
  return   
}