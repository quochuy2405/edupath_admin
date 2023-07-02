import { columnTableSections } from '@/components/makecolumns'
import { Sections } from '@/components/templates'
import AdminLayout from '@/layouts/AdminLayout'
import { closeLoading, setLoading } from '@/redux/features/slices/loading'
import { TSection } from '@/types/common'
import { allMaintypes } from 'apis/maintype'
import { addNewSection, allSections, removeSection } from 'apis/section'
import { OptionType } from 'common'
import { ReactElement, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
export type StateSectionType = {
  dataTable: Array<TSection>
  isModal: boolean
  page: number
  options: {
    maintypeOpts: Array<OptionType>
  }
}
const SectionPage = () => {
  const [refresh, setRefresh] = useState(false)
  const dispatch = useDispatch()
  const stateStore = useForm<StateSectionType>({
    defaultValues: {
      isModal: false,
      dataTable: [],
      page: 1,
      options: {
        maintypeOpts: []
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
    await removeSection(id)
    toast(
      <div className="flex items-center gap-2">
        <BsFillCheckCircleFill size={14} color="green" />
        <p className="text-xs text-emerald-400">Đã xóa thành công</p>
      </div>
    )
    onRefresh()
  }
  const columns = columnTableSections({ onDelete, idDelete, onChangeIdDelete })
  const dataForm = useForm<TSection>()
  const resetForm = () => {
    dataForm.reset()
    stateStore.resetField('isModal')
  }
  const addSection = async (data: TSection) => {
    await addNewSection(data)
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
      await allSections()
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
    addSection
  }

  return <Sections {...props} />
}
SectionPage.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}
export default SectionPage
