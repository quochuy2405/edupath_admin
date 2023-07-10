import { columnTableMainType } from '@/components/makecolumns'
import { MainTypes } from '@/components/templates'
import AdminLayout from '@/layouts/AdminLayout'
import { closeLoading, setLoading } from '@/redux/features/slices/loading'
import { schema } from '@/resolvers/maintype'
import { TMainTypes } from '@/types/common'
import { yupResolver } from '@hookform/resolvers/yup'
import { addNewMaintype, allMaintypes, editMaintype, removeMaintype } from 'apis/maintype'
import { ReactElement, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { useDispatch } from 'react-redux'

export type StateMainTypesType = {
  dataTable: Array<TMainTypes>
  isModal: boolean
  editData: any
  page: 1
}
const MainTypesPage = () => {
  const [refresh, setRefresh] = useState(false)
  const dispatch = useDispatch()
  const stateStore = useForm<StateMainTypesType>({
    defaultValues: {
      isModal: false,
      dataTable: [],
      page: 1
    }
  })
  const onRefresh = () => {
    setRefresh((cur) => !cur)
  }

  const [idDelete, setIdDelete] = useState('')
  const onChangeIdDelete = (id: string) => {
    setIdDelete(id)
  }
  const onModelUpdate = async (data: TMainTypes) => {
    stateStore.setValue('isModal', true)
    stateStore.setValue('editData', data)
    dataForm.setValue('type_name', data.type_name)
    dataForm.setValue('_id', data._id)
  }
  const updateMainType = async (data: TMainTypes) => {
    await editMaintype(data).then(() => {
      toast(
        <div className="flex items-center gap-2">
          <BsFillCheckCircleFill size={14} color="green" />
          <p className="text-xs text-emerald-400">Đã cập nhật</p>
        </div>
      )
      resetForm()
      onRefresh()
    })
  }

  const onDelete = async (id: string) => {
    await removeMaintype(id).then(() => {
      toast(
        <div className="flex items-center gap-2">
          <BsFillCheckCircleFill size={14} color="green" />
          <p className="text-xs text-emerald-400">Đã xóa thành công</p>
        </div>
      )
    })
    onRefresh()
  }
  const columns = columnTableMainType({ onDelete, idDelete, onChangeIdDelete, onModelUpdate })

  const dataForm = useForm<TMainTypes>({
    resolver: yupResolver(schema)
  })
  const resetForm = () => {
    dataForm.reset()
    stateStore.resetField('isModal')
  }
  const addMainType = async (data: TMainTypes) => {
    await addNewMaintype(data)
      .then(async () => {
        toast(
          <div className="flex items-center gap-2">
            <BsFillCheckCircleFill size={14} color="green" />
            <p className="text-xs text-emerald-400">Đã thêm thành công</p>
          </div>
        )
        resetForm()
        onRefresh()
      })
      .catch((e) => {
        console.log(e)
      })
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
    addMainType,
    updateMainType
  }

  return <MainTypes {...props} />
}
MainTypesPage.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}
export default MainTypesPage
