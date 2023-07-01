'use client'
import {
  ColumnDef,
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  useReactTable
} from '@tanstack/react-table'
import clsx from 'clsx'
import { memo, useEffect, useState } from 'react'
import { Control, Controller } from 'react-hook-form'
import TextField from './TextField'

interface TableProps {
  data: Array<object>
  columns: ColumnDef<any, any>[]
  className?: string
  powerplus?: boolean
  control?: Control<any>
}
export const defaultColumn: any = (control: Control<any>) => ({
  cell: ({ getValue, row: { index, id: rowid }, column: { id }, table }) => {
    const initialValue = getValue()
    const [value, setValue] = useState(initialValue)

    const onBlur = () => {
      table.options.meta?.updateData(index, id, value)
    }

    useEffect(() => {
      setValue(initialValue)
    }, [initialValue])
    return (
      <Controller
        name={`${rowid.toString().replaceAll('.', '.subRows.')}.${id}`}
        defaultValue={value}
        control={control}
        render={({ field }) => <TextField {...field} onBlur={onBlur} />}
      />
    )
  }
})

const Table: React.FC<TableProps> = ({ data, columns, className, powerplus, control }) => {
  const [expanded, setExpanded] = useState<ExpandedState>({})
  const defaultColumnConfig = defaultColumn(control)
  const table = useReactTable(
    powerplus
      ? {
          data,
          columns,
          defaultColumn: defaultColumnConfig,
          state: {
            expanded
          },

          getSubRows: (row) => row?.subRows,
          onExpandedChange: setExpanded,
          getCoreRowModel: getCoreRowModel(),
          getExpandedRowModel: getExpandedRowModel(),
          getFilteredRowModel: getFilteredRowModel()
        }
      : {
          data,
          columns,
          state: {
            expanded
          },
          getSubRows: (row) => row?.subRows,
          onExpandedChange: setExpanded,
          getCoreRowModel: getCoreRowModel(),
          getExpandedRowModel: getExpandedRowModel(),
          getFilteredRowModel: getFilteredRowModel()
        }
  )
  const classNames = clsx('w-full text-sm text-left text-gray-500 rounded-lg relative', {
    'h-full': !table?.getRowModel().rows.length,
    [className]: !!className
  })

  return (
    <table cellPadding={0} cellSpacing={0} className={classNames}>
      <thead className="text-xs text-gray-400 uppercaseflex-1 z-50 ">
        {table?.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className="mr-6">
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                style={{
                  width: header.column.columnDef.size ? `${header.column.columnDef.size}px` : 'auto'
                }}
                colSpan={header.colSpan}
                className={clsx(
                  'first:pl-6 last:pr-6 h-12 pl-1 sticky top-0 z-10 bg-gray-100 whitespace-nowrap ',
                  {
                    'text-center': (header.column.columnDef.meta as any)?.center
                  }
                )}
              >
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className="bg-white divide-y-[1px]">
        {table?.getRowModel().rows.map((row) => {
          return (
            <tr key={row.id + row.index} className="hover:bg-gray-100 cursor-pointer">
              {row.getVisibleCells().map((cell) => {
                return (
                  <td
                    className="first:pl-6 last:pr-6 h-16 pl-1 font-medium text-sm text-black"
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                )
              })}
            </tr>
          )
        })}
        {!table?.getRowModel().rows?.length && (
          <tr>
            <td
              colSpan={table.getHeaderGroups()[0].headers.length}
              className="px-6 py-3 h-full text-center"
            >
              Chưa có dữ liệu
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default memo(Table)
