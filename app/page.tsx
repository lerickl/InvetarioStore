import Image from 'next/image'
import  Dashboard  from './ui/components/dashboard/dashboard' 
import CameraScanner from './ui/components/cameraReader/cameraScanner'
import { Login } from './ui/Login/Login'
import styles from './layout.module.css'
import Link from 'next/link'
export default function Home() {
  return (
    <main className={`${styles.main} flex min-h-screen flex-col items-center justify-between p-24`}>
      {/* <CameraScanner /> */}
 
      <Login/>
      <Link href="/dashboard">dashboard</Link>
    </main>
  )
}
