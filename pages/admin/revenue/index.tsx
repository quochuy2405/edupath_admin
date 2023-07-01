import { Revenue } from '@/components/templates'
import AdminLayout from '@/layouts/AdminLayout'
import { ReactElement } from 'react'

const RevenuePage = () => {
  return <Revenue />
}
RevenuePage.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}
export default RevenuePage
