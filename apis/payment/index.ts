import AxiosServices from '../axiosServices'

export const allInvoices = () => {
  return new AxiosServices().get<any[]>(`admin/payment/all`)
}
export const removeInvoice = (_id: string) => {
  return new AxiosServices().delete<any>(`admin/payment/remove/${_id}`)
}
