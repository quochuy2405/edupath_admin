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
      display: true,
      text: 'Chart.js Line Chart'
    }
  }
}

const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
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
interface RevenueProps {
  stateStore: UseFormReturn<StateReportType, any>

  columns: ColumnDef<any, any>[]
}

const Revenue: React.FC<RevenueProps> = ({ columns, stateStore }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="container mx-auto h-full">
        <div className="-m-1 flex gap-2 flex-wrap md:-m-2 flex-1 h-full w-full">
          <div className="flex h-full gap-2 w-full flex-wrap">
            <div className="w-full h-full bg-white rounded-lg flex items-center p-6">
              <Controller
                name="chartType"
                control={stateStore.control}
                defaultValue={'line'}
                render={({ field }) => {
                  return (
                    <div className="flex flex-col p-3 h-full flex-[2]">
                      <div className="flex gap-3">
                        <label
                          onClick={() => field.onChange('line')}
                          className="relative inline-flex items-center mb-5 cursor-pointer"
                        >
                          <input
                            id="default-radio-1"
                            type="radio"
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
                            checked={field.value === 'pie'}
                            name="default-radio"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "
                          />
                          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Biểu đồ tròn
                          </span>
                        </label>
                      </div>

                      {field.value === 'line' && <Line options={options} data={data} />}
                      {field.value === 'bar' && <Bar options={options} data={data} />}
                      {field.value === 'pie' && (
                        <div className="w-[400px] h-[400px] m-auto">
                          <Pie options={options} data={data} width={100} />
                        </div>
                      )}
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
                        <div className="flex-1 mt-3 w-full rounded-lg overflow-x-auto pb-12">
                          <Table
                            columns={columns}
                            data={[...field.value].slice((page - 1) * 10, page * 10 + 10)}
                          />
                        </div>
                        <Pagination
                          pageSize={Math.floor([...field.value].length / 10)}
                          currentPage={page}
                          onChange={(p) => onChange(p)}
                        />
                      </div>
                    )}
                  />
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Revenue
