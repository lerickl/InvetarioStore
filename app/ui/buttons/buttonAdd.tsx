import styles from './buttons.module.css'
interface Props extends React.HTMLAttributes<HTMLButtonElement> {

}

export function ButtonAdd({children, ...props}:Props) {
  return (
    <button className={styles.ButtonAdd}
    {...props}>
    {children} 
    </button>
  )
}