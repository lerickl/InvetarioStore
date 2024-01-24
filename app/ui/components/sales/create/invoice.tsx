 
interface props extends React.HTMLProps<HTMLFormElement> {
  accion: (AllDataInvoices: FormData) => Promise<void>

}
export const CreateInvoicePage = ({
  children, accion ,...props
}:props)=>{


}