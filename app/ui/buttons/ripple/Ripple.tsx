'use client'
import React, { MouseEvent, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { RippleContainer } from './RippleContainer'  


const useDebouncedRippleCleanUp = (rippleCount: number, duration: number, cleanUpFunction: () => void) => {
  const bounceRef = useRef<number>();

  useLayoutEffect(() => {
    let bounce: number | null = null;

    if (rippleCount > 0) {
      clearTimeout(bounceRef.current);

      bounce = window.setTimeout(() => {
        cleanUpFunction();
        clearTimeout(bounceRef.current);
      }, duration * 4);
    }

    bounceRef.current = bounce!;

    return () => {
      if (bounceRef.current) {
        clearTimeout(bounceRef.current);
      }
    };
  }, [rippleCount, duration, cleanUpFunction]);
};

interface RippleProps extends React.HTMLAttributes<HTMLDivElement>{
 
  duration?: number;
  color?: string;
} 
interface IRipple extends React.HTMLAttributes<HTMLElement>{
  x: number;
  y: number;
  size: number;
}
export const Ripple =  ({duration,...props}:RippleProps) => {
 
  const [rippleArray, setRippleArray] =useState<{ x: number; y: number; size: number; }[]>([])
  useDebouncedRippleCleanUp(rippleArray.length, duration!, () => {
    setRippleArray([])
  });
  const handleMouseDown = (event: MouseEvent) => {
    const rippleContainer = event.currentTarget.getBoundingClientRect()
    const size = rippleContainer.width > rippleContainer.height ? rippleContainer.width : rippleContainer.height
    const x = event.clientX - rippleContainer.x 
    const y = event.clientY - rippleContainer.y 
    const newRipple = { x, y, size }
    document.documentElement.style.setProperty('--position-x', `${x}px`)
    document.documentElement.style.setProperty('--position-y', `${y}px`)
    setRippleArray(rippleArray.concat([newRipple]))
 
 
  };
  useEffect(() => { 
  }, [rippleArray]);
  
  return(
    <RippleContainer onMouseDown={handleMouseDown} {...props} >
      {rippleArray.length > 0 &&
        rippleArray.map((ripple, index) => {
          return (
          <span
              key={"span" + index}
               
            />
          );
        })} 
    </RippleContainer>
  )

 
};