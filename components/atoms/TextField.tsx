'use client'
import React, { forwardRef, memo } from 'react'
import { FieldError } from 'react-hook-form'
interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string
  name: string
  type?: 'text' | 'password' | 'number'
  errors?: FieldError
  required?: boolean
  className?: string
  mode?: 'primary' | 'default'
}
const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ title, errors = {}, required = false, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {title}
        </label>
        <input
          ref={ref}
          {...props}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        />
        {!!errors?.message && required && (
          <p className="text-red-400 text-[10px] absolute bottom-0 translate-y-4">
            {errors?.message}
          </p>
        )}
      </div>
    )
  }
)

TextField.displayName = 'TextField'
export default memo(TextField)
