'use client'
import { StateAccountCustomersType } from '@/pages/admin/account_customers'
import { AccountType } from '@/types/account'
import { ColumnDef } from '@tanstack/react-table'
import { Controller, UseFormReturn } from 'react-hook-form'
import { Table } from '../atoms'
interface AccountCustomersProps {
  stateStore: UseFormReturn<StateAccountCustomersType, any>
  dataForm: UseFormReturn<AccountType, any>
  columns: ColumnDef<any, any>[]
}
const AccountCustomers: React.FC<AccountCustomersProps> = ({ columns, stateStore }) => {
  return (
    <div className="flex flex-col w-full h-full gap-2">
      <div className="flex-1 w-full rounded-lg overflow-y-auto pb-12">
        <Controller
          name="customers"
          control={stateStore.control}
          render={({ field }) => <Table columns={columns} data={field.value} />}
        />
      </div>
    </div>
  )
}

export default AccountCustomers
