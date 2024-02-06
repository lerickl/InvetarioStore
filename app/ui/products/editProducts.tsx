
'use server'
import { EditProduct } from "@/app/ui/serverComponents/products/products"
import {EditProductPage} from "@/app/ui/components/products/products"
import {GetProductById} from "@/app/services/productServices"
import {SearchProductById} from '@/app/ui/serverComponents/products/products'
import { IProduct } from "@/app/services/interfaces/product"
interface Props {
  id: string,
  searchSelected?:(query: string) => Promise<Array<IProduct>>,
}
export async function FormEditProduct( {id,searchSelected}:Props){

  let product = await SearchProductById(id)
  let productFather=await GetProductById(product[0].id_product!)
  console.log(product)
  return (
 
  <EditProductPage product={product[0]} accion={EditProduct} searchSelected={searchSelected}/>
 
   )
}