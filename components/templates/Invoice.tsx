'use client'
import { ColumnDef } from '@tanstack/react-table'

import { StateInvoiceType } from '@/pages/admin/invoices'
import { Controller, UseFormReturn } from 'react-hook-form'
import { Table } from '../atoms'
import { Pagination } from '../moleculers'

interface InvoicesProps {
  stateStore: UseFormReturn<StateInvoiceType, any>
  columns: ColumnDef<any, any>[]
}
const Invoices: React.FC<InvoicesProps> = ({ columns, stateStore }) => {
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

export default Invoices
