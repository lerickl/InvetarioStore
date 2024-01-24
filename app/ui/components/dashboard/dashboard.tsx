
import styles from './dashboard.module.css'
import {CardsSkeleton } from '../../skeletons/skeletons'
import {Card} from "../../dashboard/cards"
import { Suspense,  } from 'react'
import {useCardsDashboard} from '../../../hocks/dashboard/useCardsDashboard'
import {raleway}  from '@/app/ui/fonts'
export default async function Dashboard(){

  return (
  <section className={`${styles.dashboard} ${raleway.className}`}>
 
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
  )

}