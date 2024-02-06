export interface IInvoice {
  id?: string,
  customer_id: string,
  amount: number,
  status: 'pending' | 'paid',
}


export interface Invoice {
  amount: number
  customer_id?: string | null
  date: string
  id?: string
  status: string
}

export interface DataInvoice {
  id?: string
  id_invoice: string
  id_product?: string | null
  name_product?: string | null
  quantity?: number | null
  subtotal?: string | null
}