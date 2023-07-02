'use client'
import { Login } from '@/components/templates'
import { closeLoading, setLoading } from '@/redux/features/slices/loading'
import { loginSchema } from '@/utils/login'
import { yupResolver } from '@hookform/resolvers/yup'
import { debounce } from 'lodash'
import 'metadata'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

const LoginPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const methods = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: yupResolver(loginSchema)
  })

  const handleSubmit = async (data: any) => {
    console.log(data)
    dispatch(setLoading({ status: true }))
    router.push('/admin')
    debounce(() => dispatch(closeLoading()), 1200, { leading: false })()
  }

  const props = {
    methods,
    handleSubmit
  }
  return <Login {...props} />
}

export default LoginPage
