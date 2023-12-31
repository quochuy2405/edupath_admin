import { columnTableDetails } from '@/components/makecolumns'
import { Details } from '@/components/templates'
import AdminLayout from '@/layouts/AdminLayout'
import { closeLoading, setLoading } from '@/redux/features/slices/loading'
import { TDetails } from '@/types/common'
import { addNewDetail, allDetails, removeDetail } from 'apis/detail'
import { allMaintypes } from 'apis/maintype'
import { getSectionByMainTypeId } from 'apis/section'
import { allTags } from 'apis/tag'
import { OptionType } from 'common'
import { ReactElement, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
export type StateDetailsType = {
  dataTable: Array<TDetails>
  isModal: boolean
  page: number
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
      page: 1,
      options: {
        maintypeOpts: [],
        sectionOpts: [],
        tagOpts: []
      }
    }
  })
  const getSectionsByMainTypeId = async (id: string | number) => {
    await getSectionByMainTypeId(id).then(({ data }) => {
      if (data) {
        const options = data.map((item) => ({ label: item.section_name, value: item._id }))
        stateStore.setValue('options.sectionOpts', options)
      }
    })
  }
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
  const resetForm = () => {
    dataForm.reset()
    stateStore.resetField('isModal')
  }
  const addDetail = async (data: TDetails) => {
    await addNewDetail(data)
      .then(async () => {
        toast(
          <div className="flex items-center gap-2">
            <BsFillCheckCircleFill size={14} color="green" />
            <p className="text-xs text-emerald-400">Đã thêm thành công</p>
          </div>
        )
        resetForm()
        onRefresh()
      })
      .catch((e) => {
        console.log(e)
      })
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
      await allTags()
        .then(({ data }) => {
          if (data) {
            const options = data.map((item) => ({ label: item.tag_name, value: item._id }))
            stateStore.setValue('options.tagOpts', options)
          }
        })
        .catch((error) => console.log(error))
      await allDetails()
        .then(({ data }) => {
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
    getSectionsByMainTypeId,
    addDetail
  }

  return <Details {...props} />
}
DetailsPage.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}
export default DetailsPage
