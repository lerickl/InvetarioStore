'use server'
 
import { createProduct } from "@/app/ui/serverComponents/products/products"
import {CreateProductPage} from "@/app/ui/components/products/products"

import { IProduct } from "@/app/services/interfaces/product";
interface Props extends React.HTMLProps<Props>{ 
  searchSelected?:(query: string) => Promise<Array<IProduct>>,
 
}
export async function FormProduct({searchSelected}:Props){

  return (
   
   <CreateProductPage accion={createProduct} searchSelected={searchSelected}/>
  )
}