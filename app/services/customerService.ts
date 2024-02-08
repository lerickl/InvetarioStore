import {supabaseClient} from './dataConection'
import { Database } from './database.types'
import { ICustomer } from './interfaces/customer'
export const getAllCustomers = async () => {
  const { data, error } = await supabaseClient.from('customers').select('*')
  try{
    return data
  }catch(e){
    return error
  }
}
export const getCustomerById = async (id: string) => {
  const { data, error } = await supabaseClient.from('customers').select('*').eq('id', id)
  try{
    return data as Database['public']['Tables']['customers']['Row'][]
  }catch(e){
    throw e
  }

}
export const getCustomerCount = async () => {
  const { data, error } = await supabaseClient.from('customers').select('*')
  try{
    return data?.length.toString()
  }catch(e){
    return error
  }
}
export const addCustomer = async (customer:ICustomer) => {
  const {data, error}  = await supabaseClient.from('customers').insert([customer]).select()
  try{
    // return data as Database['public']['Tables']['customers']['Insert']
    return data?.[0] as Database['public']['Tables']['customers']['Insert']
  }catch(e){
     throw e  
    }

}