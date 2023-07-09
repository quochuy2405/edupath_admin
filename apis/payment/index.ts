import AxiosServices from '../axiosServices'

export const allInvoices = () => {
  return new AxiosServices().get<any[]>(`admin/payment/all`)
}
export const confirmInvoice = (payment_id: string, payment_status: boolean) => {
  return new AxiosServices().post<any[]>(`admin/payment/confirm`, { payment_id, payment_status })
}
export const removeInvoice = (_id: string) => {
  return new AxiosServices().delete<any>(`admin/payment/remove/${_id}`)
}
