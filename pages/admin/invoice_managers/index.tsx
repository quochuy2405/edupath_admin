'use client'

import { columnTableInvoiceManagers } from '@/components/makecolumns'
import { InvoiceManagers } from '@/components/templates'
import { readAll } from '@/firebase/base'
import { db } from '@/firebase/config'
import AdminLayout from '@/layouts/AdminLayout'
import { closeLoading, setLoading } from '@/redux/features/slices/loading'
import { ProductType } from '@/types/product'
import { collection } from 'firebase/firestore'
import { ReactElement, useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
type DataSetType = {
  addressNumber: string
  award: string
  checkoutId: string
  district: string
  email: string
  name: string
  products: Array<ProductType>
}
export type StateInvoiceManagersPageType = {
  datasets: Array<DataSetType>
}
const InvoiceManagersPage = () => {
  const onUpdate = () => {
    const ordersRef = collection(db, 'orders')
    readAll(ordersRef).then((data) => {
      stateStore.setValue('datasets', data)
    })
  }
  const columns = useMemo(() => columnTableInvoiceManagers({ onUpdate }), [])
  const dispatch = useDispatch()
  const stateStore = useForm<StateInvoiceManagersPageType>({
    defaultValues: {
      datasets: []
    }
  })
  useEffect(() => {
    dispatch(setLoading({ status: true, title: 'Loading...', mode: 'default' }))
    const ordersRef = collection(db, 'orders')
    readAll(ordersRef).then((data) => {
      stateStore.setValue('datasets', data)
      dispatch(closeLoading())
    })
  }, [])
  const props = {
    columns,
    stateStore
  }

  return <InvoiceManagers {...props} />
}
InvoiceManagersPage.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}
export default InvoiceManagersPage
