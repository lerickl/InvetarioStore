'use client'
import React from "react"
import styles from './cardsSales.module.css'
interface props extends React.HTMLAttributes<HTMLElement> {
  color: string,
  title: string,
  value: string,
  description?: string

}
export const CardSales = ({color,title,value,description}: props) => {

  return (
    <>
    <style jsx>
        {`
          article {--background-card-sale: ${color}; }        
        `}
    </style>
    <article className={styles.card}>
      
      <h2>{title}</h2>
      <span>{value}</span>
      <hr></hr>
      <p>{description}</p>
    </article>
    </>
  )
}