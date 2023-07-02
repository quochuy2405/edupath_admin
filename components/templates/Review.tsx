'use client'
import { ColumnDef } from '@tanstack/react-table'

import { StateReviewType } from '@/pages/admin/reviews'
import { Controller, UseFormReturn } from 'react-hook-form'
import { Table } from '../atoms'
// author_id: Schema.Types.ObjectId | undefined
// detail_id: Schema.Types.ObjectId | undefined
// course_level: ELevel | undefined
// course_language: ELanguage | undefined
// course_name: string | undefined
// approval_status: EApprovalsStatus | undefined
// course_fee: number | undefined
// description: string | undefined
// course_status: EReviewStatus | undefined
// course_img: File | undefined | undefined
interface ReviewsProps {
  stateStore: UseFormReturn<StateReviewType, any>
  dataForm: UseFormReturn<any, any>
  columns: ColumnDef<any, any>[]
  addReview: (data: any) => void
}
const Reviews: React.FC<ReviewsProps> = ({ columns, stateStore }) => {
  return (
    <div className="flex flex-col w-full h-full gap-2">
      <div className="flex gap-4 bg-white rounded-lg overflow-hidden p-2">
        {/* <div className="bg-white flex-1 flex justify-end text-sm font-medium text-center text-gray-500">
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
        </div> */}
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

export default Reviews
