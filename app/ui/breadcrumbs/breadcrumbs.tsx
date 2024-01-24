import styles from './breadcrumbs.module.css'
import Link from 'next/link'
import {TransitionLeftIcon} from '@/app/ui/assets/icons'
interface BreadcrumbsProps {
  label: string;
  href: string;
  active?: boolean;
}

export function Breadcrumbs(
  {
    breadcrumbsProps,
  }: {breadcrumbsProps:BreadcrumbsProps[]}){
    return(
      <>
      <nav className={styles.breadcrumb}>
        <ol className="">
          {breadcrumbsProps.map((breadcrumb, index) => {
            return (
              <li key={index} className=" ">
                {breadcrumb.active ? (
                  <span>{breadcrumb.label}</span>
                ) : (
                  <Link href={breadcrumb.href}>
                    <div className={styles.divOption}>
                      <TransitionLeftIcon/>
                      <span > {breadcrumb.label}</span>
                    </div>
                    
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
      </>
    )

  }
     