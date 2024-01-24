
import {useState, useCallback} from 'react'
import { GetAllProducts } from '../services/dbServices'
import { Database } from '../services/database.types'
 

export const useProducts = () => {
  const [products, setProducts] = useState<Array<Database['public']['Tables']['products']['Row']>>()
  const [loading, setLoading] = useState(false)
  
  const getProducts = useCallback(async () => {
    try{
      setLoading(true)
      const products: Array<Database['public']['Tables']['products']['Row']>| null =
       await GetAllProducts()
      if (products !== null) {
        setProducts(products)
   
      }
      
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