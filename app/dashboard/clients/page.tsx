import {Breadcrumbs} from '@/app/ui/breadcrumbs/breadcrumbs'
export default function Page() {
  return (
    <main>
      <Breadcrumbs
       breadcrumbsProps={[
        {
          label: 'Clientes',
          href: '/dashboard/clients',
          active: true,
        }        
      ]}
      />
   
    </main>
  )
}