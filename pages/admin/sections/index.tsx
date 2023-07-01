import { columnTableSections } from '@/components/makecolumns'
import { Sections } from '@/components/templates'
import AdminLayout from '@/layouts/AdminLayout'
import { closeLoading, setLoading } from '@/redux/features/slices/loading'
import { TSection } from '@/types/common'
import { allSections, removeSection } from 'apis/section'
import toast from 'react-hot-toast'
import { ReactElement, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { BsFillCheckCircleFill } from 'react-icons/bs'
export type StateSectionType = {
  dataTable: Array<TSection>
  isModal: boolean
}
const SectionPage = () => {
  const [refresh, setRefresh] = useState(false)
  const dispatch = useDispatch()
  const stateStore = useForm<StateSectionType>({
    defaultValues: {
      isModal: false,
      dataTable: []
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
  const addSection = (data: TSection) => {
    console.log(data)
  }
  useEffect(() => {
    ;(async () => {
      dispatch(setLoading({ status: true }))
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
