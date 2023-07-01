'use client'
import clsx from 'clsx'

const Modal = ({ isOpen, handleClose, children, title, size = '3xl' }) => {
  return (
    <div
      id="authentication-modal"
      tabIndex={-1}
      aria-hidden="true"
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 w-screen p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex items-center justify-center bg-[#a8a8a860]',
        {
          hidden: !isOpen,
          block: isOpen
        }
      )}
    >
      <div
        className={clsx(`relative w-full  max-h-full max-w-6xl`, {
          'max-w-md': size === 'md',
          'max-w-lg': size === 'lg',
          'max-w-xl': size === 'xl',
          'max-w-2xl': size === '2xl',
          'max-w-6xl': size === '3xl'
        })}
      >
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            data-modal-hide="authentication-modal"
            onClick={handleClose}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="px-6 py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-semibold uppercase text-center text-gray-900 dark:text-white">
              {title}
            </h3>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
