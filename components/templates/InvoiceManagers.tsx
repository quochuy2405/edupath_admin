'use client'
import { ColumnDef } from '@tanstack/react-table'
import { Controller, UseFormReturn } from 'react-hook-form'
import { Table } from '../atoms'
import { StateInvoiceManagersPageType } from '@/pages/admin/invoice_managers'
interface InvoiceManagersProps {
  stateStore: UseFormReturn<StateInvoiceManagersPageType, any>
  columns: ColumnDef<any, any>[]
}
const InvoiceManagers: React.FC<InvoiceManagersProps> = ({ columns, stateStore }) => {
  return (
    <div className="flex flex-col w-full h-full gap-2 ">
      <Controller
        name="datasets"
        control={stateStore.control}
        defaultValue={[]}
        render={({ field }) => <Table columns={columns} data={field.value} />}
      />
    </div>
  )
}

export default InvoiceManagers
