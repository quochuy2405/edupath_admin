'use client'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { FaMoneyBill, FaMoneyCheckAlt } from 'react-icons/fa'
import { GiClothes } from 'react-icons/gi'
import { MdCategory, MdInventory, MdManageAccounts, MdSupervisorAccount } from 'react-icons/md'

import { LoadingPopUp } from '@/components/moleculers'
import { findAll } from '@/firebase/base'
import { auth, db } from '@/firebase/config'
import { resetUser, setUser } from '@/redux/features/slices/user'
import { RootState } from '@/redux/features/store'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { collection } from 'firebase/firestore'
import { useEffect } from 'react'
import { HiHome } from 'react-icons/hi'
import { RiBillFill } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
const USERS = [
  {
    key: '/admin/stock',
    icon: (active) => (
      <MdInventory size={20} color={active ? 'orange' : 'black'} className="w-5 h-5" />
    ),
    title: 'Quản lý kho hàng'
  },
  {
    key: '/admin/products',
    icon: (active) => (
      <GiClothes size={20} color={active ? 'orange' : 'black'} className="w-5 h-5" />
    ),
    title: 'Quản lý sản phẩm'
  },
  {
    key: '/admin/categories',
    icon: (active) => (
      <MdCategory size={20} color={active ? 'orange' : 'black'} className="w-5 h-5" />
    ),
    title: 'Quản lý phân loại'
  },
  {
    key: '/admin/account_managers',
    icon: (active) => (
      <MdManageAccounts size={20} color={active ? 'orange' : 'black'} className="w-5 h-5" />
    ),
    title: 'Quản lý nhân viên'
  },
  {
    key: '/admin/account_customers',
    icon: (active) => (
      <MdSupervisorAccount size={20} color={active ? 'orange' : 'black'} className="w-5 h-5" />
    ),
    title: 'Quản lý khách hàng'
  },
  {
    key: '/admin/invoice_managers',
    icon: (active) => (
      <RiBillFill size={20} color={active ? 'orange' : 'black'} className="w-5 h-5" />
    ),
    title: 'Quản lý đơn hàng'
  }
]

const POCS = [
  {
    key: '/admin/revenue',
    icon: (active) => (
      <FaMoneyCheckAlt size={20} color={active ? 'orange' : 'black'} className="w-5 h-5" />
    ),
    title: 'Thông kê sản phẩm bán chạy'
  },
  {
    key: '/admin/expense',
    icon: (active) => (
      <FaMoneyBill size={20} color={active ? 'orange' : 'black'} className="w-5 h-5" />
    ),
    title: 'Thông kê chi phí'
  }
  // {
  //   key: '/admin/discount',
  //   icon: (active) => (
  //     <MdOutlineLocalActivity size={20} color={active ? 'orange' : 'black'} className="w-5 h-5" />
  //   ),
  //   title: 'Quản lý ưu đãi, marketing'
  // }
]

const AdminLayout = ({ children }) => {
  const { push } = useRouter()
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user)
  const pathname = usePathname()
  const logout = async () => {
    try {
      await signOut(auth)
      dispatch(resetUser())
      push('/')
      // You can perform additional actions after successful logout
    } catch (error) {
      console.error('Logout error:', error)
      // Handle logout error
    }
  }
  useEffect(() => {
    const autoLogin = () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const accountRef = collection(db, 'accounts')
          await findAll?.(accountRef, [['email', user.email as any]])
            .then((data) => {
              const user = data[0] as any
              if (user?.role) {
                dispatch(setUser({ name: user.name, role: user.role }))
              }
            })
            .catch()
        } else {
          push('/')
        }
      })
    }
    autoLogin()
  }, [])
  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      {/* <!-- Desktop sidebar --> */}
      <LoadingPopUp />
      <input id="hamburger" type="checkbox" className="hidden" />
      <header className="z-10 bg-white border-b-[1px] h-14 min-h-[56px] flex items-center justify-between px-6">
        <Link href="/admin" className="h-24 w-24 md:block hidden " passHref>
          <div className="bg-[url('/logo.png')] bg-cover bg-no-repeat w-full h-full" />
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
                onClick={() => logout()}
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
                        'bg-[#F2F2F2] text-black': pathname === '/admin'
                      }
                    )}
                    href="/admin"
                    passHref
                  >
                    <HiHome
                      size={20}
                      color={pathname === '/admin' ? 'orange' : 'black'}
                      className="w-5 h-5"
                    />
                    <span className="ml-2 hidden md:block">Trang chủ</span>
                  </Link>
                </li>
              </ul>
              <ul className="pb-4 flex flex-col gap-2">
                <li className="relative py-1 px-2 text-sm font-bold text-gray-default hidden md:block">
                  QUẢN LÝ
                </li>
                {USERS.map((item) => (
                  <li className="relative py" key={item.key}>
                    {user?.role !== 'admin' && item.key === '/admin/account_managers' ? (
                      <></>
                    ) : (
                      <Link
                        className={clsx(
                          'flex items-center w-full text-sm font-medium transition-colors duration-150 hover:text-gray-800 p-2 rounded-md',
                          {
                            'bg-[#F2F2F2] text-black': pathname === item.key
                          }
                        )}
                        href={item.key}
                        passHref
                      >
                        {item.icon(pathname === item.key)}
                        <span className="ml-2 hidden md:block">{item.title}</span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
              <ul className="pb-4 flex flex-col gap-0.5">
                <li className="relative py-1 px-2 text-sm font-bold text-gray-default hidden md:block">
                  QUẢN LÝ KHÁC
                </li>
                {POCS.map((item) => (
                  <li className="relative py" key={item.key}>
                    <Link
                      className={clsx(
                        'flex items-center w-full text-sm font-medium transition-colors duration-150 hover:text-gray-800 p-2 rounded-md',
                        {
                          'bg-[#F2F2F2] text-black': pathname === item.key
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
