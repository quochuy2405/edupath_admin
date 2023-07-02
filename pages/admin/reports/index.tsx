import { columnTableReport } from '@/components/makecolumns'
import { Report } from '@/components/templates'
import AdminLayout from '@/layouts/AdminLayout'
import { closeLoading, setLoading } from '@/redux/features/slices/loading'
import { getReports } from 'apis/report'
import { ReactElement, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
export type StateReportType = {
  dataTable: Array<any>
  dataChart: Array<any>
  chartType: 'line' | 'bar' | 'pie'
  page: number
  totalMembers: number
  totalOrders: number
  totalRevenue: number
}
const ReportPage = () => {
  const dispatch = useDispatch()
  const stateStore = useForm<StateReportType>({
    defaultValues: {
      dataTable: [],
      dataChart: [],
      page: 1,
      chartType: 'line',
      totalMembers: 0,
      totalOrders: 0,
      totalRevenue: 0
    }
  })
  const columns = columnTableReport({})
  useEffect(() => {
    ;(async () => {
      dispatch(setLoading({ status: true }))
      await getReports()
        .then(({ data }) => {
          if (data) {
            stateStore.setValue('totalMembers', data.totalMembers)
            stateStore.setValue('totalOrders', data.totalOrders)
            stateStore.setValue('totalRevenue', data.totalRevenue)
            stateStore.setValue('dataTable', data.topUsers)
            stateStore.setValue('dataChart', data.topCourses)
          }
        })
        .catch((error) => console.log(error))
      dispatch(closeLoading())
    })()
  }, [])
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
