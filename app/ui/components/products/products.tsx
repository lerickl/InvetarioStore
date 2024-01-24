'use client'
import styles from './products.module.css'
import { Button } from '../../buttons/button'
import { Input, InputMounth } from '../../inputs/input'
import {IProductEdit} from '@/app/services/interfaces/product'
import Select from '../../selects/select'
import { FormatMoneda } from '../../formatToMoneda/fornatMoneda'
import CurrencyInput from 'react-currency-input-field'
export const Products=()=>{
  return(
    <section className={styles.products}>  
 
     <div>
        <Button >Agregar</Button>
      </div>
    </section>
  )
}
interface props extends React.HTMLAttributes<HTMLFormElement>{ 
  accion:(formData:FormData)=>Promise<void>
}
 
export const CreateProductPage=(
  {children,accion,...props}:props)=>{
 return (
  <section  className={styles.CreateProductPage} >
     <form {...props} action={accion}   className={styles.formPage} >
      <Input required name='barcode'  type='text'>Codigo de Barras</Input>
      <Select options={categories} error=''>{}</Select>
      <Input required name='name' type='text'  >Nombre</Input>
      <Input required name='description'  type='text'>Descripción</Input>
      <InputMounth name='price' >Precio</InputMounth>
       <Input required name='stock' type='number'>Cantidad</Input>
     
      <Button typeof='submit'>Crear</Button>
      
    </form>
  </section>
 )

}
const categories=
[
  {
    "id": 1,
    "nombre": "Electrónicos"
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
  }
]



interface propsEdit extends React.HTMLAttributes<HTMLFormElement>
{
  product:IProductEdit,
  accion:(formData:FormData)=>Promise<void>
}

export const EditProductPage=(
  
  {children,product,accion,...propsEdit}:propsEdit)=>{
 
 
  return (
    <section  className={styles.CreateProductPage} >
       <form {...propsEdit}  action={accion}   className={styles.formPage} >
        <input name='id' defaultValue={product.id!} type='text' hidden/>
        <Input name='barcode' defaultValue={product.barcode!} type='text'>Codigo de Barras</Input>
        <Select options={categories} select={product.category!} error=''></Select>
        <Input name='name' type='text' defaultValue={product.name!}  >Nombre</Input>
        <Input name='description'  type='text' defaultValue={product.description!}>Descripción</Input>
        <Input name='price' type='number' defaultValue={product.price!}>Precio</Input>
        <Input name='stock' type='number' defaultValue={product.stock!}>Cantidad</Input>
       
        <Button typeof='submit'>Editar</Button>
        
      </form>
    </section>
   )
}
