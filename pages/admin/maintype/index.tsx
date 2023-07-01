import { columnTableMainType } from '@/components/makecolumns'
import { MainTypes } from '@/components/templates'
import AdminLayout from '@/layouts/AdminLayout'
import { closeLoading, setLoading } from '@/redux/features/slices/loading'
import { schema } from '@/resolvers/maintype'
import { TMainTypes } from '@/types/common'
import { yupResolver } from '@hookform/resolvers/yup'
import { addMaintype, allMaintypes, removeMaintype } from 'apis/maintype'
import { ReactElement, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

export type StateMainTypesType = {
  dataTable: Array<TMainTypes>
  isModal: boolean
}
const MainTypesPage = () => {
  const [refresh, setRefresh] = useState(false)
  const dispatch = useDispatch()
  const stateStore = useForm<StateMainTypesType>({
    defaultValues: {
      isModal: false,
      dataTable: []
    }
  })
  const onRefresh = () => {
    setRefresh((cur) => !cur)
  }

  const [idDelete, setIdDelete] = useState('')
  const onChangeIdDelete = (id: string) => {
    setIdDelete(id)
  }

  const onDelete = async (id: string) => {
    await removeMaintype(id)
    onRefresh()
  }
  const columns = columnTableMainType({ onDelete, idDelete, onChangeIdDelete })

  const dataForm = useForm<TMainTypes>({
    resolver: yupResolver(schema)
  })
  const resetForm = () => {
    dataForm.reset()
    stateStore.resetField('isModal')
  }
  const addMainTypes = async (data: TMainTypes) => {
    await addMaintype(data)
    onRefresh()
    resetForm()
  }
  useEffect(() => {
    ;(async () => {
      dispatch(setLoading({ status: true }))
      await allMaintypes()
        .then(({ data }) => {
          if (data) stateStore.setValue('dataTable', data)
        })
        .catch((error) => console.log(error))
      dispatch(closeLoading())
    })()
  }, [refresh])

  const props = {
    columns,
    stateStore,
    dataForm,
    addMainTypes
  }

  return <MainTypes {...props} />
}
MainTypesPage.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}
export default MainTypesPage
