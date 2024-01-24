'use client'
import { Database } from '@/app/services/database.types'
import styles from './tables.module.css'

let typroduct: Array<Database['public']['Tables']['products']['Row'] >
const titles= [
  {name:'icon'},
  {name:'Nombre'},
  {name:'Categoria'},
  {name: 'Stock'},
  {name:'Status'}
]
export const Table = ({dataProducts}: { dataProducts: typeof typroduct }) => {
  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>{
            titles.map((title) => (
              <th>{title.name}</th>

            ))}
          </tr>
          
        </thead>
        <tbody>
        {
        dataProducts.map((product) => (
          <tr key={product.id}>
            <td>icon</td>
            <td>{product.name}</td>
            <td>{product.category}</td>
            <td>{product.stock}</td>
            <td>{product.stock}</td>
          </tr>
          )
        )
        }
          
        </tbody>
      </table>
    </div>
  )
}