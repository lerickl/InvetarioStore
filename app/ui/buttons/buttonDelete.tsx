'use client'
import React from 'react'
import { useState } from 'react'
import styles from './buttons.module.css'
import { DeleteIcon } from '../assets/icons'
interface Props  { 
  id: string; 
  accion: (id: string) => Promise<null>
}
export const ButtonDelete=({ id,accion}:Props)=>{
  const [showModal, setShowModal] = useState(false);
  const deleteInvoiceWithId = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evita el envío automático del formulario
    setShowModal(true); // Muestra el modal al hacer clic en el botón de eliminar
  };
  const handleDelete = () => {
    // Realiza la lógica de eliminación aquí
    accion(id);

    // Cierra el modal después de eliminar
    setShowModal(false);
  };
 
  return (
   <>
      <form onSubmit={deleteInvoiceWithId}>
        <button type="submit"  >
          <span className={styles.svgDeletProduct}>
          <DeleteIcon />{}
          </span>
        </button>
      </form>
      {showModal && (
        <div className={styles.ModalEliminar} >
          <div>
            <p>¿Estás seguro de que deseas eliminar este producto?</p>
            <button onClick={handleDelete}>Sí, eliminar</button>
            <button onClick={() => setShowModal(false)}>Cancelar</button>
          </div>
        </div>
      )}
   </>
  )
}