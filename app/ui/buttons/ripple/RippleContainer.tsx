import React, { useRef, ReactNode, HTMLAttributes } from "react";
import styles from './ripple.module.css' 
interface Props extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  duration?: number;  
}

export const RippleContainer = ({ children,...props }: Props) => {
  

  return (
    <div  {...props} className={styles.RippleContainer} > 
    {children}
    </div>
  );
}
 