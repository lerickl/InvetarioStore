import {supabaseClient} from './dataConection'
export const getAllCustomers = async () => {
  const { data, error } = await supabaseClient.from('customers').select('*')
  try{
    return data
  }catch(e){
    return error
  }
}
export const getCustomerCount = async () => {
  const { data, error } = await supabaseClient.from('customers').select('*',{count:'exact'})
  try{
    return data
  }catch(e){
    return error
  }
}