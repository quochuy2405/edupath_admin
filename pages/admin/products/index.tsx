'use client'
import { Product } from '@/components/templates'
import {
  addImage,
  create,
  deleteItem,
  deleteItemByField,
  findAll,
  readAll,
  update
} from '@/firebase/base'
import { db, storage } from '@/firebase/config'
import AdminLayout from '@/layouts/AdminLayout'
import { schema } from '@/resolvers/product'
import { ProductType } from '@/types/product'
import { CategoriesType } from '@/types/stocks'
import { yupResolver } from '@hookform/resolvers/yup'
import { collection } from 'firebase/firestore'
import { getDownloadURL, ref } from 'firebase/storage'
import { useSearchParams } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { ReactElement, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

export type StateProductPageType = {
  products: Array<ProductType>
  isModal: boolean
  isEdit: boolean
  isDelete: string
  imagePreviews: any
  fileImageNews: Array<any>
  categories: Array<CategoriesType>
}
const ProductPage = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [refresh, setRefresh] = useState(false)
  const tab = useSearchParams().get('tab') as any
  const productsRef = useRef<Array<ProductType>>([])
  const stateStore = useForm<StateProductPageType>({
    defaultValues: {
      products: [],
      isModal: false,
      isEdit: false,
      isDelete: '',
      imagePreviews: null,
      fileImageNews: [],
      categories: []
    }
  })
  const dataForm = useForm<ProductType>({
    resolver: yupResolver(schema)
  })

  const addProduct = async (data: ProductType) => {
    const images = stateStore.getValues('fileImageNews')
    // Create or update the product data
    if (!images?.length) {
      enqueueSnackbar('Hãy chọn đủ ảnh sản phẩm', { variant: 'error' })
      return
    }
    const imageRef = ref(
      storage,
      'products/' +
        data.imageName
          .trim()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLocaleLowerCase()
          .replace(/\s/g, '_')
    )

    const image = await getDownloadURL(imageRef).catch((error) => console.log(error))
    if (image) {
      enqueueSnackbar('Mã hình ảnh đã tồn tại', { variant: 'error' })
      return
    }

    const productsRef = collection(db, 'products')

    await create(productsRef, data)
      .then(async (id) => {
        // If a new image is selected, upload it to the storage
        const folder = data.imageName
          .trim()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLocaleLowerCase()
          .replace(/\s/g, '_')

        await images.forEach(async (image) => {
          const [key, value] = Object.entries(image)[0]
          await addImage(value as File, 'products/' + folder + '/' + key)
        })

        enqueueSnackbar('Thêm sản phẩm thành công', { variant: 'success' })
        const stocksRef = collection(db, 'initStock')
        await create(stocksRef, {
          category: data.category,
          quantity: 0,
          imageName: data.imageName,
          prod_id: id
        })
        dataForm.reset()
        stateStore.resetField('fileImageNews')
        stateStore.resetField('imagePreviews.0')
        stateStore.resetField('imagePreviews.1')
        stateStore.resetField('imagePreviews.2')
        stateStore.resetField('imagePreviews.3')
        stateStore.resetField('imagePreviews.4')
        stateStore.resetField('isModal')
        setRefresh((cur) => !cur)
      })
      .catch((error) => {
        console.log(error)
        enqueueSnackbar('Thêm sản phẩm lỗi', { variant: 'error' })
      })
  }

  const editProduct = (data: ProductType) => {
    const {
      category,
      descriptions,
      name,
      price,
      sizes,
      id,
      highlights,
      details,
      quantity,
      imageName,
      gender
    } = data
    const productRef = collection(db, 'products')
    update(productRef, id, {
      category,
      name,
      price,
      sizes,
      id,
      highlights,
      descriptions,
      details,
      quantity,
      gender
    })
      .then(async () => {
        const folder = imageName
          .trim()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLocaleLowerCase()
          .replace(/\s/g, '_')

        const images = stateStore.getValues('fileImageNews')

        await images.forEach(async (image) => {
          const [key, value] = Object.entries(image)[0]
          await addImage(value as File, 'products/' + folder + '/' + key)
        })
        await enqueueSnackbar('Cập nhật thành công', { variant: 'success' })
        setRefresh((cur) => !cur)
      })
      .catch(() => {
        enqueueSnackbar('Cập nhật thất bại', { variant: 'error' })
      })
  }
  const previewImageNew = (files: FileList, name: string) => {
    const file = files[0]
    if (file) {
      const images = stateStore.getValues('fileImageNews')
      const existFileIndex = images.findIndex((item) => item.hasOwnProperty(name))

      if (existFileIndex !== -1) {
        images[existFileIndex][name] = file
      } else {
        const newImage = { [name]: file }
        images.push(newImage)
      }
      stateStore.setValue('fileImageNews', images)

      const reader = new FileReader()
      reader.addEventListener('load', () => {
        stateStore.setValue(`imagePreviews.${name}`, reader.result)
      })
      reader.readAsDataURL(file)
    }
  }

  const deleteData = async (id: string) => {
    if (id) {
      await deleteItem('products', id)
        .then(async () => {
          await deleteItemByField('initStock', 'prod_id', id)
          enqueueSnackbar('Đã xóa thành công', { variant: 'success' })
          setRefresh((cur) => !cur)
        })
        .catch(() => {
          enqueueSnackbar('Lỗi', { variant: 'error' })
        })
    }
  }
  useEffect(() => {
    const categoriesRef = collection(db, 'categories')
    readAll(categoriesRef)
      .then((data) => {
        productsRef.current = data
        stateStore.setValue('categories', data)
      })
      .catch((error) => console.log(error))
  }, [])
  useEffect(() => {
    dataForm.reset()
    stateStore.resetField('fileImageNews')
    stateStore.resetField('imagePreviews.0')
    stateStore.resetField('imagePreviews.1')
    stateStore.resetField('imagePreviews.2')
    stateStore.resetField('imagePreviews.3')
    stateStore.resetField('imagePreviews.4')
    stateStore.resetField('isModal')

    const productRef = collection(db, 'products')

    ;(tab === 'all' || !tab ? readAll(productRef) : findAll(productRef, [['category', tab]])).then(
      async (res) => {
        const products = res.map(async (item) => {
          const names = [0, 1, 2, 3, 4]
          try {
          } catch (error) {}
          const imagesURL = names.map(async (name) => {
            try {
              const imageRef = ref(
                storage,
                'products/' +
                  item.imageName
                    .trim()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .toLocaleLowerCase()
                    .replace(/\s/g, '_') +
                  '/' +
                  name
              )
              const imageURL = await getDownloadURL(imageRef)
              if (!imageURL) return
              return imageURL
            } catch (error) {
              return ''
            }
          })

          return {
            ...item,
            imagesURL: await Promise.all(imagesURL)
          }
        })
        stateStore.setValue('products', await Promise.all(products))
      }
    )
  }, [refresh, tab])

  const props = {
    stateStore,
    dataForm,
    addProduct,
    editProduct,
    previewImageNew,
    deleteData
  }
  return <Product {...props} />
}
ProductPage.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}
export default ProductPage
