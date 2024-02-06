'use client'
import styles from './products.module.css'
import { Button } from '../../buttons/button'
import { Input, InputMounth } from '../../inputs/input'
import {IProduct, IProductEdit} from '@/app/services/interfaces/product'
import Select from '../../selects/select'
import { useEffect, useState } from 'react'
import { SearchProduct } from '@/app/ui/search/searchProduct'
import { GetProductById } from '@/app/services/productServices'
import { DeleteContentProduct } from '../../buttons/DeleteContentProduct'

interface props extends React.HTMLAttributes<HTMLFormElement>{ 
  accion:(formData:FormData)=>Promise<void>,
  searchSelected?:(query: string) => Promise<Array<IProduct>>
}
 
export const CreateProductPage=(
  
  {children,accion,searchSelected,...props}:props)=>{ 
  const [searchProduct, setSearchProduct] = useState('')
  const [producto, setProducto] = useState<IProduct|undefined>()
  const searchSelectedProduct=({product}:{product:IProduct})=>{
    setProducto(product)
  }
  const DeleteProductContent =()=>{
    setProducto(undefined)
    setIdProduct('')
  }
  const [idProduct, setIdProduct] = useState('')
  useEffect(() => {  
    setIdProduct(producto?.id!)  
  }  ,[producto])
 return (
  <section  className={styles.CreateProductPage} >
    <div className={styles.divName}>
      <SearchProduct  selectProduct={searchSelected} searchSelectedProduct={searchSelectedProduct}>Buscar Producto contenedor</SearchProduct>
       <label className={`${styles.label} ${producto? styles.labelactive: styles.labeldesactive}`}  >
        {producto?producto.name :'No tiene asignado un contenedor'}  {producto? 'x'+producto.units: ''}
       </label>
      {
        producto? <DeleteContentProduct onClick={DeleteProductContent}>
          Eliminar Contenedor
        </DeleteContentProduct>:null
      }
    </div>
     <form {...props} action={accion}   className={styles.formPage} >
      
      <input hidden title='id_product'name='id_product' defaultValue={idProduct}  />
      <Input required  name='barcode'  type='text'>Codigo de Barras</Input>
      <Input required name='name' type='text'  >Nombre</Input>      
      <Select options={categories} error=''>{}</Select>
      <Input required name='description'  type='text'>Descripción</Input>
      <InputMounth name='price' required>Precio</InputMounth>
      <Input required name='stock' type='number'>Cantidad</Input>
      <Input name='units' type='number' required >Unidades por empaque</Input>
      <Button typeof='submit'>Crear</Button>
      
    </form>
  </section>
 )

}
const categories=
[
  {
    "id": 1,
    "nombre": "Dulces"
  },
  {
    "id": 2,
    "nombre": "Ropa"
  },
  {
    "id": 3,
    "nombre": "Alimentos"
  },
  {
    "id": 4,
    "nombre": "Libros"
  },
  {
    "id": 5,
    "nombre": "Hogar"
  },
  {
    "id": 6,
    "nombre": "Electrónicos"
  }
]



interface propsEdit extends React.HTMLAttributes<HTMLFormElement>
{
  product:IProductEdit,
  accion:(formData:FormData)=>Promise<void>,
  searchSelected?:(query: string) => Promise<Array<IProduct>>
}

export const EditProductPage=(
  
  {children,product,accion,searchSelected,...propsEdit}:propsEdit)=>{
    const [producto, setProducto] = useState<IProduct|undefined>()
    const searchSelectedProduct=({product}:{product:IProduct})=>{
      setProducto(product)
    }
    const [idProduct, setIdProduct] = useState('')
    useEffect(() => {  
      setIdProduct(producto?.id!)  

      setProducto(producto);
    }, [producto])
    useEffect(() => {
      if(product.id_product){
        GetProductById(product.id_product).then((product)=>{
          setProducto(product[0])
        })
      }
    }  
    ,[])
    const DeleteProductContent =()=>{
      setProducto(undefined)
      setIdProduct('')
    }
  return (
    <section  className={styles.CreateProductPage} >
      <div className={styles.divName}>
        <SearchProduct  selectProduct={searchSelected} searchSelectedProduct={searchSelectedProduct}>Buscar Producto contenedor</SearchProduct>
        <label className={`${styles.label} ${producto? styles.labelactive: styles.labeldesactive}`}  >
          {producto?producto.name :'No tiene asignado un contenedor'}  {producto? 'x'+producto.units: ''}
        </label>
        {
          producto? <DeleteContentProduct onClick={DeleteProductContent}>
            Eliminar Contenedor
          </DeleteContentProduct>:null
        }
      </div>
       <form {...propsEdit}  action={accion}   className={styles.formPage} >
        <input name='id' defaultValue={product.id} type='text' hidden/>
        <input name='id_product' defaultValue={idProduct} type='text' hidden/>
        <Input name='barcode' defaultValue={product.barcode!} type='text'>Codigo de Barras</Input>
        <Select options={categories} select={product.category!} error=''></Select>
        <Input name='name' type='text' defaultValue={product.name!}  >Nombre</Input>
        <Input name='description'  type='text' defaultValue={product.description!}>Descripción</Input> 
        <InputMounth name='price' defaultValue={product.price?.toString()}>Precio</InputMounth>
        <Input name='stock' type='number' defaultValue={product.stock!}>Cantidad</Input>
        <Input name='units' type='number' defaultValue={product.units!}>Unidades por empaque</Input>
      
        <Button typeof='submit'>Editar</Button>
     
        
      </form>
    </section>
   )
}
 