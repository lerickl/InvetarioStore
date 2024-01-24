import {getInvoicesCount, getinvoiceStatusPromise} from '../invoicesService'
import {getCustomerCount} from '../customerService'
 
 
export async function fetchCardData() {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 3000));
  const invoiceCountPromise = getInvoicesCount()
    const customerCountPromise = getCustomerCount()
    const invoiceStatusPromise = getinvoiceStatusPromise()

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ])

    const numberOfInvoices = Number(data[0])
    const numberOfCustomers = Number(data[1])
    const totalPaidInvoices = Number(data[2].totalPaid)
    const totalPendingInvoices =  Number(data[2].totalPending)
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
