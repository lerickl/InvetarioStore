'use client'
import {DashboardIcon, StoreIcon,ClientIcon,  SalesIcon,SettingsIcon} from '../../ui/assets/icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
const links = [
  { name: 'Inicio',
    href: '/dashboard',
    icon: DashboardIcon },
  {
    name: 'Almacen',
    href: '/dashboard/store',
    icon: StoreIcon},
  { name: 'Ventas', 
    href: '/dashboard/sales', 
    icon: SalesIcon },
  {
    name: 'Clientes',
    href: '/dashboard/clients',
    icon: ClientIcon,
  } 
 

]
import {orbitron} from '../../ui/fonts'
import styles from './dashboard.module.css'
import { useEffect, useState } from 'react'
export default function NavLinks() {
  const pathname = usePathname();
  const [subdomain, setSubdomain] = useState('')  
  useEffect(()=>{
    const fragmentos = pathname.split('/')
    const number = pathname.split('/').length -1
    if(number<2){ 
      setSubdomain(pathname)
      return
    }
    setSubdomain(`/${fragmentos[1]}/${fragmentos[2]}`)
  
  },[pathname])
  return (
    <section className={`${styles.menuLinks} ${orbitron.className} `}>
      {links.map((link) => {
          const LinkIcon = link.icon
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`${subdomain===link.href?styles.active:''} ${styles.link}`}
            >
              <LinkIcon   />
              <p className={styles.pLinkIcon}  >{link.name}</p>
            </Link>
          )
        })}
    </section>
  )
}