import { TSection } from '@/types/common'
import AxiosServices from '../axiosServices'

export const addNewSection = (data: any) => {
  return new AxiosServices().post(`admin/section/add`, data)
}

export const allSections = () => {
  return new AxiosServices().get<TSection[]>(`admin/section/all`)
}

export const removeSection = (_id: string) => {
  return new AxiosServices().delete<TSection>(`admin/section/remove/${_id}`)
}
