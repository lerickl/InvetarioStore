 
import {supabaseClient} from './dataConection'
import { Database } from './database.types'
 
export const getAllInvoices = async () => {
  type Invoice = Database['public']['Tables']['invoices']['Row']
  try{
    const { data, error } = await supabaseClient.from('invoices').select('*')
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
  const { data, error } = await supabaseClient.from('invoices').insert([invoice]).select()
  try{ 
    return data?.[0]
  }catch(e){
    throw new Error()
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