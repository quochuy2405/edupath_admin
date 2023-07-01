'use client'
import { StateExpenseProfitPageType } from '@/pages/admin/expense'
import { ColumnDef } from '@tanstack/react-table'
import { Controller, UseFormReturn } from 'react-hook-form'
import { Table, TextField } from '../atoms'
import { Modal } from '../moleculers'

interface ExpenseProfitProps {
  stateStore: UseFormReturn<StateExpenseProfitPageType, any>
  dataForm: UseFormReturn<any, any>
  columns: ColumnDef<any, any>[]
  handleSubmit: (data: any) => void
  handleAddRow: (data: any) => void
  handleReset: () => void
}
const ExpenseProfit: React.FC<ExpenseProfitProps> = ({
  columns,
  stateStore,
  dataForm,
  handleSubmit,
  handleAddRow,
  handleReset
}) => {
  return (
    <div className="flex flex-col w-full h-full gap-2">
      <Controller
        name="addRow"
        defaultValue={false}
        control={stateStore.control}
        render={({ field }) => {
          return (
            <Modal
              handleClose={() => {
                field.onChange(false)
                handleReset()
              }}
              isOpen={field.value}
              title="Tạo dòng mới"
              size="md"
            >
              <form className="space-y-6" onSubmit={stateStore.handleSubmit(handleAddRow)}>
                <div className="flex flex-col gap-3">
                  <Controller
                    name="nameCol"
                    defaultValue=""
                    rules={{ required: true }}
                    control={stateStore.control}
                    render={({ field, fieldState }) => (
                      <TextField title="Phân loại" {...field} errors={fieldState.error} required />
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
      <form
        onSubmit={dataForm.handleSubmit(handleSubmit)}
        className="flex gap-4 bg-white rounded-lg overflow-hidden"
      >
        <div className="bg-white text-sm font-medium text-center text-gray-500 border-b border-gray-200 flex justify-between w-full p-2">
          <div className="flex-1"></div>
          {/* <ul className="flex flex-wrap -mb-px">
            {tabs.map((item) => (
              <li className="mr-2" key={item.key}>
                <Link
                  href={`/admin/expense_profit?tab=${item.key}`}
                  className={clsx('inline-block p-2  rounded-t-l', {
                    'active text-blue-600 border-b-2 border-blue-600':
                      tab === item.key || (!tab && item.key === 'profit')
                  })}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul> */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => stateStore.setValue('addRow', true)}
              className="items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-gray-500 hover:text-white"
            >
              Tạo dòng chính
            </button>
            <button
              type="submit"
              className="items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-gray-500 hover:text-white"
            >
              Cập nhật bảng
            </button>
          </div>
        </div>
      </form>
      <div className="flex-1 w-full rounded-lg overflow-x-auto pb-12">
        <Controller
          name="expenses"
          control={stateStore.control}
          render={({ field }) => (
            <Table columns={columns} data={field.value} control={dataForm.control} powerplus />
          )}
        />
      </div>
    </div>
  )
}

export default ExpenseProfit
