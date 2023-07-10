import { columnTableInvoices } from '@/components/makecolumns'
import { Invoice } from '@/components/templates'
import AdminLayout from '@/layouts/AdminLayout'
import { closeLoading, setLoading } from '@/redux/features/slices/loading'
import { TInvoice } from '@/types/common'
import { allInvoices, removeInvoice } from 'apis/payment'
import { ReactElement, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
export type StateInvoiceType = {
  dataTable: Array<TInvoice>
  isModal: boolean
  editId: string
  page: number
}
const InvoicePage = () => {
  const [refresh, setRefresh] = useState(false)
  const dispatch = useDispatch()

  const stateStore = useForm<StateInvoiceType>({
    defaultValues: {
      isModal: false,
      editId: null,
      dataTable: [],
      page: 1
    }
  })
  const onRefresh = () => {
    setRefresh((cur) => !cur)
  }
  const [idDelete, setIdDelete] = useState('')
  const onChangeIdDelete = (id: string) => {
    setIdDelete(id)
  }

  const onDelete = async (id: string) => {
    await removeInvoice(id).then(() => {
      toast(
        <div className="flex items-center gap-2">
          <BsFillCheckCircleFill size={14} color="green" />
          <p className="text-xs text-emerald-400">Đã xóa thành công</p>
        </div>
      )
    })

    onRefresh()
  }

  const columns = columnTableInvoices({ onDelete, idDelete, onChangeIdDelete, onRefresh })

  useEffect(() => {
    ;(async () => {
      dispatch(setLoading({ status: true }))

      await allInvoices()
        .then(({ data }) => {
          if (data)
            stateStore.setValue(
              'dataTable',
              data.filter((data) => !!data)
            )
        })
        .catch((error) => console.log(error))
      dispatch(closeLoading())
    })()
  }, [refresh])

  const props = {
    columns,
    stateStore
  }

  return <Invoice {...props} />
}
InvoicePage.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}
export default InvoicePage
