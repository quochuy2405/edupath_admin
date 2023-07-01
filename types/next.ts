import type * as React from 'react'
import type { NextPage as NextPageType } from 'next'
import type { AppProps as NextAppProps } from 'next/app'

type NextPage = NextPageType & {
  getLayout?: (page: JSX.Element) => React.ReactNode
}

type AppProps = NextAppProps & {
  Component: NextPage
}

export type { NextPage, AppProps }
