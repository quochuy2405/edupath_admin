'use client'
import LogoSvg from '@/assets/LogoSvg'
import { format, isValid } from 'date-fns'
import React, { useRef } from 'react'
import { AiOutlineGlobal } from 'react-icons/ai'
import { MdPlace, MdPrint } from 'react-icons/md'
import ReactToPrint from 'react-to-print'

interface InvoiceDetailProps {
  data: any
}
const PAYMENT_METHODS = {
  payment_on_delivery: 'Thanh toán khi nhận hàng',
  momo: ' Ví điện từ Momo',
  banking: ' Chuyển khoản qua ngân hàng'
}

const InvoiceDetail: React.FC<InvoiceDetailProps> = ({ data }) => {
  const componentRef = useRef()

  return (
    <div className="w-full h-full">
      <div className="flex justify-end">
        <ReactToPrint
          trigger={() => (
            <button
              type="button"
              className="inline-flex items-center py-2 px-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
            >
              <span className="px-2">In đơn</span> <MdPrint size={20} />
            </button>
          )}
          content={() => componentRef.current}
        />
      </div>
      <div ref={componentRef}>
        <div className="w-3/5 m-auto bg-white rounded-xl">
          <div className="flex justify-between p-4">
            <div className="w-36 h-36">
              <LogoSvg />
            </div>
            <div className="p-2">
              <ul className="flex">
                <li className="flex flex-col items-center p-2 border-l-2 border-indigo-200">
                  <AiOutlineGlobal size={40} color="black" />
                  <span className="text-sm">www.beliyclothing.com</span>
                </li>
                <li className="flex flex-col p-2 border-l-2 flex-1 border-indigo-200">
                  <MdPlace size={40} color="black" />
                  <span className="text-sm">KTX Khu A,Linh Trung, TP.Thủ Đức</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full h-0.5 bg-indigo-500" />
          <div className="flex justify-between p-4">
            <div>
              <h6 className="font-bold">
                Ngày đặt hàng :{' '}
                <span className="text-sm font-medium">
                  {isValid(data?.createdAt) && format(data?.createdAt, 'dd/MM/yyyy HH:mm')}
                </span>
              </h6>
              <h6 className="font-bold">
                Mã đơn hàng : <span className="text-sm  font-semibold">{data?.checkoutId}</span>
              </h6>
              <h6 className="font-bold">
                Phương thức :{' '}
                <p className="text-sm  font-semibold">{PAYMENT_METHODS[data?.paymentMethods]}</p>
              </h6>
            </div>
            <div className="w-40">
              <address className="text-sm">
                <span className="font-bold">Người thanh toán :</span>
                <p> {data?.name}</p>
              </address>
              <address className="text-sm">
                <span className="font-bold">Số điện thoại :</span>
                <p> {data?.phone}</p>
              </address>
            </div>
            <div className="w-40">
              <address className="text-sm">
                <span className="font-bold">Giao hàng tới :</span>
                <p>
                  {(data?.addressNumber || '') +
                    [data?.award, data?.district, data?.province]
                      .filter((item) => !!item)
                      .join(', ')}
                </p>
              </address>
            </div>
            <div />
          </div>
          <div className="flex justify-center p-4">
            <div className="borde border-gray-400 shadow">
              <table>
                {/* Thêm tiêu đề bảng */}
                <thead className="bg-gray-800">
                  <tr>
                    <th className="px-4 py-2 text-xs text-white">#</th>
                    <th className="px-4 py-2 text-xs text-white">Tên sản phẩm</th>
                    <th className="px-4 py-2 text-xs text-white">Số lượng</th>
                    <th className="px-4 py-2 text-xs text-white">Size</th>
                    <th className="px-4 py-2 text-xs text-white">Tổng tiền</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {data?.orders?.map((item) => (
                    <tr className="whitespace-nowrap" key={item?.id}>
                      <td className="px-6 py-4 text-sm text-gray-500">1</td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{item?.name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500">{item?.quantityOrder}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{item?.sizes?.[0]}</td>
                      <td className="px-6 py-4">
                        {(Number(item?.price) * 1000).toLocaleString()} VND
                      </td>
                    </tr>
                  ))}

                  {/* Thêm hàng cho bảng */}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-between p-4">
            <div>
              <h3 className="text-xl">Điều khoản và Điều kiện:</h3>
              <ul className="text-xs list-disc list-inside">
                <li>
                  Tất cả các tài khoản phải thanh toán trong vòng 7 ngày kể từ ngày nhận hóa đơn.
                </li>
                <li>Thanh toán bằng séc hoặc thẻ tín dụng hoặc thanh toán trực tuyến.</li>
                <li>
                  Nếu tài khoản không được thanh toán trong vòng 7 ngày, thông tin tín dụng sẽ được
                  cung cấp.
                </li>
              </ul>
            </div>
            <div className="p-2">
              <div className="text-2xl italic font-semibold text-black">BELIY STRESSWEAR</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InvoiceDetail
