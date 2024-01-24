import {FormProduct} from '@/app/ui/products/createformProducts'
import { Breadcrumbs } from '@/app/ui/breadcrumbs/breadcrumbs'
import { raleway } from '@/app/ui/fonts'
export default async function Page() {  
  return (   
    <main className={raleway.className}>
      <Breadcrumbs 
      breadcrumbsProps={[
        {
          label: 'Almacén',
          href: '/dashboard/store',
        },{
          label: 'Agregar Producto',
          href: '/dashboard/store/products/create',
          active: true,
        }
        
      ]}
      />

      <FormProduct  />
    </main>
 )
}