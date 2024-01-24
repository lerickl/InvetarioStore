import styles from './tables.module.css'
import { use, useEffect, useState } from 'react'
import {ISales} from '../../services/interfaces/sales.types'
import { ISalesView } from '@/app/services/interfaces/viewsales.types';
import React from 'react';
import { DeleteIcon, SalesIcon, MonedaIcon } from '../assets/icons';
export default function TableRegisterSales({sales}: {sales:ISalesView[]}) {
   const [allsale, setAllSale] = useState(sales)
 
  const handlerQuantityChange= (index:number,event:React.ChangeEvent<HTMLInputElement>) => {
    const updatedSaleItems = [...allsale];
    const newQuantity = event.target.value
    updatedSaleItems[index].quantity = Number(newQuantity)
    updatedSaleItems[index].total = Number(newQuantity) * Number(updatedSaleItems[index].price)
    setAllSale(updatedSaleItems)
  }
  useEffect(() => {
    setAllSale(sales)
    console.log('sales',allsale)
  }, [sales])
 
  return (
    <section className={styles.tableViewSales}>
    <div>
    <div className={styles.thead}>
      <ul>
          <li>Codigo</li>
          <li>Nombre</li>
          <li>Precio</li>
          <li>Cantidad</li>
          <li>Monto</li>
          <li>Acción</li>
      </ul>
    </div>
    <div  className={styles.tbody}>
      {
        allsale.map((sale, index) => (              
          <ul key={index}>
            <li>{sale.barcode}</li>
            <li>{sale.name}</li>
            <li><MonedaIcon/>{sale.price}</li>          
            <li>
              <input
                title='total'
                type="number"
                min="1"
                value={sale.quantity ?? ''}
                
                onChange={(event)=>handlerQuantityChange(index,event)}></input>
            </li>
            <li><MonedaIcon/>{sale.total}</li>
            <li><DeleteIcon/> Eliminar </li>
          </ul>              
        ))
      }
    </div>
    </div>
  </section>
  )
}