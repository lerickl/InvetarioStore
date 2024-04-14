import {Breadcrumbs} from '@/app/ui/breadcrumbs/breadcrumbs'
export default function Page() {
  return (
    <div>
      <Breadcrumbs
       breadcrumbsProps={[
        {
          label: 'Clientes',
          href: '/dashboard/clients',
          active: true,
        }        
      ]}
      />
   
    </div>
  )
}