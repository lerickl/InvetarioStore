import {Invoice} from '../../ui/components/sales/invoice'
import Link from 'next/link'
import {AllInvoices, SearchInvoiceTotalPages} from '@/app/ui/serverComponents/invoices/invoices'
import { Suspense } from 'react'
import { ButtonAdd } from '@/app/ui/buttons/buttonAdd'
import { Breadcrumbs } from '@/app/ui/breadcrumbs/breadcrumbs'
import { TableInvoice } from '@/app/ui/tables/tableInvoice'
import Pagination from '@/app/ui/components/products/paginationProducts'
import { CancelInvoiceById } from '@/app/ui/serverComponents/invoices/invoices'
export default async function Page({
  searchParams
}: {
  searchParams?: {
    query?: string,
    page?: string,
  };
}) {
  const query = searchParams?.query || ''
  const currentPage = Number(searchParams?.page) || 1 
  const totalPages= await SearchInvoiceTotalPages({query})
  const invoices = await AllInvoices()
  return (
   <main>
      <Breadcrumbs
       breadcrumbsProps={[
        {
          label: 'Ventas',
          href: '/dashboard/sales',
          active: true,
        }        
      ]}
      />
      <section>
        <Link className='inline-block' href='/dashboard/sales/create'>
          <ButtonAdd>
            Nueva Venta
          </ButtonAdd>
        </Link>
      </section>
      <section>
      
        <Invoice Invoices={invoices} cancelInvoice={CancelInvoiceById} />
        {/* <TableInvoice Invoices={invoices}/> */}
  
      <Pagination totalPages={totalPages}/>
      </section>
  
   </main>
  )
}
