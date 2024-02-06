
import { Invoice } from '@/.lib/definitions';
import { Database } from './database.types' 
import { supabaseClient } from './dataConection'
import { IProduct, IProductRow } from './interfaces/product';
import { IDataInvoice } from './interfaces/dataInvoice'; 
export async function GetProductById(id:string){
  try{
    let { data, error } = await supabaseClient.from('products').select('*').eq('id', id);
    const products = data as Database['public']['Tables']['products']['Row'][]

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

interface Props{
  productDataInvoice:IDataInvoice
  //le mando el padre del que deseo actualizar recursivamente cambia cada que no encuentra junto con el hijo 
  updateFatherProduct?:IProduct
  updateChildProduct?:IProduct
}
export async function UpdateStockProduct({productDataInvoice,updateFatherProduct, updateChildProduct}:Props){
  
  //actualizar stock de producto padre
  if(updateFatherProduct && updateChildProduct){
      
      if(updateFatherProduct.stock!>0){
        const stockUpdate = updateFatherProduct.stock! - 1
        await supabaseClient.from('products').update({stock: stockUpdate}).eq('id', updateFatherProduct.id)
        //actualiza stock de producto hijo
        const stockUpdateChild:number = updateChildProduct.stock! + updateFatherProduct.units!
        await supabaseClient.from('products').update({stock: stockUpdateChild}).eq('id', updateChildProduct.id)
        UpdateStockProduct({productDataInvoice})
      
      }else{
        if(updateFatherProduct.id_product === null){
          return new Error('no se puede actualizar el stock de un producto sin Contenedor de este')
        }
        const productFather = await GetProductById(updateFatherProduct.id_product!)
      
        UpdateStockProduct({productDataInvoice, updateFatherProduct:productFather[0], updateChildProduct:updateFatherProduct})  
      }  
  }
  //datainvoice 
    //productDataInvoice es el producto que se esta vendiendo
    let poroductData:IProductRow[] = await GetProductById(productDataInvoice.id!)
    console.log(poroductData)
    if(productDataInvoice.id_product === null){
      return new Error('no se puede actualizar el stock de un producto sin Contenedor de este')
    }
    //si hay stock todo normal
    if(poroductData[0].stock != null && poroductData[0].stock >= 0 && poroductData[0].stock >= productDataInvoice.quantity!){
      //update product stock
      const stockUpdate = poroductData[0].stock - productDataInvoice.quantity!
      const { data, error } = await supabaseClient.from('products').update({stock: stockUpdate}).eq('id', poroductData[0].id)
      return data
    }else{ 
      //busca producto padre
      console.log(poroductData[0].id_product)
      if(poroductData[0].id_product === null){
        return new Error('no se puede actualizar el stock de un producto sin Contenedor de este')
      }else{
        let poroductFather:IProductRow[] = await GetProductById(poroductData[0].id_product!) 
   
      let totalunits= poroductData[0].stock! + (poroductFather[0].units!*poroductFather[0].stock!)
 
      if(productDataInvoice.quantity! <= totalunits){
        let CountstockUpdate:number = countStockUpdate(poroductFather[0].units!, 1, productDataInvoice.quantity!)
        //actualiza producto padre
        const stockUpdate = poroductFather[0].stock! - CountstockUpdate
        await supabaseClient.from('products').update({stock: stockUpdate}).eq('id', poroductFather[0].id)
        //actualiza producto hijo
        const stockUpdateChild = poroductData[0].stock! + (poroductFather[0].units! * CountstockUpdate)
        await supabaseClient.from('products').update({stock: stockUpdateChild}).eq('id', poroductData[0].id)
        UpdateStockProduct({productDataInvoice})
      }else {
        const productchild = poroductFather[0]
        if(poroductFather[0].id_product === null){
          return new Error('no se puede actualizar el stock de un producto sin Contenedor de este')
        }
        const productFather = await GetProductById(poroductFather[0].id_product!)
        UpdateStockProduct({productDataInvoice, updateFatherProduct:productFather[0], updateChildProduct:productchild})
      }
      }
      
    }
    
}
const countStockUpdate=(units:number, count:number, quantity:number ): number=>{
  const number= units * count
  if(number > quantity){
    return count
  }else{
    return countStockUpdate(units, count + 1, quantity)
  }
}
 