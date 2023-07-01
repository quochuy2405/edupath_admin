import { ColumnDef } from '@tanstack/react-table'
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai'
import { MdAdd, MdDelete } from 'react-icons/md'
interface ColumnTableExpenseProps {
  handleOpenModel: (id: string) => void
  handleDeleteRow: (id: string) => void
}
export const columnTableExpense = ({
  handleOpenModel,
  handleDeleteRow
}: ColumnTableExpenseProps): ColumnDef<any, any>[] => [
  {
    accessorKey: 'nameCol',
    header: ({ table }) => (
      <>
        <button
          className="mr-2"
          {...{
            onClick: table.getToggleAllRowsExpandedHandler()
          }}
        >
          {table.getIsAllRowsExpanded() ? (
            <AiFillPlusCircle size={15} color="black" />
          ) : (
            <AiFillMinusCircle size={15} color="black" />
          )}
        </button>
        Kế hoạch
      </>
    ),
    cell: (info) => (
      <div
        style={{
          paddingLeft: `${info?.row.depth * 2}rem`
        }}
      >
        {info?.row.getCanExpand() ? (
          <button
            className="mr-2"
            {...{
              onClick: info?.row.getToggleExpandedHandler(),
              style: { cursor: 'pointer' }
            }}
          >
            {info?.row.getIsExpanded() ? (
              <AiFillPlusCircle size={15} color="black" />
            ) : (
              <AiFillMinusCircle size={15} color="black" />
            )}
          </button>
        ) : (
          <></>
        )}
        {info?.getValue?.()}
      </div>
    ),
    size: 340,
    footer: (props) => props.column.id
  },
  {
    accessorKey: 'T1',
    id: 'T1',
    header: 'T1',
    footer: (props) => props.column.id
  },
  {
    accessorKey: 'T2',
    header: 'T2',
    footer: (props) => props.column.id
  },
  {
    accessorKey: 'T3',
    header: 'T3',
    footer: (props) => props.column.id
  },
  {
    accessorKey: 'T4',
    header: 'T4',
    footer: (props) => props.column.id
  },
  {
    accessorKey: 'T5',
    header: 'T5',
    footer: (props) => props.column.id
  },
  {
    accessorKey: 'T6',
    header: 'T6',
    footer: (props) => props.column.id
  },
  {
    accessorKey: 'T7',
    header: 'T7',
    footer: (props) => props.column.id
  },
  {
    accessorKey: 'T8',
    header: 'T8',
    footer: (props) => props.column.id
  },
  {
    accessorKey: 'T9',
    header: 'T9',
    footer: (props) => props.column.id
  },
  {
    accessorKey: 'T10',
    header: 'T10',
    footer: (props) => props.column.id
  },
  {
    accessorKey: 'T11',
    header: 'T11',
    footer: (props) => props.column.id
  },
  {
    accessorKey: 'T12',
    header: 'T12',
    footer: (props) => props.column.id
  },
  {
    accessorKey: '',
    header: 'Tổng',
    cell: ({ row: { original } }) => {
      const total = Object.entries(original).reduce((sum: number, [key, value]) => {
        if (value && !['nameCol', 'subRows', 'id'].includes(key)) return sum + Number(value)
        return sum
      }, 0)
      console.log(total)
      return (
        <div className="flex p-2 items-center">
          {Number.isInteger(Number(total)) ? (
            <p className="text-base">{Number(total)}</p>
          ) : (
            <p className="text-red-500">Lỗi</p>
          )}
        </div>
      )
    }
  },
  {
    accessorKey: 'actions',
    header: '',
    cell: ({ row: { original } }) => (
      <div className="flex gap-1 items-center h-full justify-center">
        <button
          type="button"
          onClick={() => handleOpenModel(original.id)}
          className="inline-flex items-center py-2 px-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
        >
          <MdAdd size={13} />
        </button>
        <button
          type="button"
          onClick={() => handleDeleteRow(original.id)}
          className="inline-flex items-center py-2 px-2 text-xs font-medium text-center text-white bg-red-500 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-red-600"
        >
          <MdDelete size={13} />
        </button>
      </div>
    ),
    footer: (props) => props.column.id
  }
]
