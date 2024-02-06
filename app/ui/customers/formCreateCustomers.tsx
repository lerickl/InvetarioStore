import {Input} from '@/app/ui/inputs/input'
import styles from './custormers.module.css'
import { useState } from 'react'
interface Props {
    name:string,
    direccion:string,
    dni:string
}
export function FomrtCustomers({name, direccion, dni}:Props){
   
    return(
        <section className={styles.section}>
          
            <Input type="text" value={name}  name="name" readOnly required>Nombres</Input>
            <Input type="text" value={direccion} name="Direccion" readOnly required>Direccion</Input>
            <Input type="number" value={dni} name="DNI" readOnly required>DNI</Input>            
       
        </section>
    )
}