import { Breadcrumbs } from "@/app/ui/breadcrumbs/breadcrumbs"
export default function Page() {
  return (
    <div>
      <Breadcrumbs 
      breadcrumbsProps={[
        {
          label: 'Configuración',
          href: '/settings',
          active: true,
        }
      ]}/>
    </div>
  )
}