import { columnTableMainType } from '@/components/makecolumns'
import { Report } from '@/components/templates'
import AdminLayout from '@/layouts/AdminLayout'
import { ReactElement } from 'react'
import { useForm } from 'react-hook-form'
export type StateReportType = {
  dataTable: Array<any>
  chartType: 'line' | 'bar' | 'pie'
  page: 1
}
const ReportPage = () => {
  const stateStore = useForm<StateReportType>({
    defaultValues: {
      dataTable: [],
      page: 1,
      chartType: 'line'
    }
  })
  const columns = columnTableMainType({})
  const props = {
    columns,
    stateStore
  }
  return <Report {...props} />
}
ReportPage.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}
export default ReportPage
