'use client'
import { Loading } from '@/components/atoms'
import { RootState } from '@/redux/features/store'
import React from 'react'
import { useSelector } from 'react-redux'

const LoadingPopUp = () => {
  const loading = useSelector((state: RootState) => state.loading)
  return (
    <>
      {loading.status && (
        <div className="fixed top-0 bottom-0 right-0 left-0 z-[99999]">
          <div className="bg-[#a5a5a576] h-screen w-screen absolute top-0 flex items-center justify-center z-50">
            <div className="bg-white h-fit w-fit min-h-[25vh] min-w-[25vh] rounded-lg flex items-center justify-center shadow-sm p-4">
              <Loading title={loading.title} mode={loading.mode} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default LoadingPopUp
