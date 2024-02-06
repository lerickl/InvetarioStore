 
import {supabaseClient} from './dataConection'
import { Database } from './database.types'
export const addDataInvoices = async (DataInvoice: Database['public']['Tables']['DataInvoice']['Insert']) => {
  const { data, error } = await supabaseClient.from('DataInvoice').insert([DataInvoice])
  try{
    return data  
  }catch(e){
    throw e
  }
}
export const getAlldataInvoicesWithIdInvoice = async (id_invoice: string) => {
  const { data, error } = await supabaseClient.from('DataInvoice').select('*').eq('id_invoice', id_invoice)
  try{
    return data as Array<Database['public']['Tables']['DataInvoice']['Row']>   
  }catch(e){
    throw e
  }

}
export const addAllDataInvoices = async({AllDataInvoices}:{AllDataInvoices:Array<Database['public']['Tables']['DataInvoice']['Insert']>})=>{

  const response= AllDataInvoices.map(async(DataInvoice)=>{
    const { data, error } = await supabaseClient.from('DataInvoice').insert([DataInvoice])
    try{
      return data  
    }catch(e){
      throw e
    }
  })
  return await Promise.all(response)
}