'use server'
import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types' 
import { cookies } from 'next/headers'
import {revenue } from '../mock/data'

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// export default async function CreateDBClientsupabase() {
//   if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
//     throw new Error('Las variables de entorno no definidas');
//   }
//   //  const supabase = createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
//   const supabase = createServerComponentClient({cookies})
//   const {data: products} = await supabase.from('products').select()
//   return (
//    <div>
//     {JSON.stringify(products,null,2)}
//    </div>
//   )
// }

 
export async function createProduct(formData: FormData) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error('Las variables de entorno no definidas');
  }
  // const supabase = createServerComponentClient({cookies})
  const supabase = createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  const datall:Database['public']['Tables']['products']['Insert']={
    barcode: formData.get('barcode') as string,
    category: formData.get('category') as string,
    description: formData.get('description') as string,
    name: formData.get('name') as string,
    price: Number(formData.get('price')),
    stock: Number(formData.get('stock')),
    urlimage: formData.get('urlimage') as string,
     
    
  } 
  console.log(formData)
  console.log(datall)
  const { data, error } = await supabase
  .from('products')
  .insert(datall)
  .select()  

}
//service
export async function GetAllProducts() {
 
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error('Las variables de entorno no definidas');
  }
  try{
    const supabase = createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
       
    const { data: products, error } = await supabase.from('products').select('*');
    return products
  }catch(e){throw  new Error('error ')}
 
  

}
export const SearchProduct = async (barcode:string) => {
  if (barcode==='') return null
  try{
    const supabase = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data: products, error } = await supabase.from('products').select('*').eq('barcode',barcode);
    return products
  }
  catch(e){
    console.log('error en el servicio de busqueda')
    throw  new Error('error ') }
}

//Total Revenue
export const TotalRevenue = async () => {
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  try{
    await new Promise((resolve) => setTimeout(resolve, 3000));
    // const { data: revenue, error } = await supabase.from('revenue').select('*');
    // return revenue
    return revenue
  }
  catch(e){
    console.log('error en el servicio de busqueda')
    throw  new Error('error ') }
}