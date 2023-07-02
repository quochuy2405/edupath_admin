'use client'
import { ColumnDef } from '@tanstack/react-table'

import { StateCourseType } from '@/pages/admin/courses'
import { CourseForm } from '@/types/form'
import Image from 'next/image'
import { Controller, UseFormReturn } from 'react-hook-form'
import { MdAddCircle } from 'react-icons/md'
import { Select, Table, TextAreaField, TextField } from '../atoms'
import { Modal, Pagination } from '../moleculers'

interface CoursesProps {
  stateStore: UseFormReturn<StateCourseType, any>
  dataForm: UseFormReturn<CourseForm, any>
  columns: ColumnDef<any, any>[]
  addCourse: (data: CourseForm) => void
  previewImage: (data: FileList) => void
}
const Courses: React.FC<CoursesProps> = ({
  columns,
  dataForm,
  stateStore,
  addCourse,
  previewImage
}) => {
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
              title="Tạo khóa học mới"
              size="3xl"
            >
              <form className="space-y-6" onSubmit={dataForm.handleSubmit(addCourse)}>
                <div className="flex gap-3">
                  <div className="flex flex-1 flex-col gap-3">
                    <Controller
                      name="options.authorOpts"
                      defaultValue={undefined}
                      control={stateStore.control}
                      render={({ field: { value: opts } }) => (
                        <Controller
                          name="author_id"
                          defaultValue=""
                          control={dataForm.control}
                          render={({ field, fieldState }) => (
                            <Select
                              options={opts}
                              title="Tác giả"
                              {...field}
                              errors={fieldState.error}
                              required
                            />
                          )}
                        />
                      )}
                    />
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
                      name="options.lessonOpts"
                      defaultValue={undefined}
                      control={stateStore.control}
                      render={({ field: { value: opts } }) => (
                        <Controller
                          name="lesson_id"
                          defaultValue=""
                          control={dataForm.control}
                          render={({ field, fieldState }) => (
                            <Select
                              options={opts}
                              title="Chương trình học"
                              {...field}
                              errors={fieldState.error}
                              required
                            />
                          )}
                        />
                      )}
                    />
                    <Controller
                      name="options.detailsOpts"
                      defaultValue={undefined}
                      control={stateStore.control}
                      render={({ field: { value: opts } }) => (
                        <Controller
                          name="detail_id"
                          defaultValue=""
                          control={dataForm.control}
                          render={({ field, fieldState }) => (
                            <Select
                              options={opts}
                              title="Chi tiết khóa học"
                              {...field}
                              errors={fieldState.error}
                              required
                            />
                          )}
                        />
                      )}
                    />

                    <Controller
                      name="course_level"
                      defaultValue={0}
                      control={dataForm.control}
                      render={({ field, fieldState }) => (
                        <Select
                          options={[
                            { value: 0, label: 'NONE' },
                            { value: 1, label: 'ALL_LEVELS' },
                            { value: 2, label: 'BEGINNER' },
                            { value: 3, label: 'INTERMEDIATE' },
                            { value: 4, label: 'EXPERT' }
                          ]}
                          title="Trình độ khoá học"
                          {...field}
                          errors={fieldState.error}
                          required
                        />
                      )}
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-3">
                    <Controller
                      name="course_name"
                      defaultValue=""
                      control={dataForm.control}
                      render={({ field, fieldState }) => (
                        <TextField
                          title="Tên khóa học"
                          {...field}
                          errors={fieldState.error}
                          required
                        />
                      )}
                    />
                    <Controller
                      name="approval_status"
                      defaultValue={0}
                      control={dataForm.control}
                      render={({ field, fieldState }) => (
                        <Select
                          options={[
                            { value: 0, label: 'NONE' },
                            { value: 1, label: 'ACCEPT' },
                            { value: 2, label: 'DENY' },
                            { value: 3, label: 'WATTING' }
                          ]}
                          title="Tình trạng xác nhận"
                          {...field}
                          errors={fieldState.error}
                          required
                        />
                      )}
                    />
                    <Controller
                      name="course_language"
                      defaultValue={0}
                      control={dataForm.control}
                      render={({ field, fieldState }) => (
                        <Select
                          options={[
                            { value: 0, label: 'NONE' },
                            { value: 1, label: 'VIETNAMESE' },
                            { value: 2, label: 'ENGLISH' }
                          ]}
                          title="Ngôn ngữ khóa học"
                          {...field}
                          errors={fieldState.error}
                          required
                        />
                      )}
                    />
                    <Controller
                      name="course_fee"
                      defaultValue={0}
                      control={dataForm.control}
                      render={({ field, fieldState }) => (
                        <TextField
                          title="Học phí khóa học"
                          {...field}
                          errors={fieldState.error}
                          required
                        />
                      )}
                    />
                    <Controller
                      name="course_status"
                      defaultValue={0}
                      control={dataForm.control}
                      render={({ field, fieldState }) => (
                        <Select
                          options={[
                            { value: 0, label: 'NONE' },
                            { value: 1, label: 'WATTING' },
                            { value: 2, label: 'OPEN' },
                            { value: 3, label: 'CLOSE' },
                            { value: 4, label: 'FULL_ACCESS' }
                          ]}
                          title="Tình trạng khóa học"
                          {...field}
                          errors={fieldState.error}
                          required
                        />
                      )}
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-3">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col mt-6 items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 "
                    >
                      <Controller
                        name="imagePreview"
                        control={stateStore.control}
                        defaultValue={undefined}
                        render={({ field }) => {
                          return (
                            <div>
                              {field.value ? (
                                <Image
                                  src={field.value || 'https://www.freeiconspng.com/img/23494'}
                                  unoptimized
                                  width={10}
                                  height={100}
                                  alt=""
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="flex flex-col p-4 items-center justify-center">
                                  <svg
                                    aria-hidden="true"
                                    className="w-10 h-10 mb-3 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                    />
                                  </svg>
                                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-semibold">Ảnh bìa</span>
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                                    SVG, PNG, JPG or GIF (MAX. 800x400px)
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
                        onChange={(event) => previewImage(event.target.files)}
                      />
                    </label>

                    <Controller
                      name="description"
                      defaultValue=""
                      control={dataForm.control}
                      render={({ field, fieldState }) => (
                        <TextAreaField
                          title="Mô tả khóa học"
                          {...field}
                          rows={4}
                          errors={fieldState.error}
                          required
                        />
                      )}
                    />
                  </div>
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
            <label className="hidden md:block"> Tạo khóa học mới</label>
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

export default Courses
