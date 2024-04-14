import './layout.css'
import NavLinks from "../ui/dashboard/navLink"
import TopBar from '../ui/TopBar/topbar'  
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    < >
    
      <header  >
        <TopBar />
      </header>
      <aside  >
        <NavLinks />
      </aside>
      <main  > 
        {children}  
      </main> 
      <footer>
        <p>© 2024</p>
      </footer>
    </ >
   
 
   
  );
}