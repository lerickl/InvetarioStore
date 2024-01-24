'use client'
import {CheckboxSearch} from '../checkboxs/checkboxSearch'
import {  SetStateAction, useEffect, useState } from 'react'
import styles from './search.module.css'
import {useSearchProducts} from '../../hocks/useProductsSearch'

import {useAddSale} from '../../hocks/useListSales'
import TableRegisterSales from '../tables/tableRegisterSales'

export default function Search() {
  
  const [checked, setChecked] = useState(false)
  const {addProduct,listSale} = useAddSale()
  const [searchBarcode, setSearchBarcode] = useState('')
  const {products, getProducts } = useSearchProducts()

  const onFocusState = () => {
    setChecked(!checked)
  }
  const handlerChange=(event: { target: { value: SetStateAction<string> } })=>{
    
    setSearchBarcode(event.target.value)
   
   
  }
 
  useEffect(() => {
   
    const delayDebounceFn = setTimeout(() => {
      if (searchBarcode) {
        console.log(searchBarcode);
        setSearchBarcode(searchBarcode)
        // 
        getProducts(searchBarcode)
        console.log('getproducts enviado')
      }
      
    }, 1000)

    return () => clearTimeout(delayDebounceFn);
  },[searchBarcode])

  useEffect(() => {
 
    const product = products && products[0];
    if (product) {
      addProduct(product);
      setSearchBarcode('')
      
    }
  }, [products])
  return (
    <section className={styles.search}>
      <h1>Scanner Codigo Barras</h1>
      <div>
        <input 
        className={styles.input}
        title="search"
        onChange={handlerChange}
        value={searchBarcode}
        onFocus={onFocusState}
        onBlur={onFocusState}/>
        <CheckboxSearch state={checked}/> 
        
      </div>
      <article  >
        <TableRegisterSales sales={listSale}/>
        <div className='mt-8 flex column'>{JSON.stringify(listSale)}</div>
        </article>

    </section>
  )
} 
//esta funcion es element, mover el codigo a un archivo 
//que sea un componente que maneje toda esta area  