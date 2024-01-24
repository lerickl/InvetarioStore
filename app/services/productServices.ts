
import { Invoice } from '@/.lib/definitions';
import { Database } from './database.types' 
import { supabaseClient } from './dataConection'

export async function GetProductById(id:string){
  try{
    let { data, error } = await supabaseClient.from('products').select('*').eq('id', id);
    const products = data as Array<Database['public']['Tables']['products']['Row']>
  
    return products
  }catch(err){
    throw err
  }
 

}
export async function GetAllProducts(){
  try{
    let { data, error } = await supabaseClient.from('products').select('*');
    const products = data as Array<Database['public']['Tables']['products']['Row']>
    return products
  }catch(err){
    throw err
  }
 
}
export async function SearchProductBarcode(barcode:string){
  try{
    const { data, error } = await supabaseClient.from('products').select('*').eq('barcode', barcode);
    const products = data as Array<Database['public']['Tables']['products']['Row']>
    return products[0] as Database['public']['Tables']['products']['Row']
  }catch(err){
    throw err
  }
 
}
const itemsPerPage = Number(5)
export async function searchProduct(
  query:string,
  currentPage:number,
){
  const offset = (currentPage - 1) * itemsPerPage
  try{
    const { data, error } = await supabaseClient.from('products').select('*').ilike('name', `%${query}%`).range(offset, offset + itemsPerPage - 1)
    const products = data as Array<Database['public']['Tables']['products']['Row']>
    return products
  }catch(err){
    throw err
  }
}
export async function fetchProductTotalPages(query:string){
  try{
    const { data, error } = await supabaseClient.from('products').select('*').ilike('name', `%${query}%`)
    const products = data as Array<Database['public']['Tables']['products']['Row']>
    const totalPages= Math.ceil(products.length / itemsPerPage)
    
    return totalPages
  }catch(err){
    throw err
  }
}

export async function addProduct(Data:Database['public']['Tables']['products']['Insert']){
  try{
    
    const {data, error}= await supabaseClient.
    from('products').
    insert(Data)
    return data
  } catch(err){
    throw err;
  }
}

export async function updateProduct(Data:Database['public']['Tables']['products']['Update']){
  try{
    const { data, error } = await supabaseClient.from('products').update(Data).eq('id', Data.id)
    return data
    if(error) throw error
  }catch(err){
    throw err
  }
}

export async function deleteProduct(id:string){
  try{
    const { data, error } = await supabaseClient.from('products').delete().eq('id', id)
    return data
    
  }catch(err){
    throw err
  }
}