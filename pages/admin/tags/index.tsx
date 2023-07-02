import { columnTableTags } from '@/components/makecolumns'
import { Tags } from '@/components/templates'
import AdminLayout from '@/layouts/AdminLayout'
import { closeLoading, setLoading } from '@/redux/features/slices/loading'
import { TTag } from '@/types/common'
import { addNewTag, allTags, removeTag } from 'apis/tag'
import { ReactElement, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
export type StateTagsType = {
  dataTable: Array<TTag>
  isModal: boolean
  page: number
}
const TagsPage = () => {
  const [refresh, setRefresh] = useState(false)
  const dispatch = useDispatch()
  const stateStore = useForm<StateTagsType>({
    defaultValues: {
      isModal: false,
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
    await removeTag(id)
    toast(
      <div className="flex items-center gap-2">
        <BsFillCheckCircleFill size={14} color="green" />
        <p className="text-xs text-emerald-400">Đã xóa thành công</p>
      </div>
    )
    onRefresh()
  }
  const columns = columnTableTags({ onDelete, idDelete, onChangeIdDelete })
  const dataForm = useForm<TTag>()

  const resetForm = () => {
    dataForm.reset()
    stateStore.resetField('isModal')
  }
  const addTag = async (data: TTag) => {
    await addNewTag(data)
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
      await allTags()
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
    addTag
  }

  return <Tags {...props} />
}
TagsPage.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}
export default TagsPage
