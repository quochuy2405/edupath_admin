import { LessonForm } from '@/types/lesson'
import AxiosServices from '../axiosServices'
import { TLesson } from '@/types/common'

export const addNewLesson = (data: LessonForm) => {
  const fd = new FormData()
  fd.append('chapter_id', data.chapter_id!)
  fd.append('lesson_name', data.lesson_name!)
  fd.append('duration', data.duration.toString()!)
  fd.append('lesson_video', data.lesson_video!)
  fd.append('order', data.order.toString()!)

  return new AxiosServices().post(`admin/lesson/add`, fd, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

export const allLessons = () => {
  return new AxiosServices().get<TLesson[]>(`admin/lesson/all`)
}

export const removeLesson = (_id: string) => {
  return new AxiosServices().delete<TLesson>(`admin/lesson/remove/${_id}`)
}
