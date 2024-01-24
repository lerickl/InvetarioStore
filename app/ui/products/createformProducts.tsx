'use server';
 
import { createProduct } from "@/app/ui/serverComponents/products/products"
import {CreateProductPage} from "@/app/ui/components/products/products"
 
 
export async function FormProduct(

){
 
  return (
   
   <CreateProductPage accion={createProduct}/>
  )
}