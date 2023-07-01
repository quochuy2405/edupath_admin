import { Report } from '@/components/templates'
import AdminLayout from '@/layouts/AdminLayout'
import { ReactElement } from 'react'

const ReportPage = () => {
  return <Report />
}
ReportPage.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}
export default ReportPage
