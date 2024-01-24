import Link from "next/link"
import styles from './buttons.module.css'
import { EditIcon } from "../assets/icons"
export const UpdateProduct = (
  { id }: { id:string }) => {
    return (
      <Link className={styles.svgEditButton}
      href={`/dashboard/store/products/${id}/edit`}>
        <EditIcon/>
      </Link>
    )
   
  }
 