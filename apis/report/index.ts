import AxiosServices from '../axiosServices'

export const getReports = () => {
  return new AxiosServices().get<any>(`admin/report/main_report`)
}
