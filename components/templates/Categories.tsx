'use client'
import { ColumnDef } from '@tanstack/react-table'

import { CategoriesType } from '@/types/stocks'
import { Controller, UseFormReturn } from 'react-hook-form'
import { MdAddCircle } from 'react-icons/md'
import { Table, TextField } from '../atoms'
import { Modal } from '../moleculers'

interface CategriesProps {
  stateStore: UseFormReturn<any, any>
  dataForm: UseFormReturn<any, any>
  columns: ColumnDef<any, any>[]
  addCategories: (data: CategoriesType) => void
}
const Categries: React.FC<CategriesProps> = ({ columns, dataForm, stateStore, addCategories }) => {
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
              title="Tạo phân loại mới"
              size="md"
            >
              <form className="space-y-6" onSubmit={dataForm.handleSubmit(addCategories)}>
                <div className="flex flex-col gap-3">
                  <Controller
                    name="code"
                    defaultValue=""
                    control={dataForm.control}
                    render={({ field, fieldState }) => (
                      <TextField
                        title="Mã phân loại"
                        {...field}
                        errors={fieldState.error}
                        required
                      />
                    )}
                  />
                  <Controller
                    name="name"
                    defaultValue=""
                    control={dataForm.control}
                    render={({ field, fieldState }) => (
                      <TextField
                        title="Tên phân loại"
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
      <div className="flex gap-4 bg-white rounded-lg overflow-hidden p-2">
        <div className="bg-white flex-1 flex justify-end text-sm font-medium text-center text-gray-500">
          <button
            type="button"
            className="w-fit inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
            onClick={() => stateStore.setValue('isModal', true)}
          >
            <label className="hidden md:block"> Tạo phân loại mới</label>
            <label className="block md:hidden">
              <MdAddCircle size={20} />
            </label>
          </button>
        </div>
      </div>
      <div className="flex-1 w-full rounded-lg overflow-x-auto pb-12">
        <Controller
          name="dataTable"
          control={stateStore.control}
          defaultValue={[]}
          render={({ field }) => <Table columns={columns} data={[...field.value]} />}
        />
      </div>
    </div>
  )
}

export default Categries
