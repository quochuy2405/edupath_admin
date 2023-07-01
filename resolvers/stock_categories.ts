import * as yup from 'yup'
export const schema = yup.object().shape({
  name: yup.string().required('Không được để trống'),
  code: yup.string().required('Không được để trống')
})
