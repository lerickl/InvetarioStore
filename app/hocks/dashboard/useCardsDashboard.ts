import { useState, useCallback } from "react"
import {fetchCardData} from '../../services/dashboard/dashboardservice'

export  const  useCardsDashboard = async() => {
  
  const {numberOfCustomers, numberOfInvoices, totalPaidInvoices, totalPendingInvoices}= await fetchCardData()
  
  return {
    numberOfCustomers,
    numberOfInvoices,
    totalPaidInvoices,
    totalPendingInvoices
  }
}