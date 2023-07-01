'use client'
import { AccountType } from '@/types/account'
import { ColumnDef } from '@tanstack/react-table'
import { Controller, UseFormReturn } from 'react-hook-form'
import { Select, Table, TextField } from '../atoms'
import { Modal } from '../moleculers'
import { StateAccountManagersType } from '@/pages/admin/account_managers'
import { MdAddCircle } from 'react-icons/md'
interface AccountManagersProps {
  stateStore: UseFormReturn<StateAccountManagersType, any>
  dataForm: UseFormReturn<AccountType, any>
  columns: ColumnDef<any, any>[]
  addAccount: (data: AccountType) => void
}
const AccountManagers = ({ columns, stateStore, dataForm, addAccount }: AccountManagersProps) => {
  return (
    <div className="flex flex-col w-full h-full gap-2">
      <div className="flex gap-4 bg-white rounded-lg overflow-hidden p-2">
        <div className="bg-white flex-1 flex justify-end text-sm font-medium text-center text-gray-500">
          <button
            type="button"
            className="w-fit inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
            onClick={() => stateStore.setValue('isModal', true)}
          >
            <label className="hidden md:block"> Tạo tài khoản</label>
            <label className="block md:hidden">
              <MdAddCircle size={20} />
            </label>
          </button>
        </div>
      </div>
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
              <form className="space-y-6" onSubmit={dataForm.handleSubmit(addAccount)}>
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
                    name="phone"
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
                    name="email"
                    defaultValue=""
                    control={dataForm.control}
                    render={({ field, fieldState }) => (
                      <TextField title="Email" {...field} errors={fieldState.error} required />
                    )}
                  />
                  <Controller
                    name="password"
                    defaultValue=""
                    control={dataForm.control}
                    render={({ field, fieldState }) => (
                      <TextField title="Mật khẩu" {...field} errors={fieldState.error} required />
                    )}
                  />
                  <Controller
                    name="role"
                    defaultValue=""
                    control={dataForm.control}
                    render={({ field, fieldState }) => (
                      <Select
                        options={[
                          { label: 'Nhân viên', value: 'employee' },
                          { label: 'Quản lý', value: 'admin' }
                        ]}
                        {...field}
                        errors={fieldState.error}
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

      <div className="flex-1 w-full rounded-lg overflow-y-auto pb-12">
        <Controller
          name="accounts"
          control={stateStore.control}
          render={({ field }) => <Table columns={columns} data={field.value} />}
        />
      </div>
    </div>
  )
}

export default AccountManagers
