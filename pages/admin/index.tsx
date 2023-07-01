'use client'
import { DashBoard } from '@/components/templates'
import AdminLayout from '@/layouts/AdminLayout'
import React, { ReactElement } from 'react'

const DashBoardPage = () => {
  return <DashBoard />
}
DashBoardPage.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}

export default DashBoardPage
