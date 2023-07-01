'use client'
import Image from 'next/image'
import { useState } from 'react'
import { Modal } from '../moleculers'
import { MdAddCircle } from 'react-icons/md'
const Discount = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isAddNew, setIsAddNew] = useState(false)
  const handleClose = () => {
    setIsOpen(false)
  }

  const handleCloseAdd = () => {
    setIsAddNew(false)
  }
  return (
    <div className="flex flex-col w-full h-full gap-2">
      <Modal handleClose={handleClose} isOpen={isOpen} title="Sửa khuyến mãi" size="md">
        <form className="space-y-6" action="#">
          <div className="w-1/2 h-34 m-auto">
            <Image
              src="https://bizweb.dktcdn.net/100/287/440/products/ao-khoac-local-brand-dep-nhieu-mau-form-rong-dep-5.jpg?v=1662543061970"
              unoptimized
              width={10}
              height={100}
              alt="1"
              objectFit="cover"
              className="w-full h-full object-contain"
            />
          </div>

          <div>
            <label
              htmlFor="text"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Hạn sử dụng
            </label>
            <input
              type="text"
              name="text"
              placeholder=""
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>
          <div>
            <label
              htmlFor="text"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Phân trăm giảm giá
            </label>
            <input
              type="number"
              name="number"
              placeholder=""
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Cập nhật
          </button>
        </form>
      </Modal>
      <div className="flex gap-4 bg-white rounded-lg overflow-hidden p-2 justify-between">
        <div>
          <Modal handleClose={handleCloseAdd} isOpen={isAddNew} title="Tạo khuyễn mãi" size="md">
            <form className="space-y-6" action="#">
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      aria-hidden="true"
                      className="w-10 h-10 mb-3 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" />
                </label>
              </div>

              <div>
                <label
                  htmlFor="text"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Hạn sử dụng
                </label>
                <input
                  type="text"
                  name="text"
                  placeholder=""
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="text"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phân trăm giảm giá
                </label>
                <input
                  type="number"
                  name="number"
                  placeholder=""
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Tạo
              </button>
            </form>
          </Modal>
        </div>
        <button
          type="button"
          className="w-fit inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
          // onClick={() => stateStore.setValue('isNew', true)}
        >
          <label className="hidden md:block"> Tạo khuyến mãi phẩm</label>
          <label className="block md:hidden">
            <MdAddCircle size={20} />
          </label>
        </button>
      </div>
      <div className="flex-1 w-full rounded-lg overflow-y-auto pb-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="w-full bg-white rounded-lg h-fit flex flex-col p-4 gap-2 m-auto"
            >
              <div className="w-full h-[65%]">
                <Image
                  src="https://bizweb.dktcdn.net/100/287/440/products/ao-khoac-local-brand-dep-nhieu-mau-form-rong-dep-5.jpg?v=1662543061970"
                  unoptimized
                  width={10}
                  height={100}
                  alt="img"
                  objectFit="cover"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-fit text-white text-sm flex items-center justify-between ">
                <p className="flex-1 text-black bg-white border-2 border-black  font-bold rounded-lg text-xs py-1.5 px-4">
                  Hạn sử dụng: 2/2/2022
                </p>
              </div>

              <div className="w-full  flex-wrap gap-1 text-white text-sm flex-1 flex items-center justify-between">
                <p className="text-black bg-white border-2 border-black  font-bold rounded-lg text-xs py-2.5 px-4">
                  Giá trị: 30%
                </p>
                <div className="flex-1 flex gap-1">
                  <button
                    type="button"
                    className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-red-600 rounded-lg focus:ring-4 focus:ring-red-200 hover:bg-red-700"
                  >
                    Xóa
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
                    onClick={() => setIsOpen(true)}
                  >
                    Chỉnh sửa
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Discount
