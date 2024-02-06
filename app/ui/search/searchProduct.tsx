 
import React, { useEffect, useState, SetStateAction, useCallback } from 'react'
import { Input } from '../inputs/input'
import styles from './search.module.css' 
import { IProduct } from '@/app/services/interfaces/product'
import { FormatMoneda } from '../formatToMoneda/fornatMoneda'
 

interface Props extends React.HTMLProps<Props>{
  selectProduct?: (query: string) => Promise<Array<IProduct>>,
 
  searchSelectedProduct:(product:{product:IProduct})=>void
}
export const SearchProduct = (
  {selectProduct,searchSelectedProduct,children}:Props) => {
  const [listProducts, setListProducts] = useState<IProduct[] | undefined>() 
  const [searchProducto, setSearchProducto] = useState('') 
  const handlerChange=(event: { target: { value: SetStateAction<string> } })=>{
   
    setSearchProducto(event.target.value) 
  } 
  const onClickOption =(id:string)=>{
    console.log('boton precionado')
    console.log(id)   
    listProducts?.find((index)=>{
      if(index.id===id){
        searchSelectedProduct({product:index})        
      }
    })     
    setSearchProducto('')
    setListProducts(undefined)
  }
  useEffect(() => {
    const delayDebounceFn = setTimeout( async() => {
      if (searchProducto) {
        console.log(searchProducto);
        setSearchProducto(searchProducto) 
        if(selectProduct){
          const data = await selectProduct(searchProducto) 
          setListProducts(data)          
        }  
      } 
    }, 500)

    return () => clearTimeout(delayDebounceFn);
  },[searchProducto])
  useEffect(() => {
    if(searchProducto===''){
      setListProducts(undefined)
    }
  }  ,[searchProducto])
  return (
    <section className={styles.sectionSearch}>
      <div>
        <Input
          type="text"
          title='Buscar Producto'
          onChange={handlerChange}
          value={searchProducto}
          required
          >{children}</Input> 
        <div className={`${listProducts?styles.contentSearchProduct:''}`}>
          {
            listProducts?.map((product: any) => {
              return (              
                <div key={product.id} className={styles.listProductssearch}>
                  <a onClick={()=>{onClickOption(product.id)}}>
                    <p className={styles.name}>{product.name}</p>
                    <p className={styles.name}>{product.units}</p>
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