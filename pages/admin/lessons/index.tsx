import { columnTableLessons } from '@/components/makecolumns'
import { Lessons } from '@/components/templates'
import AdminLayout from '@/layouts/AdminLayout'
import { closeLoading, setLoading } from '@/redux/features/slices/loading'
import { TLesson } from '@/types/common'
import { LessonForm } from '@/types/lesson'
import { allChapters } from 'apis/chapter'
import { allCourses } from 'apis/course'
import { addNewLesson, allLessons, removeLesson } from 'apis/lesson'
import { allMaintypes } from 'apis/maintype'
import { OptionType } from 'common'
import { ReactElement, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { IoCloseCircle } from 'react-icons/io5'
import { useDispatch } from 'react-redux'

export type StateLessonsType = {
  dataTable: Array<TLesson>
  isModal: boolean
  page: number
  options: {
    maintypeOpts: OptionType[]
    courseOpts: OptionType[]
    chapterOpts: OptionType[]
  }
}
const LessonsPage = () => {
  const [refresh, setRefresh] = useState(false)
  const dispatch = useDispatch()
  const stateStore = useForm<StateLessonsType>({
    defaultValues: {
      isModal: false,
      dataTable: [],
      page: 1,
      options: {
        maintypeOpts: [],
        courseOpts: [],
        chapterOpts: []
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
    await removeLesson(id)
    toast(
      <div className="flex items-center gap-2">
        <BsFillCheckCircleFill size={14} color="green" />
        <p className="text-xs text-emerald-400">Đã xóa thành công</p>
      </div>
    )
    onRefresh()
  }
  const resetForm = () => {
    dataForm.reset()
    stateStore.resetField('isModal')
  }
  const upVideo = (files: FileList) => {
    const file = files[0]
    if (file) {
      dataForm.setValue('lesson_video', file)
    }
  }

  const columns = columnTableLessons({ onDelete, idDelete, onChangeIdDelete })
  const dataForm = useForm<LessonForm>()
  const addLesson = (data: LessonForm) => {
    const videoFile = data.lesson_video // Assuming data.lesson_video is of type 'File'
    const videoURL = URL.createObjectURL(videoFile) // Create a URL for the video file

    const video = document.createElement('video')
    video.src = videoURL

    video.addEventListener('loadedmetadata', async () => {
      const duration = video.duration
      console.log(`Video duration: ${duration} seconds`)
      const dataForm = { ...data, duration: duration / 3600 }
      await addNewLesson(dataForm)
        .then(() => {
          toast(
            <div className="flex items-center gap-2">
              <BsFillCheckCircleFill size={14} color="green" />
              <p className="text-xs text-emerald-400">Đã thêm thành công</p>
            </div>
          )
          resetForm()
        })
        .catch(() => {
          toast(
            <div className="flex items-center gap-2">
              <IoCloseCircle size={14} color="red" />
              <p className="text-xs text-red-400">Thất bại</p>
            </div>
          )
        })
    })
  }

  useEffect(() => {
    ;(async () => {
      dispatch(setLoading({ status: true }))
      await allChapters()
        .then(({ data }) => {
          if (data) {
            const options = data.map((item) => ({
              label: item.chapter_name,
              value: item._id.toString()
            }))
            stateStore.setValue('options.chapterOpts', options)
          }
        })
        .catch((error) => console.log(error))
      await allMaintypes()
        .then(({ data }) => {
          if (data) {
            const options = data.map((item) => ({
              label: item.type_name,
              value: item._id.toString()
            }))
            stateStore.setValue('options.maintypeOpts', options)
          }
        })
        .catch((error) => console.log(error))
      await allCourses()
        .then(({ data }) => {
          if (data) {
            const options = data.map((item) => ({
              label: item.course_name,
              value: item._id.toString()
            }))
            stateStore.setValue('options.courseOpts', options)
          }
        })
        .catch((error) => console.log(error))
      await allLessons()
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
    addLesson,
    upVideo
  }

  return <Lessons {...props} />
}
LessonsPage.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}
export default LessonsPage
