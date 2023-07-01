'use client'

import { columnTableAccountManagers } from '@/components/makecolumns'
import { AccountManagers } from '@/components/templates'
import { create, deleteItem, readAll, update } from '@/firebase/base'
import { auth, db } from '@/firebase/config'
import AdminLayout from '@/layouts/AdminLayout'
import { closeLoading, setLoading } from '@/redux/features/slices/loading'
import { AccountType } from '@/types/account'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { collection } from 'firebase/firestore'
import { enqueueSnackbar } from 'notistack'
import { ReactElement, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
export type StateAccountManagersType = {
  accounts: Array<AccountType>
  isModal: boolean
}
const AccountManagersPage = () => {
  const [refresh, setRefresh] = useState(false)

  const onRefresh = () => {
    setRefresh((cur) => !cur)
  }
  const onDelete = (id: string) => {
    deleteItem('accounts', id)
    onRefresh()
  }
  const onUpdate = async (id: string, role: string) => {
    const accountRef = collection(db, 'accounts')
    await update(accountRef, id, { role }).then(() => {
      enqueueSnackbar('Cập nhật thành công', { variant: 'success' })
    })
    onRefresh()
  }

  const columns = columnTableAccountManagers({ onDelete, onUpdate })
  const dispatch = useDispatch()
  const stateStore = useForm<StateAccountManagersType>({
    defaultValues: {
      isModal: false,
      accounts: []
    }
  })
  const dataForm = useForm<AccountType>()
  const addAccount = (data: AccountType) => {
    dispatch(setLoading({ status: true, mode: 'default', title: 'Đang tạo nhân viên...' }))
    const accountRef = collection(db, 'accounts')
    create(accountRef, data).then(async () => {
      dataForm.reset()
      await createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          if (userCredential)
            dispatch(
              setLoading({
                status: true,
                mode: 'success',
                title: (
                  <div className="flex flex-col items-center justify-center">
                    <p>Thành công...</p>
                    <button
                      type="button"
                      onClick={() => {
                        dispatch(closeLoading())
                        stateStore.setValue('isModal', false)
                        onRefresh()
                      }}
                      className="w-fit h-8 mt-2 items-center py-2 px-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
                    >
                      Đóng
                    </button>
                  </div>
                )
              })
            )
        })
        .catch((error) => {
          console.log(error)
        })
    })
  }

  useEffect(() => {
    dispatch(setLoading({ status: true }))
    const accountRef = collection(db, 'accounts')
    readAll(accountRef).then((data) => {
      stateStore.setValue('accounts', data)
      dispatch(closeLoading())
    })
  }, [refresh])

  const props = {
    columns,
    stateStore,
    dataForm,
    addAccount
  }

  return <AccountManagers {...props} />
}
AccountManagersPage.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}
export default AccountManagersPage
