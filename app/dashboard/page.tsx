
import Dashboard from '../ui/components/dashboard/dashboard';
import { Breadcrumbs } from '@/app/ui/breadcrumbs/breadcrumbs';
import { raleway } from '@/app/ui/fonts'
import {BoletaContentPDF} from '@/app/ui/components/pdfInvoices/PdfBoleta'
import { Button } from '../ui/buttons/button';
import { PDFViewer } from '@react-pdf/renderer';
export default async function Page() {
  const price = Number(100.5);
 

  return (
    <main className={`${raleway.className}`}>
      <Breadcrumbs
       breadcrumbsProps={[
        {
          label: 'Resumen',
          href: '/dashboard',
          active: true,
        }        
      ]}
      />
      <Dashboard  />
    
      {/* <div  >
        <RevenueChart revenue={revenue}  />
        <LatestInvoices latestInvoices={latestInvoices} />
      </div> */}
 
    </main>
  )
}
 