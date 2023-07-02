import { TDetails } from '@/types/common'
import AxiosServices from '../axiosServices'

export const addNewDetail = (data: any) => {
  return new AxiosServices().post(`admin/detail/add`, data)
}

export const allDetails = () => {
  return new AxiosServices().get<TDetails[]>(`admin/detail/all`)
}

export const removeDetail = (_id: string) => {
  return new AxiosServices().delete<TDetails>(`admin/detail/remove/${_id}`)
}
