
import Dashboard from '../ui/components/dashboard/dashboard';
import { Breadcrumbs } from '@/app/ui/breadcrumbs/breadcrumbs';
import { raleway } from '@/app/ui/fonts'
 
export default async function Page() {
  const price = Number(100.5);
 

  return (
    <div className={`${raleway.className}`}>
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
 
    </div>
  )
}
 