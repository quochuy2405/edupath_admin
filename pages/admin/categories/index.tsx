'use client'
import { columnTableCategories } from '@/components/makecolumns'
import { Categories } from '@/components/templates'
import { deleteItem } from '@/firebase/base'
import { create, readAll } from '@/firebase/base'
import { db } from '@/firebase/config'
import AdminLayout from '@/layouts/AdminLayout'
import { schema } from '@/resolvers/stock_categories'
import { CategoriesType } from '@/types/stocks'
import { yupResolver } from '@hookform/resolvers/yup'
import { collection } from 'firebase/firestore'
import { enqueueSnackbar } from 'notistack'
import { ReactElement, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const CategoriesPage = () => {
  const deleteData = async (id: string) => {
    if (id) {
      await deleteItem('categories', id)
        .then(() => {
          enqueueSnackbar('Đã xóa thành công', { variant: 'success' })
          setRefresh((cur) => !cur)
        })
        .catch(() => {
          enqueueSnackbar('Lỗi', { variant: 'error' })
        })
    }
  }
  const columns = columnTableCategories({ deleteData })
  const [refresh, setRefresh] = useState(false)
  const stateStore = useForm({
    defaultValues: {
      isModal: false,
      dataTable: []
    }
  })
  const dataForm = useForm<any>({
    resolver: yupResolver(schema)
  })

  const addCategories = async (data: CategoriesType) => {
    const categoriesRef = collection(db, 'categories')
    const initCategory = {
      ...data
    }
    await create(categoriesRef, initCategory)
      .then(() => {
        enqueueSnackbar('Tạo phân loại thành công', { variant: 'success' })
        dataForm.reset()
        stateStore.reset()
        setRefresh((cur) => !cur)
      })
      .catch(() => {
        enqueueSnackbar('Tạo phân loại thất bại', { variant: 'error' })
      })
  }

  useEffect(() => {
    const categoriesRef = collection(db, 'categories')
    readAll(categoriesRef)
      .then((data) => {
        stateStore.setValue('dataTable', data)
      })
      .catch((error) => console.log(error))
  }, [refresh])

  const props = {
    columns,
    dataForm,
    stateStore,
    addCategories
  }
  return <Categories {...props} />
}
CategoriesPage.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}
export default CategoriesPage
