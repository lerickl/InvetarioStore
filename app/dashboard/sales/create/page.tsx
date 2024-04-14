 
import {raleway} from "@/app/ui/fonts"
import {CreateInvoice} from "@/app/ui/components/sales/create/createInvoice";
import { Breadcrumbs } from "@/app/ui/breadcrumbs/breadcrumbs"
import {  AddInvoiceAndDetails } from '@/app/ui/serverComponents/invoices/invoices'
import { SelectSearchProduct, SearchProductoBarcode } from '@/app/ui/serverComponents/products/products'
import { AddInvoiceView } from '@/app/ui/serverComponents/invoices/invoices'
export default function Page() {
  return (
    <div className={raleway.className}>
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
      
      <CreateInvoice addinvoiceView={AddInvoiceView} accion={AddInvoiceAndDetails}  selectProduct={SelectSearchProduct} SearchProductoBarcode={SearchProductoBarcode}/>
    </div>
  );
}