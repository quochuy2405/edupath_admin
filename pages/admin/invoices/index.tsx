import { columnTableInvoices } from '@/components/makecolumns'
import { Invoice } from '@/components/templates'
import AdminLayout from '@/layouts/AdminLayout'
import { closeLoading, setLoading } from '@/redux/features/slices/loading'
import { TInvoice } from '@/types/common'
import { ReactElement, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { OptionType } from 'common'
import { allMaintypes } from 'apis/maintype'
import { allCourses } from 'apis/course'
export type StateInvoiceType = {
  dataTable: Array<TInvoice>
  isModal: boolean
  options: {
    maintypeOpts: Array<OptionType>
    courseOpts: Array<OptionType>
  }
}
const InvoicePage = () => {
  const [refresh, setRefresh] = useState(false)
  const dispatch = useDispatch()
  const stateStore = useForm<StateInvoiceType>({
    defaultValues: {
      isModal: false,
      dataTable: [],
      options: {
        maintypeOpts: [],
        courseOpts: []
      }
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
    // await removeInvoice(id)
    console.log(id)
    toast(
      <div className="flex items-center gap-2">
        <BsFillCheckCircleFill size={14} color="green" />
        <p className="text-xs text-emerald-400">Đã xóa thành công</p>
      </div>
    )
    onRefresh()
  }
  const columns = columnTableInvoices({ onDelete, idDelete, onChangeIdDelete })
  const dataForm = useForm<TInvoice>()
  const addInvoice = (data: TInvoice) => {
    console.log(data)
  }
  useEffect(() => {
    ;(async () => {
      dispatch(setLoading({ status: true }))
      await allMaintypes()
        .then(({ data }) => {
          if (data) {
            const options = data.map((item) => ({ label: item.type_name, value: item._id }))
            stateStore.setValue('options.maintypeOpts', options)
          }
        })
        .catch((error) => console.log(error))
      await allCourses()
        .then(({ data }) => {
          if (data) {
            const options = data.map((item) => ({ label: item.course_name, value: item._id }))
            stateStore.setValue('options.courseOpts', options)
          }
        })
        .catch((error) => console.log(error))
      // await allInvoices()
      //   .then(({ data }) => {
      //     console.log(data)
      //     if (data) stateStore.setValue('dataTable', data)
      //   })
      //   .catch((error) => console.log(error))
      dispatch(closeLoading())
    })()
  }, [refresh])

  const props = {
    columns,
    stateStore,
    dataForm,
    addInvoice
  }

  return <Invoice {...props} />
}
InvoicePage.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}
export default InvoicePage
