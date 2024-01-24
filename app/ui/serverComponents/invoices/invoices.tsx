import {getAllInvoices, AddInvoice } from '../../../services/invoicesService'
import { DataInvoice, Invoice } from '@/app/services/interfaces/invoice'
import { addDataInvoices, addAllDataInvoices } from '@/app/services/dataInvoices'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation';
export const AllInvoices = async()=>{
  'use server'


  const response = await getAllInvoices();
  return response
}

export const AddInvoiceAndDetails = async({AllDataInvoices}:{AllDataInvoices:Array<DataInvoice>})=>{
  'use server'

  const response = await addAllDataInvoices({AllDataInvoices})
  
  revalidatePath('/dashboard/sales')
  redirect('/dashboard/sales')
 
}
 