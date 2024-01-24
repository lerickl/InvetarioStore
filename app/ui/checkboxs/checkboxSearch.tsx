
import styles from './checkboxs.module.css'
import React from 'react'
interface CheckboxSearchProps extends React.AllHTMLAttributes<HTMLInputElement> {
  state?: boolean
}
export const CheckboxSearch = ({ state,...props}:CheckboxSearchProps) => {

  return (
    <div className={styles['checkbox-wrapper-56']}>
      <label className={styles['container']}>
        <input type="checkbox" checked={state} {...props}/>
        <div className={styles.checkmark}></div>
      </label>
      
    </div>
    
  )
}