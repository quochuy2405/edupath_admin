'use client'
import { ColumnDef } from '@tanstack/react-table'

import { StateReviewType } from '@/pages/admin/reviews'
import { Controller, UseFormReturn } from 'react-hook-form'
import { Table } from '../atoms'
import { Pagination } from '../moleculers'
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
}
const Reviews: React.FC<ReviewsProps> = ({ columns, stateStore }) => {
  return (
    <div className="flex flex-col w-full h-full gap-2">
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

export default Reviews
