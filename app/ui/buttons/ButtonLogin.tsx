

import styles from './buttons.module.css'
interface Props extends React.HTMLAttributes<HTMLButtonElement> {

}

export function ButtonLogin({children, ...props}:Props) {
  return (
    <div className={styles.sectionButtonLogin}>
      <button className={styles.divButtonLogin}
      {...props}>
      {children} 
      </button>
    </div>

  )
}