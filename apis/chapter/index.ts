import { TChapter } from '@/types/common'
import AxiosServices from '../axiosServices'

export const addChapter = (data: TChapter) => {
  return new AxiosServices().post(`admin/chapter/add`, data)
}

export const allChapters = () => {
  return new AxiosServices().get<TChapter[]>(`admin/chapter/all`)
}

export const removeChapter = (_id: string) => {
  return new AxiosServices().delete<TChapter>(`admin/chapter/remove/${_id}`)
}
