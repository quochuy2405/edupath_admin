import { columnTableReviews } from '@/components/makecolumns'
import { Review } from '@/components/templates'
import AdminLayout from '@/layouts/AdminLayout'
import { closeLoading, setLoading } from '@/redux/features/slices/loading'
import { TReview } from '@/types/common'
import { allReviews } from 'apis/review'
import { ReactElement, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
export type StateReviewType = {
  dataTable: Array<TReview>
  isModal: boolean
  page: number
}
const ReviewPage = () => {
  const dispatch = useDispatch()
  const stateStore = useForm<StateReviewType>({
    defaultValues: {
      isModal: false,
      dataTable: [],
      page: 1
    }
  })

  const columns = columnTableReviews({})
  const dataForm = useForm<TReview>()

  useEffect(() => {
    ;(async () => {
      dispatch(setLoading({ status: true }))
      await allReviews()
        .then(({ data }) => {
          if (data)
            stateStore.setValue(
              'dataTable',
              data.filter((data) => !!data)
            )
        })
        .catch((error) => console.log(error))
      dispatch(closeLoading())
    })()
  }, [])

  const props = {
    columns,
    stateStore,
    dataForm
  }

  return <Review {...props} />
}
ReviewPage.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}
export default ReviewPage
