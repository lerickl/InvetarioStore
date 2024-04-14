'use client'
import { useTheme } from 'next-themes'
import styles from './theme.module.css'
import { useState, useEffect } from 'react'
import { DarkModeIcon, LightModeIcon } from '../assets/icons'
export const ThemeChanger = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme() 

  // useEffect only runs on the client, so now we can safely show the UI

  useEffect(() => {
   
    console.log('theme', theme) 
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }
 
  return (
    <div className={styles.ViewMode}> 
      <button className={`${styles.light} ${theme==='light'||theme==='system'?styles.activelight:styles.desactivelight} `} onClick={() => setTheme('dark')}><LightModeIcon/>{}</button>
      <button className={`${styles.dark}  ${theme==='dark'?styles.activedark:styles.desactivedark} `} onClick={() => setTheme('light')}><DarkModeIcon/>{}</button>
    </div>
  )
}