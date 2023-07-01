import { Discount } from '@/components/templates'
import AdminLayout from '@/layouts/AdminLayout'
import { ReactElement } from 'react'

const DiscountPage = () => {
  return <Discount />
}
DiscountPage.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}
export default DiscountPage
