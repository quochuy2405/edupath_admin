import { CourseForm } from '@/types/form'
import AxiosServices from '../axiosServices'
import { TCourse } from '@/types/common'

export const allCourses = () => {
  return new AxiosServices().get<TCourse[]>('admin/course/all')
}

export const addNewCourse = (data: CourseForm) => {
  const form = new FormData()
  form.append('author_id', data.author_id!.toString())
  form.append('detail_id', data.detail_id!.toString())
  form.append('course_level', data.course_level!.toString())
  form.append('course_language', data.course_language!.toString())
  form.append('course_name', data.course_name!.toString())
  form.append('approval_status', data.approval_status!.toString())
  form.append('course_fee', data.course_fee!.toString())
  form.append('description', data.description!.toString())
  form.append('course_status', data.course_status!.toString())
  form.append('course_img', data.course_img!)
  return new AxiosServices().post<TCourse>('admin/course/add', form, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

export const removeCourse = (id: string) => {
  return new AxiosServices().delete<TCourse>(`admin/course/remove/${id}`)
}
