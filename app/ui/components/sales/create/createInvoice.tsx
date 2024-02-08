'use client'
import styles from './createinvoice.module.css'
 
import { useState, useEffect } from 'react'
import {useSearchProducts} from '@/app/hocks/useProductsSearch'
import { useAddDataInvoice } from '@/app/hocks/invoices/useInvoice'
import { TableInvoice } from '@/app/ui/tables/tableRegisterInvoice'
 
import { DataInvoice } from '@/app/services/interfaces/invoice'
import { FomrtCustomers } from '@/app/ui/customers/formCreateCustomers'
import {SearchProduct} from '@/app/ui/inputs/inputSearch'
import {SearchSelected} from '@/app/ui/search/searchSelector'
import { IProduct } from '@/app/services/interfaces/product'
 
import { IInvoiceView } from '@/app/services/interfaces/invoiceView.types'
import { ButtonRipple } from '@/app/ui/buttons/buttonRipple'
 
interface Props   {
  accion?: ({ AllDataInvoices }: {AllDataInvoices: Array<DataInvoice>}) => Promise<void>;
  selectProduct?: (query: string) => Promise<Array<IProduct>>;
  SearchProductoBarcode?: (barcode: string) => Promise<IProduct>;
  addinvoiceView?:({ invoiceView }: {
    invoiceView: IInvoiceView
  }) => Promise<null[]>
  
}
 
export function CreateInvoice({ accion, selectProduct,SearchProductoBarcode, addinvoiceView }:Props){
 
  
  const [searchBarcode, setSearchBarcode] = useState('')
  const {products, getProducts } = useSearchProducts()
  const {invoice, addProduct, deleteDataProduct} = useAddDataInvoice()  
  const [deleteProduct, setDeleteProduct] = useState('')
  const DataSearch = (DatosSearch:IProduct)=>{
    addProduct(DatosSearch)
  }
  useEffect(() => {
    if(deleteProduct){
     deleteDataProduct(deleteProduct)
    }
  }  ,[deleteProduct])

  useEffect(() => {
   
    const delayDebounceFn = setTimeout(() => {
      if (searchBarcode) {
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
  const [name, setName] = useState('')
  const [direccion, setDireccion] = useState('')
  const [dni, setDni] = useState('')
  const [paywith, setPaywith] = useState('')
    
  const saveInvoice =  () => {
    if(invoice.length === 0){
      console.log('no hay productos')
      return
    }
    const invoiceView:IInvoiceView = {
      name,
      direccion,
      dni, 
      paywith,
      products: invoice,
    }
    
    if(addinvoiceView){ 
      const response =   addinvoiceView({invoiceView:invoiceView}) 
      console.log('response',response)
    }
   
  }
  return (

    <section className={styles.CreateInvoice} >
      <SearchSelected selectProduct={selectProduct} producto={DataSearch} >
      Buscar Producto
      </SearchSelected>
     
      <SearchProduct placeholder='Buscar Producto' 
              producto={DataSearch} 
              SearchProductoBarcode={SearchProductoBarcode}
      ></SearchProduct>
       <div >
        <ButtonRipple onClick={ saveInvoice}>Guardar Venta</ButtonRipple>
  
      </div>
      <TableInvoice Invoice={invoice} paywith={setPaywith} Delete={setDeleteProduct} />
      <FomrtCustomers name={setName} direccion={setDireccion} dni={setDni} />
     
    </section>
  )

}




 