'use client'

import { columnTableAccountCustomerManagers } from '@/components/makecolumns'
import AccountCustomers from '@/components/templates/AccountCustomers'
import { deleteItem, readAll } from '@/firebase/base'
import { db } from '@/firebase/config'
import AdminLayout from '@/layouts/AdminLayout'
import { closeLoading, setLoading } from '@/redux/features/slices/loading'
import { AccountType } from '@/types/account'
import { collection } from 'firebase/firestore'
import { ReactElement, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
export type StateAccountCustomersType = {
  customers: Array<AccountType>
  isModal: boolean
}
const AccountCustomersPage = () => {
  const [refresh, setRefresh] = useState(false)

  const onRefresh = () => {
    setRefresh((cur) => !cur)
  }
  const onDelete = (id: string) => {
    deleteItem('account_users', id)
    onRefresh()
  }
  const columns = columnTableAccountCustomerManagers({ onDelete })
  const dispatch = useDispatch()
  const stateStore = useForm<StateAccountCustomersType>({
    defaultValues: {
      isModal: false,
      customers: []
    }
  })
  const dataForm = useForm<AccountType>()

  useEffect(() => {
    dispatch(setLoading({ status: true }))
    const accountRef = collection(db, 'account_users')
    readAll(accountRef).then((data) => {
      console.log(data)
      stateStore.setValue('customers', data)
      dispatch(closeLoading())
    })
  }, [refresh])

  const props = {
    columns,
    stateStore,
    dataForm
  }

  return <AccountCustomers {...props} />
}
AccountCustomersPage.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}
export default AccountCustomersPage
