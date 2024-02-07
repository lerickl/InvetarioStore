'use client'
import {Input} from '@/app/ui/inputs/input'
import styles from './custormers.module.css'
import { Dispatch, SetStateAction, useState } from 'react'
interface Props {
    name:Dispatch<SetStateAction<string>>,
    direccion:Dispatch<SetStateAction<string>>,
    dni:Dispatch<SetStateAction<string>>
}
export function FomrtCustomers({name, direccion, dni}:Props){
    const setname= (e:React.ChangeEvent<HTMLInputElement>)=>{
        name(e.target.value)
    }
    const setdireccion= (e:React.ChangeEvent<HTMLInputElement>)=>{
        direccion(e.target.value)
    }
    const setdni= (e:React.ChangeEvent<HTMLInputElement>)=>{
        dni(e.target.value)
    }
    return(
        <section className={styles.section}> 
            <Input type="text" onChange={setname} name="name"  required>Nombres</Input>
            <Input type="text" onChange={setdireccion} name="Direccion"  required>Direccion</Input>
            <Input type="number" onChange={setdni} name="DNI"  required>DNI</Input>            
       
        </section>
    )
}