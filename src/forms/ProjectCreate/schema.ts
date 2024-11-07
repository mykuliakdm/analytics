import * as yup from 'yup'

export const schema = yup
  .object({
    name: yup.string().required('Name is required.'),
    url: yup.string().required('URL is required.'),
  })
  .required()
