
import { Database } from "../database.types";
import { IDataInvoice } from "./dataInvoice"; 
export interface IInvoiceView {
  name: string;
  direccion: string;
  dni: string; 
  paywith: string;
  products: IDataInvoice[];
}
export interface IInvoiceViewPDF {
  name?: string;
  direccion?: string;
  dni?: string; 
  paywith?: string;
  products?: Database['public']['Tables']['DataInvoice']['Row'][];
}