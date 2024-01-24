import { Breadcrumbs } from "@/app/ui/breadcrumbs/breadcrumbs"
export default function Page() {
  return (
    <main>
      <Breadcrumbs 
      breadcrumbsProps={[
        {
          label: 'Configuración',
          href: '/settings',
          active: true,
        }
      ]}/>
    </main>
  )
}