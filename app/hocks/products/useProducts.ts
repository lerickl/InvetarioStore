
import React, {useState, useCallback} from 'react'
import { IProduct } from '@/app/services/interfaces/product'
 
export const useProducts = () => {
  const [products, setProducts] = useState<Array<IProduct>>()
  const [loading, setLoading] = useState(false)
  
  const getProducts = useCallback(async (name:string, selectProduct: (query: string) => Promise<Array<IProduct>>) => {
    try{
      setLoading(true)
      const products: Array<IProduct>| null =
       await selectProduct(name)
      if (products !== null) {
        setProducts(products)
   
      }
      console.log(products)
    }catch(err){
      console.log(err)
    }
    finally{
      setLoading(false)
    }
  }, [])

  return {
    products,
    getProducts,
    loading
  }
}