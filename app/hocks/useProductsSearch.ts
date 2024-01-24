
import {  useState, useCallback, } from 'react'
import {SearchProduct} from '../services/dbServices'
import { Database } from '../services/database.types'
export const useSearchProducts = () => {
  const [products, setProducts] = 
  useState<Array<Database['public']['Tables']['products']['Row']>>()

  const getProducts = useCallback(async (barcode:string) => {
    try{

      const productsSearch = await SearchProduct(barcode)
      if (productsSearch !== null) {
        setProducts(productsSearch)
        console.log('getproducts'+products)
        return products
      }
    }catch(err){
      console.log('getproducts Error')
    }
    finally{
    
    }

  }, [])
  
  return {getProducts, products}
}