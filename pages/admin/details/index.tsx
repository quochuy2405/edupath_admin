import { columnTableDetails } from '@/components/makecolumns'
import { Details } from '@/components/templates'
import AdminLayout from '@/layouts/AdminLayout'
import { closeLoading, setLoading } from '@/redux/features/slices/loading'
import { TDetails } from '@/types/common'
import { allDetails, removeDetail } from 'apis/detail'
import { ReactElement, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { OptionType } from 'common'
import { allMaintypes } from 'apis/maintype'
export type StateDetailsType = {
  dataTable: Array<TDetails>
  isModal: boolean
  options: {
    maintypeOpts: Array<OptionType>
    sectionOpts: Array<OptionType>
    tagOpts: Array<OptionType>
  }
}
const DetailsPage = () => {
  const [refresh, setRefresh] = useState(false)
  const dispatch = useDispatch()
  const stateStore = useForm<StateDetailsType>({
    defaultValues: {
      isModal: false,
      dataTable: [],
      options: {
        maintypeOpts: [],
        sectionOpts: [],
        tagOpts: []
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
    await removeDetail(id)
    toast(
      <div className="flex items-center gap-2">
        <BsFillCheckCircleFill size={14} color="green" />
        <p className="text-xs text-emerald-400">Đã xóa thành công</p>
      </div>
    )
    onRefresh()
  }
  const columns = columnTableDetails({ onDelete, idDelete, onChangeIdDelete })
  const dataForm = useForm<TDetails>()
  const addDetail = (data: TDetails) => {
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
      await allDetails()
        .then(({ data }) => {
          console.log(data)
          if (data) stateStore.setValue('dataTable', data)
        })
        .catch((error) => console.log(error))
      dispatch(closeLoading())
    })()
  }, [refresh])

  const props = {
    columns,
    stateStore,
    dataForm,
    addDetail
  }

  return <Details {...props} />
}
DetailsPage.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}
export default DetailsPage
