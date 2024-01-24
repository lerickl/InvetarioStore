'use client'
import styles from './select.module.css';
import React, { use } from 'react';
import { ArrowUP, ArrowDown } from '../assets/icons';
import { useEffect, useRef, useState } from 'react';
interface Props extends React.HTMLAttributes<HTMLAllCollection> {
  error: string;
  options: {id: number, nombre: string}[];
  select?: string|undefined|null;
}
export default function Select({children,error,options,select, ...props}: Props) {
  
  const [isActive, setIsActive] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Selecciona categoría');
  const selectMenuRef = useRef<HTMLDivElement>(null);
  const [textCategory, setTextCategory] = useState('');
  if(select!==undefined){
    useEffect(() => {
    
      setTextCategory('Categoría');
      setSelectedOption(select!);

    }, [select])
  }
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        selectMenuRef.current &&
        !selectMenuRef.current.contains(event.target as Node)
      ) {
        setIsActive(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
 
  function handleOptionClick(option: string) {
    setSelectedOption(option);
    setTextCategory('Categoría');
    setIsActive(false);
  }

  return (
    <div    className={styles.selectMenu} ref={selectMenuRef}>
      <p >{textCategory}</p>
      <input name='category' value={selectedOption!} readOnly hidden />
      <div 
        className={`${textCategory===''?styles.selectBtn:styles.selectedBtn} `}
        onClick={() => setIsActive(!isActive)}
      >
        <span className={styles.spanSelected}>{selectedOption}</span>
        <i>{isActive ? <ArrowUP /> : <ArrowDown />}</i>
      </div>
      {isActive && (
        <ul className={styles.options}>
          {options.map((child) => {
            return (
              <li key={child.id} className={styles.option}  onClick={() => handleOptionClick(child.nombre) }>
             
                <span className={styles.span}>{child.nombre}</span>
              </li>
            );
          })}
      
        </ul>
      )}
    </div>
  );
}
