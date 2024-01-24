import { useMemo, useState } from 'react' 
import { Database } from '../services/database.types'
import {ISales} from '../services/interfaces/sales.types'
import { ISalesView } from '../services/interfaces/viewsales.types'
export  function useAddSale() {
 
  const [listSale, setListSale] = useState<Array<ISalesView>>([])
  
  const addProduct = (product: Database['public']['Tables']['products']['Row']) => {
    // Verificar si el producto ya existe en el estado sales
    if(listSale.find((item) => item.barcode === product.barcode)){
      return listSale.map((item) => {
        if(item.barcode === product.barcode){
          item.quantity = item.quantity! + 1
          item.total = Number(item.price) * Number(item.quantity)
          setListSale([...listSale])
        }
      })
    }
    
    const newSale:ISalesView = {
      name: product.name,
      quantity: 1,
      price: product.price,
      barcode: product.barcode,
      total: product.price
    }
 
 // Asignar el nuevo objeto newSale al estado sales
    setListSale(listSale.concat(newSale)) 
  }
  return { addProduct, listSale }
}