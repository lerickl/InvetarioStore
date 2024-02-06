import React, { HtmlHTMLAttributes } from "react"

interface ButtonLastProps extends React.HTMLAttributes<HTMLButtonElement> {
 
}
export const ButtonLast = ({children, ...props}:ButtonLastProps) => {
  return (
    <div >
      <button {...props} >{children}</button>
    </div>
  )
}
