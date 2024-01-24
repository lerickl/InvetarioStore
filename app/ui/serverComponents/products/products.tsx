import { Database } from '@/app/services/database.types';
import {fetchProductTotalPages,deleteProduct, GetAllProducts,GetProductById, SearchProductBarcode, searchProduct,addProduct, updateProduct } from '../../../services/productServices'
import {z} from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation';
import page from '@/app/dashboard/store/products/[id]/edit/page';
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
    barcode: z.string().min(1),
    category: z.string(),
    created_at: z.date(),
    description: z.string().min(1),
    name: z.string().min(1),
    price: z.number(),
    stock: z.number(),
    urlimage: z.string().url(),
  })
 
  const createFormProduct= FormSchema.omit({id:true,created_at: true, urlimage: true})

  const {barcode, category, description, name, price, stock} = createFormProduct.parse({
      barcode: formData.get('barcode') as string,
      category: formData.get('category') as string, 
      description: formData.get('description') as string,
      name: formData.get('name') as string,  
      price: Number(formData.get('price')),
      stock: Number(formData.get('stock')), 
    })
  

  const response =  await addProduct({barcode, category, description, name, price, stock})
 
  revalidatePath('/dashboard/store')
  redirect('/dashboard/store')
}

export const EditProduct = async(formData:FormData)=>{
  'use server'
  console.log(formData)
  const FormSchema=z.object({
    id: z.string().uuid(),
    barcode: z.string().min(1),
    category: z.string(),
    created_at: z.date(),
    description: z.string().min(1),
    name: z.string().min(1),
    price: z.number(),
    stock: z.number(),
    urlimage: z.string().url(),
  })
 
  const createFormProduct= FormSchema.omit({created_at: true, urlimage: true})

  const {id, barcode, category, description, name, price, stock} = createFormProduct.parse({
      id: formData.get('id') as string,
      barcode: formData.get('barcode') as string,
      category: formData.get('category') as string, 
      description: formData.get('description') as string,
      name: formData.get('name') as string,  
      price: Number(formData.get('price')),
      stock: Number(formData.get('stock')), 
    })
  

  const response =  await updateProduct({id,barcode, category, description, name, price, stock} )
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