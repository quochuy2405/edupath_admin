'use client'
import { ColumnDef } from '@tanstack/react-table'

import { StateChapterType } from '@/pages/admin/chapters'
import { TChapter } from '@/types/common'
import { Controller, UseFormReturn } from 'react-hook-form'
import { MdAddCircle } from 'react-icons/md'
import { Select, Table, TextField } from '../atoms'
import { Modal, Pagination } from '../moleculers'

interface ChapterProps {
  stateStore: UseFormReturn<StateChapterType, any>
  dataForm: UseFormReturn<any, any>
  columns: ColumnDef<any, any>[]
  addChapter: (data: TChapter) => void
}
const Chapter: React.FC<ChapterProps> = ({ columns, dataForm, stateStore, addChapter }) => {
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
              title="Tạo chương khóa học mới"
              size="md"
            >
              <form className="space-y-6" onSubmit={dataForm.handleSubmit(addChapter)}>
                <div className="flex flex-col gap-3">
                  <Controller
                    name="options.maintypeOpts"
                    defaultValue={undefined}
                    control={stateStore.control}
                    render={({ field: { value: opts } }) => (
                      <Controller
                        name="maintype_id"
                        defaultValue=""
                        control={dataForm.control}
                        render={({ field, fieldState }) => (
                          <Select
                            options={opts}
                            title="Chủ đề"
                            {...field}
                            errors={fieldState.error}
                            required
                          />
                        )}
                      />
                    )}
                  />
                  <Controller
                    name="options.courseOpts"
                    defaultValue={undefined}
                    control={stateStore.control}
                    render={({ field: { value: opts } }) => (
                      <Controller
                        name="course_id"
                        defaultValue=""
                        control={dataForm.control}
                        render={({ field, fieldState }) => (
                          <Select
                            options={opts}
                            title="Khoá học"
                            {...field}
                            errors={fieldState.error}
                            required
                          />
                        )}
                      />
                    )}
                  />
                  <Controller
                    name="chapter_name"
                    defaultValue=""
                    control={dataForm.control}
                    render={({ field, fieldState }) => (
                      <TextField
                        title="Tên chương khóa học"
                        {...field}
                        errors={fieldState.error}
                        required
                      />
                    )}
                  />
                  <Controller
                    name="order"
                    defaultValue=""
                    control={dataForm.control}
                    render={({ field, fieldState }) => (
                      <TextField
                        title="Thứ tự"
                        type="number"
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
            <label className="hidden md:block"> Tạo chương khóa học mới</label>
            <label className="block md:hidden">
              <MdAddCircle size={20} />
            </label>
          </button>
        </div>
      </div>
      <Controller
        name="dataTable"
        control={stateStore.control}
        defaultValue={[]}
        render={({ field }) => (
          <Controller
            name="page"
            control={stateStore.control}
            defaultValue={1}
            render={({ field: { value: page, onChange } }) => (
              <>
                <div className="flex-1 w-full rounded-lg overflow-x-auto pb-12">
                  <Table
                    columns={columns}
                    data={[...field.value].slice((page - 1) * 10, page * 10 + 10)}
                  />
                </div>
                <Pagination
                  pageSize={Math.ceil([...field.value].length / 10)}
                  currentPage={page}
                  onChange={(p) => onChange(p)}
                />
              </>
            )}
          />
        )}
      />
    </div>
  )
}

export default Chapter
