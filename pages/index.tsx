'use client'
import { Login } from '@/components/templates'
import { findAll } from '@/firebase/base'
import { auth, db } from '@/firebase/config'
import { closeLoading, setLoading } from '@/redux/features/slices/loading'
import { setUser } from '@/redux/features/slices/user'
import { loginSchema } from '@/utils/login'
import { yupResolver } from '@hookform/resolvers/yup'
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { collection } from 'firebase/firestore'
import { debounce } from 'lodash'
import 'metadata'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
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
    dispatch(setLoading({ status: true }))
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password)
      const user = userCredential.user
      if (user) {
        const accountRef = collection(db, 'accounts')
        await findAll(accountRef, [['email', user.email as any]]).then((data) => {
          const user = data[0] as any
          if (user?.role) {
            dispatch(setUser({ name: user.name, role: user.role }))
            router.push('/admin')
          }
        })
      }
    } catch (error) {
      dispatch(setLoading({ status: true, mode: 'error', title: 'Sai tài khoản!!' }))
    }
    debounce(() => dispatch(closeLoading()), 1200, { leading: false })()
  }
  useEffect(() => {
    const autoLogin = () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const accountRef = collection(db, 'accounts')
          await findAll(accountRef, [['email', user.email as any]]).then((data) => {
            const user = data[0] as any
            if (user?.role) {
              dispatch(setUser({ name: user.name, role: user.role }))
              router.push('/admin')
            }
          })
        } else {
          console.log('User is signed out')
        }
      })
    }
    autoLogin()
  }, [])
  const props = {
    methods,
    handleSubmit
  }
  return <Login {...props} />
}

export default LoginPage
