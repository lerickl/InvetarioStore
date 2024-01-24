import './layout.css'
import NavLinks from "../ui/dashboard/navLink";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="section">
      <div className='backgroundLayout'>
       <div className='backgroundLayoutContent'>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
       </div>
      </div>
      <div className="contentGrid ">
        <div className="grid">
          <NavLinks />
        </div>
        <div className='grid' >{children}</div>
      </div>
    </div>
  );
}