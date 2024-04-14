'use client'
import styles from './topbar.module.css'
import img from '@/.lib/imgs/user.webp'
import Image from 'next/image'
import { useEffect } from 'react'
import {ThemeChanger} from '../ThemeChanger/ThemeChanger'
import { SettingsIcon } from '../assets/icons'
export default function TopBar(){
  const changeBackground=()=>{
    document.documentElement.style.setProperty('--color-imageUser', `url(${img.src})`)

  }
  useEffect(()=>{
    changeBackground()
  },[])
  return(
  

    <nav className={styles.topbar}>
      <div className={styles.divBackground}></div>
      <ul>
        <li><Image
          src={img}
          priority
          alt="User" 
          className={styles.img}
        /></li>
        <li><a href="/dashboard">User</a></li>
        <li><a href="/dashboard"><SettingsIcon/></a></li>
        <li><a><ThemeChanger/></a></li>
      </ul>
    </nav>
 
  )
} 