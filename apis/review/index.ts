import AxiosServices from '../axiosServices'

export const allReviews = () => {
  return new AxiosServices().get<any[]>(`admin/review/all`)
}
