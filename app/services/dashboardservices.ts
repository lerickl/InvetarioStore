'use server'
import {getInvoicesCount, getinvoiceStatusPromise} from './invoicesService'
import {getCustomerCount} from './customerService'
 
 
export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = getInvoicesCount()
    const customerCountPromise = getCustomerCount()
    const invoiceStatusPromise = getinvoiceStatusPromise()

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ])

    const numberOfInvoices = invoiceCountPromise
    const numberOfCustomers = customerCountPromise
    const totalPaidInvoices = (await invoiceStatusPromise).totalPaid
    const totalPendingInvoices = (await invoiceStatusPromise).totalPending
    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    }
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch card data.')
  }
}
