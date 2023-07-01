'use client'

import { InvoiceDetail } from '@/components/templates'
import { read } from '@/firebase/base'
import AdminLayout from '@/layouts/AdminLayout'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'

const InvoiceDetailPage = () => {
  const { query, isReady } = useRouter()
  const [order, setOrder] = useState()
  useEffect(() => {
    const id = query?.id as string
    if (id && isReady)
      read('orders', id)
        .then((data) => {
          setOrder(data)
        })
        .catch()
  }, [JSON.stringify(query?.id), isReady])
  return <InvoiceDetail data={order} />
}
InvoiceDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}
export default InvoiceDetailPage
