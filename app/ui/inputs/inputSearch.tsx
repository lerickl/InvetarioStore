import styles from './inputs.module.css'
import { SearchIcon } from '../assets/icons'
import { SetStateAction, useState, useEffect } from 'react'
import { CheckboxSearch } from "@/app/ui/checkboxs/checkboxSearch"
import { IProduct } from '@/app/services/interfaces/product';
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  defaultValue?: string;
  producto?: ((product: IProduct) => void) ;
  SearchProductoBarcode?: (barcode: string) => Promise<IProduct>
}
export const SearchProduct=({children, name, defaultValue,producto,SearchProductoBarcode, ...Props}:Props)=>{
  const [checkedSearch, setCheckedSearch] = useState(false)
  const [searchBarcode, setSearchBarcode] = useState('')
  const [data, setData] = useState<IProduct | undefined>()
  const onFocusState = () => {
    setCheckedSearch(!checkedSearch)
  }
  const handlerChange=(event: { target: { value: SetStateAction<string> } })=>{
   
    setSearchBarcode(event.target.value)
      
  }
  useEffect(() => {
   
    const delayDebounceFn = setTimeout(async() => {
      if (searchBarcode) {
        setSearchBarcode(searchBarcode)
        // 
        if(SearchProductoBarcode){
          const product=await SearchProductoBarcode(searchBarcode) 
          setData(product)
        }
     
      }
      
    }, 500)

    return () => clearTimeout(delayDebounceFn);
  },[searchBarcode])
  useEffect(() => {
    if (data) {
      producto && producto(data)
    }
  
    setSearchBarcode('')
    
  }, [data])
  return(
    <div className={styles.inputSearchProduct}>
      <SearchIcon/>
      <input id="inputSearch"  
       className={`${checkedSearch? styles.inputActive : ''}`}
      onFocus={onFocusState}
      onBlur={onFocusState}
      onChange={handlerChange}
      value={searchBarcode}
       {...Props}/>
      <CheckboxSearch readOnly checked={checkedSearch}/>
     
    </div>
  )
}