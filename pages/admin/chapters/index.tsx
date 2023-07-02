import { columnTableChapters } from '@/components/makecolumns'
import { Chapter } from '@/components/templates'
import AdminLayout from '@/layouts/AdminLayout'
import { closeLoading, setLoading } from '@/redux/features/slices/loading'
import { TChapter } from '@/types/common'
import { addNewChapter, allChapters, removeChapter } from 'apis/chapter'
import { ReactElement, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { OptionType } from 'common'
import { allMaintypes } from 'apis/maintype'
import { allCourses } from 'apis/course'
export type StateChapterType = {
  dataTable: Array<TChapter>
  isModal: boolean
  page: number
  options: {
    maintypeOpts: Array<OptionType>
    courseOpts: Array<OptionType>
  }
}
const ChapterPage = () => {
  const [refresh, setRefresh] = useState(false)
  const dispatch = useDispatch()
  const stateStore = useForm<StateChapterType>({
    defaultValues: {
      isModal: false,
      dataTable: [],
      page: 1,
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
  const resetForm = () => {
    dataForm.reset()
    stateStore.resetField('isModal')
  }
  const onDelete = async (id: string) => {
    await removeChapter(id)
    toast(
      <div className="flex items-center gap-2">
        <BsFillCheckCircleFill size={14} color="green" />
        <p className="text-xs text-emerald-400">Đã xóa thành công</p>
      </div>
    )
    onRefresh()
  }
  const columns = columnTableChapters({ onDelete, idDelete, onChangeIdDelete })
  const dataForm = useForm<TChapter>()
  const addChapter = async (data: TChapter) => {
    await addNewChapter(data)
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
      await allCourses()
        .then(({ data }) => {
          if (data) {
            const options = data.map((item) => ({ label: item.course_name, value: item._id }))
            stateStore.setValue('options.courseOpts', options)
          }
        })
        .catch((error) => console.log(error))
      await allChapters()
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
    addChapter
  }

  return <Chapter {...props} />
}
ChapterPage.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}
export default ChapterPage
