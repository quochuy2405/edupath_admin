'use client'
import { memo } from 'react'
import { EmployeeType } from '@/types/employee'
import { ColumnDef } from '@tanstack/react-table'
import { Controller, UseFormReturn } from 'react-hook-form'
import { Select, Table, TextField } from '../atoms'
import { Modal } from '../moleculers'
import Link from 'next/link'
import { StateEmployeeManagersType } from '@/pages/admin/employee_managers'
interface EmployeeManagersProps {
  stateStore: UseFormReturn<StateEmployeeManagersType, any>
  dataForm: UseFormReturn<EmployeeType, any>
  columns: ColumnDef<any, any>[]
  addEmployee: (data: EmployeeType) => void
}
const EmployeeManagers = ({
  columns,
  stateStore,
  dataForm,
  addEmployee
}: EmployeeManagersProps) => {
  return (
    <div className="flex flex-col w-full h-full gap-2">
      <Controller
        name="isModal"
        defaultValue={false}
        control={stateStore.control}
        render={({ field }) => {
          return (
            <Modal
              handleClose={() => {
                field.onChange(false)
                dataForm.reset()
              }}
              isOpen={field.value}
              title="Thêm nhân viên mới"
              size="md"
            >
              <form className="space-y-6" onSubmit={dataForm.handleSubmit(addEmployee)}>
                <div className="flex flex-col gap-3">
                  <Controller
                    name="name"
                    defaultValue=""
                    control={dataForm.control}
                    render={({ field, fieldState }) => (
                      <TextField title="Họ và tên" {...field} errors={fieldState.error} required />
                    )}
                  />
                  <Controller
                    name="address"
                    defaultValue=""
                    control={dataForm.control}
                    render={({ field, fieldState }) => (
                      <TextField title="Địa chỉ" {...field} errors={fieldState.error} required />
                    )}
                  />
                  <Controller
                    name="phoneNumber"
                    defaultValue=""
                    control={dataForm.control}
                    render={({ field, fieldState }) => (
                      <TextField
                        title="Số điện thoại"
                        {...field}
                        errors={fieldState.error}
                        required
                      />
                    )}
                  />
                  <Controller
                    name="position"
                    defaultValue=""
                    control={dataForm.control}
                    render={({ field, fieldState }) => (
                      <Select
                        title="Ví trị hiện tại"
                        options={[
                          { label: 'Sale', value: 'Sale' },
                          { label: 'Shipper', value: 'Shipper' }
                        ]}
                        {...field}
                        errors={fieldState.error}
                        required
                      />
                    )}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Tạo
                </button>
              </form>
            </Modal>
          )
        }}
      />
      <div className="flex gap-4 bg-white rounded-lg overflow-hidden">
        <div className="bg-white text-sm font-medium text-center text-gray-500 border-b border-gray-200 flex justify-between w-full p-2">
          <div className="flex-1 flex justify-start gap-3">
            <Link
              href={'/admin/employee_managers'}
              className="items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-red-500 rounded-lg hover:bg-gray-500 hover:text-white"
            >
              Bỏ lọc
            </Link>
            <p className="items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-500 rounded-lg">
              Lọc
            </p>
            <Link
              href={'/admin/employee_managers?role=Shipper'}
              className="items-center py-2.5 px-4 text-xs font-medium text-center text-black border border-black rounded-lg hover:bg-gray-500 hover:text-white"
            >
              Shipper
            </Link>
            <Link
              href={'/admin/employee_managers?role=Sale'}
              className="items-center py-2.5 px-4 text-xs font-medium text-center text-black border border-black rounded-lg hover:bg-gray-500 hover:text-white"
            >
              Sale
            </Link>
          </div>

          <button
            type="button"
            onClick={() => stateStore.setValue('isModal', true)}
            className="items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-gray-500 hover:text-white"
          >
            Thêm nhân viên mới
          </button>
        </div>
      </div>
      <div className="flex-1 w-full rounded-lg overflow-y-auto pb-12">
        <Controller
          name="employees"
          control={stateStore.control}
          render={({ field }) => <Table columns={columns} data={field.value} />}
        />
      </div>
    </div>
  )
}

export default memo(EmployeeManagers)
