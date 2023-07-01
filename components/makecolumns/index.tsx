import { ColumnDef } from '@tanstack/react-table'
import { format, parseISO } from 'date-fns'
import { CgCheck, CgCloseO } from 'react-icons/cg'

interface ColumnTableProps {
  onDelete: (id: string) => void
  idDelete?: string
  onChangeIdDelete?: (id: string) => void
}

export const columnTableChapters = ({
  onDelete,
  idDelete,
  onChangeIdDelete
}: ColumnTableProps): ColumnDef<any, any>[] => {
  return [
    {
      header: 'Khoá học',
      accessorKey: 'course_name',
      size: 120
    },
    {
      header: 'Thời gian tạo',
      accessorKey: 'createdAt',
      size: 120,
      cell: (c) => {
        const dateString = c.getValue()
        if (!dateString) return
        const parsedDate = parseISO(dateString)

        const formattedDate = format(parsedDate, 'dd/MM/yyyy HH:mm')
        return formattedDate
      }
    },
    {
      header: 'Thời gian chỉnh sửa',
      accessorKey: 'updatedAt',
      size: 120,
      cell: (c) => {
        const dateString = c.getValue()
        if (!dateString) return
        const parsedDate = parseISO(dateString)

        const formattedDate = format(parsedDate, 'dd/MM/yyyy HH:mm')
        return formattedDate
      }
    },
    {
      header: 'Công cụ',
      accessorKey: 'delete',
      size: 90,
      cell: ({ row: { original } }) => {
        if (idDelete === original?._id) {
          return (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onChangeIdDelete?.(null)}
                className="w-8 flex justify-center items-center h-8 text-xs font-medium text-center border border-red-600 text-red-600 rounded-lg focus:ring-4 focus:ring-red-200 "
              >
                <CgCloseO size={14} />
              </button>

              <button
                type="button"
                onClick={() => onDelete(original?._id)}
                className="w-8 flex justify-center items-center h-8 text-xs font-medium text-center border border-green-600 text-green-600 rounded-lg focus:ring-4 focus:ring-green-200 "
              >
                <CgCheck size={24} />
              </button>
            </div>
          )
        }
        return (
          <button
            type="button"
            onClick={() => onChangeIdDelete?.(original?._id)}
            className="flex-1 items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-red-600 rounded-lg focus:ring-4 focus:ring-red-200 hover:bg-red-700"
          >
            Xóa
          </button>
        )
      }
    }
  ]
}

export const columnTableMainType = ({
  onDelete,
  idDelete,
  onChangeIdDelete
}: ColumnTableProps): ColumnDef<any, any>[] => {
  return [
    {
      header: 'Chủ đề',
      accessorKey: 'type_name',
      size: 120
    },
    {
      header: 'Ngày tạo',
      accessorKey: 'createdAt',
      size: 120,
      cell: (c) => {
        const dateString = c.getValue()
        if (!dateString) return
        const parsedDate = parseISO(dateString)

        const formattedDate = format(parsedDate, 'dd/MM/yyyy HH:mm')
        return formattedDate
      }
    },
    {
      header: 'Ngày chỉnh sửa',
      accessorKey: 'updatedAt',
      size: 120,
      cell: (c) => {
        const dateString = c.getValue()
        if (!dateString) return
        const parsedDate = parseISO(dateString)

        const formattedDate = format(parsedDate, 'dd/MM/yyyy HH:mm')
        return formattedDate
      }
    },
    {
      header: 'Công cụ',
      accessorKey: 'delete',
      size: 90,
      cell: ({ row: { original } }) => {
        if (idDelete === original?._id) {
          return (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onChangeIdDelete?.(null)}
                className="w-8 flex justify-center items-center h-8 text-xs font-medium text-center border border-red-600 text-red-600 rounded-lg focus:ring-4 focus:ring-red-200 "
              >
                <CgCloseO size={14} />
              </button>

              <button
                type="button"
                onClick={() => onDelete(original?._id)}
                className="w-8 flex justify-center items-center h-8 text-xs font-medium text-center border border-green-600 text-green-600 rounded-lg focus:ring-4 focus:ring-green-200 "
              >
                <CgCheck size={24} />
              </button>
            </div>
          )
        }
        return (
          <button
            type="button"
            onClick={() => onChangeIdDelete?.(original?._id)}
            className="flex-1 items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-red-600 rounded-lg focus:ring-4 focus:ring-red-200 hover:bg-red-700"
          >
            Xóa
          </button>
        )
      }
    }
  ]
}

export const columnTableDetails = ({
  onDelete,
  idDelete,
  onChangeIdDelete
}: ColumnTableProps): ColumnDef<any, any>[] => {
  return [
    {
      header: 'Chương trình học',
      accessorKey: 'section_id',
      size: 120
    },
    {
      header: 'Tag',
      accessorKey: 'tag_id',
      size: 120
    },
    {
      header: 'Chi tiết khoá học',
      accessorKey: 'detail_name',
      size: 120
    },
    {
      header: 'Thời gian tạo',
      accessorKey: 'createdAt',
      size: 120,
      cell: (c) => {
        const dateString = c.getValue()
        if (!dateString) return
        const parsedDate = parseISO(dateString)

        const formattedDate = format(parsedDate, 'dd/MM/yyyy HH:mm')
        return formattedDate
      }
    },
    {
      header: 'Thời gian chỉnh sửa',
      accessorKey: 'updatedAt',
      size: 120,
      cell: (c) => {
        const dateString = c.getValue()
        if (!dateString) return
        const parsedDate = parseISO(dateString)

        const formattedDate = format(parsedDate, 'dd/MM/yyyy HH:mm')
        return formattedDate
      }
    },
    {
      header: 'Công cụ',
      accessorKey: 'delete',
      size: 90,
      cell: ({ row: { original } }) => {
        if (idDelete === original?._id) {
          return (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onChangeIdDelete?.(null)}
                className="w-8 flex justify-center items-center h-8 text-xs font-medium text-center border border-red-600 text-red-600 rounded-lg focus:ring-4 focus:ring-red-200 "
              >
                <CgCloseO size={14} />
              </button>

              <button
                type="button"
                onClick={() => onDelete(original?._id)}
                className="w-8 flex justify-center items-center h-8 text-xs font-medium text-center border border-green-600 text-green-600 rounded-lg focus:ring-4 focus:ring-green-200 "
              >
                <CgCheck size={24} />
              </button>
            </div>
          )
        }
        return (
          <button
            type="button"
            onClick={() => onChangeIdDelete?.(original?._id)}
            className="flex-1 items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-red-600 rounded-lg focus:ring-4 focus:ring-red-200 hover:bg-red-700"
          >
            Xóa
          </button>
        )
      }
    }
  ]
}

export const columnTableLessons = ({
  onDelete,
  idDelete,
  onChangeIdDelete
}: ColumnTableProps): ColumnDef<any, any>[] => {
  return [
    {
      header: 'Chương',
      accessorKey: 'chapter_id',
      size: 120
    },
    {
      header: 'Bài học',
      accessorKey: 'lesson_name',
      size: 120
    },
    {
      header: 'Thời lượng',
      accessorKey: 'duration',
      size: 120
    },
    {
      header: 'Thời gian tạo',
      accessorKey: 'createdAt',
      size: 120,
      cell: (c) => {
        const dateString = c.getValue()
        if (!dateString) return
        const parsedDate = parseISO(dateString)

        const formattedDate = format(parsedDate, 'dd/MM/yyyy HH:mm')
        return formattedDate
      }
    },
    {
      header: 'Thời gian chỉnh sửa',
      accessorKey: 'updatedAt',
      size: 120,
      cell: (c) => {
        const dateString = c.getValue()
        if (!dateString) return
        const parsedDate = parseISO(dateString)

        const formattedDate = format(parsedDate, 'dd/MM/yyyy HH:mm')
        return formattedDate
      }
    },
    {
      header: 'Công cụ',
      accessorKey: 'delete',
      size: 90,
      cell: ({ row: { original } }) => {
        if (idDelete === original?._id) {
          return (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onChangeIdDelete?.(null)}
                className="w-8 flex justify-center items-center h-8 text-xs font-medium text-center border border-red-600 text-red-600 rounded-lg focus:ring-4 focus:ring-red-200 "
              >
                <CgCloseO size={14} />
              </button>

              <button
                type="button"
                onClick={() => onDelete(original?._id)}
                className="w-8 flex justify-center items-center h-8 text-xs font-medium text-center border border-green-600 text-green-600 rounded-lg focus:ring-4 focus:ring-green-200 "
              >
                <CgCheck size={24} />
              </button>
            </div>
          )
        }
        return (
          <button
            type="button"
            onClick={() => onChangeIdDelete?.(original?._id)}
            className="flex-1 items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-red-600 rounded-lg focus:ring-4 focus:ring-red-200 hover:bg-red-700"
          >
            Xóa
          </button>
        )
      }
    }
  ]
}
export const columnTableCourses = ({
  onDelete,
  idDelete,
  onChangeIdDelete
}: ColumnTableProps): ColumnDef<any, any>[] => {
  return [
    {
      header: 'Khoá học',
      accessorKey: 'course_name',
      size: 120
    },
    {
      header: 'Giá tiền',
      accessorKey: 'course_fee',
      size: 120
    },
    {
      header: 'Thông tin chi tiết',
      accessorKey: 'description',
      size: 120
    },
    {
      header: 'Tác giả',
      accessorKey: 'author_id',
      size: 120
    },
    {
      header: 'Trình độ',
      accessorKey: 'course_level',
      size: 120
    },
    {
      header: 'Ngôn ngữ giảng dạy',
      accessorKey: 'course_language',
      size: 120
    },
    {
      header: 'Thời gian tạo',
      accessorKey: 'createdAt',
      size: 120,
      cell: (c) => {
        const dateString = c.getValue()
        if (!dateString) return
        const parsedDate = parseISO(dateString)

        const formattedDate = format(parsedDate, 'dd/MM/yyyy HH:mm')
        return formattedDate
      }
    },
    {
      header: 'Thời gian chỉnh sửa',
      accessorKey: 'updatedAt',
      size: 120,
      cell: (c) => {
        const dateString = c.getValue()
        if (!dateString) return
        const parsedDate = parseISO(dateString)

        const formattedDate = format(parsedDate, 'dd/MM/yyyy HH:mm')
        return formattedDate
      }
    },
    {
      header: 'Công cụ',
      accessorKey: 'delete',
      size: 90,
      cell: ({ row: { original } }) => {
        if (idDelete === original?._id) {
          return (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onChangeIdDelete?.(null)}
                className="w-8 flex justify-center items-center h-8 text-xs font-medium text-center border border-red-600 text-red-600 rounded-lg focus:ring-4 focus:ring-red-200 "
              >
                <CgCloseO size={14} />
              </button>

              <button
                type="button"
                onClick={() => onDelete(original?._id)}
                className="w-8 flex justify-center items-center h-8 text-xs font-medium text-center border border-green-600 text-green-600 rounded-lg focus:ring-4 focus:ring-green-200 "
              >
                <CgCheck size={24} />
              </button>
            </div>
          )
        }
        return (
          <button
            type="button"
            onClick={() => onChangeIdDelete?.(original?._id)}
            className="flex-1 items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-red-600 rounded-lg focus:ring-4 focus:ring-red-200 hover:bg-red-700"
          >
            Xóa
          </button>
        )
      }
    }
  ]
}

export const columnTableSections = ({
  onDelete,
  idDelete,
  onChangeIdDelete
}: ColumnTableProps): ColumnDef<any, any>[] => {
  return [
    {
      header: 'Chủ đề chính',
      accessorKey: 'maintype_id',
      size: 120
    },
    {
      header: 'Chương trình học',
      accessorKey: 'section_name',
      size: 120
    },
    {
      header: 'Thời gian tạo',
      accessorKey: 'createdAt',
      size: 120,
      cell: (c) => {
        const dateString = c.getValue()
        if (!dateString) return
        const parsedDate = parseISO(dateString)

        const formattedDate = format(parsedDate, 'dd/MM/yyyy HH:mm')
        return formattedDate
      }
    },
    {
      header: 'Thời gian chỉnh sửa',
      accessorKey: 'updatedAt',
      size: 120,
      cell: (c) => {
        const dateString = c.getValue()
        if (!dateString) return
        const parsedDate = parseISO(dateString)

        const formattedDate = format(parsedDate, 'dd/MM/yyyy HH:mm')
        return formattedDate
      }
    },
    {
      header: 'Công cụ',
      accessorKey: 'delete',
      size: 90,
      cell: ({ row: { original } }) => {
        if (idDelete === original?._id) {
          return (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onChangeIdDelete?.(null)}
                className="w-8 flex justify-center items-center h-8 text-xs font-medium text-center border border-red-600 text-red-600 rounded-lg focus:ring-4 focus:ring-red-200 "
              >
                <CgCloseO size={14} />
              </button>

              <button
                type="button"
                onClick={() => onDelete(original?._id)}
                className="w-8 flex justify-center items-center h-8 text-xs font-medium text-center border border-green-600 text-green-600 rounded-lg focus:ring-4 focus:ring-green-200 "
              >
                <CgCheck size={24} />
              </button>
            </div>
          )
        }
        return (
          <button
            type="button"
            onClick={() => onChangeIdDelete?.(original?._id)}
            className="flex-1 items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-red-600 rounded-lg focus:ring-4 focus:ring-red-200 hover:bg-red-700"
          >
            Xóa
          </button>
        )
      }
    }
  ]
}
export const columnTableReports = ({ onDelete }: ColumnTableProps): ColumnDef<any, any>[] => {
  return [
    {
      header: 'ID Khóa học',
      accessorKey: 'courseID',
      size: 120
    },
    {
      header: 'Tên chương',
      accessorKey: 'chapterName',
      size: 120
    },
    {
      header: 'Xóa',
      accessorKey: 'delete',
      size: 90,
      cell: ({ row: { original } }) => (
        <button
          type="button"
          onClick={() => onDelete(original?.id)}
          className="flex-1 items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-red-600 rounded-lg focus:ring-4 focus:ring-red-200 hover:bg-red-700"
        >
          Xóa
        </button>
      )
    }
  ]
}
export const columnTableTags = ({
  onDelete,
  idDelete,
  onChangeIdDelete
}: ColumnTableProps): ColumnDef<any, any>[] => {
  return [
    {
      header: 'Tag',
      accessorKey: 'tag_name',
      size: 120
    },
    {
      header: 'Thời gian tạo',
      accessorKey: 'createdAt',
      size: 120,
      cell: (c) => {
        const dateString = c.getValue()
        if (!dateString) return
        const parsedDate = parseISO(dateString)

        const formattedDate = format(parsedDate, 'dd/MM/yyyy HH:mm')
        return formattedDate
      }
    },
    {
      header: 'Thời gian chỉnh sửa',
      accessorKey: 'updatedAt',
      size: 120,
      cell: (c) => {
        const dateString = c.getValue()
        if (!dateString) return
        const parsedDate = parseISO(dateString)

        const formattedDate = format(parsedDate, 'dd/MM/yyyy HH:mm')
        return formattedDate
      }
    },
    {
      header: 'Công cụ',
      accessorKey: 'delete',
      size: 90,
      cell: ({ row: { original } }) => {
        if (idDelete === original?._id) {
          return (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onChangeIdDelete?.(null)}
                className="w-8 flex justify-center items-center h-8 text-xs font-medium text-center border border-red-600 text-red-600 rounded-lg focus:ring-4 focus:ring-red-200 "
              >
                <CgCloseO size={14} />
              </button>

              <button
                type="button"
                onClick={() => onDelete(original?._id)}
                className="w-8 flex justify-center items-center h-8 text-xs font-medium text-center border border-green-600 text-green-600 rounded-lg focus:ring-4 focus:ring-green-200 "
              >
                <CgCheck size={24} />
              </button>
            </div>
          )
        }
        return (
          <button
            type="button"
            onClick={() => onChangeIdDelete?.(original?._id)}
            className="flex-1 items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-red-600 rounded-lg focus:ring-4 focus:ring-red-200 hover:bg-red-700"
          >
            Xóa
          </button>
        )
      }
    }
  ]
}
