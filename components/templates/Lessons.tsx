'use client'
import { ColumnDef } from '@tanstack/react-table'

import { StateLessonsType } from '@/pages/admin/lessons'
import { LessonForm } from '@/types/lesson'
import { Controller, UseFormReturn } from 'react-hook-form'
import { MdAddCircle } from 'react-icons/md'
import { RiVideoAddFill } from 'react-icons/ri'
import { Select, Table, TextField } from '../atoms'
import { Modal } from '../moleculers'
interface LessonsProps {
  stateStore: UseFormReturn<StateLessonsType, any>
  dataForm: UseFormReturn<LessonForm, any>
  columns: ColumnDef<any, any>[]
  addLesson: (data: LessonForm) => void
  upVideo: (data: FileList) => void
}
const Lessons: React.FC<LessonsProps> = ({ columns, dataForm, stateStore, addLesson, upVideo }) => {
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
              title="Tạo bài học mới"
              size="md"
            >
              <form className="space-y-6" onSubmit={dataForm.handleSubmit(addLesson)}>
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col mt-6 items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 "
                >
                  <Controller
                    name="lesson_video"
                    control={dataForm.control}
                    defaultValue={undefined}
                    render={({ field }) => {
                      return (
                        <div>
                          {field.value ? (
                            <div className="flex flex-col p-4 items-center justify-center">
                              <RiVideoAddFill size={40} color="#c8c8c8b5" />
                              <p className="mb-2 text-sm text-center text-gray-500 dark:text-gray-400">
                                <span className="font-light">{field.value.name}</span>
                              </p>
                            </div>
                          ) : (
                            <div className="flex flex-col p-4 items-center justify-center">
                              <RiVideoAddFill size={40} color="#c8c8c8b5" />
                              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-light">Thêm video bài học</span>
                              </p>
                            </div>
                          )}
                        </div>
                      )
                    }}
                  />

                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={(event) => upVideo(event.target.files)}
                  />
                </label>
                <div className="flex flex-col flex-1 gap-3 items-center">
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
                    name="options.chapterOpts"
                    defaultValue={undefined}
                    control={stateStore.control}
                    render={({ field: { value: opts } }) => (
                      <Controller
                        name="chapter_id"
                        defaultValue=""
                        control={dataForm.control}
                        render={({ field, fieldState }) => (
                          <Select
                            options={opts}
                            title="Chương khoá học"
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
                        title="Bài học"
                        className="w-full"
                        {...field}
                        errors={fieldState.error}
                        required
                      />
                    )}
                  />

                  <Controller
                    name="order"
                    defaultValue={undefined}
                    control={dataForm.control}
                    render={({ field, fieldState }) => (
                      <TextField title="Thứ tự" {...field} errors={fieldState.error} required />
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
            <label className="hidden md:block"> Tạo bài học mới</label>
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

export default Lessons
