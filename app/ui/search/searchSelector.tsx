 
import React, { useEffect, useState, SetStateAction, useCallback } from 'react'
import { Input } from '../inputs/input'
import styles from './search.module.css' 
import { IProduct } from '@/app/services/interfaces/product'
import { FormatMoneda } from '../formatToMoneda/fornatMoneda'
 

interface Props extends React.HTMLProps<Props>{
  listProducts?: IProduct[],
  selectProduct?: (query: string) => Promise<Array<IProduct>>,
  producto?: (product:IProduct)=>void,
}
export const SearchSelected = (
  {listProducts, selectProduct,producto,children}:Props) => {

  const [listProductsxd, setListProductsxd] = useState<IProduct[] | undefined>(listProducts)
  const [listProductsx, setListProductsx] = useState(listProducts)
  const [searchProducto, setSearchProducto] = useState('')
  const [data, setData] = useState<IProduct[] | undefined>(listProducts)
  const handlerChange=(event: { target: { value: SetStateAction<string> } })=>{
   
    setSearchProducto(event.target.value) 
  } 
  const onClickOption =(id:string)=>{

    if(producto){
      listProductsxd?.find((index)=>{
        if(index.id===id){
          producto(index)
        }
      })
      // producto(id)
    } 
    setSearchProducto('')
    setListProductsx(undefined)
  }
  useEffect(() => {
    const delayDebounceFn = setTimeout( async() => {
      if (searchProducto) { 
        setSearchProducto(searchProducto) 
        if(selectProduct){
          const data = await selectProduct(searchProducto) 
          setListProductsx(data)
        }  
      } 
    }, 500)

    return () => clearTimeout(delayDebounceFn);
  },[searchProducto])
  useEffect(() => { 
    setListProductsxd(listProductsx) 
  }, [listProductsx])
  return (
    <section className={styles.section}>
      <div>
        <Input
          type="text"
          name="searchWithName"
          onChange={handlerChange}
          value={searchProducto}
          required
          >{children}</Input> 
        <div className={`${listProductsxd?styles.contentSearch:''}`}>
          {
            listProductsxd?.map((product: any) => {
              return (              
                <div key={product.id} className={styles.listProducts}>
                  <a onClick={()=>{onClickOption(product.id)}}>
                    <p className={styles.name}>{product.name}</p>
                    <p className={styles.price}>{ FormatMoneda({format:product.price})}</p> 
                  </a>
                </div> 
              )
            })
          }
        </div>
      </div>
    </section>
  )


}