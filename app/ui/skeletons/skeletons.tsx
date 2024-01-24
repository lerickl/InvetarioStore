import React from 'react'
import styles from './skeletons.module.css'
 
export  function CardSkeleton(){
  return (
  <article className={styles.cardWrap}>
    <div>
      <div></div>
      <div></div>     
    </div>
    <p></p>
  </article>
  );
}
export function CardsSkeleton() {
  return (
  
    <div className={styles.containerCards}>
    
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
    
  )
}
export function DashboardSkeleton() {
  return (
    <section >
      <h1>Resumen</h1>
      <CardsSkeleton />
    </section>
  )
}