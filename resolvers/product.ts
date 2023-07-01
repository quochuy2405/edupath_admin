import * as yup from 'yup'
export const schema = yup.object().shape({
  name: yup.string().required('Không được để trống'),
  imageName: yup
    .string()
    .required('Không được để trống')
    .test('imageName', 'Không được có khoảng trắng', (value) => {
      if (/\s/.test(value)) return false
      return true
    }),
  sizes: yup.array().test('sizes', 'Hãy chọn size', (value) => {
    if (!value.length) return false
    return true
  }),
  price: yup.string().test('quantity', 'Giá sản phẩm không hợp lệ', (value) => {
    if (Number(value) <= 0) return false
    return true
  }),
  quantity: yup.string().test('quantity', 'Số lượng không hợp lệ', (value) => {
    if (Number(value) <= 0) return false
    return true
  }),
  descriptions: yup.string().required('Không được để trống'),
  category: yup.string().required('Không được để trống')
})
