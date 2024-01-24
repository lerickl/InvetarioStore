'use client'
import styles from './barcodescanner.module.css'
import React, { useState } from "react"
import { useEffect, useRef } from "react"
export default function BarcodeScan(){
  const [barcode, setBarcode]= useState('')
  const codigoBarrasRef = useRef('');
  const scan=(event: { key: any; })=>{
    const barcode=event.key
    codigoBarrasRef.current += barcode;
     // Verifica si el código de barras es completo o tiene un carácter especial que lo distinga
     if (barcode.endsWith('Enter')) {
      // Realiza alguna acción con el código de barras completo
      console.log('Código de barras escaneado:', codigoBarrasRef.current);
      let code=codigoBarrasRef.current
      code = code.replace('Enter', '');
      setBarcode(code)
      // Reinicia el valor del código de barras para el próximo escaneo
      codigoBarrasRef.current = '';
    }
 
 
  }
  useEffect(() => {
    document.addEventListener('keypress', scan);
  
    return () => {
      document.removeEventListener('keypress',   scan)
    }
    
  },[])
  return (
    <div className={styles.scanner}>
      <h3>scanner codigo barras</h3>
      <input name='barcode' title='barcode' value={barcode} onChange={(e) => setBarcode(e.target.value)}/>
    </div>
  )
}