'use client'
import { columnTableExpense } from '@/components/makecolumns/expense'
import { ExpenseProfit } from '@/components/templates'
import { format_expense } from '@/constants/index'
import { create, readAll, update } from '@/firebase/base'
import { db } from '@/firebase/config'
import AdminLayout from '@/layouts/AdminLayout'
import { closeLoading, setLoading } from '@/redux/features/slices/loading'
import { collection } from 'firebase/firestore'
import { ReactElement, useEffect, useMemo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import shortid from 'shortid'
const itemNew = {
  nameCol: '',
  T1: 0,
  T2: 0,
  T3: 0,
  T4: 0,
  T5: 0,
  T6: 0,
  T7: 0,
  T8: 0,
  T9: 0,
  T10: 0,
  T11: 0,
  T12: 0,
  subRows: []
}
export type StateExpenseProfitPageType = {
  expenses: any
  addRow: boolean
  nameCol: string
}

const ExpenseProfitPage = () => {
  const parentIdRef = useRef('')
  const idRef = useRef('')
  const dataForm = useForm({
    defaultValues: []
  })
  const [refresh, setRefresh] = useState(false)
  const stateStore = useForm<StateExpenseProfitPageType>({
    defaultValues: {
      expenses: format_expense,
      addRow: false,
      nameCol: ''
    }
  })
  const handleOpenModel = (id: string) => {
    if (id) {
      parentIdRef.current = id
      stateStore.setValue('addRow', true)
    }
  }
  const handleDeleteRow = (id: string) => {
    if (id) {
      const parsedData = parseData(dataForm.getValues())
      const updateData = removeRowById(parsedData, id)
      stateStore.setValue('expenses', updateData)
      dataForm.reset(updateData)
    }
  }
  const dispatch = useDispatch()
  const columns = useMemo(() => columnTableExpense({ handleOpenModel, handleDeleteRow }), [])

  const parseData = (data) => {
    const result = []

    const parseRow = (row) => {
      let rowData = {}
      let subRowData = []
      Object.entries(row).forEach(([key, value]) => {
        if (!Number.isInteger(Number(key))) {
          rowData = { ...rowData, [key]: value }
        } else {
          subRowData = [...subRowData, value]
        }
      })
      if (subRowData.length) {
        rowData['subRows'] = subRowData.map((subRow) => parseRow(subRow))
      }

      return rowData
    }

    Object.values(data).forEach((row) => {
      result.push(parseRow(row))
    })

    return result
  }

  const handleSubmit = async (data: any) => {
    dispatch(setLoading({ status: true }))
    const parsedData = parseData(data)
    console.log(parsedData)
    const expenseRef = collection(db, 'expenses')

    await (idRef.current
      ? update(expenseRef, idRef.current, { expenses: parsedData } as any)
      : create(expenseRef, { expenses: parsedData })
    )
      .then(() => {
        dispatch(closeLoading())
        dataForm.reset()
        stateStore.reset()
        idRef.current = ''
        setRefresh((cur) => !cur)
      })
      .catch(() => {
        dispatch(closeLoading())
      })
  }

  const addSubRowToParent = (rows, idParent, newSubRow) => {
    return rows.map((row) => {
      if (row.id === idParent) {
        return {
          ...row,
          subRows: [...row.subRows, newSubRow]
        }
      } else {
        if (row.subRows && row.subRows.length > 0) {
          return {
            ...row,
            subRows: addSubRowToParent(row.subRows, idParent, newSubRow)
          }
        }
      }
      return row
    })
  }

  const removeRowById = (rows, id) => {
    return rows.filter((row) => {
      if (row.id === id) {
        return false // Exclude the row with the specified ID
      } else if (row.subRows && row.subRows.length > 0) {
        // Recursively remove the row from subrows
        row.subRows = removeRowById(row.subRows, id)
      }
      return true // Include all other rows
    })
  }
  const handelNewRow = (nameCol: string) => {
    const id = shortid.generate()
    return { id, ...itemNew, nameCol }
  }

  const handleAddSubRow = (nameCol: string) => {
    const idParent = parentIdRef.current
    const newSubRow = handelNewRow(nameCol)
    const updatedData = addSubRowToParent(stateStore.getValues('expenses'), idParent, newSubRow)
    dataForm.reset(updatedData)
    stateStore.setValue('expenses', updatedData)
    handleReset()
  }
  const handleAddRow = (data: typeof itemNew) => {
    if (!parentIdRef.current) {
      const newSubRow = handelNewRow(data.nameCol)
      const currentValue = stateStore.getValues('expenses')
      dataForm.reset([...currentValue, newSubRow])
      stateStore.setValue('expenses', [...currentValue, newSubRow])
    } else {
      handleAddSubRow(data.nameCol)
    }
    handleReset()
  }
  const handleReset = () => {
    stateStore.setValue('addRow', false)
    stateStore.resetField('nameCol')
    parentIdRef.current = ''
  }

  useEffect(() => {
    const expensesRef = collection(db, 'expenses')
    readAll(expensesRef)
      .then((data) => {
        if (data) {
          console.log(data)
          if (data[0].id) {
            idRef.current = data[0].id
          }
          stateStore.setValue('expenses', data[0].expenses)
          dataForm.reset(data[0].expenses)
        }
      })
      .catch((error) => console.log(error))
  }, [refresh])

  const props = {
    columns,
    stateStore,
    dataForm,
    handleSubmit,
    handleAddRow,
    handleReset
  }
  return <ExpenseProfit {...props} />
}
ExpenseProfitPage.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}

export default ExpenseProfitPage
