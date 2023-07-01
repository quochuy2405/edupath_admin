'use client'

import { columnTableEmployeeManagers } from '@/components/makecolumns'
import { EmployeeManagers } from '@/components/templates'
import { create, deleteItem, findAll, readAll } from '@/firebase/base'
import { db } from '@/firebase/config'
import AdminLayout from '@/layouts/AdminLayout'
import { closeLoading, setLoading } from '@/redux/features/slices/loading'
import { EmployeeType } from '@/types/employee'
import { collection } from 'firebase/firestore'
import { useSearchParams } from 'next/navigation'
import { ReactElement, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
export type StateEmployeeManagersType = {
  employees: Array<EmployeeType>
  isModal: boolean
}
const EmployeeManagersPage = () => {
  const [refresh, setRefresh] = useState(false)
  const role = useSearchParams().get('role')
  const onRefresh = () => {
    setRefresh((cur) => !cur)
  }
  const onDelete = (id: string) => {
    deleteItem('employees', id)
    onRefresh()
  }
  const columns = columnTableEmployeeManagers({ onDelete })
  const dispatch = useDispatch()
  const stateStore = useForm<StateEmployeeManagersType>({
    defaultValues: {
      isModal: false,
      employees: []
    }
  })
  const dataForm = useForm<EmployeeType>()
  const addEmployee = (data: EmployeeType) => {
    dispatch(setLoading({ status: true, mode: 'default', title: 'Đang tạo nhân viên...' }))
    const employeeRef = collection(db, 'employees')
    create(employeeRef, data).then(() => {
      dataForm.reset()
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
  }

  useEffect(() => {
    const employeeRef = collection(db, 'employees')
    if (role) {
      console.log(role)
      findAll(employeeRef, [['position', role as any]]).then((data) => {
        stateStore.setValue('employees', data as any)
        dispatch(closeLoading())
      })
    } else {
      dispatch(setLoading({ status: true }))

      readAll(employeeRef).then((data) => {
        stateStore.setValue('employees', data)
        dispatch(closeLoading())
      })
    }
  }, [refresh, role])

  const props = {
    columns,
    stateStore,
    dataForm,
    addEmployee
  }

  return <EmployeeManagers {...props} />
}
EmployeeManagersPage.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}
export default EmployeeManagersPage
