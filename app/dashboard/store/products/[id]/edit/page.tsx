import {FormEditProduct} from "@/app/ui/products/editProducts"
import { Breadcrumbs } from '@/app/ui/breadcrumbs/breadcrumbs'
export default async function page(
  {params}:{params:{id:string}}) {
  const id=params.id
  return (
    <main>
      <Breadcrumbs
       breadcrumbsProps={[
        {
          label: 'Almacén',
          href: '/dashboard/store',
        },{
          label: 'Editar Producto',
          href: '/dashboard/store/products/[id]/edit',
          active: true,
        }
        
      ]}
      />
      <FormEditProduct id={id}/>
    </main>
  )
  
}