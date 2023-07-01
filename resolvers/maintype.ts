import * as yup from 'yup'
export const schema = yup.object().shape({
  type_name: yup.string().required('Không được để trống')
})
