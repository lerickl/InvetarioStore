'use client'
 
import Link from 'next/link';
import { generatePagination } from '@/.lib/utils';
import { usePathname, useSearchParams } from 'next/navigation';
import styles from './products.module.css'
import { ArrowLeftIcon, ArrowRightIcon } from '../../assets/icons';
export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);   
    params.delete('page');  
    params.set('page', pageNumber.toString()); 
    return `${pathname}?${params.toString()}`;
  }
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };
  const allPages = generatePagination(currentPage, totalPages);

  return (
    <>
       
      <div className="inline-flex">
        <PaginationArrow
          direction="left"
          href={createPageURL(currentPage - 1)}
          isDisabled={currentPage <= 1}
        />

        <div className={styles.contentPages}>
          {allPages.map((page, index) => {
            let position: 'first' | 'last' | 'single' | 'middle' | undefined;

            if (index === 0) position = 'first';
            if (index === allPages.length - 1) position = 'last';
            if (allPages.length === 1) position = 'single';
            if (page === '...') position = 'middle';

            return (
              <PaginationNumber
                key={page}
                href={createPageURL(page)}
                page={page}
                position={position}
                isActive={currentPage === page}
              />
            );
          })}
        </div>

        <PaginationArrow
          direction="right"
          href={createPageURL(currentPage + 1)}
          isDisabled={currentPage >= totalPages}
        />
      </div>
    </>
  );
}



function PaginationNumber({
  page,
  href,
  isActive,
  position,
}: {
  page: number | string;
  href: string;
  position?: 'first' | 'last' | 'middle' | 'single';
  isActive: boolean;
}) {
  const className = 
  (
    position === 'first' || position === 'single' ? styles.paginationFirst : styles.paginationLast,
    !isActive? styles.paginationIsActive :  styles.paginationDisabled 
  )
 

  return isActive || position === 'middle' ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: 'left' | 'right';
  isDisabled?: boolean;
}) {
  const className = 
  (
    direction === 'left' ? styles.paginationLeft : styles.paginationRight,
    isDisabled? styles.paginationDisabled :  styles.paginationIsActive 
  )
 
  
  const icon =
    direction === 'left' ? (
      <span><ArrowLeftIcon/></span>
    ) : (
      <span><ArrowRightIcon/></span>
    );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} href={href}>
      {icon}
    </Link>
  );
}