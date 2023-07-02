import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from 'react-icons/md'
import { CgChevronDoubleLeft, CgChevronDoubleRight } from 'react-icons/cg'
interface PaginationProps {
  currentPage?: number
  pageSize: number
  className?: string
  onChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ pageSize, className, currentPage, onChange }) => {
  const [items, setItems] = useState([])

  const handleClickPrev = () => {
    onChange(currentPage - 1)
  }

  const handleClickNext = () => {
    onChange(currentPage + 1)
  }

  const handleClickItem = (num: number) => {
    onChange(num)
  }

  useEffect(() => {
    const maxVisible = 4
    const itemsCurrent = Array(pageSize)
      .fill(0)
      .map((_, index) => index + 1)
    const totalPages = Math.ceil(itemsCurrent.length)
    let listNums = []
    const isNearStart = currentPage - maxVisible / 2 - 1 <= 0
    const isNearEnd = currentPage + maxVisible / 2 + 1 > totalPages

    if (isNearStart || isNearEnd) {
      if (isNearStart) {
        listNums = itemsCurrent.slice(0, 5)
        if (pageSize - 1 > maxVisible) listNums.push('...')
      } else if (isNearEnd) {
        listNums = itemsCurrent.slice(totalPages - 5, totalPages)
        if (pageSize - 1 > maxVisible) listNums.unshift('...')
      }
    } else {
      const leftIndex = currentPage - 1 - maxVisible / 2
      const rightIndex = currentPage + maxVisible / 2
      listNums = itemsCurrent.slice(leftIndex < 0 ? 0 : leftIndex, rightIndex)
      if (pageSize - 1 > maxVisible) listNums.push('...')
      if (pageSize - 1 > maxVisible) listNums.unshift('...')
    }
    setItems(listNums)
  }, [pageSize, currentPage])

  const classNames = clsx('flex justify-center items-center w-full', { [className]: !!className })

  return (
    <div className={classNames}>
      <div className="w-fit mx-auto my-4 flex justify-between gap-4 select-none">
        <button
          className={clsx(
            'flex cursor-pointer justify-center items-center rounded-md font-bold text-sm bg-gray-100 min-w-[40px] h-10',
            {
              'opacity-25': currentPage - 1 < 1
            }
          )}
          onClick={() => onChange(1)}
          disabled={currentPage - 1 < 1}
        >
          <CgChevronDoubleLeft size={20} />
        </button>
        <button
          className={clsx(
            'flex cursor-pointer justify-center items-center rounded-md font-bold text-sm bg-gray-100 min-w-[40px] h-10',
            {
              'opacity-25': currentPage - 1 < 1
            }
          )}
          onClick={handleClickPrev}
          disabled={currentPage - 1 < 1}
        >
          <MdOutlineNavigateBefore size={20} />
        </button>
        {items.map((num, index) => (
          <div
            key={num + index}
            onClick={() => Number(num) && handleClickItem(num)}
            className={clsx(
              'flex cursor-pointer justify-center items-center rounded-md font-bold text-sm bg-gray-100 min-w-[40px] h-10',
              {
                '!bg-blue-500 text-white': num == currentPage,
                'opacity-25': num === '...'
              }
            )}
          >
            {num}
          </div>
        ))}
        <button
          className={clsx(
            'flex cursor-pointer justify-center items-center rounded-md font-bold text-sm bg-gray-100 min-w-[40px] h-10',
            {
              'opacity-25': currentPage + 1 > pageSize
            }
          )}
          onClick={handleClickNext}
          disabled={currentPage + 1 > pageSize}
        >
          <MdOutlineNavigateNext size={20} />
        </button>
        <button
          className={clsx(
            'flex cursor-pointer justify-center items-center rounded-md font-bold text-sm bg-gray-100 min-w-[40px] h-10',
            {
              'opacity-25': currentPage + 1 > pageSize
            }
          )}
          onClick={() => onChange(pageSize)}
          disabled={currentPage + 1 > pageSize}
        >
          <CgChevronDoubleRight size={20} />
        </button>
      </div>
    </div>
  )
}

export default Pagination
