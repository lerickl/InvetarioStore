'use client '
import { DeleteIcon } from '../assets/icons'
import styles from './buttons.module.css'
import React, { useRef, useState } from 'react'
import { Ripple } from './ripple/Ripple'
import { ButtonLast } from './buttonLast'
interface IDeleteContentProduct extends React.HtmlHTMLAttributes<HTMLButtonElement> {
   
}
export const DeleteContentProduct = ({children,...props}:IDeleteContentProduct) => {
  const [ active, setActive ] = useState(false);
  
  return(
    <div className={styles.DeleteContentProduct}>  
      <button 
      {...props} 
       > 
        <Ripple   duration={200}>  
        </Ripple>
        <p >{children}</p>
      </button>
    </div>
  )

}