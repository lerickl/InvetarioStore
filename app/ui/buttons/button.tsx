import styles from './buttons.module.css'
interface Props extends React.HTMLAttributes<HTMLButtonElement> {

}

export function Button({children, ...props}:Props) {
  return (
    <button className={styles.buttonPrimary}
    {...props}>
    {children} 
    </button>
  )
}