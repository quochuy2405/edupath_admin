import { TTag } from '@/types/common'
import AxiosServices from '../axiosServices'

export const addNewTag = (data: any) => {
  return new AxiosServices().post(`admin/tag/add`, data)
}

export const allTags = () => {
  return new AxiosServices().get<TTag[]>(`admin/tag/all`)
}

export const removeTag = (_id: string) => {
  return new AxiosServices().delete<TTag>(`admin/tag/remove/${_id}`)
}
