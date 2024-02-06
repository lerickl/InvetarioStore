export interface IDataInvoice {
  id?: string | null,
  id_product?: string | null,
  name_product?: string | null,
  quantity?: number | null,
  price?: number | null,
  barcode?: string | null,
  subtotal?: string | null,
  id_invoice?: string | null,
}
export interface IDataInvoiceInsert {
  id_invoice: string
  id_product: string | null
  name_product: string | null
  quantity: number | null
  subtotal: string | null
}
 