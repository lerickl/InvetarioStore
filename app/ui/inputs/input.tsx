import { SearchIcon } from '../assets/icons'
import styles from './inputs.module.css'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?:string,
}
export const Input = ({ children, error, ...props }:InputProps) => {

    return( 
      <div>
        <div className={styles.inputContainer}>
        
        <input id="input"  placeholder="" {...props}/>
        <label htmlFor='input'>
          <span >{children} </span>
        </label>
       
      </div>
      {error && <p className={styles.error}>{error}</p>}
      </div>     
    )
}

export const InputSearch=({children, ...props}:InputProps)=>{
  return(
    <div className={styles.inputSearch}>
      <SearchIcon/>
      <input id="inputSearch" required placeholder="" {...props}/>
     
    </div>
  )
}