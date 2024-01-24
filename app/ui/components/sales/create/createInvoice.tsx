'use client'
import styles from './createinvoice.module.css'
import { CheckboxSearch } from "@/app/ui/checkboxs/checkboxSearch"
import { useState, useEffect, SetStateAction, useCallback, HtmlHTMLAttributes } from 'react'
import {useSearchProducts} from '@/app/hocks/useProductsSearch'
import { useAddDataInvoice } from '@/app/hocks/invoices/useInvoice'
import { TableInvoice } from '@/app/ui/tables/tableRegisterInvoice'
// import { useSearchParams, usePathname, useRouter } from 'next/navigation'
// import {  SearchProduct } from '@/app/ui/serverComponents/products/products'
import { Database } from '@/app/services/database.types'
import { HtmlProps } from 'next/dist/shared/lib/html-context.shared-runtime'
import { DataInvoice } from '@/app/services/interfaces/invoice'
interface Props extends React.HTMLAttributes<HtmlProps> {
  accion?: ({ AllDataInvoices }: {
    AllDataInvoices: Array<DataInvoice>;
}) => Promise<void>
   
}
 
export function CreateInvoice({children, accion }:Props){
  // const searchparams= useSearchParams()
  // const pathname= usePathname()
  // const {replace} = useRouter()
  const [checkedSearch, setCheckedSearch] = useState(false)
  const [searchBarcode, setSearchBarcode] = useState('')
  const {products, getProducts } = useSearchProducts()
  const {invoice, addProduct} = useAddDataInvoice()
  const [producto, setProducto] = useState<Array<Database['public']['Tables']['products']['Row']>>()
  const onFocusState = () => {
    setCheckedSearch(!checkedSearch)
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
 
      }
      
    }, 500)

    return () => clearTimeout(delayDebounceFn);
  },[searchBarcode])
  useEffect(() => {
    //const productos = producto && producto[0]
    const product = products && products[0];
    if (product) {
      addProduct(product);
      setSearchBarcode('')
      
    }
  }, [products])
  return (

    <section className={styles.CreateInvoice} >
      <div className={styles.search}>
        <input 
        className={`${checkedSearch? styles.inputActive : ''}`}
        title="search"
        onChange={handlerChange}
        value={searchBarcode}
        onFocus={onFocusState}
        onBlur={onFocusState}
        
        />
        <CheckboxSearch readOnly checked={checkedSearch}/>
      </div>
      <TableInvoice Invoice={invoice} accion={accion}/>
 
      
    </section>
  )

}




 