import clsx from 'clsx'
import React, { ReactNode, memo } from 'react'
import { BsCheckLg } from 'react-icons/bs'
import { HiLockClosed } from 'react-icons/hi'
import Styles from './Checkbox.module.css'

export interface CheckBoxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'ref'> {
  label?: string | ReactNode
  name?: string
  isError?: boolean
  className?: string
}

const CheckBox: React.FC<CheckBoxProps> = React.forwardRef<HTMLInputElement, CheckBoxProps>(
  ({ label: title, isError, className, ...props }, ref) => {
    const classNames = clsx(Styles.CheckBoxContainer, {
      [Styles.Error]: isError,
      className: className
    })

    return (
      <label className={classNames}>
        <div className={clsx(Styles.CheckBox, { [Styles.Radio]: props.type === 'radio' })}>
          <input ref={ref} type="checkbox" className={Styles.Input} {...props} />
          {props.disabled ? (
            <div className="flex justify-center items-center">
              <HiLockClosed size={15} color="#4bbc91" />
            </div>
          ) : (
            <BsCheckLg size={20} className={Styles.isChecked} />
          )}
        </div>
        {title && <div className={Styles.CheckBoxLabel}>{title}</div>}
      </label>
    )
  }
)
CheckBox.displayName = 'check_box'
export default memo(CheckBox)
