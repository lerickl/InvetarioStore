import {Invoice} from '../../ui/components/sales/invoice'
import Link from 'next/link'
import { ButtonAdd } from '@/app/ui/buttons/buttonAdd'
import { Breadcrumbs } from '@/app/ui/breadcrumbs/breadcrumbs'
export default function Page() {
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
        <Invoice/>
      </section>
   </main>
  )
}
