'use client'
import { OptionType } from 'common'
import React, { forwardRef, memo } from 'react'
import { FieldError } from 'react-hook-form'
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  title?: string
  name: string
  errors?: FieldError
  required?: boolean
  className?: string
  options: Array<OptionType>
}
const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ title, errors = {}, required = false, options, ...props }, ref) => {
    return (
      <div className="relative">
        <label
          htmlFor="category"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {title}
        </label>
        <select
          ref={ref}
          value={props.value}
          onChange={props.onChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value={''}>Chọn</option>
          {options.map((option) => (
            <option key={option.label + option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {!!errors?.message && required && (
          <p className="text-red-400 text-[10px] absolute bottom-0 translate-y-4">
            {errors?.message}
          </p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'
export default memo(Select)
