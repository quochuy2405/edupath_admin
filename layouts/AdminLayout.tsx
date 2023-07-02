'use client'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MdInventory } from 'react-icons/md'

import { LoadingPopUp } from '@/components/moleculers'
import { RootState } from '@/redux/features/store'
import { HiHome } from 'react-icons/hi'
import { useSelector } from 'react-redux'
const TABS = [
  {
    key: '/admin/maintype',
    icon: (active) => (
      <MdInventory size={20} color={active ? 'white' : 'black'} className="w-5 h-5" />
    ),
    title: 'Chủ đề'
  },
  {
    key: '/admin/courses',
    icon: (active) => (
      <MdInventory size={20} color={active ? 'white' : 'black'} className="w-5 h-5" />
    ),
    title: 'Khoá học'
  },
  {
    key: '/admin/chapters',
    icon: (active) => (
      <MdInventory size={20} color={active ? 'white' : 'black'} className="w-5 h-5" />
    ),
    title: 'Chương khoá học'
  },
  {
    key: '/admin/lessons',
    icon: (active) => (
      <MdInventory size={20} color={active ? 'white' : 'black'} className="w-5 h-5" />
    ),
    title: 'Bài học'
  },
  {
    key: '/admin/sections',
    icon: (active) => (
      <MdInventory size={20} color={active ? 'white' : 'black'} className="w-5 h-5" />
    ),
    title: 'Chương trình học'
  },
  {
    key: '/admin/details',
    icon: (active) => (
      <MdInventory size={20} color={active ? 'white' : 'black'} className="w-5 h-5" />
    ),
    title: 'Chi tiết lộ trình'
  },
  {
    key: '/admin/invoices',
    icon: (active) => (
      <MdInventory size={20} color={active ? 'white' : 'black'} className="w-5 h-5" />
    ),
    title: 'Hoá đơn '
  },
  {
    key: '/admin/reviews',
    icon: (active) => (
      <MdInventory size={20} color={active ? 'white' : 'black'} className="w-5 h-5" />
    ),
    title: 'Đánh giá'
  },
  {
    key: '/admin/tags',
    icon: (active) => (
      <MdInventory size={20} color={active ? 'white' : 'black'} className="w-5 h-5" />
    ),
    title: 'Tag'
  }
]
const REPORTS = [
  {
    key: '/admin/reports',
    icon: (active) => (
      <MdInventory size={20} color={active ? 'white' : 'black'} className="w-5 h-5" />
    ),
    title: 'Báo cáo/ Báo biểu'
  }
]

const AdminLayout = ({ children }) => {
  // const { push } = useRouter()
  // const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user)
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      {/* <!-- Desktop sidebar --> */}
      <LoadingPopUp />
      <input id="hamburger" type="checkbox" className="hidden" />
      <header className="z-10 bg-white border-b-[1px] h-14 min-h-[56px] flex items-center justify-between px-6">
        <Link href="/admin" className="h-24 w-24 md:block hidden p-3 " passHref>
          <div className="bg-[url('/logo.png')] bg-contain bg-no-repeat w-full h-full" />
        </Link>

        <div className="container flex items-center justify-between h-full mx-auto  dark:text-purple-300">
          {/* <!-- Mobile hamburger --> */}

          <label
            className="p-1 mr-5 -ml-1 rounded-md md:hidden focus:outline-none focus:shadow-outline-purple"
            aria-label="Menu"
            htmlFor="hamburger"
          >
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </label>
          <div />
          <ul className="flex items-centers flex-shrink-0 space-x-6 h-full">
            {/* <!-- Theme toggler --> */}
            <li className="flex">
              <button
                className="rounded-md focus:outline-none focus:shadow-outline-purple"
                aria-label="Toggle color mode"
              ></button>
            </li>
            {/* <!-- Notifications menu --> */}
            <li className="relative h-full flex items-center"></li>
            {/* <!-- Profile menu --> */}
            <li className="relative h-full flex items-center">
              <button
                className="align-middle rounded-full focus:shadow-outline-purple focus:outline-none"
                aria-label="Account"
                aria-haspopup="true"
              >
                <Image
                  className="object-cover w-8 h-8 rounded-full border"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdwzfXRIJH3snkUU5puxDMum7wBrWSjgV25Jf3TN9ZS0GKmz072XvhBzJfJQQIkaxHdzo&usqp=CAU"
                  alt=""
                  unoptimized
                  width={32}
                  height={32}
                  aria-hidden="true"
                />
              </button>
              <span className="text-sm font-bold ml-3">{user?.name}</span>
              <button
                type="button"
                // onClick={() => logout()}
                className="items-center h-8  px-4 ml-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-gray-500 hover:text-white"
              >
                Đăng xuất
              </button>
            </li>
          </ul>
        </div>
      </header>
      <div className="flex flex-1 w-full h-full relative">
        <aside
          id="bar-mobile"
          className="z-20 h-full absolute top-0 w-fit flex-shrink-0 md:w-64 overflow-y-auto bg-white md:block shadow-lg md:relative"
        >
          <div className="text-gray-500">
            <div className="p-4 w-full">
              <ul className="pb-4">
                <li className="relative py">
                  <Link
                    className={clsx(
                      'flex items-center w-full text-sm font-medium transition-colors duration-150 hover:text-gray-800 p-2 rounded-md',
                      {
                        'bg-blue-600 text-white': pathname === '/admin'
                      }
                    )}
                    href="/admin"
                    passHref
                  >
                    <HiHome
                      size={20}
                      color={pathname === '/admin' ? 'white' : 'black'}
                      className="w-5 h-5"
                    />
                    <span className="ml-2 hidden md:block">Trang chủ</span>
                  </Link>
                </li>
              </ul>
              <ul className="pb-4 flex flex-col gap-2">
                <li className="relative py-1 px-2 text-sm font-semibold text-gray-default hidden md:block uppercase">
                  Nhóm tính năng quản lý
                </li>
                {TABS.map((item) => (
                  <li className="relative py" key={item.key}>
                    <Link
                      className={clsx(
                        'flex items-center w-full text-sm font-medium transition-colors duration-150 p-2 rounded-md',
                        {
                          'bg-blue-600 text-white': pathname === item.key
                        }
                      )}
                      href={item.key}
                      passHref
                    >
                      {item.icon(pathname === item.key)}
                      <span className="ml-2 hidden md:block">{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="pb-4 flex flex-col gap-2">
                <li className="relative py-1 px-2 text-sm font-semibold text-gray-default hidden md:block uppercase">
                  Nhóm tính năng báo cáo
                </li>
                {REPORTS.map((item) => (
                  <li className="relative py" key={item.key}>
                    <Link
                      className={clsx(
                        'flex items-center w-full text-sm font-medium transition-colors duration-150 hover:text-gray-800 p-2 rounded-md',
                        {
                          'bg-blue-600 text-white': pathname === item.key
                        }
                      )}
                      href={item.key}
                      passHref
                    >
                      {item.icon(pathname === item.key)}
                      <span className="ml-2 hidden md:block">{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
        <main className="h-[100%] flex-1 overflow-hidden bg_admin flex flex-col items-center justify-center p-6">
          <div className="overflow-x-auto w-full h-[92%] mb-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
