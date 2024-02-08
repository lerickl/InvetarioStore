import styles from './tables.module.css'
import { BarcodeIcon, EditIcon, DeleteIcon} from '../assets/icons'
import { FormatMoneda } from '../formatToMoneda/fornatMoneda'
import { SearchProductBC } from '@/app/ui/serverComponents/products/products'
import { UpdateProduct } from '../buttons/updateProduct' 
import { ButtonDelete  } from '../buttons/buttonDelete'
import {DeleteProductById} from '@/app/ui/serverComponents/products/products'
export default async function TableProducts(
  {
    query,
    currentPage,
  }:{
    query: string,
    currentPage: number,
  
  }
){
  const products= await SearchProductBC({query, currentPage})
 
  const showDialog = true
  return(

    <section className={styles.sectionTableProducts}>
      
      <div className={styles.products_table}>
        <table className={styles.table_products_sale}>
          <thead>
            <tr>
              <th><BarcodeIcon/></th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {
              products?.map((product,index)=>(
                <tr key={index}>
                  <td>{product.barcode}</td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td><FormatMoneda format={product.price!}/></td>
                  <td>{product.stock}</td>
               
                  <td>
                    <div className={styles.contentAcctionProducts}>
                    
                      <span>
                        <UpdateProduct id={product.id}/>
                      </span>
                      {/* <a className={styles.svgEditProduct}><EditIcon/></a> */}
                      <ButtonDelete  id={product.id} accion={DeleteProductById} >
                        ¿Estas seguro que deseas eliminar {product.name} de la lista de productos?
                        </ButtonDelete> 
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>

      </div>

    </section>


 
  )
}

 