
'use server'
import { EditProduct } from "@/app/ui/serverComponents/products/products"
import {EditProductPage} from "@/app/ui/components/products/products"
import {GetProductById} from "@/app/services/productServices"
import {SearchProductById} from '@/app/ui/serverComponents/products/products'
import { Suspense } from "react";
export async function FormEditProduct(
  {id}:{id: string}
){

  let product = await SearchProductById(id)
  
  return (
 
  <EditProductPage product={product[0]} accion={EditProduct}/>
 
   )
}