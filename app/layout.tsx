import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './ui/styles/globals.css'
import { Provider } from './ui/ThemeChanger/ThemeProvider' 
const inter = Inter({ subsets: ['latin'] })
export const dynamic = 'auto'
export const dynamicParams = true
export const revalidate = false
export const fetchCache = 'auto'
export const runtime =  'edge'
export const preferredRegion = 'auto'
export const maxDuration = 5
export const metadata: Metadata = {
  title: 'Dulce como tu',
  description: 'control de inventario y ventas ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="es" suppressHydrationWarning>
      <body>
      <Provider>
        {children}
      </Provider>
      </body>
   
    
    </html>
  )
}
