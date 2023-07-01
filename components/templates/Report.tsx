'use client'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
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

const Revenue = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="container mx-auto h-full">
        <div className="-m-1 flex gap-2 flex-wrap md:-m-2 h-full w-full">
          <div className="flex gap-2 w-full md:w-[48.5%] flex-wrap h-full">
            {/* <div className=" w-full md:w-[48.5%] p-1 md:p-2 bg-white rounded-lg">
							<img
								alt="gallery"
								className="block h-full w-full rounded-lg object-cover object-center"
								src="https://tecdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(70).webp"
							/>
						</div>
						<div className=" w-full md:w-[48.5%] p-1 md:p-2 bg-white rounded-lg">
							<Line options={options} data={data} />
						</div> */}
            <div className="w-full p-1 md:p-2 bg-white rounded-lg relative ">
              <Doughnut data={data} className="absolute" />
            </div>
          </div>
          <div className="flex gap-2 w-full md:w-1/2 flex-wrap">
            <div className="w-full p-1 md:p-2 bg-white rounded-lg">
              <Line options={options} data={data} />
            </div>
            <div className=" w-full md:w-[48.5%] p-1 flex flex-col md:p-2 bg-white rounded-lg">
              <h2 className="font-bold text-sm bg-blue-600 text-white w-fit rounded-lg p-2">
                TỔNG ĐƠN HÀNG
              </h2>
              <div className="flex-1 w-full flex items-center justify-center">
                <div className="w-28 h-28 m-auto rounded-full flex items-center justify-center p-2 border-2 border-blue-500 text-blue-500 font-bold text-lg">
                  1000
                </div>
              </div>
            </div>
            <div className=" w-full md:w-[48.5%] p-1 flex flex-col md:p-2 bg-white rounded-lg">
              <h2 className="font-bold text-sm bg-red-500 text-white w-fit rounded-lg p-2">
                TỔNG DOANH THU
              </h2>
              <div className="flex-1 w-full flex items-center justify-center">
                <div className="w-28 h-28 m-auto rounded-full flex items-center justify-center p-2 border-2 border-red-500 text-red-500 font-bold text-lg">
                  1000
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Revenue
