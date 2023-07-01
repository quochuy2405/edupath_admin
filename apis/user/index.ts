import AxiosServices from '../axiosServices'

export const allUsers = () => {
  return new AxiosServices().get<any[]>('/admin/user/all')
}
