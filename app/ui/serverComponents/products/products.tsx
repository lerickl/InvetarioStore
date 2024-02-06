import { Database } from '@/app/services/database.types';
import {fetchProductTotalPages,deleteProduct, GetAllProducts,GetProductById, SearchProductBarcode, searchProduct,addProduct, updateProduct } from '../../../services/productServices'
import {z} from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'; 
export const Allproducts = async()=>{
  'use server'
  const response = await GetAllProducts();
  return response
}
export const SearchProduct = (async(barcode:string)=>{
  'use server'
  const response = await SearchProductBarcode(barcode)
 
  return response
})  

export const SearchProductBC = (async(
  {query, currentPage}:{query:string, currentPage:number})=>{
  'use server'
  revalidatePath(`/dashboard/store/products?query=${query}&page=${currentPage}`)
  const response = await searchProduct(query, currentPage)
 
  return response
})

export const SearchProductBCTotalPages=(async(query: string)=>{
  'use server'
  const response = await fetchProductTotalPages(query)
  return response
})

 
export const createProduct = async(formData:FormData)=>{
  'use server'

  const FormSchema=z.object({
    id: z.string().uuid(), 
    barcode: z.string(),
    category: z.string(),
    created_at: z.date(),
    description: z.string().min(1),
    name: z.string().min(1),
    price: z.string(),
    stock: z.number(),
    units: z.number(),
    urlimage: z.string().url(),
  })
 
  const createFormProduct= FormSchema.omit({id:true,created_at: true, urlimage: true, price: true})

  const {barcode, category, description, name,units, stock} = createFormProduct.parse({
      barcode: formData.get('barcode') as string,
      category: formData.get('category') as string, 
      description: formData.get('description') as string,
      name: formData.get('name') as string,   
      stock: Number(formData.get('stock')), 
      units: Number(formData.get('units')),
    })
 
  let price: string | undefined = formData.get('price')?.toString().replace('S/', '')?.replace(/[\.]/g, '')?.replace(/[\,]/g, '.');
  let id_product: string = formData.get('id_product') as string;
  const response = await addProduct({id_product,barcode, category, description, name, price: Number(price), stock , units});

  revalidatePath('/dashboard/store')
  redirect('/dashboard/store')
}

export const EditProduct = async(formData:FormData)=>{
  'use server'
  console.log(formData)
  const FormSchema=z.object({
    id: z.string().uuid(),
    id_product: z.string(),
    barcode: z.string().min(1),
    category: z.string(),
    created_at: z.date(),
    description: z.string().min(1),
    name: z.string().min(1),
    price: z.string(),
    stock: z.number(),
    urlimage: z.string().url(),
    units: z.number(),
  })
 
  const createFormProduct= FormSchema.omit({created_at: true, urlimage: true, price: true})
  
  const {id,id_product, barcode, category, description, name, stock, units} = createFormProduct.parse({
      id: formData.get('id') as string,
      id_product: formData.get('id_product') as string,
      barcode: formData.get('barcode') as string,
      category: formData.get('category') as string, 
      description: formData.get('description') as string,
      name: formData.get('name') as string,   
      stock: Number(formData.get('stock')), 
      units: Number(formData.get('units')),
    })
  
  let price: string | undefined = formData.get('price')?.toString().replace('S/', '')?.replace(/[\.]/g, '')?.replace(/[\,]/g, '.');
 
  const response =  await updateProduct({id,id_product,barcode, category, description, name, price: Number(price), stock, units} )
  revalidatePath('/dashboard/store')
  redirect('/dashboard/store')

}
 
 

export const SearchProductById = async(id:string)=>{
  'use server'
  revalidatePath(`/dashboard/store/products/[${id}]/edit`,'page')

  const response = await GetProductById(id)
 
  return response
}

export const DeleteProductById = async(id:string)=>{

  'use server'
  const response = await deleteProduct(id)
  revalidatePath('/dashboard/store')
  redirect('/dashboard/store')
  return response

}



export const SelectSearchProduct = async(query:string)=>{
  'use server'
  revalidatePath(`/dashboard/sales/create?query=${query}`)
  const response = await searchProduct(query,1)
  revalidatePath(`/dashboard/store/products/${response[0].id}/edit/page`)

  return response
}


export const SearchProductoBarcode = async(query:string)=>{
  'use server'
  const response = await SearchProductBarcode(query)
  return response
}