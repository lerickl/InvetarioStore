'use client'
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { InputSearch } from '../inputs/input'
import styles from './search.module.css'
import {useDebouncedCallback} from 'use-debounce'
 
export  function SearchData(
  {placeholder}: {placeholder: string}
)
{
  const searchParams=useSearchParams()
  const pathname=usePathname()
  const {replace} = useRouter()
  const handlerSearch=useDebouncedCallback((term)=>{
    console.log(`Searching... ${term}`);
    const params = new URLSearchParams(searchParams)
    params.set('page', '1')
    if(term){
      params.set('query', term)
    }
    else{
      params.delete('query')
    }
    replace(`${pathname}?${params.toString()}`)
  },300)
  return (
    <section className={styles.sectionSearch}>
      
      <InputSearch
        type="text"
        placeholder={placeholder}
        onChange={(e)=>{
          handlerSearch(e.target.value)
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
    </section>
  )
}
