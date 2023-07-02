import { TMainTypes } from '@/types/common'
import AxiosServices from '../axiosServices'

export const addNewMaintype = (data: TMainTypes) => {
  return new AxiosServices().post(`admin/maintype/add`, data)
}

export const allMaintypes = () => {
  return new AxiosServices().get<TMainTypes[]>(`admin/maintype/all`)
}

export const removeMaintype = (_id: string) => {
  return new AxiosServices().delete<TMainTypes>(`admin/maintype/remove/${_id}`)
}
