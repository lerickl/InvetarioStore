import {raleway} from "@/app/ui/fonts"
import {CreateInvoice} from "@/app/ui/components/sales/create/createInvoice";
import { Breadcrumbs } from "@/app/ui/breadcrumbs/breadcrumbs"
import {  AddInvoiceAndDetails } from '@/app/ui/serverComponents/invoices/invoices'

export default async function Page() {
  return (
    <main className={raleway.className}>
      <Breadcrumbs
       breadcrumbsProps={[
        {
          label: 'Ventas',
          href: '/dashboard/sales',
        },{
          label: 'Nueva Venta',
          href: '/dashboard/store/products/create',
          active: true,
        }    
      ]}
      />
      
      <CreateInvoice accion={AddInvoiceAndDetails}/>
    </main>
  );
}