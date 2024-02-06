
import { Suspense } from 'react'
import TableProducts from '../../ui/tables/tableProducts'
import {SearchData} from '../../ui/search/SearchData'
import { SearchProductBCTotalPages } from '@/app/ui/serverComponents/products/products';
import Pagination from '@/app/ui/components/products/paginationProducts';
import { ButtonAdd} from '@/app/ui/buttons/buttonAdd';
import { PlusIcon } from '@/app/ui/assets/icons';
import Link from 'next/link';
import { raleway } from '@/app/ui/fonts'
import { Breadcrumbs } from '@/app/ui/breadcrumbs/breadcrumbs';

export default async function Page(
  {searchParams}:
   {searchParams?: {
      query?: string,
      page?: string,
    };
  }) {
  const query = searchParams?.query || ''
  const currentPage = Number(searchParams?.page) || 1 
  const totalPages= await SearchProductBCTotalPages(query)
  return (
 
    <main className={raleway.className}>     
      <Breadcrumbs
       breadcrumbsProps={[
        {
          label: 'Almacén',
          href: '/dashboard/store',
          active: true,
        }        
      ]}
      />
      <SearchData placeholder='Buscar'/>
      <Link className='inline-block' href='/dashboard/store/products/create'
        >
          <ButtonAdd><PlusIcon/>Agregar Producto</ButtonAdd>
        </Link>
      <Suspense>
        <TableProducts query={query} currentPage={currentPage}/>
      </Suspense>
      <Pagination totalPages={totalPages}/>
 
     
    </main>
  )
}

