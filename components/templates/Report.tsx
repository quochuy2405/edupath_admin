'use client'
import { StateReportType } from '@/pages/admin/reports'
import { ColumnDef } from '@tanstack/react-table'
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip
} from 'chart.js'
import { Bar, Line, Pie } from 'react-chartjs-2'
import { Controller, UseFormReturn } from 'react-hook-form'
import { Table } from '../atoms'
import { Pagination } from '../moleculers'

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)
export const options = {
  responsive: true,
  plugins: {
    // legend: {
    // 	position: "top",
    // },
    title: {
      display: false,
      text: 'Chart.js Line Chart'
    }
  }
}

interface RevenueProps {
  stateStore: UseFormReturn<StateReportType, any>

  columns: ColumnDef<any, any>[]
}

const Revenue: React.FC<RevenueProps> = ({ columns, stateStore }) => {
  return (
    <div className="flex flex-col h-full w-full overflow-y-auto bg-white rounded-lg">
      <div className="flex h-full gap-2 w-full flex-wrap">
        <div className="w-full h-full  flex items-center p-6">
          <Controller
            name="chartType"
            control={stateStore.control}
            defaultValue={'line'}
            render={({ field }) => {
              return (
                <div className="flex flex-col p-3 h-full flex-[3]">
                  <div className="flex gap-3">
                    <label
                      onClick={() => field.onChange('line')}
                      className="relative inline-flex items-center mb-5 cursor-pointer"
                    >
                      <input
                        id="default-radio-1"
                        type="radio"
                        readOnly
                        checked={field.value === 'line'}
                        name="default-radio"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "
                      />
                      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Biều đồ đường
                      </span>
                    </label>
                    <label
                      onClick={() => field.onChange('bar')}
                      className="relative inline-flex items-center mb-5 cursor-pointer"
                    >
                      <input
                        id="default-radio-1"
                        type="radio"
                        readOnly
                        checked={field.value === 'bar'}
                        name="default-radio"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "
                      />

                      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Biểu đồ cột
                      </span>
                    </label>
                    <label
                      onClick={() => field.onChange('pie')}
                      className="relative inline-flex items-center mb-5 cursor-pointer"
                    >
                      <input
                        id="default-radio-1"
                        type="radio"
                        readOnly
                        checked={field.value === 'pie'}
                        name="default-radio"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "
                      />
                      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Biểu đồ tròn
                      </span>
                    </label>
                  </div>
                  <Controller
                    name="dataChart"
                    control={stateStore.control}
                    defaultValue={[]}
                    render={({ field: { value: chart } }) => {
                      const data = {
                        labels: chart?.map((item) => item.course_name),
                        datasets: [
                          {
                            label: 'Top Khóa học',

                            data: chart?.map((_, index) => index + 1),
                            backgroundColor: [
                              'rgba(255, 99, 132, 0.7)',
                              'rgba(54, 162, 235, 0.7)',
                              'rgba(255, 206, 86, 0.7)',
                              'rgba(75, 192, 192, 0.7)',
                              'rgba(153, 102, 255, 0.7)',
                              'rgba(255, 159, 64, 0.7)'
                            ],
                            borderColor: [
                              'rgba(255, 99, 132, 1)',
                              'rgba(54, 162, 235, 1)',
                              'rgba(255, 206, 86, 1)',
                              'rgba(75, 192, 192, 1)',
                              'rgba(153, 102, 255, 1)',
                              'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1
                          }
                        ]
                      }
                      return (
                        <>
                          {field.value === 'line' && <Line options={options} data={data} />}
                          {field.value === 'bar' && <Bar options={options} data={data} />}
                          {field.value === 'pie' && (
                            <div className="w-[400px] h-[360px] m-auto">
                              <Pie options={options} data={data} width={100} />
                            </div>
                          )}
                        </>
                      )
                    }}
                  />
                </div>
              )
            }}
          />

          <Controller
            name="dataTable"
            control={stateStore.control}
            defaultValue={[]}
            render={({ field }) => (
              <Controller
                name="page"
                control={stateStore.control}
                defaultValue={1}
                render={({ field: { value: page, onChange } }) => (
                  <div className="flex-[3] h-full flex flex-col">
                    <h2 className="font-semibold">Top người dùng tiềm năng</h2>
                    <div className="flex-1 mt-3 w-full rounded-lg overflow-x-auto pb-12">
                      <Table
                        columns={columns}
                        data={[...field.value].slice((page - 1) * 10, page * 10 + 10)}
                      />
                    </div>
                    <Pagination
                      pageSize={Math.ceil([...field.value].length / 10)}
                      currentPage={page}
                      onChange={(p) => onChange(p)}
                    />
                    <div className="flex justify-between gap-4 w-fit m-auto">
                      <div className="p-6 rounded-lg border-red-400 border-2 flex gap-2 flex-col">
                        <h2 className="font-semibold">Tổng số khách hàng</h2>
                        <Controller
                          name="totalMembers"
                          control={stateStore.control}
                          defaultValue={null}
                          render={({ field }) => (
                            <div className="rounded-full h-16 w-40 flex items-center justify-center font-semibold bg-red-400 text-white text-lg">
                              {Number(field.value).toLocaleString()} khách
                            </div>
                          )}
                        />
                      </div>
                      <div className="p-6 rounded-lg border-blue-400 border-2 flex gap-2 flex-col">
                        <h2 className="font-semibold">Tổng số đơn hàng</h2>
                        <Controller
                          name="totalOrders"
                          control={stateStore.control}
                          defaultValue={null}
                          render={({ field }) => (
                            <div className="rounded-full h-16 w-40 flex items-center justify-center font-semibold bg-blue-400 text-white text-lg">
                              {Number(field.value).toLocaleString()} đơn
                            </div>
                          )}
                        />
                      </div>
                      <div className="p-6 rounded-lg border-green-400 border-2 flex gap-2 flex-col">
                        <h2 className="font-semibold">Tổng số lợi nhuận</h2>
                        <Controller
                          name="totalRevenue"
                          control={stateStore.control}
                          defaultValue={null}
                          render={({ field }) => (
                            <div className="rounded-full h-16 w-40 flex items-center justify-center font-semibold bg-green-400 text-white text-lg">
                              {Number(field.value).toLocaleString()} VNĐ
                            </div>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                )}
              />
            )}
          />
        </div>
      </div>
    </div>
  )
}

export default Revenue
