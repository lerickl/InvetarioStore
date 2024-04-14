
import styles from './dashboard.module.css'
import {CardsSkeleton } from '../../skeletons/skeletons'
import {Card} from "../../dashboard/cards"
import { Suspense,  } from 'react'
import {useCardsDashboard} from '../../../hocks/dashboard/useCardsDashboard'
import {raleway}  from '@/app/ui/fonts'
import SalesGraphic from '../../graphics/sales'
import dynamic from 'next/dynamic'
import { CardSales } from '../../cards/sales/CardSales'
import { ButtonRipple } from '../../buttons/buttonRipple'
 
export default async function Dashboard(){

  return (
  <section className={`${styles.containerDashboard} ${raleway.className}`}>
 
    <Suspense fallback={<CardsSkeleton/>}>
      <AllCards/>
    </Suspense>

  </section>
  )
}
const AllCards = async()=>{
  const {numberOfCustomers,
    numberOfInvoices,
    totalPaidInvoices,
    totalPendingInvoices} =  await useCardsDashboard()
    
  return (
    <div className={styles.dashboard}>
      <div className={styles.summary}>               
          <Card title="Total Vendido" value={totalPaidInvoices} type="collected" />
          <Card title="Pendiente" value={totalPendingInvoices} type="pending" />
          <Card title="Total ventas" value={numberOfInvoices} type="invoices" />
          <Card
            title="Total clientes"
            value={numberOfCustomers}
            type="customers"
          /> 
  
      </div>
      <div className={styles.resumeSales}>
        <CardSales 
        title='Ventas Hoy' 
        color='#c705e0' 
        description='100% de las ventas'
        value={'s/.0'} />
        <CardSales 
        title='Ventas Semana' 
        color='#059be0' 
        description='100% de las ventas'
        value={'s/.0'} />
        <CardSales 
        title='Ventas Mes' 
        color='#00d471' 
        description='100% de las ventas'
        value={'s/.0'} />
      </div>
      <div className={styles.lastSales}>
        <h2>venta por dia de la semana </h2>
        <table>
            <thead>
              <tr>
                <th>Dia</th>
             
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Lunes</td>
         
                <td>1000</td>
              </tr>
              <tr>
                <td>Martes</td>
 
                <td>1000</td>
              </tr>
              <tr>
                <td>Miercoles</td>
 
                <td>1000</td>
              </tr>
              <tr>
                <td>Jueves</td>
 
                <td>1000</td>
              </tr>
              <tr>
                <td>Viernes</td>
 
                <td>1000</td>
              </tr>
              <tr>
                <td>Sabado</td>
 
                <td>1000</td>
              </tr>
              <tr>
                <td>Domingo</td>
 
                <td>1000</td>
              </tr>
              
            </tbody>
          </table>
      </div>
      <div className={styles.options}>
        <h2 >Opciones</h2>
        <ButtonRipple >
          Todas las ventas
        </ButtonRipple>
        <ButtonRipple>
          Ventas Canceladas
        </ButtonRipple>
        <ButtonRipple>
          ventas pendientes
        </ButtonRipple>
      </div>
      <div className={styles.grafics}>
        <SalesGraphic/>
      </div>

    </div>
  )

}