import { columnTableCourses } from '@/components/makecolumns'
import { Courses } from '@/components/templates'
import AdminLayout from '@/layouts/AdminLayout'
import { closeLoading, setLoading } from '@/redux/features/slices/loading'
import { TCourse } from '@/types/common'
import { CourseForm } from '@/types/form'
import { addNewCourse, allCourses, removeCourse } from 'apis/course'
import { allDetails } from 'apis/detail'
import { allUsers } from 'apis/user'
import { OptionType } from 'common'
import { ReactElement, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { IoCloseCircle } from 'react-icons/io5'
import { useDispatch } from 'react-redux'
export type StateCourseType = {
  dataTable: Array<TCourse>
  isModal: boolean
  imagePreview: any
  fileImage: any
  options: {
    authorOpts: Array<OptionType>
    detailsOpts: Array<OptionType>
    levelOpts: Array<OptionType>
    actStatusOpts: Array<OptionType>
    courseStatusOpts: Array<OptionType>
  }
}
const CoursePage = () => {
  const [refresh, setRefresh] = useState(false)
  const dispatch = useDispatch()
  const stateStore = useForm<StateCourseType>({
    defaultValues: {
      isModal: false,
      dataTable: [],
      fileImage: [],
      imagePreview: undefined,
      options: {
        authorOpts: [],
        detailsOpts: [],
        levelOpts: [],
        actStatusOpts: [],
        courseStatusOpts: []
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
    await removeCourse(id)
    toast(
      <div className="flex items-center gap-2">
        <BsFillCheckCircleFill size={14} color="green" />
        <p className="text-xs text-emerald-400">Đã xóa thành công</p>
      </div>
    )
    onRefresh()
  }
  const columns = columnTableCourses({ onDelete, idDelete, onChangeIdDelete })
  const dataForm = useForm<CourseForm>({
    // resolver:yupResolver()
  })
  const resetForm = () => {
    dataForm.reset()
    stateStore.resetField('isModal')
  }
  const addCourse = async (data: CourseForm) => {
    dispatch(setLoading({ status: true }))
    const course_img = stateStore.getValues('fileImage')

    const formData = {
      ...data,
      course_img
    }
    await addNewCourse(formData)
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
    dispatch(closeLoading())
  }
  const previewImage = (files: FileList) => {
    const file = files[0]
    if (file) {
      stateStore.setValue('fileImage', file)

      const reader = new FileReader()
      reader.addEventListener('load', () => {
        stateStore.setValue('imagePreview', reader.result)
      })
      reader.readAsDataURL(file)
    }
  }
  useEffect(() => {
    ;(async () => {
      dispatch(setLoading({ status: true }))
      await allDetails()
        .then(({ data }) => {
          if (data) {
            const options = data.map((item) => ({ label: item.detail_name, value: item._id }))
            stateStore.setValue('options.detailsOpts', options)
          }
        })
        .catch((error) => console.log(error))
      await allUsers()
        .then(({ data }) => {
          if (data) {
            const options = data.map((item) => ({ label: item.fullname, value: item._id }))
            stateStore.setValue('options.authorOpts', options)
          }
        })
        .catch((error) => console.log(error))
      await allCourses()
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
    addCourse,
    previewImage
  }

  return <Courses {...props} />
}
CoursePage.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}
export default CoursePage
