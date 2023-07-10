import { ELanguage, ELevel } from '@/types/course'
import { ColumnDef } from '@tanstack/react-table'
import { confirmInvoice } from 'apis/payment'
import clsx from 'clsx'
import { format, parseISO } from 'date-fns'
import { CgCheck, CgCloseO } from 'react-icons/cg'

interface ColumnTableProps {
  onDelete?: (id: string) => void
  onModelUpdate?: (data: any) => void
  idDelete?: string
  onChangeIdDelete?: (id: string) => void
  onRefresh?: () => void
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
      header: 'Chương',
      accessorKey: 'chapter_name',
      size: 120
    },
    {
      header: 'Thứ tự',
      accessorKey: 'order',
      size: 120
    },
    {
      header: 'Thời gian tạo',
      accessorKey: 'createdAt',
      size: 140,
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
      size: 140,
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
      size: 100,
      cell: ({ row: { original } }) => {
        if (idDelete === original?._id) {
          return (
            <div className="flex justify-center items-center gap-2">
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
  onChangeIdDelete,
  onModelUpdate
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
          <div className="flex gap-1 items-center m-auto">
            <button
              type="button"
              onClick={() => onChangeIdDelete?.(original?._id)}
              className="items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-red-600 rounded-lg focus:ring-4 focus:ring-red-200 hover:bg-red-700"
            >
              Xóa
            </button>
            <button
              type="button"
              onClick={() =>
                onModelUpdate?.({
                  _id: original?._id,
                  type_name: original?.type_name
                })
              }
              className="h-8 items-center px-4 text-xs font-medium text-center border-blue-600 border text-blue-600 rounded-lg focus:ring-4 focus:ring-blue-200"
            >
              Sửa
            </button>
          </div>
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
      header: 'Chủ đề',
      accessorKey: 'type_name',
      size: 120
    },
    {
      header: 'Chương trình học',
      accessorKey: 'section_name',
      size: 120
    },

    {
      header: 'Chi tiết khoá học',
      accessorKey: 'detail_name',
      size: 120
    },
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

export const columnTableLessons = ({
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
      header: 'Khoá học',
      accessorKey: 'course_name',
      size: 120
    },
    {
      header: 'Chương',
      accessorKey: 'chapter_name',
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
      size: 40,
      cell: (c) => <p>{c.getValue()} giờ</p>
    },
    {
      header: 'Thời gian tạo',
      accessorKey: 'createdAt',
      size: 140,
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
      size: 140,
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
      size: 140,
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
      size: 220
    },
    {
      header: 'Giá tiền',
      accessorKey: 'course_fee',
      size: 110,
      cell: (c) => <p>{Number(c.getValue()).toLocaleString()} VND</p>
    },
    {
      header: 'Thông tin chi tiết',
      accessorKey: 'description',
      size: 320
    },
    {
      header: 'Tác giả',
      accessorKey: 'fullname',
      size: 170
    },
    {
      header: 'Trình độ',
      accessorKey: 'course_level',
      size: 120,
      cell: (c) => ELevel[c.getValue()]
    },
    {
      header: 'Ngôn ngữ giảng dạy',
      accessorKey: 'course_language',
      size: 140,
      cell: (c) => ELanguage[c.getValue()]
    },
    {
      header: 'Thời gian tạo',
      accessorKey: 'createdAt',
      size: 140,
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
      size: 140,
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
      size: 100,
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
      accessorKey: 'type_name',
      size: 120
    },
    {
      header: 'Chương trình học',
      accessorKey: 'section_name',
      size: 120
    },
    {
      header: 'Thứ tự',
      accessorKey: 'order',
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

export const columnTableInvoices = ({
  onDelete,
  idDelete,
  onChangeIdDelete,
  onRefresh
}: ColumnTableProps): ColumnDef<any, any>[] => {
  return [
    {
      header: 'Người dùng',
      accessorKey: 'fullname',
      size: 120
    },
    {
      header: 'Khoá học',
      accessorKey: 'course_name',
      size: 120
    },
    {
      header: 'Số tiền',
      accessorKey: 'total_amount',
      size: 120,
      cell: (v) => Number(v.getValue()).toLocaleString()
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
      header: 'Trạng thái',
      accessorKey: 'payment_status',
      size: 110,
      cell: (info) => {
        const STATUS = {
          0: 'UNPAID',
          1: 'PAID',
          2: 'PENDING'
        }
        return (
          <div className="flex gap-2 justify-center">
            <p
              className={clsx('px-4 py-[1.4px] text-[10px] font-semibold text-white rounded-md', {
                'bg-green-400': info.getValue() === 1,
                'bg-orange-400': info.getValue() === 2,
                'bg-red-600': info.getValue() === 0
              })}
            >
              {STATUS[info.getValue()]}
            </p>
          </div>
        )
      }
    },
    {
      header: 'Thanh toán',
      accessorKey: 'payment_status',
      size: 110,
      cell: (info) => {
        const {
          row: { original }
        } = info
        const id = original._id

        const handleToggleStatusCharge = async (status: boolean) => {
          await confirmInvoice(id, status)
            .then(() => onRefresh())
            .catch((e) => console.log(e))
        }

        return (
          <button
            onClick={() => handleToggleStatusCharge(info?.getValue()?.toString() !== '1')}
            className="w-fit flex justify-center items-center px-4 py-2 text-xs font-medium text-center bg-blue-600 text-white disabled:opacity-30 rounded-lg focus:ring-4 focus:ring-blue-200 "
          >
            {info?.getValue()?.toString() !== '1' ? 'Xác nhận' : 'Hủy xác nhận'}
          </button>
        )
      }
    },
    {
      header: 'Công cụ',
      accessorKey: 'delete',
      size: 180,
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
          <div className="flex gap-2 m-auto">
            <button
              type="button"
              onClick={() => onChangeIdDelete?.(original?._id)}
              className="h-8 items-center px-4 text-xs font-medium text-center text-white bg-red-600 rounded-lg focus:ring-4 focus:ring-red-200 hover:bg-red-700"
            >
              Xóa
            </button>
          </div>
        )
      }
    }
  ]
}

export const columnTableReviews = ({}: ColumnTableProps): ColumnDef<any, any>[] => {
  return [
    {
      header: 'Người dùng',
      accessorKey: 'fullname',
      size: 120
    },
    {
      header: 'Khoá học',
      accessorKey: 'course_name',
      size: 120
    },
    {
      header: 'Nội dung nhận xét',
      accessorKey: 'content',
      size: 120
    },
    {
      header: 'Điểm số',
      accessorKey: 'course_review_star',
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
    }
  ]
}

export const columnTableReport = ({}: ColumnTableProps): ColumnDef<any, any>[] => {
  return [
    {
      header: 'Người dùng',
      accessorKey: 'fullname',
      size: 120
    },
    {
      header: 'Email',
      accessorKey: 'email',
      size: 120
    },
    {
      header: 'Thời gian tạo tài khoản',
      accessorKey: 'createdAt',
      size: 120,
      cell: (c) => {
        const dateString = c.getValue()
        if (!dateString) return
        const parsedDate = parseISO(dateString)

        const formattedDate = format(parsedDate, 'dd/MM/yyyy HH:mm')
        return formattedDate
      }
    }
  ]
}
